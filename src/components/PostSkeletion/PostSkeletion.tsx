import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const PostSkeletion = () => {
  return arr.map((x: number) => {
    return (
      <Box sx={{ mb: 4 }} key={x}>
        <Box sx={{ display: 'flex', gap: '15px', mb: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" sx={{ flexGrow: 1 }} />
        </Box>
        <Skeleton variant="rectangular" height={120} />
      </Box>
    );
  });
};

export default PostSkeletion;

const arr = [1, 2, 3];
