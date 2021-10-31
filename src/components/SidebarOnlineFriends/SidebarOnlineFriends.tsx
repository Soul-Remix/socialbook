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
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { URL } from '../../config/url';
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

const SidebarOnlineFriends = () => {
  const history = useHistory();
  const state = useTrackedStore();

  const fetchOnlineFriends = async () => {
    const res = await fetch(`${URL}friends/${state.user.id}/online`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
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

  const { data, isLoading, isError, error } = useQuery(
    'friendsOnline',
    fetchOnlineFriends
  );

  return (
    <>
      <List>
        <ListItem>
          <Typography sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
            Online Friends
          </Typography>
        </ListItem>
        {isError && <ErrorMessage message={error} />}
        {data && data.length === 0 && (
          <ListItem>
            <Typography>0 Online Friends</Typography>
          </ListItem>
        )}
        {data && data.length > 0 && (
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
                  {data.map((x: any) => {
                    return (
                      <Avatar
                        alt={`${x.firstName} ${x.lastName}`}
                        src={x.profilePicture}
                      />
                    );
                  })}
                </StyledBadge>
              </AvatarGroup>
            </ListItemIcon>
          </ListItem>
        )}
        {isLoading && <AvatarSkeleton />}
      </List>
      <Divider />
    </>
  );
};

export default SidebarOnlineFriends;
