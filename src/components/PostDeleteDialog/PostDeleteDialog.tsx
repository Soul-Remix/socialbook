import { Box } from '@mui/system';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useMutation } from 'react-query';

import { useTrackedStore } from '../../store/store';
import { URL as URI } from '../../config/url';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { queryClient } from '../..';

const PostDeleteDialog = ({ open, setOpen, id }: any) => {
  const state = useTrackedStore();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const res = await fetch(`${URI}posts/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
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

  const mutation = useMutation(`delete${id}`, handleSubmit, {
    onSuccess: (data) => {
      queryClient.setQueryData(`posts${state.user.id}`, (prev: any) => {
        return prev.filter((x: any) => x.id !== id);
      });
      handleCancel();
    },
  });

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>Delete Post</DialogTitle>
      {mutation.isError && <ErrorMessage message={mutation.error} />}

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      {!mutation.isLoading && (
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button autoFocus onClick={handleCancel} variant="contained">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              mutation.mutate();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      )}

      {mutation.isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
};

export default PostDeleteDialog;
