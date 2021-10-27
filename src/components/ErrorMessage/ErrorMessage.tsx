import { Alert } from '@mui/material';
import { Box } from '@mui/system';

const ErrorMessage = ({ message }: any) => {
  if (Array.isArray(message)) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {message.map((x) => {
          return <Alert severity="error">{x.message}</Alert>;
        })}
      </Box>
    );
  }
  return <Alert severity="error">{message.message}</Alert>;
};

export default ErrorMessage;
