import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullname: yup
    .string()
    .matches(
      /[ҐІЇЄЁA-ZА-Я][ґієїa-zа-я]* [A-ZҐІЇЄЁА-Я][ґієїa-zа-я]*/,
      'Fullname must be: Name Surname',
    )
    .required('Full Name is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
  repeatpassword: yup
    .string()
    .when('password', {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      is: (val: any) => val && val.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both passwords need to be the same'),
    })
    .required('Repeat password is required'),
});

export default validationSchema;
