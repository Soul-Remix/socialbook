import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AvatarSkeleton from '../skeletons/AvatarSkeleton/AvatarSkeleton';

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

const SidebarFriends = () => {
  const state = useTrackedStore();
  const history = useHistory();

  const fetchFriends = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_URI}/friends/${state.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
      return;
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data, isLoading, isError, error } = useQuery('friends', fetchFriends);

  return (
    <>
      <List>
        <ListItem>
          <Typography sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
            Friends
          </Typography>
        </ListItem>
        {isError && (
          <ListItem>
            <ErrorMessage message={error} />
          </ListItem>
        )}
        {data && data.length === 0 && (
          <ListItem>
            <Typography>You have no Friends</Typography>
          </ListItem>
        )}
        {data &&
          data.length > 0 &&
          data.map((f: any) => {
            return (
              <ListItem
                button
                key={f.id}
                onClick={() => history.push(`/profile/${f.id}`)}
              >
                <ListItemIcon>
                  {f.isOnline ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar alt={f.firstName} src={f.profilePicture} />
                    </StyledBadge>
                  ) : (
                    <Avatar alt={f.firstName} src={f.profilePicture} />
                  )}
                </ListItemIcon>
                <ListItemText>{`${f.firstName} ${f.lastName}`}</ListItemText>
              </ListItem>
            );
          })}
        {isLoading && <AvatarSkeleton />}
      </List>
    </>
  );
};

export default SidebarFriends;
