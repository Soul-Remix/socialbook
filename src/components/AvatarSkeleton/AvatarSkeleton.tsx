import { ListItem, ListItemIcon, Skeleton } from '@mui/material';

const arr = [1, 2, 3, 4];

const AvatarSkeleton = () => {
  return (
    <>
      {arr.map((x: number) => {
        return (
          <ListItem key={x}>
            <ListItemIcon>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemIcon>
            <Skeleton variant="text" sx={{ flexGrow: 1 }} />
          </ListItem>
        );
      })}
    </>
  );
};

export default AvatarSkeleton;
