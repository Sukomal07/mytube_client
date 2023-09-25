import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    align-items: center;
`
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 8px;
`
const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`
const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
`
const Description = styled.span`
    font-size:13px;
    color: ${({ theme }) => theme.text};
    word-spacing:5px;
    line-height: 20px;
`
const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`
const Icon = styled.div`
    cursor: pointer;
    position: relative;
    & > svg {
        color: ${({ theme }) => theme.text};
    }
`;

const Options = styled.div`
position: absolute;
top: 40px;
right: 0;
background-color: #ccc;
border-radius: 10px;
z-index: 1;
padding: 5px;
`;

const Option = styled.div`
display: flex;
align-items: center;
gap: 5px;
padding: 5px 10px;
font-size: 13px;
color: ${({ theme }) => theme.text};
cursor: pointer;
&:hover {
    background-color: ${({ theme }) => theme.btbg};
}
& > svg {
        color: ${({ theme }) => theme.text};
    }
`;
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

const Comment = ({ comment, onDelete }) => {
    const [channel, setChannel] = useState({})
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newDesc, setNewDesc] = useState(comment.desc);

    const { user } = useSelector((state) => state.user)
    const handleIconClick = (e) => {
        e.stopPropagation();
        setShowOptions(!showOptions);
    };
    const handleEdit = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };
    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER}/comments/${comment._id}`, {
                withCredentials: true
            })
            onDelete(comment._id);
            setShowOptions(false)

        } catch (error) {
            alert(error)
        }
    };

    const handleSave = async (e) => {
        e.stopPropagation();
        try {
            await axios.put(`${process.env.REACT_APP_SERVER}/comments/${comment?._id}`, {
                desc: newDesc,
                commentId: comment?._id
            }, {
                withCredentials: true
            });
            setIsEditing(false);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER}/users/find/${comment.userId}`)
                setChannel(res.data)
            } catch (error) {
                alert(error)
            }
        }
        fetchComments()
    }, [comment.userId])

    return (
        <Container>
            <Wrapper>
                <Avatar src={channel?.img} />
                <Details>
                    <Name>{channel?.name}<Date>{format(comment?.createdAt)}</Date></Name>
                    {isEditing ? (
                        <Input
                            type="text"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                        />
                    ) : (
                        <Description>
                            {comment?.desc}
                        </Description>
                    )}
                </Details>
            </Wrapper>
            {user && (user._id === comment?.userId) && (
                <Icon onClick={handleIconClick}>
                    <MoreVertIcon />
                    {showOptions && (
                        <Options>
                            {isEditing ? (
                                <Option onClick={handleSave}>
                                    Save
                                </Option>
                            ) : (
                                <>
                                    <Option onClick={handleEdit}>
                                        <EditIcon />
                                        Edit
                                    </Option>
                                    <Option onClick={handleDelete}>
                                        <DeleteIcon />
                                        Delete
                                    </Option>
                                </>
                            )}
                        </Options>
                    )}
                </Icon>
            )}
        </Container>
    )
}

export default Comment
