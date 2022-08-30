import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'
import {
  CloseBtn, Global, Header, ImageWrapper, Indicator, Overlay, SlickWrapper,
} from './style'

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  return (
    <Overlay>
      <Header>
        <h1>상세이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Global />
          <Slick
            initialSlide={currentSlide}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToScroll={1}
            slidesToShow={1}
          >

            {images.map((img) => (
              <ImageWrapper key={`http://localhost:3065/${img.src}`}>
                <img src={`http://localhost:3065/${img.src}`} alt={img.src} />
              </ImageWrapper>
            ))}
          </Slick>

          <Indicator>
            <div>
              {currentSlide + 1}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  )
}

ImagesZoom.propTypes = {
  images: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ImagesZoom
