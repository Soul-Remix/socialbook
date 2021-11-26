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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState } from 'react';

const AccountDeleteBtn = () => {
  const state = useTrackedStore();
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_URI}/users/${state.user.id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
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

  const mutation = useMutation(`deleteAccount`, handleSubmit, {
    onSuccess: (data) => {
      state.logOut();
    },
  });

  return (
    <>
      <Button
        variant="contained"
        color="error"
        sx={{ mb: 4, ml: 4 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete Account
      </Button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%' } }}
        maxWidth="sm"
        open={open}
      >
        <DialogTitle>Delete Account?</DialogTitle>
        {mutation.isError && <ErrorMessage message={mutation.error} />}

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete Your Account?
          </DialogContentText>
          <DialogContentText>
            There's no going back after you delete your account all your data
            will be lost permanently.
          </DialogContentText>
        </DialogContent>
        {!mutation.isLoading && (
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
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
    </>
  );
};

export default AccountDeleteBtn;
