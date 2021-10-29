import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { URL } from '../../config/url';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .lowercase()
    .trim(),
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/[a-zA-Z]/, 'First name can only contain Latin letters.'),

  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/[a-zA-Z]/, 'Last name can only contain Latin letters.'),
});

const AccountSettingsForm = ({ user }: any) => {
  const [error, setError]: [null | {}, any] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const state = useTrackedStore();

  // Close SnackBar
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch(`${URL}users/${state.user.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
      return;
    }
    if (res.status !== 200 && res.status !== 201) {
      setError({ message: data.message });
      setLoading(false);
      return;
    }
    state.setUser({ ...state.user, ...values });
    setLoading(false);
    setError(null);
    setSuccess(true);
    return data;
  };

  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2">
        Account Settings
      </Typography>
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
        {error && <ErrorMessage message={error} />}
        <TextField
          fullWidth
          label="Email"
          id="email"
          name="email"
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
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
        {!loading && <Button type="submit">Submit</Button>}
        {loading && <CircularProgress />}

        <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Account Updated Successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AccountSettingsForm;
