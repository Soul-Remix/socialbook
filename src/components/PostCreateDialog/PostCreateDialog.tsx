import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/system';
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';

import { storage } from '../../firebase/firebase';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { queryClient } from '../..';

const validationSchema = Yup.object({
  content: Yup.string()
    .required('Post content is required')
    .max(255, 'Max character length is 255'),
});

const PostCreateDialog = ({ open, setOpen }: any) => {
  const [files, setFiles]: [any, any] = useState([]);
  const [borderColor, setBorderColor] = useState('#eeeeee');
  const state = useTrackedStore();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    maxSize: 5242880,
    accept: 'image/jpeg, image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected: () => {
      setBorderColor('#ff1744');
    },
    onDropAccepted: () => {
      setBorderColor('#00e676');
    },
  });

  const handleCancel = () => {
    setFiles([]);
    formik.values.content = '';
    setOpen(false);
  };

  const handleSubmit = async (values: any) => {
    if (!values.file) {
      const res = await fetch(`${process.env.REACT_APP_URI}/posts`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ content: values.content }),
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
    if (values.file) {
      const storageRef = ref(storage, 'images/' + uuidv4() + values.file.name);
      const uploadTask = await uploadBytes(storageRef, values.file);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      const res = await fetch(`${process.env.REACT_APP_URI}/posts`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({
          content: values.content,
          image: downloadURL,
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
    }
  };

  const mutation = useMutation('post', handleSubmit, {
    onSuccess: (data) => {
      queryClient.setQueryData('feed', (prev: any) => {
        return {
          pageParams: prev.pageParams,
          pages: prev.pages.map((x: any, i: number) => {
            if (i === 0) {
              return { ...x, posts: [data, ...x.posts] };
            }
            return x;
          }),
        };
      });
      handleCancel();
    },
  });

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: async (values) => {
      mutation.mutate({ content: values.content, file: files[0] || null });
    },
    validationSchema: validationSchema,
  });

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>Create a Post</DialogTitle>
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
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderWidth: 2,
              borderRadius: 2,
              borderColor: borderColor,
              borderStyle: 'dashed',
              backgroundColor: '#fafafa',
              color: '#bdbdbd',
              outline: 'none',
              transition: 'border .24s ease-in-out',
            }}
          >
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {isDragAccept && <p>file will be accepted</p>}
              {isDragReject && <p>file will be rejected</p>}
              {!isDragActive && (
                <p>
                  Drag 'n' drop you image here, or click to select your image
                </p>
              )}
            </div>
            {files &&
              files.map((x: any, i: number) => {
                return (
                  <Avatar
                    key={i}
                    src={x.preview}
                    sx={{
                      width: {
                        xs: '150px',
                        sm: '200px',
                        md: '225px',
                      },
                      height: {
                        xs: '150px',
                        sm: '200px',
                        md: '225px',
                      },
                      mb: 3,
                      borderRadius: 0,
                    }}
                  />
                );
              })}
          </Box>
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
              Submit
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

export default PostCreateDialog;
