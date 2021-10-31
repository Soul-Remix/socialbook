import {
  Avatar,
  Button,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import RequestsList from '../../components/RequestsList/RequestsList';
import { useTrackedStore } from '../../store/store';
import fetchRequests from '../../utils/fetchRequests';
import fetchUsers from '../../utils/fetchUsers';

const RequestsPage = () => {
  const state = useTrackedStore();

  const requestsQuery = useQuery('requests', () =>
    fetchRequests(state.user.id, state.token, state.logOut)
  );
  const usersQuery = useQuery('users', () =>
    fetchUsers(state.token, state.logOut)
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
    </Container>
  );
};

export default RequestsPage;
