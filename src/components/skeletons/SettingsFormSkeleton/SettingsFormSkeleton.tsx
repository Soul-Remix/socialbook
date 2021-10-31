import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const SettingsFormSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        '& .MuiSkeleton-root': {
          m: 0.5,
        },
      }}
    >
      <Skeleton
        variant="text"
        width={'70%'}
        height={80}
        sx={{ alignSelf: 'baseline' }}
      />
      <Skeleton variant="text" width={'100%'} height={70} />
      <Skeleton variant="text" width={'100%'} height={70} />
      <Skeleton variant="text" width={'100%'} height={70} />
      <Skeleton variant="text" width={'100%'} height={70} />
      <Skeleton variant="text" width={'50%'} height={50} />
    </Box>
  );
};

export default SettingsFormSkeleton;
