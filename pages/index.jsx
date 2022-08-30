import Head from 'next/head'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import { END } from 'redux-saga'
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { loadPostsRequest } from '../reducers/post'
import { loadMyInfoRequest } from '../reducers/user'
import wrapper from '../store/configureStore'

const Home = () => {
  const { myData } = useSelector((state) => state.user)
  const {
    mainPosts,
    hasMorePost,
    retweetError,
    loadPostsLoading,
  } = useSelector((state) => state.post)
  const [ref, inView] = useInView()
  const dispatch = useDispatch()

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  useEffect(() => {
    if (inView && hasMorePost && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id
      dispatch(loadPostsRequest(lastId))
    }
  }, [inView, hasMorePost, loadPostsLoading, mainPosts])
  return (
    <>
      <Head>
        <title>메인 페이지</title>
      </Head>
      <AppLayout>
        {myData && <PostForm />}
        {mainPosts && mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        <div ref={hasMorePost && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
      </AppLayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : ''

  if (context.req && cookie) { // 서버쪽 쿠키 공유 버그
    axios.defaults.headers.Cookie = cookie
  }
  console.log('context: ', context);
  context.store.dispatch(loadMyInfoRequest())
  context.store.dispatch(loadPostsRequest())
  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})
export default Home
