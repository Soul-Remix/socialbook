import {
  Avatar,
  AvatarGroup,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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

const SidebarOnlineFriends = () => {
  const history = useHistory();

  return (
    <>
      <List>
        <ListItem>
          <Typography sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
            Online Friends
          </Typography>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/chat');
          }}
        >
          <ListItemIcon>
            <AvatarGroup max={4}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </StyledBadge>
            </AvatarGroup>
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
    </>
  );
};

export default SidebarOnlineFriends;
