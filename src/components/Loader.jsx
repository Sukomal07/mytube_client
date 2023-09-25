import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  align-items: center;
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
  position: relative;
`;

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
    border-color: red; 
  }
  100% {
    transform: rotate(360deg);
    border-color: blue; 
  }
`;

const CircleLoader = styled.div`
  width: 100px; 
  height: 100px; 
  border-top: 4px solid transparent; 
  border-radius: 50%;
  animation: ${rotate360} 2s linear infinite;
`;

const Loader = () => {
  return (
    <Container>
      <CircleLoader />
    </Container>
  );
};

export default Loader;
