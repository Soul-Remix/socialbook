import { Container } from '@mui/material';
import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import useIntersectionObserver from '../../hooks/useInterSectionObserver';
import { useTrackedStore } from '../../store/store';
import PostCard from '../PostCard/PostCard';
import PostSkeletion from '../PostSkeletion/PostSkeletion';

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

  function isErrorType(error: unknown): error is Error {
    return error instanceof Error;
  }

  return (
    <Container sx={{ padding: 4, mr: { sm: 6, md: 8 }, ml: { sm: 6, md: 8 } }}>
      {data &&
        data.pages.map((page) => {
          return page.posts.map((x: any) => {
            return <PostCard post={x} key={x.id} />;
          });
        })}
      {isError && isErrorType(error) && <p>{error.message}</p>}
      {isLoading && <PostSkeletion />}
      <div ref={loadMoreRef}>{isFetchingNextPage ? 'Loading more...' : ''}</div>
    </Container>
  );
};

export default Feed;
