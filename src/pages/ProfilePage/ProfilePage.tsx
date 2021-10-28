import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostCard from '../../components/PostCard/PostCard';
import PostSkeleton from '../../components/PostSkeleton/PostSkeleton';
import ProfileAvatar from '../../components/ProfileAvatar/ProfileAvatar';
import ProfileAvatarSkeleton from '../../components/ProfileAvatarSkeleton/ProfileAvatarSkeleton';
import ProfileFriendsCard from '../../components/ProfileFriendsCard/ProfileFriendsCard';
import ProfileFriendsCardSkeleton from '../../components/ProfileFriendsCardSkeleton/ProfileFriendsCardSkeleton';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import ProfileInfoSkeleton from '../../components/ProfileInfoSkeleton/ProfileInfoSkeleton';
import { URL } from '../../config/url';
import { useTrackedStore } from '../../store/store';
import fetchFriends from '../../utils/fetchFriends';
import fetchUser from '../../utils/fetchUser';

const ProfilePage = () => {
  const { id }: any = useParams();
  const state = useTrackedStore();

  const userQuery = useQuery(`user${id}`, () =>
    fetchUser(state.token, id, state.logOut)
  );
  const friendsQuery = useQuery(`friends${id}`, () =>
    fetchFriends(state.token, id, state.logOut)
  );
  const PostsQuery = useQuery(`${id}`, async () => {
    const res = await fetch(`${URL}posts/personal/${id}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  });

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        overflow: 'auto',
      }}
    >
      {userQuery.isLoading && (
        <>
          <ProfileAvatarSkeleton />
          <ProfileInfoSkeleton />
        </>
      )}
      {userQuery.data && (
        <>
          <ProfileAvatar
            id={userQuery.data.id}
            userName={`${userQuery.data.firstName} ${userQuery.data.lastName}`}
            image={userQuery.data.image}
            bio={userQuery.data.extendedProfile.bio}
          />
          <ProfileInfo profile={userQuery.data.extendedProfile} />
        </>
      )}
      {userQuery.isError && <ErrorMessage message={userQuery.error} />}

      {friendsQuery.isLoading && <ProfileFriendsCardSkeleton />}
      {friendsQuery.data && <ProfileFriendsCard friends={friendsQuery.data} />}
      {friendsQuery.isError && <ErrorMessage message={friendsQuery.error} />}

      {PostsQuery.isLoading && (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          <PostSkeleton />
        </Box>
      )}
      {PostsQuery.data && PostsQuery.data.length === 0 && (
        <Typography sx={{ mb: 10 }}>This User has no posts</Typography>
      )}
      {PostsQuery.data && PostsQuery.data.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          {PostsQuery.data.map((x: any) => {
            return <PostCard post={x} key={x.id} />;
          })}
        </Box>
      )}
      {PostsQuery.isError && <ErrorMessage message={PostsQuery.error} />}
    </Container>
  );
};

export default ProfilePage;
