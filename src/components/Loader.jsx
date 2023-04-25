import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    align-items: center;
    background-color: ${({theme}) => theme.bg};
    display: flex;
    flex: 7;
    flex-direction: column;
    font-size: 2rem;
    font-weight: 100;
    gap: 1rem;
    height: 86vh;
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
