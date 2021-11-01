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
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useTrackedStore } from '../../store/store';
import RequestsAction from '../RequestsActions/RequestsAction';

const UsersList = (props: any) => {
  const { users, friends, sent } = props;
  const { requests } = props.requests;
  const history = useHistory();
  const state = useTrackedStore();
  const [loading, setLoading] = useState(false);

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
            if (sameUser) {
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
                    {!loading && (
                      <>
                        <RequestsAction
                          isFriends={isFriends}
                          isReqSent={isReqSent}
                          isReqReceived={isReqReceived}
                          id={user.id}
                          setLoading={setLoading}
                        />
                        {!isReqReceived && (
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
                        )}
                      </>
                    )}
                    {loading && <CircularProgress />}
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
