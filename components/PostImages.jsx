import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import ImagesZoom from './ImagesZoom'
import { backUrl } from '../config/config'

const ImageBox = styled.div`
  /* display: flex; */
`

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)

  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [])

  const onClose = useCallback(() => {
    setShowImagesZoom(false)
  }, [])

  if (images.length === 1) {
    return (
      <ImageBox>
        <img role="presentation" width="100%" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </ImageBox>
    )
  }

  if (images.length === 2) {
    return (
      <ImageBox>
        <img role="presentation" width="50%" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" width="50%" src={`${backUrl}/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </ImageBox>
    )
  }

  return (
    <ImageBox>
      <img role="presentation" width="50%" src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
      <div
        role="presentation"
        style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: ' middle' }}
        onClick={onZoom}
      >
        <PlusOutlined />
        {images.length - 1 }
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </ImageBox>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostImages
