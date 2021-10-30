import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { useTrackedStore } from '../../store/store';
import PostCardActions from '../PostCardActions/PostCardActions';
import PostDeleteDialog from '../PostDeleteDialog/PostDeleteDialog';
import PostUpdateDialog from '../PostUpdateDialog/PostUpdateDialog';

dayjs.extend(relativeTime);

const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: 0,
      mr: 0,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const PostCard = (props: any) => {
  const post = props.post;
  const state = useTrackedStore();
  let sameUser;
  if (state.user) {
    sameUser = state.user.id === post.author.id;
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          sameUser &&
          props.edit && (
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'post-setting-button',
                }}
                PaperProps={paperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => {
                    setOpenUpdateDialog(true);
                    handleClose();
                  }}
                  sx={{ ':hover': { color: 'success.main' } }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenDeleteDialog(true);
                    handleClose();
                  }}
                  sx={{ ':hover': { color: 'error.main' } }}
                >
                  Delete
                </MenuItem>
              </Menu>
              <PostUpdateDialog
                open={openUpdateDialog}
                setOpen={setOpenUpdateDialog}
                post={post}
              />
              <PostDeleteDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                id={post.id}
              />
            </>
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
