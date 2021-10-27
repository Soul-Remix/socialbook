import { Alert, Button } from '@mui/material';
import { Box } from '@mui/system';

function isErrorType(error: unknown): error is Error {
  return error instanceof Error;
}

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
