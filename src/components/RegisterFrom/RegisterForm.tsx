import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

// yup validation schema
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

interface SignUpValues {
  email: string;
  password: string;
  confPass: string;
  firstName: string;
  lastName: string;
}

const RegisterForm = ({ showLogin }: Prop) => {
  // states for fetching
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  // open the succes message
  const [open, setOpen] = useState(false);
  // formik settings
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confPass: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      handleSignup(values);
    },
    validationSchema: validationSchema,
  });
  // URI
  const URI: string = 'http://localhost:8000';

  // Sign up functions
  const handleSignup = async (values: SignUpValues) => {
    setLoading(true);
    setOpen(false);
    setMessage(null);
    const res = await fetch(`${URI}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.status !== 200 && res.status !== 201) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setMessage(data.message);
    setLoading(false);
    setError(null);
    setOpen(true);
    setTimeout(() => {
      showLogin();
    }, 1000);
    return;
  };

  // Close success message
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage(null);
  };

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
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}
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
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <>
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
        </>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
