import React, { useState } from 'react'
import styled from 'styled-components'
import { Home, Explore, Subscriptions,  SettingsBrightness, ExitToAppOutlined,  MenuOutlined, } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/authSlice'
import axios from 'axios';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size:17px;
  position: sticky;
  top: 0;
`
const Wrapper = styled.div`
  padding: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 10px;
  &:hover{
    background-color: ${({ theme }) => theme.textbg};
    border-radius: 10px;
  }
`

const Account = styled.div`
  display: flex;
  align-items: center;
`

const LogOut = styled.button`
  padding: 5px 7px ;
  background-color: transparent;
  color: ${({theme}) => theme.textSoft};
  border-radius: 10px;
  font-weight:600;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 25px;
  gap: 5px;
  &:hover{
    background-color: #a7a8aaf4;
  }
`
const Menubar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0px 8px 25px;
    align-items: center;
    
`
const Arrow = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${({theme}) => theme.textSoft};
`


const Menu = ({ theme, setTheme }) => {
  const [active, setActive] = useState(true)
  const [showFullMenu, setShowFullMenu] = useState(true);
  const [menuWidth, setMenuWidth] = useState(190)
  
  const handleClick = () => {
    setTheme(!theme)
    setActive(!active)
  }

  const toggleMenu = () =>{
    setShowFullMenu(!showFullMenu)
    setMenuWidth(menuWidth === 190 ? 70 : 190)
  }

  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = async() =>{
    try{
      await axios.post(`${process.env.REACT_APP_SERVER}/auth/signout`)
      localStorage.removeItem("access_token");
      dispatch(logOut())
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Container style={{ width: menuWidth }} >
        {showFullMenu ? (<>
        <Menubar>
        <Arrow onClick={toggleMenu} >
        <MenuOutlined fontSize='large'/>
        </Arrow>
        </Menubar>
      <Wrapper >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Item>
          <Home color="info" />
          Home
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Item>
          <Explore color="info" />
          Explore
        </Item>
        </Link>
        <Link to="subscription" style={{textDecoration:'none' , color:'inherit'}}>
        <Item>
          <Subscriptions color="info" />
          Subscriptions
        </Item>
        </Link>
        <Item onClick={handleClick}>
          <SettingsBrightness color="info" />
          {active ? "Light Mode" : "Dark Mode"}
        </Item>
        {
          user ? (<Account><LogOut onClick={handleLogout} ><ExitToAppOutlined/> Logout </LogOut></Account>) :(<></>)
        }
      </Wrapper>
      </>) :
      (<>
        <Menubar>
        <Arrow onClick={toggleMenu}>
        <MenuOutlined fontSize='large'/>
        </Arrow>
        </Menubar>
      <Wrapper >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Item>
          <Home color="info" />
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Item >
          <Explore color="info" />
        </Item>
        </Link>
        <Link to="subscription" style={{textDecoration:'none' , color:'inherit'}}>
        <Item>
          <Subscriptions color="info" />
        </Item>
        </Link>
        <Item onClick={handleClick}>
          <SettingsBrightness color="info" />
        </Item>
        {
          user ? (<Account><LogOut onClick={handleLogout} ><ExitToAppOutlined/> </LogOut></Account>) :(<></>)
        }
      </Wrapper>
      </>)
      }
    </Container>
  )
}

export default Menu
