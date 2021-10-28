import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router';

const ProfileFriendsCard = (props: any) => {
  const { friends } = props;
  const history = useHistory();
  return (
    <Card sx={{ width: '100%', maxWidth: '700px', mb: 10 }} raised>
      <CardHeader
        title="Friends"
        subheader={friends.length}
        sx={{ pt: 1, pb: 1 }}
      />
      <Divider />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {friends.length > 0 &&
          friends.slice(0, 8).map((x: any) => {
            return (
              <Button
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textTransform: 'initial',
                  mb: 0.4,
                }}
                onClick={() => history.push(`/profile/${x.id}`)}
                key={x.id}
              >
                <Avatar
                  src={x.profilePicture}
                  sx={{
                    width: '100%',
                    height: '80%',
                    borderRadius: 1,
                    maxWidth: '100px',
                    maxHeight: '100px',
                  }}
                />
                <Typography>{`${x.firstName} ${x.lastName}`}</Typography>
              </Button>
            );
          })}
        {friends.length === 0 && (
          <Typography>This user has no friends</Typography>
        )}
      </CardContent>
      <Divider />
      {friends.length > 6 && (
        <Button sx={{ width: '100%', mt: 0.8 }} variant="contained">
          View All friends
        </Button>
      )}
    </Card>
  );
};

export default ProfileFriendsCard;
