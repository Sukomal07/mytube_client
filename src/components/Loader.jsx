import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    align-items: center;
    background-color: ${({theme}) => theme.bg};
    display: flex;
    flex: 7;
    flex-direction: column;
    font-size: 3rem;
    font-weight: 400;
    gap: 1rem;
    height: 80vh;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
`

const Loader = () => {
  return (
    <Container>
      Loading..
    </Container>
  )
}

export default Loader
