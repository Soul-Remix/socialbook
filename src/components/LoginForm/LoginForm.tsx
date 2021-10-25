import { Button, Divider, Link, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required')
    .lowercase()
    .trim(),
  pass: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .lowercase()
    .trim(),
});

interface props {
  showRegister: any;
}

const LoginForm = ({ showRegister }: props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      pass: '',
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
      <TextField
        fullWidth
        label="Password"
        type="password"
        id="pass"
        name="pass"
        required
        value={formik.values.pass}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.pass && Boolean(formik.errors.pass)}
        helperText={formik.touched.pass && formik.errors.pass}
      />
      <Button
        variant="contained"
        sx={{ padding: 1, mt: 1, width: '100%' }}
        type="submit"
      >
        Log In
      </Button>
      <Link
        href="#"
        sx={{
          display: 'block',
          margin: 'auto',
          mt: 2,
          textDecoration: 'none',
        }}
      >
        Forgot Password?(not Implemented)
      </Link>
      <Divider sx={{ mt: 2, mb: 2, width: '100%' }}></Divider>
      <Button
        variant="contained"
        onClick={showRegister}
        sx={{
          padding: 2,
          backgroundColor: 'success.light',
          width: '100%',
          ':hover': { backgroundColor: 'success.main' },
        }}
      >
        Create New Account
      </Button>
    </Box>
  );
};

export default LoginForm;
