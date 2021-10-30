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
} from '@mui/material';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '../../firebase/firebase';
import { useTrackedStore } from '../../store/store';
import { URL as URI } from '../../config/url';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const PPDialog = ({ open, setOpen }: any) => {
  const [files, setFiles]: [any, any] = useState([]);
  const [error, setError]: [any, any] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setError({ message: 'File should be an image only' });
      setBorderColor('#ff1744');
    },
    onDropAccepted: () => {
      setError(null);
      setBorderColor('#00e676');
    },
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if (!files) {
      return;
    }
    handleSubmit(files[0]);
  };

  const handleSubmit = (file: any) => {
    setLoading(true);
    const storageRef = ref(storage, 'images/' + uuidv4() + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error: any) => {
        setLoading(false);
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const res = await fetch(`${URI}users/${state.user.id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${state.token}`,
            },
            body: JSON.stringify({ profilePicture: downloadURL }),
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
          state.setUser({ ...state.user, profilePicture: downloadURL });
          setLoading(false);
          setError(null);
          setOpen(false);
          return data;
        });
      }
    );
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Change Profile Picture</DialogTitle>
      {error && <ErrorMessage message={error} />}
      <DialogContent>
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
              <p>Drag 'n' drop you image here, or click to select your image</p>
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
                  }}
                />
              );
            })}
        </Box>
      </DialogContent>
      {!loading && (
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            autoFocus
            onClick={handleCancel}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button onClick={handleOk} variant="contained">
            Submit
          </Button>
        </DialogActions>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
};

export default PPDialog;
