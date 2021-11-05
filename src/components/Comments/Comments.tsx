import { Delete } from '@mui/icons-material';
import {
  Avatar,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Card,
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { queryClient } from '../..';
import { useTrackedStore } from '../../store/store';

dayjs.extend(relativeTime);

const Comments = (props: any) => {
  const { comments, postId } = props;
  const history = useHistory();
  const state = useTrackedStore();

  const handleDelete = async (id: number) => {
    const res = await fetch(`${process.env.REACT_APP_URI}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
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

  const mutation = useMutation('deleteComment', handleDelete, {
    onSuccess: (data) => {
      queryClient.setQueryData(`post${postId}`, (prev: any) => {
        return {
          ...prev,
          comments: prev.comments.filter((x: any) => x.id !== data.id),
        };
      });
    },
  });

  if (comments.length === 0) {
    return (
      <Typography sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
        There's no comments on this post
      </Typography>
    );
  } else {
    return comments.map((comment: any) => {
      const sameUser = state.user.id === comment.User.id;
      return (
        <Card sx={{ mb: 2, p: 1 }} key={comment.id}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: 0.5 }}
          >
            <Avatar
              src={comment.User.profilePicture}
              alt={comment.User.firstName}
            />
            <Button
              sx={{ textTransform: 'initial' }}
              color="inherit"
              onClick={() => {
                history.push(`/profile/${comment.User.id}`);
              }}
            >
              {comment.User.firstName} {comment.User.lastName}
            </Button>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              {dayjs(comment.createdAt).fromNow()}
            </Typography>
            {sameUser && (
              <Button
                color="error"
                variant="outlined"
                sx={{ ml: 'auto' }}
                onClick={() => {
                  mutation.mutate(comment.id);
                }}
                disabled={mutation.isLoading}
              >
                {!mutation.isLoading && <Delete />}
                {mutation.isLoading && <CircularProgress />}
              </Button>
            )}
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>{comment.content}</Box>
        </Card>
      );
    });
  }
};

export default Comments;
