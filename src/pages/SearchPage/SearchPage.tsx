import {
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Search } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import fetchRequests from '../../utils/fetchRequests';
import fetchFriends from '../../utils/fetchFriends';
import UsersList from '../../components/UsersList/UsersList';

const validationSchema = Yup.object({
  search: Yup.string().required(),
});

const SearchPage = () => {
  const state = useTrackedStore();
  const history = useHistory();
  const query = useLocation();
  let q = new URLSearchParams(query.search).get('q');

  const formik = useFormik({
    initialValues: {
      search: q || '',
    },
    onSubmit: (values) => {
      q = values.search;
      history.push(`/search?q=${q}`);
    },
    validationSchema,
  });

  const handleSearch = async (values: any) => {
    const res = await fetch(`${process.env.REACT_APP_URI}/users/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${state.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(values),
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

  const requestsQuery = useQuery('requests', () =>
    fetchRequests(state.token, state.user.id, state.logOut, 'requests')
  );
  const sentRequestsQuery = useQuery('sent', () =>
    fetchRequests(state.token, state.user.id, state.logOut, 'sent')
  );
  const friendsQuery = useQuery('friends', () =>
    fetchFriends(state.token, state.user.id, state.logOut)
  );

  const mutation = useMutation('search', handleSearch, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    if (q) {
      mutation.mutate({ search: q });
    }
  }, [q]);

  return (
    <Container sx={{ pt: 2 }}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="search-textfield"
          label="Search"
          name="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={formik.values.search}
          onChange={formik.handleChange}
        />
      </Box>

      {mutation.isError && <ErrorMessage message={mutation.error} />}
      {mutation.isLoading &&
        friendsQuery.isLoading &&
        requestsQuery.isLoading &&
        sentRequestsQuery.isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      {mutation.data &&
        friendsQuery.data &&
        requestsQuery.data &&
        sentRequestsQuery.data && (
          <Box sx={{ mt: 4 }}>
            {mutation.data.length === 0 && (
              <Typography sx={{ textAlign: 'center' }} variant="h4">
                No users found
              </Typography>
            )}
            {mutation.data.length > 0 && (
              <UsersList
                users={mutation.data}
                friends={friendsQuery.data}
                requests={requestsQuery.data}
                sent={sentRequestsQuery.data}
              />
            )}
          </Box>
        )}
    </Container>
  );
};

export default SearchPage;
