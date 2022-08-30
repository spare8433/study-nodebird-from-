import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((res, index) => {
      if (res.match(/(#[^\s#]+)/)) {
        return <Link href={`/hashtag/${res.slice(1)}`} key={index}>{res}</Link>
      }
      return res
    })}
  </div>
)

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}

export default PostCardContent
