import React, { useState }  from 'react';
import styled from 'styled-components';
import { AccountCircleOutlined, OndemandVideoOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {auth , Provider} from '../firebase'
import {signInWithPopup} from 'firebase/auth'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice';
import axios from 'axios';
import Upload from './Upload';
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 30px;
  position: relative;
`
const Logo = styled.div`
  position: absolute;
  left: 30px;
  top: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  font-size: large;
  color: ${({ theme }) => theme.text};
`

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  color: ${({theme}) => theme.text};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid #ccc;
  border-radius: 30px;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ccc;
  padding: 7px 20px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: ${({ theme }) => theme.textbg};
  &:hover {
    background-color: #ede9e97d;
  }
`;


const Input = styled.input`
  padding: 0 20px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: gray;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  color: #606060;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`
const Button = styled.button`
  position: absolute;
  top: 7px;
  right: 15px;
  padding: 5px 10px ;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: ${({theme}) => theme.text};
  border-radius: 10px;
  font-weight:600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover{
    background-color: #3ea6ff8f;
  }
`


const Navbar = () => {
  const { user } = useSelector(state => state.user)
  const[Open , setOpen] = useState(false)
  const[q , setQ] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        
      })
    }).catch((err) =>{
      dispatch(loginFailed(err))
    })
  }

  return (
    <>
    <Container>
      <Wrapper>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo >
              <OndemandVideoOutlined color="warning" />
              MyTube
            </Logo>
        </Link>
        <Search>
          <Input placeholder='Search here' onChange={(e) => setQ(e.target.value)} />
          <Icon onClick={() => navigate(`/search?q=${q}`)}>
            <SearchIcon fontSize="medium" />
          </Icon>
        </Search>
        {user ? (
          <User >
            <VideoCallOutlined fontSize='medium' onClick={() => setOpen(true)}  />
            <Avatar src={user?.img} />
          </User>
        ) : (
          <Button onClick={signInWithGoogle}>
            <AccountCircleOutlined />
            SIGN IN
          </Button>
        )}
      </Wrapper>
    </Container>
    {Open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
