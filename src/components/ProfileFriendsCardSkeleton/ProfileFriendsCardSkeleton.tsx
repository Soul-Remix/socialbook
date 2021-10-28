import { Divider, Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const ProfileFriendsCardSkeleton = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '700px', mb: 5 }}>
      <Skeleton variant="text" width={'100%'} height={60} />
      <Divider />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <Skeleton
          variant="text"
          width={'90%'}
          height={150}
          sx={{ maxWidth: '100px', margin: 'auto' }}
        />
        <Skeleton
          variant="text"
          width={'90%'}
          height={150}
          sx={{ maxWidth: '100px', margin: 'auto' }}
        />
        <Skeleton
          variant="text"
          width={'90%'}
          height={150}
          sx={{ maxWidth: '100px', margin: 'auto' }}
        />
        <Skeleton
          variant="text"
          width={'90%'}
          height={150}
          sx={{ maxWidth: '100px', margin: 'auto' }}
        />
        <Skeleton
          variant="text"
          width={'90%'}
          height={150}
          sx={{ maxWidth: '100px', margin: 'auto' }}
        />
        <Skeleton
          variant="text"
          width={'90%'}
          height={150}
          sx={{ maxWidth: '100px', margin: 'auto' }}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default ProfileFriendsCardSkeleton;
