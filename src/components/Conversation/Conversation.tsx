import { ArrowBack } from '@mui/icons-material';
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryCache, useQuery } from 'react-query';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';

import { useTrackedStore } from '../../store/store';
import fetchConvo from '../../utils/fetchConvo';
import fetchUser from '../../utils/fetchUser';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { URL } from '../../config/url';
import { queryClient } from '../..';

dayjs.extend(relativeTime);

const validationSchema = Yup.object({
  text: Yup.string().required('Message content is required'),
});

const Conversation = (props: any) => {
  const { convoId, userId, setConvoId, setStartConvo } = props;
  const state = useTrackedStore();
  const history = useHistory();

  const handleSubmit = async (values: any) => {
    const res = await fetch(`${URL}conversations`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        text: values.text,
        conversationId: convoId,
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

  const mutation = useMutation('message', handleSubmit, {
    onMutate: (data) => {
      queryClient.cancelQueries(`convo${convoId}`);
      queryClient.setQueryData(`convo${convoId}`, (prev: any) => {
        const newMessages = prev.messages.concat({
          ...data,
          senderId: state.user.id,
        });
        return { ...prev, messages: newMessages };
      });
    },
    onError: (error, newData, rollback: any) => rollback(),
    onSettled: () => {
      queryClient.refetchQueries(`convo${convoId}`);
      formik.values.text = '';
    },
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    validationSchema: validationSchema,
  });

  const convoQuery = useQuery(`convo${convoId}`, () =>
    fetchConvo(state.token, convoId, state.logOut)
  );
  const userQuery = useQuery(`user${userId}`, () =>
    fetchUser(state.token, userId, state.logOut)
  );
  return (
    <Box>
      <Button
        sx={{
          width: '100%',
          color: 'text.secondary',
          display: 'flex',
          justifyContent: 'flex-start',
          pt: 1,
          pb: 1,
        }}
        onClick={() => {
          setConvoId(null);
          setStartConvo(false);
        }}
      >
        <ArrowBack />
      </Button>
      {(userQuery.isError || convoQuery.isError) && (
        <ErrorMessage message={userQuery.error || convoQuery.error} />
      )}
      {(userQuery.isLoading || convoQuery.isLoading) && (
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {userQuery.data && convoQuery.data && (
        <Button
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '15px',
            textTransform: 'initial',
            width: '100%',
            textAlign: 'left',
          }}
          onClick={() => {
            history.push(`/profile/${userQuery.data.id}`);
          }}
          variant="contained"
        >
          <Avatar
            src={userQuery.data.profilePicture}
            sx={{ width: '50px', height: '50px' }}
          />
          <Box>
            <Typography sx={{ fontWeight: '700' }}>
              {userQuery.data.firstName} {userQuery.data.lastName}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
              }}
            >
              {userQuery.data.isOnline
                ? 'Online'
                : `Last Seen ${dayjs(userQuery.data.updatedAt).fromNow()}`}
            </Typography>
          </Box>
        </Button>
      )}
      <Divider />
      {userQuery.data && convoQuery.data && (
        <>
          <Box
            sx={{
              minHeight: 'calc(100vh - 274px)',
              maxHeight: 'calc(100vh - 274px)',
              width: '100%',
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderColor: '#dad4d4',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {convoQuery.data.messages.map((msg: any) => {
              const sameUser = msg.senderId === state.user.id;
              if (sameUser) {
                return (
                  <Box
                    sx={{
                      maxWidth: '75%',
                      m: 1,
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Typography
                      sx={{
                        p: 1,
                        mr: 2,
                        borderRadius: '20px',
                        textTransform: 'initial',
                        background: '#1976d2',
                        color: 'white',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        hyphens: 'auto',
                        width: '100%',
                      }}
                    >
                      {msg.text}
                    </Typography>
                    <FormHelperText sx={{ textAlign: 'left' }}>
                      {dayjs(msg.createdAt).fromNow()}
                    </FormHelperText>
                  </Box>
                );
              } else {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      maxWidth: '75%',
                      m: 1,
                    }}
                  >
                    <Avatar
                      src={userQuery.data.profilePicture}
                      sx={{ alignSelf: 'flex-end', mb: 4 }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          p: 1,
                          ml: 1,
                          borderRadius: '20px',
                          backgroundColor: '#e8e6e6',
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          wordBreak: 'break-all',
                          hyphens: 'auto',
                        }}
                      >
                        {msg.text}
                      </Typography>
                      <FormHelperText sx={{ textAlign: 'right' }}>
                        {dayjs(msg.createdAt).fromNow()}
                      </FormHelperText>
                    </Box>
                  </Box>
                );
              }
            })}
          </Box>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: '100%',
              display: 'flex',
              position: 'relative',
              bottom: 0,
            }}
          >
            <TextField
              placeholder="message"
              multiline
              fullWidth
              name="text"
              id="message"
              value={formik.values.text}
              onChange={formik.handleChange}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
            />
            <Button
              variant="contained"
              sx={{ textTransform: 'initial', width: '20%' }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Conversation;
