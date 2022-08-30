import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Card, Comment, List, Popover } from 'antd'
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/lib/button/button-group'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Link from 'next/link'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'
import { likePostRequest, removePostRequest, retweet, unLikePostRequest } from '../reducers/post'
import FollowButton from './FollowButton'

moment.locale('ko')

const PostCard = ({ post }) => {
  const dispatch = useDispatch()

  const [commentFormOpend, setCommentFormOpend] = useState(false)

  const { removePostLoading } = useSelector((state) => state.post)
  const { myData } = useSelector((state) => state.user)
  const id = myData?.id;

  const onLike = useCallback(() => {
    if (!myData) return alert('로그인이 필요한 서비스입니다')
    return dispatch(likePostRequest(post.id))
  }, [myData])

  const onUnLike = useCallback(() => {
    if (!myData) return alert('로그인이 필요한 서비스입니다')
    return dispatch(unLikePostRequest(post.id))
  }, [myData])

  const onToogleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev)
  }, [myData])

  const onRemovePost = useCallback(() => {
    if (!myData) return alert('로그인이 필요한 서비스입니다')
    return dispatch(removePostRequest(post.id))
  }, [myData])

  const onRetweet = useCallback(() => {
    if (!myData) return alert('로그인이 필요한 서비스입니다')
    return dispatch(retweet(post.id))
  }, [myData])

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post && post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          post?.Likers.find((v) => v.id === id)
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToogleComment} />,
          <Popover
            key="more"
            content={(
              <ButtonGroup>
                {id && id === post.User.id
                  ? (
                    <div>
                      <Button>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                    </div>
                  )
                  : <Button>신고</Button>}
              </ButtonGroup>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post?.RetweetId && `${post.User.nickname} 님이 리트위하셧습니다.`}
        extra={(id && id !== post.User.id) && <FollowButton post={post} />}
      >
        {post?.RetweetId && post.Retweet
          ? (
            <Card cover={post?.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
              <div style={{ folat: 'right' }}>{moment(post.createdAt).format('YYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.Retweet.User.id}`}>
                    <a><Avatar>{post?.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post?.Retweet.User.nickname}
                description={<PostCardContent postData={post?.Retweet.content} />}
              />
            </Card>
          )
          : (
            <>
              <div style={{ folat: 'right' }}>{moment(post.createdAt).format('YYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.User.id}`}>
                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
              />
            </>
          )}

      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}

export default PostCard
