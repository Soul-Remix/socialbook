import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, Button, Divider, Typography } from '@mui/material';
import { useTrackedStore } from '../../store/store';

interface Props {
  id: number;
  userName: string;
  image: string;
  bio: string | null;
}

const ProfileAvatar = ({ id, userName, image, bio }: Props) => {
  const state = useTrackedStore();
  return (
    <>
      {state.user.id === id && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Button sx={{ color: 'text.secondary' }}>
              <PhotoCamera />
            </Button>
          }
        >
          <Avatar
            src={image}
            sx={{
              width: { xs: '150px', sm: '200px', md: '225px' },
              height: { xs: '150px', sm: '200px', md: '225px' },
              mb: 3,
            }}
          />
        </Badge>
      )}
      {state.user.id !== id && (
        <Avatar
          src={image}
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
