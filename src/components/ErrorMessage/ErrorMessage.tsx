import { Alert } from '@mui/material';
import { Box } from '@mui/system';

const ErrorMessage = ({ message }: any) => {
  if (Array.isArray(message.message)) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {message.message.map((x: string, i: number) => {
          return (
            <Alert severity="error" sx={{ mb: 2 }} key={i}>
              {x}
            </Alert>
          );
        })}
      </Box>
    );
  }
  return (
    <Alert severity="error" sx={{ mb: 4 }}>
      {message.message}
    </Alert>
  );
};

export default ErrorMessage;
