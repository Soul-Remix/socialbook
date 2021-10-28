import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ProfileAvatar from '../../components/ProfileAvatar/ProfileAvatar';
import ProfileFriendsCard from '../../components/ProfileFriendsCard/ProfileFriendsCard';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
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
      {friendsQuery.data && <ProfileFriendsCard friends={friendsQuery.data} />}
      {friendsQuery.isError && <ErrorMessage message={friendsQuery.error} />}
    </Container>
  );
};

export default ProfilePage;

const FakeProfile = {
  country: 'USA',
  city: null,
  birthDate: null,
  livesIn: 'USA',
  gender: 'Male',
};

const FakeUser = {
  id: 12,
  image: '/image',
  firstName: 'John',
  lastName: 'Smith',
  bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velrepudiandae quas culpa in nesciunt',
};
