import { Send } from '@mui/icons-material';
import { Button, CircularProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { queryClient } from '../..';
import { useTrackedStore } from '../../store/store';

const validationSchema = Yup.object({
  content: Yup.string().required(),
});

const CommentsForm = (props: any) => {
  const { id } = props;
  const state = useTrackedStore();

  const handleSubmit = async (values: { content: string }) => {
    const res = await fetch(`${process.env.REACT_APP_URI}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        content: values.content,
        postId: id,
      }),
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
  };

  const mutation = useMutation('comment', handleSubmit, {
    onSuccess: (data) => {
      queryClient.setQueryData(`post${id}`, (prev: any) => {
        return { ...prev, comments: prev.comments.concat(data) };
      });
      formik.values.content = '';
    },
  });

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: '100%', display: 'flex', mt: 1, mb: { xs: 10, md: 5 } }}
    >
      <TextField
        fullWidth
        multiline
        label="Add a comment"
        id="comment"
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
      />
      {!mutation.isLoading && (
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ height: '56px' }}
        >
          <Send />
        </Button>
      )}
      {mutation.isLoading && (
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ height: '56px' }}
        >
          <CircularProgress />
        </Button>
      )}
    </Box>
  );
};

export default CommentsForm;
