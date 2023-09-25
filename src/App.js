import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components'
import { useDarkMode } from './components/useDarkMode.js'
import MenuBar from './components/MenuBar.jsx';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn.jsx';
import Home from './pages/Home.jsx'
import Video from './pages/Video.jsx'
import { Toaster } from 'react-hot-toast'
import { darkTheme, lightTheme } from './utils/Theme.js'
import Search from './pages/Search.jsx';
import Subscription from './pages/Subscription.jsx';
import Explore from './pages/Explore.jsx';
const Container = styled.div`
  display: flex;
`
const Main = styled.div`
flex: 7;
background-color: ${({ theme }) => theme.bg};

`
const Wrapper = styled.div`
padding: 22px 40px;
`

function App() {
  const [theme, setTheme] = useDarkMode()

  const themeMode = theme === 'light' ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <Router>
        <Container>
          <MenuBar theme={theme} setTheme={setTheme} />
          <Main>
            <Navbar />
            <Wrapper >
              <Routes>
                <Route path='/'>
                  <Route index element={<Home />} />
                  <Route path='trends' element={<Explore />} />
                  <Route path='subscription' element={<Subscription />} />
                  <Route path='search' element={<Search />} />
                  <Route path='signin' element={<SignIn />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
          <Toaster />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
