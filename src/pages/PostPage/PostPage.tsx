import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import Comments from '../../components/Comments/Comments';
import CommentsForm from '../../components/CommentsForm/CommentsForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostCard from '../../components/PostCard/PostCard';
import { useTrackedStore } from '../../store/store';
import fetchPost from '../../utils/fetchPost';

const PostPage = () => {
  const { id }: { id: string } = useParams();
  const state = useTrackedStore();
  const history = useHistory();

  const { data, isLoading, error, isError } = useQuery(`post${id}`, () =>
    fetchPost(state.token, id, state.logOut, history)
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
      {isError && <ErrorMessage message={error} />}
      {data && (
        <>
          <PostCard post={data} />
          <Comments comments={data.comments} postId={id} />
          <CommentsForm id={data.id} />
        </>
      )}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default PostPage;
