import { Divider, Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const ProfileInfoSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { sm: '1fr 1fr' },
        }}
      >
        <Box>
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width={150} height={30} />
        </Box>
        <Box>
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width={150} height={30} />
        </Box>
      </Box>
      <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
    </>
  );
};

export default ProfileInfoSkeleton;
