import {
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
  Button,
  FormHelperText,
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
  bio: Yup.string()
    .max(50, 'bio should be less than 50 character')
    .trim()
    .nullable(),
  country: Yup.string()
    .max(25, 'country should be less than 25 character')
    .trim()
    .nullable(),
  livesIn: Yup.string()
    .max(25, 'should be less than 25 character')
    .trim()
    .nullable(),
  gender: Yup.string().oneOf(['male', 'female', 'other']),
  birthDate: Yup.date().nullable(),
});

const ProfileSettingsForm = (props: any) => {
  const [error, setError]: [null | {}, any] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const state = useTrackedStore();

  const { profile } = props;
  const { bio, country, livesIn, gender, birthDate } = profile;

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
    values.birthDate = values.birthDate || null;
    const res = await fetch(`${URL}users/${state.user.id}/profile`, {
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
    setLoading(false);
    setError(null);
    setSuccess(true);
    return data;
  };

  const formik = useFormik({
    initialValues: {
      bio: bio,
      country: country,
      livesIn: livesIn,
      gender: gender,
      birthDate: birthDate,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2">
        Profile Settings
      </Typography>
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
        {error && <ErrorMessage message={error} />}
        <TextField
          label="Bio"
          id="bio"
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
        />
        <TextField
          label="Country"
          id="country"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        <TextField
          label="Lives In"
          id="livesIn"
          name="livesIn"
          value={formik.values.livesIn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.livesIn && Boolean(formik.errors.livesIn)}
          helperText={formik.touched.livesIn && formik.errors.livesIn}
        />
        <FormControl
          component="fieldset"
          sx={{ width: '100%' }}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <FormHelperText>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>
        <TextField
          id="date"
          label="Birthday"
          name="birthDate"
          type="date"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {!loading && (
          <Button
            type="submit"
            disabled={formik.values === formik.initialValues}
          >
            Submit
          </Button>
        )}
        {loading && <CircularProgress />}
        <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Profile Updated Successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ProfileSettingsForm;
