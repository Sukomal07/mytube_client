import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'timeago.js'


const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "20px")};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap:${(props) => (props.type === "sm" ? "15px" : "none")} ;
`
const Image = styled.img`
    height: ${(props) => (props.type === "sm" ? "94px" : "202px")};
    background-color: #999;
    width: ${(props) => (props.type === "sm" ? "168px" : "100%")};
    flex: 1;
    border-radius:${(props) => (props.type === "sm" ? "20px" : "none")} ;
`
const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "sm" && "none"};
`
const VideoDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Title = styled.h1`
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
`
const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0;
`
const Info = styled.div`
    display: flex;
    align-items: center;
    font-size: ${(props) => (props.type === "sm" ? "13px" : "14px")};
    color: ${({ theme }) => theme.textSoft};
    gap: ${(props) => (props.type === "sm" ? "2px" : "6px")};
`
const Dot = styled.span`
    height: ${(props) => (props.type === "sm" ? "3px" : "4px")};
    width: ${(props) => (props.type === "sm" ? "3px" : "4px")};
    background-color: black;
    border-radius: 50%;
    display: inline-block;
`
const Card = ({ type , video }) => {
    const[channel , setChannel] = useState({})

    useEffect(()=>{
        const fetchChannel = async()=>{
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/users/find/${video.userId}`)
            setChannel(res.data)
        }
        fetchChannel()
    },[video.userId])
    return (
        <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
            <Container type={type}>
                <Image 
                type={type}
                src={video?.imgurl} />
                <Details type={type}>
                    <ChannelImage 
                    type ={type}
                    src={channel.img} />
                    <VideoDetails >
                        <Title type={type}>{video?.title}</Title>
                        <ChannelName type={type}>{channel?.name}</ChannelName>
                        <Info type={type}>{video?.videoViews} views <Dot type={type}/> {format(video?.createdAt)}</Info>
                    </VideoDetails>
                </Details>
            </Container>
        </Link>
    )
}

export default Card
