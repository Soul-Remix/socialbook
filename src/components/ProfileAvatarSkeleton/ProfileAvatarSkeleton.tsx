import { Divider, Skeleton } from '@mui/material';

const ProfileAvatarSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="circular"
        sx={{
          width: { xs: '150px', sm: '200px', md: '225px' },
          height: { xs: '150px', sm: '200px', md: '225px' },
          mb: 3,
        }}
      />
      <Skeleton variant="text" width={100} height={40} />
      <Skeleton variant="text" width={200} height={30} />
      <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
    </>
  );
};

export default ProfileAvatarSkeleton;
