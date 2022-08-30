import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Col, Menu, Row } from 'antd'
import Search from 'antd/lib/input/Search';
import { useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import { useRouter } from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const SearchInput = styled(Search)`
  vertical-align:'middle';
`

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child{
    padding-left: 0;
  }

  .ant-col:last-child{
    padding-right: 0 !important;
  }
`

const AppLayout = ({ children }) => {
  const router = useRouter()
  const [searchInput, onChangeSearchInput] = useInput('')
  const { myData } = useSelector((state) => state.user)

  const onSearch = useCallback(() => {
    console.log(searchInput);
    router.push(`/hashtag/${searchInput}`)
  }, [searchInput])

  const items = [
    { label: <Link href="/">노드버드</Link>, key: 'item_1' },
    { label: <Link href="/profile">프로필</Link>, key: 'item_2' },
    { label: <SearchInput placeholder="input search text" allowClear onSearch={onSearch} onChange={onChangeSearchInput} value={searchInput} />, key: 'item_3' },
    { label: <Link href="/signup">회원가입</Link>, key: 'item_4' },
  ];

  return (
    <div>
      <Global />
      <div>
        <Menu mode="horizontal" items={items} />
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {myData ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a href="https://github.com/spare8433" target="_blank" rel="noreferrer noopener">spare8433 github</a>
          </Col>
        </Row>
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
