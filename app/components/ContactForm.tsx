"use client";
import { Box, Heading, Input, Textarea, Button, Stack } from "@chakra-ui/react";

export default function ContactForm() {
  return (
    <Box px={{ base: 6, md: 20 }} py={16} bg="green.50">
      <Heading color="green.700">Leave Your Contact</Heading>

      <Stack mt={6} spacing={4} maxW="500px">
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Textarea placeholder="Your message" />
        <Button colorScheme="green">Submit</Button>
      </Stack>
    </Box>
  );
}
