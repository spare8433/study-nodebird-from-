import { Button, Form, Input } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addPostRequest, removeImage, uploadImagesRequest } from '../reducers/post'

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`

const PostForm = () => {
  const dispatch = useDispatch()
  const imageInput = useRef()
  const [text, setText] = useState('')
  const { imagePaths, addPostDone } = useSelector((state) => state.post)

  useEffect(() => {
    if (!addPostDone) return
    setText('')
  }, [addPostDone])

  const onChangeText = useCallback((e) => {
    setText(e.target.value)
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요')
    }

    const formData = new FormData()
    imagePaths.forEach((p) => {
      formData.append('image', p)
    })
    formData.append('content', text)
    setText('')
    return dispatch(addPostRequest(formData));
  }, [text, imagePaths])

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f)
    })
    dispatch(uploadImagesRequest(imageFormData))
  }, [])

  const onRemoveImage = useCallback((index) => () => {
    dispatch(removeImage(index))
  }, [])
  return (
    <FormWrapper encType="multupart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있나요"
      />

      <div>
        <input id="imgUpload" type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>

      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} alt={v} style={{ width: '200px' }} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  )
}

export default PostForm
