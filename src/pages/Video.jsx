import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NotificationsActive, Reply, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material'
import Comments from '../components/Comments'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { dislike, fetchFailure, fetchStart, fetchSuccess, like, } from '../redux/videoSlice'
import { format } from 'timeago.js'
import { subscription } from '../redux/authSlice'
import Recomendation from '../components/Recomendation'
const Container = styled.div`
    display: flex;
    gap: 24px;
`
const Content = styled.div`
    flex: 5;
    
`
const VideoWrapper = styled.div`
    
`
const VideoFrame = styled.video`
    height: 550px;
    width: 100%;
    object-fit: cover;
`
const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
`
const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Channel = styled.div`
    display: flex;
    align-items: center;
    
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
`
const ChanelDetails = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text};
    gap: 4rem;
    margin-left: 1rem;
    cursor: pointer;
`
const ChannelInfo = styled.div`
    display: flex;
    flex-direction: column;
`
const ChanelName = styled.span`
font-weight: 500 ;
`
const Counter = styled.span`
    margin-top: 5px;
    color: ${({ theme }) => theme.textSoft};
    font-size: 13px;
`
const Subscribe = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.textbg};
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 20px;
    cursor: pointer;
`
const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({ theme }) => theme.text};
`
const Share = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.textbg};
    padding: 10px 15px;
    border-radius: 20px;
    &:hover{
        background-color: ${({ theme }) => theme.btbg};
    }
`
const Buttons2 = styled.div`
    display: flex;
    color: ${({ theme }) => theme.text};
    margin-right: 1rem;
`
const LikeButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.textbg};
    padding: 10px 10px 10px 15px;
    border-radius: 20px 0 0 20px;
    &:hover{
        background-color: ${({ theme }) => theme.btbg};
    }
`
const DisLikeButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.textbg};
    padding: 10px 15px 10px 10px;
    border-radius: 0 20px 20px 0;
    &:hover{
        background-color: ${({ theme }) => theme.btbg};
    }
`
const DescriptionInfo = styled.div`
    background-color: ${({ theme }) => theme.textbg};
    padding: 20px;
    border-radius: 15px;
    margin-top: 15px;
`
const Info = styled.p`
    color: ${({ theme }) => theme.text};
    font-weight: 500;
    margin-bottom: 7px;
`
const Description = styled.p`
    color: ${({ theme }) => theme.text};
    font-size: 15px;
    word-spacing: 5px;
    word-wrap: normal;
    line-height: 30px;
    max-height: ${({ isExpanded }) => (isExpanded ? 'none' : '150px')};
    overflow: hidden;
`
const ExpandButton = styled.button`
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;

    &:focus {
        outline: none;
    }
`
const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`
const Hr2 = styled.hr`
    border: 0.5px solid ${({ theme }) => theme.soft};
`
const Dot = styled.span`
    height: 4px;
    width: 4px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
`

const Video = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const { user } = useSelector((state) => state.user)
    const { currentVideo } = useSelector((state) => state.video)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const path = useLocation().pathname.split("/")[2]
    const [channel, setChannel] = useState({})

    useEffect(() => {
        dispatch(fetchStart())
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`${process.env.REACT_APP_SERVER}/videos/find/${path}`)
                const channelRes = await axios.get(`${process.env.REACT_APP_SERVER}/users/find/${videoRes.data.userId}`)
                setChannel(channelRes.data)
                dispatch(fetchSuccess(videoRes.data))
            } catch (error) {
                dispatch(fetchFailure(error))
            }
        }
        fetchData()
    }, [path, dispatch,])

    const handleLike = async () => {
        try {
            if (!user) {
                navigate("/signin")
            }
            await axios.put(`${process.env.REACT_APP_SERVER}/users/like/${currentVideo._id}`, null, {
                withCredentials: true
            })
            dispatch(like(user?._id))
        } catch (error) {
            alert(error)
        }
    }


    const handleDisLike = async () => {
        try {
            if (!user) {
                navigate("/signin")
            }
            await axios.put(`${process.env.REACT_APP_SERVER}/users/dislike/${currentVideo._id}`, null, {
                withCredentials: true
            })
            dispatch(dislike(user?._id))
        } catch (error) {
            alert(error)
        }
    }

    const handleSub = async () => {
        try {
            if (!user) {
                navigate("/signin")
            }
            user?.subscribedUser?.includes(channel._id) ?
                await axios.put(`${process.env.REACT_APP_SERVER}/users/unsub/${channel._id}`, null, {
                    withCredentials: true
                })
                :
                await axios.put(`${process.env.REACT_APP_SERVER}/users/sub/${channel._id}`, null, {
                    withCredentials: true
                })
            dispatch(subscription(channel?._id))
        } catch (error) {
            alert(error)
        }
    }
    const updateViewCount = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER}/videos/view/${currentVideo._id}`);
        } catch (error) {
            alert(error);
        }
    }

    const shareVideo = () => {
        if (navigator.share) {
            navigator.share({
                title: currentVideo.title,
                url: window.location.href,
            })
                .then(() => alert('Sharing successful'))
                .catch((error) => alert('Error sharing:', error));
        } else {
            alert('Web Share API not supported');
        }
    }


    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls controlsList="nodownload" onPlay={updateViewCount} />
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Details>
                    <Channel>
                        <Image src={channel?.img} />
                        <ChanelDetails>
                            <ChannelInfo>
                                <ChanelName>{channel?.name}</ChanelName>
                                <Counter>{channel?.subscribers} subscribers</Counter>
                            </ChannelInfo>
                            <Subscribe onClick={handleSub}>
                                {user?.subscribedUser?.includes(channel?._id) ? <> <NotificationsActive /> Subscribed </> : "Subscribe"}
                            </Subscribe>
                        </ChanelDetails>
                    </Channel>
                    <Buttons2>
                        <LikeButton onClick={handleLike}>
                            {currentVideo?.likes?.includes(user?._id) ? (<ThumbUp />) : (<ThumbUpAltOutlined />)}
                            {currentVideo?.likes?.length}
                        </LikeButton>
                        <Hr2 />
                        <DisLikeButton onClick={handleDisLike}>
                            {currentVideo?.dislikes?.includes(user?._id) ? (<ThumbDown />) : (<ThumbDownAltOutlined />)}
                            {currentVideo?.dislikes?.length}
                        </DisLikeButton>
                    </Buttons2>
                    <Buttons>
                        <Share onClick={shareVideo}>
                            <Reply />
                            Share
                        </Share>
                    </Buttons>
                </Details>
                <DescriptionInfo>
                    <Info>{currentVideo?.videoViews} views <Dot /> {format(currentVideo?.createdAt)}</Info>
                    <Description isExpanded={isExpanded}>
                        {currentVideo?.desc}
                    </Description>
                    <ExpandButton onClick={handleExpandClick}>
                        {isExpanded ? 'See less' : 'See more...'}
                    </ExpandButton>
                </DescriptionInfo>
                <Hr />
                <Comments videoId={currentVideo?._id} />
            </Content>
            <Recomendation tags={currentVideo?.tags} />
        </Container>
    )
}

export default Video
