import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Comments from '../../components/Comments/Comments';
import CommentsForm from '../../components/CommentsForm/CommentsForm';
import PostCard from '../../components/PostCard/PostCard';
import { useTrackedStore } from '../../store/store';
import fetchPost from '../../utils/fetchPost';

const PostPage = () => {
  const { id }: { id: string } = useParams();
  const state = useTrackedStore();

  const { data, isLoading, error, isError } = useQuery(`post${id}`, () =>
    fetchPost(state.token, id, state.logOut)
  );

  return (
    <Container
      sx={{
        padding: { xs: 0, md: 4 },
        mr: { sm: 6, md: 8 },
        ml: { sm: 6, md: 8 },
        mt: 2,
        position: 'relative',
      }}
    >
      {data && (
        <>
          <PostCard post={data} />
          <Comments comments={data.comments} postId={id} />
          <CommentsForm id={data.id} />
        </>
      )}
    </Container>
  );
};

export default PostPage;
