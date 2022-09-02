import React, { useCallback } from 'react'
import { Avatar, Button, Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import { loadUserRequest, logOutRequest } from '../reducers/user'
import wrapper from '../store/configureStore'

const About = () => {
  const { userInfo, logOutLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch(logOutRequest())
  }, [])

  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            찍찍
            <br />
            {userInfo?.Posts}
          </div>,
          <div key="followings">
            팔로잉
            <br />
            {userInfo?.Followings}
          </div>,
          <div key="follower">
            팔로워
            <br />
            {userInfo?.Followers}
          </div>,
        ]}

      >
        <Meta avatar={<Avatar>{userInfo?.nickname[0]}</Avatar>} title={userInfo?.nickname} />
        <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
      </Card>
    </div>
  )
}

// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//   context.store.dispatch(loadUserRequest(2))
//   context.store.dispatch(END)
//   await context.store.sagaTask.toPromise()
// })

export default About
