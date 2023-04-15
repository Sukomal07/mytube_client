import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card.jsx'
import axios from 'axios'
import Loader from '../components/Loader.jsx'
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  gap: 50px;
`
const Home = () => {
  const [videos , setVideos] = useState([])
  const[loading , setLoading] = useState(false)
  

  useEffect(()=>{
    const fetchVideos = async() =>{
      setLoading(true)
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/videos/random`)
        setVideos(res.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    fetchVideos()
  },[])

  
  return (
    <Container>
      { loading ? <Loader/> :
        videos.map((video) =>(
          <Card key={video?._id} video={video} />
        ))
      }
    </Container>
  )
}

export default Home

