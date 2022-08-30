import React, { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import Router from 'next/router'
import axios from 'axios'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
// import { loadFollowersRequest, loadFollowingsRequest } from '../reducers/user'

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data)

const Profile = () => {
  // const dispatch = useDispatch()
  const { myData } = useSelector((state) => state.user)

  const [followersLimit, setFollowersLimit] = useState(3)
  const [followingsLimit, setFollowingsLimit] = useState(3)

  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher)
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher)

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3)
  }, [])

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3)
  }, [])

  // useEffect(() => {
  //   dispatch(loadFollowersRequest())
  //   dispatch(loadFollowingsRequest())
  // }, [])

  useEffect(() => {
    if (!(myData && myData.id)) {
      Router.push('/')
    }
  }, [myData && myData.id])

  if (!myData) {
    return <>로그인 정보 확인중</>;
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <>팔로잉 / 팔로워 로딩 중 에러가 발생합니다</>
  }
  return (
    <>
      <Head>
        <title>프로필 페이지</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
        <FollowList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
      </AppLayout>
    </>
  )
}

export default Profile
