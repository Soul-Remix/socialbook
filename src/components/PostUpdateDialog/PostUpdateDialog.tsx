import { Box } from '@mui/system';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';

import { useTrackedStore } from '../../store/store';
import { URL as URI } from '../../config/url';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { queryClient } from '../..';

const validationSchema = Yup.object({
  content: Yup.string()
    .required('Post content is required')
    .max(255, 'Max character length is 255'),
});

const PostUpdateDialog = ({ open, setOpen, post }: any) => {
  const state = useTrackedStore();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: any) => {
    if (!values.file) {
      const res = await fetch(`${URI}posts/${post.id}`, {
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
        throw new Error(data.message);
      }
      return data;
    }
  };

  const mutation = useMutation(`update${post.id}`, handleSubmit, {
    onSuccess: (data) => {
      queryClient.setQueryData(`posts${state.user.id}`, (prev: any) => {
        return prev.map((x: any) => {
          if (x.id === data.id) {
            return data;
          }
          return x;
        });
      });
      handleCancel();
    },
  });

  const formik = useFormik({
    initialValues: {
      content: post.content,
    },
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>Update Post</DialogTitle>
      {mutation.isError && <ErrorMessage message={mutation.error} />}
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            sx={{ mt: 0, mb: 0.5 }}
            label="Content"
            name="content"
            id="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <FormHelperText sx={{ mb: 1.5 }}>
            Character Limit: {formik.values.content.length}/255
          </FormHelperText>
        </DialogContent>
        {!mutation.isLoading && (
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button
              autoFocus
              onClick={handleCancel}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        )}
      </Box>
      {mutation.isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
};

export default PostUpdateDialog;
