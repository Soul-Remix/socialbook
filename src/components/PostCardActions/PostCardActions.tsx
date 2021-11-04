import {
  FavoriteBorder,
  ModeCommentOutlined,
  Favorite,
} from '@mui/icons-material';
import {
  Alert,
  CardActions,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface Prop {
  id: number;
  likes: number[];
  comments: any;
}

const PostCardActions = ({ id, likes, comments }: Prop) => {
  const history = useHistory();
  const state = useTrackedStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likesArr, setLikesArr] = useState(likes);

  useEffect(() => {
    setAlreadyLiked(likes.includes(state.user.id));
  }, []);

  const handleLike = async (method: string) => {
    const res = await fetch(`${process.env.REACT_APP_URI}/posts/${id}/likes`, {
      method: method,
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    const data = await res.json();
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    if (method === 'POST') {
      setLikesArr((old) => old.concat(state.user.id));
      setAlreadyLiked(true);
    }
    if (method === 'DELETE') {
      setLikesArr((old) => likesArr.filter((x) => x !== state.user.id));
      setAlreadyLiked(false);
    }
    return data;
  };

  const mutation = useMutation(`like${id}`, handleLike);

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    mutation.reset();
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            width: '50%',
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.8rem',
          }}
        >
          {likesArr.length} Likes
        </Typography>
        <Typography
          sx={{
            width: '50%',
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.8rem',
          }}
        >
          {comments.length} Comments
        </Typography>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {!alreadyLiked ? (
          <IconButton
            sx={{ width: '50%', borderRadius: '0' }}
            onClick={() => mutation.mutate('POST')}
          >
            <FavoriteBorder />
            <Typography sx={{ ml: 1 }}>Like</Typography>
          </IconButton>
        ) : (
          alreadyLiked && (
            <IconButton
              sx={{ width: '50%', borderRadius: '0' }}
              onClick={() => mutation.mutate('DELETE')}
            >
              <Favorite sx={{ color: 'primary.main' }} />
              <Typography sx={{ ml: 1, color: 'primary.main' }}>
                Like
              </Typography>
            </IconButton>
          )
        )}
        <IconButton
          sx={{ width: '50%', borderRadius: '0' }}
          onClick={() => history.push(`/post/${id}`)}
        >
          <ModeCommentOutlined />
          <Typography sx={{ ml: 1 }}>Comment</Typography>
        </IconButton>
      </CardActions>
      <Snackbar
        open={mutation.isError}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="error">
          Failed to like the post, Please try again
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostCardActions;
