import { Button, Checkbox, Form, Input } from 'antd'
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import AppLayout from '../components/AppLayout'
import useInput from '../hooks/useInput'
import { signUpRequest } from '../reducers/user'

const ErrorMsg = styled.div`
  color: red;
`

const Signup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { signUpLoading, signUpDone, signUpError, logInDone } = useSelector((state) => state.user)

  useEffect(() => {
    if (logInDone) router.replace('/')
  }, [logInDone])

  useEffect(() => {
    if (signUpDone) router.push('/')
  }, [signUpDone])

  useEffect(() => {
    if (signUpError) alert(signUpError)
  }, [signUpError])

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [nickname, onChangeNickname] = useInput('')

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const [term, setTerm] = useState(false)
  const [termError, setTermError] = useState(false)

  console.log(term);

  const onChangeTerm = useCallback((e) => {
    console.log(e.target.checked);
    setTerm(e.target.checked);
    setTermError(false);
  }, [])

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value)
      setPasswordError(e.target.value !== password)
    },
    [password],
  )

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }

    return dispatch(signUpRequest({ email, password, nickname }))
  }, [term, email, password, passwordCheck])

  return (
    <AppLayout>
      <Head>
        <title>회원가입 페이지</title>
      </Head>

      <Form onFinish={onSubmit}>
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
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            onChange={onChangeNickname}
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
        <div>
          <label htmlFor="user-password-check">패스워드 체크</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
        </div>

        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMsg>약관에 동의하셔야합니다</ErrorMsg>}
        </div>
        <div>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
        </div>
      </Form>
    </AppLayout>
  )
}

export default Signup
