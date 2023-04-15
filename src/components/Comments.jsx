import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Container = styled.div``

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Input = styled.input`
  border: none;
  outline: none;
  padding: 7px;
  border-bottom: 0.5px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
`

const ButtonGroup = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 20px;
    justify-content:flex-end;
    margin-top: 1rem;
`

const Button = styled.button`
  padding: 8px 12px ;
  background-color: #065fd4;
  border: none;
  color: white;
  border-radius: 20px;
  font-weight:500;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover{
    background-color: #065fd4eb;
  }
`

const CancelButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-weight:500 ;
  font-size: 15px;
  padding: 5px 10px;
  color: ${({theme}) => theme.text};
  &:hover{
    background-color: #6060604d;
    border-radius: 20px;
  }
`

const Comments = ({ videoId }) => {
  const { user } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [showButtons, setShowButtons] = useState(false)
  const [commentInput, setCommentInput] = useState("")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER}/comments/${videoId}`
        )
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  }, [videoId])

  const handleInputClick = () => {
    setShowButtons(true)
  }

  const handleCancelButtonClick = () => {
    setShowButtons(false)
  }

  const handleCommentButtonClick = async() => {
    if (!user) {
      alert('Please login to add a comment.');
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/comments`,{
        desc:commentInput,
        videoId:videoId
      },{
        headers:{
          "Content-Type":"application/json"
        }
        ,withCredentials:true
      })
      setComments([...comments, res.data])
      setCommentInput("")
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = (commentId) => {
    setComments(comments.filter((comment) => comment?._id !== commentId))
  }
  return (
    <Container>
      <NewComment>
        <Avatar src={user?.img} />
        <Input placeholder='Add a Comment...' value={commentInput} onChange={(e) => setCommentInput(e.target.value)} onClick={handleInputClick} />
      </NewComment>
      {showButtons && (
          <ButtonGroup>
            <CancelButton onClick={handleCancelButtonClick}>
              Cancel
            </CancelButton>
            <Button onClick={handleCommentButtonClick}>Comment</Button>
          </ButtonGroup>
        )}
      {Array.isArray(comments) && comments.map((comment) => (
        <Comment key={comment?._id} comment={comment} onDelete={onDelete} />
      ))}
    </Container>
  )
}

export default Comments
