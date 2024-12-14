import { keyframes } from '@emotion/react';
import { Box } from '@chakra-ui/react';
import React from 'react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedGradient = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      width="150%"
      height="150%"
      filter="blur(100px)"
      style={{
        background: 
          'linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))',
        animation: `${rotate} 10s cubic-bezier(0.8, 0.2, 0.2, 0.8) infinite`,
        opacity: 0.5,
      }}
    />
  );
};

export default AnimatedGradient;
