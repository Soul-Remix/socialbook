import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import RequestsList from '../../components/RequestsList/RequestsList';
import UsersList from '../../components/UsersList/UsersList';
import { useTrackedStore } from '../../store/store';
import fetchFriends from '../../utils/fetchFriends';
import fetchRequests from '../../utils/fetchRequests';
import fetchUsers from '../../utils/fetchUsers';

const RequestsPage = () => {
  const state = useTrackedStore();

  const requestsQuery = useQuery('requests', () =>
    fetchRequests(state.user.id, state.token, state.logOut, 'requests')
  );
  const sentRequestsQuery = useQuery('sent', () =>
    fetchRequests(state.user.id, state.token, state.logOut, 'sent')
  );
  const usersQuery = useQuery('users', () =>
    fetchUsers(state.token, state.logOut)
  );
  const friendsQuery = useQuery('friends', () =>
    fetchFriends(state.token, state.user.id, state.logOut)
  );

  return (
    <Container
      sx={{
        padding: 2,
        mr: { sm: 6, md: 8 },
        ml: { sm: 6, md: 8 },
        position: 'relative',
      }}
    >
      {requestsQuery.data && <RequestsList data={requestsQuery.data} />}
      {usersQuery.data &&
        friendsQuery.data &&
        requestsQuery.data &&
        sentRequestsQuery && (
          <UsersList
            users={usersQuery.data.users}
            friends={friendsQuery.data}
            requests={requestsQuery.data}
            sent={sentRequestsQuery.data}
          />
        )}
    </Container>
  );
};

export default RequestsPage;
