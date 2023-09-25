import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card.jsx'
import axios from 'axios'
import Loader from '../components/Loader.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    gap: 50px;
`
const Subscription = () => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
        const fetchVideos = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER}/videos/sub`, {
                    withCredentials: true
                })
                setVideos(res.data)
                setLoading(false)
            } catch (err) {
                alert(err)
            }
        }
        fetchVideos()
    }, [user, navigate])
    return (
        <Container>
            {loading ? <Loader /> :
                videos.map((video) => (
                    <Card key={video?._id} video={video} />
                ))
            }
        </Container>
    )
}

export default Subscription

