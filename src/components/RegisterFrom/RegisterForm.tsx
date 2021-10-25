import { Button, Divider, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required')
    .lowercase()
    .trim(),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .trim(),
  confPass: Yup.string()
    .required('Passwords must match')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  firstName: Yup.string()
    .matches(/[a-zA-Z]/, 'First name can only contain Latin letters.')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(/[a-zA-Z]/, 'Last name can only contain Latin letters.')
    .required('Last name is required'),
});

interface Prop {
  showLogin: any;
}

const RegisterForm = ({ showLogin }: Prop) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confPass: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: validationSchema,
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { m: 1, width: '100%' },
        padding: 2,
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <TextField
        fullWidth
        label="Email"
        id="email"
        name="email"
        required
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Box
        sx={{
          display: { sm: 'flex' },
          '& .first': {
            ml: '0',
          },
          '& .last': {
            mr: '0',
            ml: { xs: '0', md: '8' },
          },
        }}
      >
        <TextField
          fullWidth
          label="First name"
          id="firstName"
          className="first"
          name="firstName"
          required
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          id="lastName"
          className="last"
          name="lastName"
          required
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Box>
      <TextField
        fullWidth
        label="Password"
        type="password"
        id="pass"
        name="password"
        required
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        id="confPass"
        name="confPass"
        required
        value={formik.values.confPass}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confPass && Boolean(formik.errors.confPass)}
        helperText={formik.touched.confPass && formik.errors.confPass}
      />
      <Button
        variant="contained"
        sx={{
          padding: 2,
          mt: 2,
          width: '100%',
          backgroundColor: 'success.light',
          ':hover': { backgroundColor: 'success.main' },
        }}
        type="submit"
      >
        Create Account
      </Button>
      <Divider sx={{ mt: 2, mb: 2, width: '100%' }}></Divider>
      <Typography>
        Already have an account?{' '}
        <Button variant="text" onClick={showLogin}>
          Sign in
        </Button>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
