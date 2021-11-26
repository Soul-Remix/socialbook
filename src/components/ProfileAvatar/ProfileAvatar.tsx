import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { useTrackedStore } from '../../store/store';
import ProfilePictureDialog from '../ProfilePictureDialog/ProfilePictureDialog';

interface Props {
  id: number;
  userName: string;
  profilePicture: string;
  bio: string | null;
}

const ProfileAvatar = ({ id, userName, profilePicture, bio }: Props) => {
  const state = useTrackedStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      {state.user.id === id && (
        <>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Button
                sx={{ color: 'text.secondary' }}
                onClick={() => setOpen(true)}
              >
                <PhotoCamera />
              </Button>
            }
          >
            <Avatar
              src={state.user.profilePicture}
              sx={{
                width: { xs: '150px', sm: '200px', md: '225px' },
                height: { xs: '150px', sm: '200px', md: '225px' },
                mb: 3,
              }}
            />
          </Badge>
          <ProfilePictureDialog open={open} setOpen={setOpen} />
        </>
      )}
      {state.user.id !== id && (
        <Avatar
          src={profilePicture}
          sx={{
            width: { xs: '150px', sm: '200px', md: '225px' },
            height: { xs: '150px', sm: '200px', md: '225px' },
            mb: 3,
          }}
        />
      )}
      <Typography variant="h4">{userName}</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        {bio ? bio : null}
      </Typography>
      <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
    </>
  );
};

export default ProfileAvatar;
