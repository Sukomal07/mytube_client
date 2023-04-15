import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const Search = () => {
    const [Videos, setVideos] = useState([])
    const query = useLocation().search
    useEffect(() =>{
        const fetchVideos = async () =>{
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER}/videos/search${query}`)
                setVideos(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchVideos()
    },[query])
    return (
        <Container>
            {
                Videos.map((video) => (
                    <Card key={video?._id} video={video} />
                ))
            }
        </Container>
    )
}

export default Search
