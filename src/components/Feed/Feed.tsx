import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import { useTrackedStore } from '../../store/store';
import PostCard from '../PostCard/PostCard';

const Feed = () => {
  const state = useTrackedStore();
  const { data, error, isLoading } = useQuery('feed', async () => {
    const token = await state.token;
    const res = await fetch('http://localhost:8000/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await res.json();
    return posts;
  });

  return (
    <Container sx={{ padding: 4, mr: { sm: 6, md: 8 }, ml: { sm: 6, md: 8 } }}>
      {data &&
        data.posts.map((x: any) => {
          return <PostCard post={x} key={x.id} />;
        })}
      {error && <p>Error</p>}
      {isLoading && <p>Loading</p>}
    </Container>
  );
};

export default Feed;
