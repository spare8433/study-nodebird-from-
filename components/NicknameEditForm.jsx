import React, { useCallback } from 'react'
import { Form } from 'antd'
import styled from 'styled-components'
import Search from 'antd/lib/input/Search'
import { useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { changeNicknameRequest } from '../reducers/user'

const FormWrapper = styled(Form)`
  margin-bottom:20px;
  border: solid 1px #d9d9d9;
  padding: 20px;
`

const SearchInput = styled(Search)`
  vertical-align:'middle';
`

const NicknameEditForm = () => {
  const dispatch = useDispatch()
  const [nickname, changeNickname] = useInput('')

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequest(nickname))
  }, [nickname])

  return (
    <FormWrapper>
      <SearchInput
        addonBefore="닉네임"
        enterButton="수정"
        placeholder="input search text"
        onChange={changeNickname}
        value={nickname}
        onSearch={onSubmit}
        allowClear
      />
    </FormWrapper>
  )
}

export default NicknameEditForm
