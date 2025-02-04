    'use client';

import {   useState } from 'react';
import {
    Box,
    Button,
    Container,
    Input,
    VStack,
    Text,
    Heading,
    Center,
    HStack,
} from '@chakra-ui/react';

import { Toaster, toaster } from "@/components/ui/toaster"
import { Field } from '@/components/ui/field';
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import Link from 'next/link';

export default function Home() {
    const [url, setUrl] = useState('');
    const [expiryDays, setExpiryDays] = useState<number>(7);
    const [displayLanding, setDisplayLanding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, expiryDays, displayLanding }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setShortUrl(data.shortUrl);
            toaster.create({
                title: 'URL shortened successfully!',
                type: 'success',
                duration: 3000,
            });
        } catch (error) {
            toaster.create({
                title: 'Error shortening URL',
                description: error instanceof Error ? error.message : 'Please try again',
                type: 'error',
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            toaster.create({
                title: 'Copied to clipboard',
                type: 'success',
                duration: 2000,
                // isClosable: true,
            });
        });
    };

    return (
        <Box>
            <Box w="100%" bg="purple.500" color="white" p={4}>
                <Container maxW="container.md">
                    <Text textStyle="xl">URL Shortener</Text>
                </Container>
            </Box>
            <Center>
                <VStack gap={4}>

                    <Container maxW="container.md" py={10} borderWidth={1} borderRadius="md" padding={4} mt={8}>
                        <Toaster />
                        <VStack gap={8}>
                            <Heading>URL Shortener</Heading>
                            <Box w="100%" as="form" onSubmit={handleSubmit}>
                                <VStack gap={4}>
                                    <Field label="Enter URL" required>
                                        <Input
                                            type="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://example.com"
                                        />
                                    </Field>
                                    <HStack>
                                        <Field label="Expiry (days)" pr={4}>
                                            <NumberInputRoot
                                                min={1}
                                                max={365}
                                                value={expiryDays.toString()}
                                                onValueChange={(details) => setExpiryDays(Number(details.value))}
                                            >
                                                <NumberInputField />
                                            </NumberInputRoot>
                                        </Field>
                                        <Field label="Display Landing Page">
                                            <input
                                                type="checkbox"
                                                checked={displayLanding}
                                                onChange={() => setDisplayLanding(!displayLanding)}
                                            />
                                        </Field>
                                    </HStack>

                                    <Button
                                        type="submit"
                                        colorPalette="purple"
                                        disabled={isLoading}
                                        width="100%"
                                    >
                                        Shorten URL
                                    </Button>
                                </VStack>
                            </Box>

                            {shortUrl && (
                                <Box w="100%" p={4} borderRadius="md" borderWidth={1}>
                                    <Text fontWeight="bold">Shortened URL:</Text>
                                    <Link
                                        as="a"
                                        href={shortUrl}
                                        color="purple.200"
                                        rel="noopener noreferrer"
                                    >
                                        {shortUrl}
                                    </Link>
                                    <Button onClick={handleCopy} colorScheme="purple" size="sm">
                                        Copy
                                    </Button>
                                </Box>
                            )}
                        </VStack>
                    </Container>
                </VStack>
            </Center>
        </Box>
    );
}
