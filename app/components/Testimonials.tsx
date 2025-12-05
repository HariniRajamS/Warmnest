"use client";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

const testimonials = [
  "I felt understood and safe. Truly healing.",
  "After the first session itself, I felt lighter.",
  "Warmnest changed my outlook towards life.",
  "Professional, gentle and deeply supportive.",
  "The sessions helped me emotionally reconnect.",
  "Highly recommended for anyone seeking clarity.",
];

export default function Testimonials() {
  return (
    <Box px={{ base: 6, md: 20 }} py={16} bg="green.50">
      <Heading color="green.700">Client Experiences</Heading>

      <SimpleGrid mt={8} columns={{ base: 1, md: 3 }} spacing={6}>
        {testimonials.map((review, i) => (
          <Box key={i} p={5} borderRadius="xl" bg="white" shadow="sm">
            <Text>“{review}”</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
