import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, signupFailed, signupStart, signupSuccess } from '../redux/authSlice'
import {auth , Provider} from '../firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 22px 50px;
  gap: 10px;
`
const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.textSoft};
`
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius:3px;
  padding: 10px ;
  background-color: transparent;
  width:100%
`
const Button = styled.button`
  border-radius: 20px;
  border:none;
  padding:10px 20px;
  font-weight:500;
  cursor:pointer;
  background-color: ${({theme}) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  &:hover{
    background-color: ${({theme}) => theme.bthover};
  }
`
const SignIn = () => {
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const signupHandler = async (e) => {
    e.preventDefault();
    dispatch(signupStart())
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/auth/signup`,{name, email, password},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      dispatch(signupSuccess(res.data))
      navigate(-1)
    }catch(err){
      dispatch(signupFailed(err))
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/auth/signin`, {email, password},{
              headers:{
                "Content-Type":"application/json"
              }
              ,withCredentials:true
            })
            dispatch(loginSuccess(res.data))
            navigate(-1)
        } catch (error) {
            dispatch(loginFailed(error))
        }
  };

  const signInWithGoogle = async() =>{
    dispatch(loginStart())
    await signInWithPopup(auth, Provider)
    .then((result) =>{
      axios.post(`${process.env.REACT_APP_SERVER}/auth/google`,{
        name:result.user.displayName,
        email:result.user.email,
        img: result.user.photoURL
      },{
        withCredentials:true
      }).then((res) =>{
        dispatch(loginSuccess(res.data))
        navigate(-1)
      })
    }).catch((err) =>{
      dispatch(loginFailed(err))
    })
  }

  return (
    <Container>
      <Wrapper >
        <Title>Sign In</Title>
        <SubTitle>to Continue to VideoHub</SubTitle>
        <Input  type='email' required
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'  />
        <Input required  onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder="Enter Password" />
        <Button onClick={signInHandler} >Sign In</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle} >Sign in With Google</Button>
        <Title>or</Title>
        <Input required onChange={(e) => setName(e.target.value)} type='text' placeholder='username' />
        <Input required  onChange={(e) => setEmail(e.target.value)}  type={'email'} placeholder="email" />
        <Input required onChange={(e) => setPassword(e.target.value)}  type={'password'} placeholder="password" />
        <Button onClick={signupHandler} >Sign Up</Button>
      </Wrapper>
    </Container>
  )
}

export default SignIn
