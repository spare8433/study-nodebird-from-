import React, { useCallback, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { loginRequest } from '../reducers/user'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const FormWrapper = styled(Form)`
  padding: 10px;
`

const LoginForm = () => {
  const { logInError, logInLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequest({ email, password }))
  }, [email, password])

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  return (
    <div>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />

        </div>

        <div>
          <label htmlFor="user-password">패스워드</label>
          <br />
          <Input
            name="user-password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>

        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
          <Link href="/signup"><Button>회원가입</Button></Link>
        </ButtonWrapper>
      </FormWrapper>
    </div>
  )
}

export default LoginForm
