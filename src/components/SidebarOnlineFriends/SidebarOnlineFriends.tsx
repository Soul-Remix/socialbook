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
import { useTrackedStore } from '../../store/store';
import fetchOnlineFriends from '../../utils/fetchOnlineFriends';

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

  const { data, isLoading, isError, error } = useQuery('friendsOnline', () =>
    fetchOnlineFriends(state.token, state.user.id, state.logOut)
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
                        key={x.id}
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
