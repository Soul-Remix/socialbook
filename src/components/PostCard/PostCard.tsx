import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useTrackedStore } from '../../store/store';
import PostCardActions from '../PostCardActions/PostCardActions';

dayjs.extend(relativeTime);

const PostCard = (props: any) => {
  const post = props.post;
  const state = useTrackedStore();
  let sameUser;
  if (state.user) {
    sameUser = state.user.id === post.author.id;
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
      <PostCardActions
        id={post.id}
        likes={post.Likes}
        comments={post.comments}
      />
    </Card>
  );
};

export default PostCard;
