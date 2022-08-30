import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react'
import PropTypes, { arrayOf } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput'
import { addCommentRequest } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch()
  // const { id } = useSelector((state) => state.user?.myData)
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post)

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (!addCommentDone) return
    setCommentText('')
  }, [addCommentDone])

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch(addCommentRequest({ content: commentText, postId: post.id }))
  }, [commentText])

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: arrayOf(PropTypes.string),
    Comments: arrayOf(PropTypes.object),
  }).isRequired,
}

export default CommentForm
