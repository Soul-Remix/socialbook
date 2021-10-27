import {
  FavoriteBorder,
  MoreVert,
  ModeCommentOutlined,
  Favorite,
} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router';

import { useTrackedStore } from '../../store/store';

dayjs.extend(relativeTime);

const PostCard = (props: any) => {
  const post = props.post;
  const state = useTrackedStore();
  const history = useHistory();
  let sameUser;
  let alreadyLiked;
  if (state.user) {
    sameUser = state.user.id === post.author.id;
    alreadyLiked = post.Likes.includes(state.user.id);
  }
  return (
    <Card
      sx={{
        mb: 4,
        '& .MuiCardHeader-title': { fontWeight: '700' },
      }}
      raised={true}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={post.author.firstName}
            src={post.author.profilePicture}
          />
        }
        action={
          sameUser && (
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          )
        }
        title={`${post.author.firstName} ${post.author.lastName}`}
        subheader={dayjs(post.createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="body2">{post.content}</Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt={post.content}
          sx={{ objectFit: 'contain', maxHeight: '600px', mb: 1 }}
        />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            width: '50%',
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.8rem',
          }}
        >
          {post.Likes.length} Likes
        </Typography>
        <Typography
          sx={{
            width: '50%',
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.8rem',
          }}
        >
          {post.comments.length} Comments
        </Typography>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {!alreadyLiked ? (
          <IconButton sx={{ width: '50%', borderRadius: '0' }}>
            <FavoriteBorder />
            <Typography sx={{ ml: 1 }}>Like</Typography>
          </IconButton>
        ) : (
          <IconButton sx={{ width: '50%', borderRadius: '0' }}>
            <Favorite sx={{ color: 'primary.main' }} />
            <Typography sx={{ ml: 1, color: 'primary.main' }}>
              UnLike
            </Typography>
          </IconButton>
        )}
        <IconButton
          sx={{ width: '50%', borderRadius: '0' }}
          onClick={() => history.push(`/post/${post.id}`)}
        >
          <ModeCommentOutlined />
          <Typography sx={{ ml: 1 }}>Comment</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
