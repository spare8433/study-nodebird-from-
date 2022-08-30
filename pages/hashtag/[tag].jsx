import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useInView } from 'react-intersection-observer'

import axios from 'axios';
import { loadHashtagPostRequest } from '../../reducers/post';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import { loadMyInfoRequest } from '../../reducers/user';
import AppLayout from '../../components/AppLayout';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && hasMorePost && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id
      dispatch(loadHashtagPostRequest({ lastId, data: tag }))
    }
  }, [inView, hasMorePost, loadPostsLoading, mainPosts])

  return (
    <AppLayout>
      <div ref={hasMorePost && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadHashtagPostRequest(context.params.tag));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default Hashtag;
