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

const RequestsList = (props: any) => {
  const { requests, users } = props.data;
  const history = useHistory();
  const state = useTrackedStore();

  const handleRequest = async (obj: any) => {
    const res = await fetch(`${URL}friends/${obj.id}`, {
      method: obj.method,
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
  const mutation = useMutation('handleReq', handleRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData('requests', (prev: any) => {
        return {
          users: prev.users,
          requests: prev.requests.filter((x: any) => x.id !== data.id),
        };
      });
    },
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Received Friend Requests
      </Typography>
      {requests.length === 0 && (
        <Typography sx={{ mt: 2, mb: 2 }}>
          No friends Requests Received
        </Typography>
      )}
      {requests.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sx: '1fr', lg: '1fr 1fr' },
          }}
        >
          {requests.map((req: any) => {
            const user = users.find((user: any) => user.id === req.sender);
            return (
              <ListItem key={req.id}>
                <ListItemAvatar
                  onClick={() => {
                    history.push(`profile/${user.id}`);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <Avatar
                    src={user.profilePicture}
                    sx={{ width: '75px', height: '75px', mr: 4 }}
                  />
                </ListItemAvatar>
                <Box sx={{ width: '100%' }}>
                  <ListItemText
                    sx={{ fontWeight: 'bold' }}
                  >{`${user.firstName} ${user.lastName}`}</ListItemText>
                  <Box sx={{ display: 'flex', width: '100%', gap: '15px' }}>
                    {!mutation.isLoading && (
                      <>
                        <Button
                          variant="contained"
                          sx={{ flexGrow: 1, textTransform: 'initial' }}
                          onClick={() => {
                            mutation.mutate({ id: req.id, method: 'PATCH' });
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            color: 'text.secondary',
                            flexGrow: 1,
                            borderColor: 'text.secondary',
                            textTransform: 'initial',
                          }}
                          onClick={() => {
                            mutation.mutate({ id: req.id, method: 'DELETE' });
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    {mutation.isLoading && <CircularProgress />}
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

export default RequestsList;
