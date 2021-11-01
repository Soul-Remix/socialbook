import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Conversation from '../../components/Conversation/Conversation';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useTrackedStore } from '../../store/store';
import fetchConversations from '../../utils/fetchConversations';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px white`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ChatPage = () => {
  const state = useTrackedStore();
  const [startConvo, setStartConvo] = useState(false);
  const [convoId, setConvoId] = useState(null);
  const [user, setUser] = useState(null);

  const { data, isLoading, error, isError } = useQuery('chat', () =>
    fetchConversations(state.token, state.user.id, state.logOut)
  );

  return (
    <Container sx={{ p: { xs: 0, md: 0 }, pt: 1 }}>
      {isError && <ErrorMessage message={error} />}
      {isLoading && (
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {data && !startConvo && (
        <>
          <Typography variant="h4">Chat</Typography>
          <Box>
            {data.map((x: any) => {
              const user = x.members.find((y: any) => y.id !== state.user.id);
              return (
                <>
                  <Button
                    key={user.id}
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '20px',
                      mt: 2,
                      p: 1,
                      textTransform: 'initial',
                    }}
                    onClick={() => {
                      setUser(user.id);
                      setConvoId(x.id);
                      setStartConvo(true);
                    }}
                  >
                    {user.isOnline && (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          src={user.profilePicture}
                          sx={{ width: '60px', height: '60px' }}
                        />
                      </StyledBadge>
                    )}
                    {!user.isOnline && (
                      <Avatar
                        alt={`${user.firstName} ${user.lastName}`}
                        src={user.profilePicture}
                        sx={{ width: '60px', height: '60px' }}
                      />
                    )}
                    <Box>
                      <Typography sx={{ textAlign: 'left' }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </Box>
                  </Button>
                </>
              );
            })}
          </Box>
        </>
      )}
      {startConvo && convoId && (
        <Conversation
          convoId={convoId}
          userId={user}
          setStartConvo={setStartConvo}
          setConvoId={setConvoId}
        />
      )}
    </Container>
  );
};

export default ChatPage;
