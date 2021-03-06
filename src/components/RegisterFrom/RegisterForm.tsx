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
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
  // open the success message
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
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
      mutation.mutate(values);
    },
    validationSchema: validationSchema,
  });

  // Sign up functions
  const handleSignup = async (values: SignUpValues) => {
    const res = await fetch(`${process.env.REACT_APP_URI}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  };

  const mutation = useMutation('SignUp', handleSignup, {
    onSuccess: (data) => {
      setMessage(data.message);
      setOpen(true);
      setTimeout(() => {
        showLogin();
      }, 1500);
    },
  });

  // Close success message
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
    setOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
        padding: 2,
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      {mutation.isError && <ErrorMessage message={mutation.error} />}
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
          width: '100%',
          '& .first': { mr: 1 },
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
      {mutation.isLoading ? (
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
            Already have an account?
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
