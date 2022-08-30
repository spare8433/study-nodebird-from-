// post/[id].js
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React from 'react'
import { END } from 'redux-saga'
import Head from 'next/head'
import AppLayout from '../../components/AppLayout'
import PostCard from '../../components/PostCard'
import { loadPostRequest } from '../../reducers/post'
import { loadMyInfoRequest } from '../../reducers/user'
import wrapper from '../../store/configureStore'

const Post = () => {
  const router = useRouter()
  const { id } = router
  const { singlePost } = useSelector((state) => state.post)
  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : ''

  if (context.req && cookie) { // 서버쪽 쿠키 공유 버그
    axios.defaults.headers.Cookie = cookie
  }
  console.log('context: ', context);

  context.store.dispatch(loadMyInfoRequest())
  context.store.dispatch(loadPostRequest(context.params.id))
  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

export default Post
