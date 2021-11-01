import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../..';
import { URL } from '../../config/url';
import { useTrackedStore } from '../../store/store';

const RequestsAction = (props: any) => {
  const { isFriends, isReqSent, id, setLoading, isReqReceived } = props;
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
      queryClient.refetchQueries('friends');
      setLoading(false);
    },
    onError: (data) => {
      setLoading(false);
    },
  });

  const addMutation = useMutation('handleReq', handleAdd, {
    onSuccess: (data) => {
      queryClient.setQueryData('sent', (prev: any) => {
        return [...prev, data];
      });
      queryClient.refetchQueries(['users', 'friends', 'sent']);
      setLoading(false);
    },
    onError: (data) => {
      setLoading(false);
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
      setLoading(false);
    },
    onError: (data) => {
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(
      addMutation.isLoading || deleteMutation.isLoading || mutation.isLoading
    );
  }, [deleteMutation, addMutation, mutation]);

  return (
    <>
      {!isFriends && !isReqSent && !isReqReceived && (
        <Button
          variant="contained"
          sx={{
            textTransform: 'initial',
          }}
          onClick={() => {
            addMutation.mutate(id);
          }}
        >
          Add
        </Button>
      )}
      {isFriends && !isReqSent && !isReqReceived && (
        <Button
          variant="contained"
          sx={{
            textTransform: 'initial',
          }}
          color="error"
          onClick={() => {
            deleteMutation.mutate(id);
          }}
        >
          Remove
        </Button>
      )}
      {!isFriends && isReqSent && !isReqReceived && (
        <Button
          variant="contained"
          sx={{
            textTransform: 'initial',
          }}
          color="success"
        >
          Sent
        </Button>
      )}
      {!isFriends && !isReqSent && isReqReceived && (
        <>
          <Button
            variant="contained"
            sx={{ flexGrow: 1, textTransform: 'initial' }}
            onClick={() => {
              mutation.mutate({ id: id, method: 'PATCH' });
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'text.secondary',
              borderColor: 'text.secondary',
              textTransform: 'initial',
            }}
            onClick={() => {
              mutation.mutate({ id: id, method: 'DELETE' });
            }}
          >
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default RequestsAction;
