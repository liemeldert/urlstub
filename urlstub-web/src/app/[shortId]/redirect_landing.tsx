"use client";
import { Box, Center, VStack, Heading, Text } from '@chakra-ui/react';

interface LandingPageContentProps {
  originalUrl: string;
}

const RedirectLanding: React.FC<LandingPageContentProps> = ({ originalUrl }) => {
  return (
    <Box w="50%" p={4} borderRadius="sm">
      <Center>
        <VStack>
          <Heading as="h1" size="xl" mb={4}>
            Redirecting...
          </Heading>
          <Text textStyle="md" mb={2} fontWeight="bold">
            You will be redirected to this URL: {originalUrl}
          </Text>
        </VStack>
      </Center>
    </Box>
  );
};

export default RedirectLanding;