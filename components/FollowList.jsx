import React from 'react'
import { Button, Card, List } from 'antd'
import PropTypes from 'prop-types'
import { StopOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeFollowerRequest, unFollowRequest } from '../reducers/user'

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch()
  const onCancle = (id) => () => {
    if (header === '팔로잉 목록') {
      return dispatch(unFollowRequest(id))
    }
    return dispatch(removeFollowerRequest(id))
  }
  return (
    <div>
      <List
        style={{ marginBottom: 20 }}
        grid={{
          gutter: 4, xs: 2, md: 3, column: 3,
        }}
        size="small"
        header={<div>{header}</div>}
        loadMore={(
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <Button onClick={onClickMore} loading={loading}>더보기</Button>
          </div>
        )}
        bordered
        dataSource={data && data}
        renderItem={(item) => (
          <List.Item>
            <Card actions={[<StopOutlined key="stop" onClick={onCancle(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default FollowList
