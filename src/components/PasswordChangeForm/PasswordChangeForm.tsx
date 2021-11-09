import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const validationSchema = Yup.object({
  oldPass: Yup.string()
    .required('Old Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .trim(),
  newPass: Yup.string()
    .required('New Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .trim(),
  confPass: Yup.string()
    .required('Passwords must match')
    .oneOf([Yup.ref('newPass')], 'Passwords must match'),
});

const PasswordChangeForm = () => {
  const state = useTrackedStore();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Close SnackBar
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((old) => !old);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: any) => {
    const res = await fetch(
      `${process.env.REACT_APP_URI}/users/${state.user.id}/pass`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
      return;
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  };

  const mutation = useMutation('accountSetting', handleSubmit, {
    onSuccess: (data) => {
      setSuccess(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      oldPass: '',
      newPass: '',
      confPass: '',
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <Box sx={{ p: 3, pt: 1 }}>
      <Typography variant="h4" component="h2">
        Change Password
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
        {mutation.isError && <ErrorMessage message={mutation.error} />}
        <TextField
          fullWidth
          label="Old Password"
          id="oldPass"
          name="oldPass"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.oldPass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.oldPass && Boolean(formik.errors.oldPass)}
          helperText={formik.touched.oldPass && formik.errors.oldPass}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="New Password"
          id="newPass"
          name="newPass"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.newPass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPass && Boolean(formik.errors.newPass)}
          helperText={formik.touched.newPass && formik.errors.newPass}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          id="confPass"
          name="confPass"
          type="password"
          value={formik.values.confPass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confPass && Boolean(formik.errors.confPass)}
          helperText={formik.touched.confPass && formik.errors.confPass}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!mutation.isLoading && <Button type="submit">Submit</Button>}
        {mutation.isLoading && <CircularProgress />}

        <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Password Updated Successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default PasswordChangeForm;
