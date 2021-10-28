import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router';

const ProfileFriendsCard = (props: any) => {
  const { friends } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ width: '100%', maxWidth: '700px', mb: 5 }} raised>
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
                  height: '150px',
                }}
                onClick={() => history.push(`/profile/${x.id}`)}
                key={x.id}
              >
                <Avatar
                  src={x.profilePicture}
                  sx={{
                    width: '100%',
                    height: '60%',
                    borderRadius: 1,
                    maxWidth: '100px',
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
        <>
          <Button
            sx={{ width: '100%', mt: 0.8 }}
            variant="contained"
            onClick={handleOpen}
          >
            View All friends
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="friends list"
            aria-describedby="a list of all use friends"
          >
            <List
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: 250,
                width: '90%',
                maxWidth: 500,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              {friends.map((f: any) => {
                return (
                  <ListItem
                    button
                    key={f.id + 'a'}
                    onClick={() => history.push(`/profile/${f.id}`)}
                    sx={{ mb: 1 }}
                  >
                    <ListItemIcon>
                      <Avatar alt={f.firstName} src={f.profilePicture} />
                    </ListItemIcon>
                    <ListItemText>{`${f.firstName} ${f.lastName}`}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Modal>
        </>
      )}
    </Card>
  );
};

export default ProfileFriendsCard;
