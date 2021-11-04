import { Box } from '@mui/system';
import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import useIntersectionObserver from '../../hooks/useInterSectionObserver';
import { useTrackedStore } from '../../store/store';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PostCard from '../PostCard/PostCard';
import PostSkeleton from '../skeletons/PostSkeleton/PostSkeleton';

const Feed = () => {
  const state = useTrackedStore();

  const fetchPosts = async ({ pageParam }: any) => {
    const token = state.token;
    let res: any;
    if (!pageParam) {
      res = await fetch(`${process.env.REACT_APP_URI}/posts/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (pageParam) {
      res = await fetch(
        `${process.env.REACT_APP_URI}/posts/feed?cursor=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    const data = await res.json();
    if (res.status === 401) {
      state.logOut();
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
    <>
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
    </>
  );
};

export default Feed;
