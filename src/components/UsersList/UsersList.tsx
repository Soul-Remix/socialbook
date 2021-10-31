import { SentimentSatisfied } from '@mui/icons-material';
import {
  Avatar,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { queryClient } from '../..';
import { URL } from '../../config/url';
import { useTrackedStore } from '../../store/store';

const UsersList = (props: any) => {
  const { users, friends, sent } = props;
  const { requests } = props.requests;
  const history = useHistory();
  const state = useTrackedStore();

  const handleAdd = async (recId: number) => {
    const res = await fetch(`${URL}friends`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${state.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: state.user.id,
        receiver: recId,
      }),
    });
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
      throw new Error(data.message);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  };

  const handleRemove = async (id: number) => {
    const res = await fetch(`${URL}friends/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
      throw new Error(data.message);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  };

  const addMutation = useMutation('handleReq', handleAdd, {
    onSuccess: (data) => {
      queryClient.setQueryData('sent', (prev: any) => {
        return [...prev, data];
      });
      queryClient.refetchQueries(['users', 'friends', 'sent']);
    },
  });

  const deleteMutation = useMutation('removeReq', handleRemove, {
    onSuccess: (data) => {
      queryClient.setQueryData('friends', (prev: any) => {
        return prev.filter((x: any) => {
          return x.id !== data.userId;
        });
      });
      queryClient.refetchQueries(['users', 'friends', 'sent']);
    },
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Users
      </Typography>
      {users.length === 0 && (
        <Typography sx={{ mt: 2, mb: 2 }}>No Users Found</Typography>
      )}
      {users.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sx: '1fr', lg: '1fr 1fr' },
            mb: 5,
          }}
        >
          {users.map((user: any) => {
            const sameUser = user.id === state.user.id;
            const isFriends = friends.find((x: any) => x.id === user.id);
            const isReqSent = sent.find((x: any) => x.receiver === user.id);
            const isReqReceived = requests.find(
              (x: any) => x.sender === user.id
            );
            if (isReqReceived || sameUser) {
              return null;
            }
            return (
              <ListItem key={user.id} sx={{ mb: 2 }}>
                <ListItemAvatar
                  onClick={() => {
                    history.push(`profile/${user.id}`);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <Avatar
                    src={user.profilePicture}
                    sx={{
                      width: { xs: '60px', sm: '75px' },
                      height: { xs: '60px', sm: '75px' },
                      mr: 4,
                    }}
                  />
                </ListItemAvatar>
                <Box sx={{ width: '100%' }}>
                  <ListItemText
                    sx={{ fontWeight: 'bold' }}
                  >{`${user.firstName} ${user.lastName}`}</ListItemText>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      gap: '15px',
                    }}
                  >
                    {(!addMutation.isLoading || !deleteMutation.isLoading) && (
                      <>
                        {!isFriends && !isReqSent && (
                          <Button
                            variant="contained"
                            sx={{
                              flex: 1,
                              textTransform: 'initial',
                            }}
                            onClick={() => {
                              addMutation.mutate(user.id);
                            }}
                          >
                            Add
                          </Button>
                        )}
                        {isFriends && !isReqSent && (
                          <Button
                            variant="contained"
                            sx={{
                              flexGrow: 1,
                              textTransform: 'initial',
                            }}
                            color="error"
                            onClick={() => {
                              deleteMutation.mutate(user.id);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                        {!isFriends && isReqSent && (
                          <Button
                            variant="contained"
                            sx={{
                              flexGrow: 1,
                              textTransform: 'initial',
                            }}
                            color="success"
                          >
                            Sent
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          sx={{
                            color: 'text.secondary',
                            flex: 1,
                            borderColor: 'text.secondary',
                            textTransform: 'initial',
                          }}
                          onClick={() => {
                            history.push(`profile/${user.id}`);
                          }}
                        >
                          Profile
                        </Button>
                      </>
                    )}
                    {(addMutation.isLoading || deleteMutation.isLoading) && (
                      <CircularProgress />
                    )}
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default UsersList;
