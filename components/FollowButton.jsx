import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { followRequest, unFollowRequest } from '../reducers/user'

const FollowButton = ({ post }) => {
  const { myData, followLoading, unFollowLoading } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const isFollow = myData?.Followings.find((v) => v.id === post.User.id)
  const onClickButton = useCallback(() => {
    if (isFollow) {
      console.log('unfl');
      dispatch(unFollowRequest(post.User.id))
    } else {
      console.log('fl');
      dispatch(followRequest(post.User.id))
    }
  }, [followLoading])

  if (myData.id === post.User.id) return null // 자기 게시물일때 버튼 생략

  return (
    <Button
      onClick={onClickButton}
      loading={followLoading || unFollowLoading}
    >
      {isFollow ? '언팔로우' : '팔로우'}
    </Button>
  )
}

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}
export default FollowButton
