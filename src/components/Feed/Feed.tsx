import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import useIntersectionObserver from '../../hooks/useInterSectionObserver';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PostCard from '../PostCard/PostCard';
import PostSkeleton from '../PostSkeleton/PostSkeleton';

const Feed = () => {
  const state = useTrackedStore();

  const fetchPosts = async ({ pageParam }: any) => {
    const token = await state.token;
    let res: any;
    if (!pageParam) {
      res = await fetch(`http://localhost:8000/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (pageParam) {
      res = await fetch(`http://localhost:8000/posts?cursor=${pageParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    const data = await res.json();
    if (res.status === 401) {
      return;
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  };

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('feed', fetchPosts, {
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : false,
  });

  const loadMoreRef: any = useRef();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <Container sx={{ padding: 4, mr: { sm: 6, md: 8 }, ml: { sm: 6, md: 8 } }}>
      {data &&
        data.pages.map((page) => {
          return page.posts.map((x: any) => {
            return <PostCard post={x} key={x.id} />;
          });
        })}
      {isError && <ErrorMessage message={error} />}
      {isLoading && <PostSkeleton />}
      <Box ref={loadMoreRef} sx={{ textAlign: 'center' }}>
        {isFetchingNextPage ? 'Loading more...' : ''}
      </Box>
    </Container>
  );
};

export default Feed;
