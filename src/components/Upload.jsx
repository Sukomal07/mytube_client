import { Clear } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bgLighter};
    padding: 20px;
    gap: 20px;
    position: relative;
`
const Close = styled.div`
    position: absolute;
    top: 21px;
    right: 21px;
    cursor: pointer;
    & > svg {
        color: ${({ theme }) => theme.bgLighter};
    }
`
const Title = styled.h1`
    text-align: center;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
`
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`
const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`
const Desc = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    resize: vertical;
`
const Button = styled.button`
    border-radius: 7px;
    border:none;
    padding:10px 0px;
    font-weight:500;
    font-size: 20px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    &:hover{
        background-color: ${({ theme }) => theme.bthover};
    }
`
const Label = styled.label`
    font-size: 20px;
    color: ${({ theme }) => theme.textSoft};
`
const Upload = ({ setOpen }) => {

    const [video, setVideo] = useState(undefined)
    const [image, SetImage] = useState(undefined)
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])
    const [uploadDisabled, setUploadDisabled] = useState(true)

    const navigate = useNavigate()

    const handleTags = (e) => {
        setTags(e.target.value.split(","))
    }

    const handleInputs = (e) =>{
        setInputs((prev) =>{
            return {...prev, [e.target.name]: e.target.value}
        })
        const { title, desc } = inputs
        if (title && desc && tags.length > 0 && imgPerc === 100 && videoPerc === 100) {
            setUploadDisabled(false)
        } else {
            setUploadDisabled(true)
        }
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === 'imgurl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
            },
            (error) => {console.log(error)},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) =>{
                        return {...prev, [urlType]: downloadURL}
                    })
                });
            }
        );
    }
    useEffect(() => {video && uploadFile(video, 'videoUrl') }, [video] )
    useEffect(() => { image && uploadFile(image, 'imgurl') }, [image])

    const handleUpload = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/videos`,{
                ...inputs,tags
            },{
                withCredentials:true
            })
            setOpen(false)
            res.status === 200 && navigate(`/video/${res.data._id}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Close onClick={() => setOpen(false)} ><Clear fontSize='large' /></Close>
            <Wrapper>
                <Title>Upload a new Video</Title>
                <InputDiv>
                    <Label>Video</Label>
                    {videoPerc > 0 ? ("Uploading: " + videoPerc + " %"):(<Input type='file' accept='video/*' required onChange={(e) => setVideo(e.target.files[0])} />)}
                </InputDiv>
                <InputDiv>
                    <Label>Thumbnail</Label>
                    {imgPerc > 0 ? ("Uploading: " + imgPerc + " %"):(<Input type='file' accept='image/*' required onChange={(e) => SetImage(e.target.files[0])} />)}
                </InputDiv>
                <Input type='text' name='title' placeholder='Video title' required onChange={handleInputs} />
                <Desc placeholder='Description' name='desc' required rows={8}  onChange={handleInputs} />
                <Input type='text' placeholder='Tags(Ex- Travel , Funny)' required onChange={handleTags} />
                <Button disabled={uploadDisabled} onClick={handleUpload} >Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload
