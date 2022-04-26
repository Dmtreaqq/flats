import React, { useContext } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
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

const AuthForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { setPaper } = useContext(UIContext);
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password);
      } catch (err) {
        if (err) {
          setPaper({
            show: true,
            message: err.message,
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          });
        }
      }
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={formik.handleSubmit}>
        <Grid maxWidth="375px" container spacing={6}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete="off"
              onChange={(e) => {
                formik.setFieldTouched('email');
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              label="Email"
              id="email"
              name="email"
              variant="filled"
              helperText={formik.touched.email && formik.errors.email}
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
                name="password"
                type={showPassword ? 'text' : 'password'}
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
            <Button
              variant="contained"
              fullWidth
              color="primary"
              type="submit"
              className={classes.button}
              disabled={formik.isSubmitting && !formik.isValidating}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </StyledEngineProvider>
  );
};

export default AuthForm;
