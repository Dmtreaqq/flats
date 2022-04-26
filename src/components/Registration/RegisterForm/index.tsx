import React, { useContext } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { auth } from '../../../common/firebaseApp';
import validationSchema from './validationSchema';
import useStyles from './styles';
import { UIContext } from '../../Unknown/UIContext';

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] =
    React.useState<boolean>(false);
  const { setPaper } = useContext(UIContext);
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatpassword: '',
      fullname: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const user = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password,
        );

        if (user && user.user) {
          await user.user.updateProfile({
            displayName: values.fullname,
          });
        }
        setPaper({
          show: true,
          message: 'Welcome on board 🚀',
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
      } catch (err) {
        if (err) {
          setPaper({
            show: true,
            message: err.message,
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          });
        }
      }
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid maxWidth="375px" container spacing={6}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete="off"
              name="email"
              onChange={(e) => {
                formik.setFieldTouched('email');
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              label="Email"
              id="email"
              helperText={formik.touched.email && formik.errors.email}
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete="off"
              name="fullname"
              onChange={(e) => {
                formik.setFieldTouched('fullname');
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              label="Full name"
              id="fullname"
              variant="filled"
              helperText={formik.touched.fullname && formik.errors.fullname}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="filled">
              <InputLabel shrink htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.setFieldTouched('password');
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="filled">
              <InputLabel shrink htmlFor="filled-adornment-repeatpassword">
                Repeat password
              </InputLabel>
              <FilledInput
                id="filled-adornment-repeatpassword"
                type={showRepeatPassword ? 'text' : 'password'}
                value={formik.values.repeatpassword}
                onChange={(e) => {
                  formik.setFieldTouched('repeatpassword');
                  formik.handleChange(e);
                }}
                name="repeatpassword"
                onBlur={formik.handleBlur}
                error={
                  formik.touched.repeatpassword &&
                  Boolean(formik.errors.repeatpassword)
                }
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {formik.touched.repeatpassword && formik.errors.repeatpassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={formik.isSubmitting && !formik.isValidating}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </StyledEngineProvider>
  );
};

export default RegisterForm;
