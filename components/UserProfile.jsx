import React, { useCallback } from 'react'
import { Avatar, Button, Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { logOutRequest } from '../reducers/user'

const UserProfile = () => {
  const { myData, logOutLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch(logOutRequest())
  }, [])

  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            <Link href={`/user/${myData.id}`}>
              <a>
                짹짹<br />
                {myData.Posts.length}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                팔로잉<br />
                {myData.Followings.length}
              </a>
            </Link>
          </div>,
          <div key="followers">
            <Link href="/profile">
              <a>
                팔로워<br />
                {myData.Followers.length}
              </a>
            </Link>
          </div>,
        ]}

      >
        <Meta
          avatar={(
            <Link href={`/user/${myData.id}`}>
              <Avatar>{myData.nickname[0]}</Avatar>
            </Link>
          )}
          title={myData.nickname}
        />
        <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
      </Card>
    </div>
  )
}

export default UserProfile
