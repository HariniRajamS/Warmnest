"use client";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

export default function WhyChooseUs() {
  return (
    <Box px={{ base: 6, md: 20 }} py={16} bg="green.50">
      <Heading color="green.700">Why Choose Us?</Heading>

      <Stack mt={6} spacing={4} color="gray.700">
        <Text>
          We offer a safe, non-judgemental environment where your mental
          wellbeing always comes first.
        </Text>

        <Text>
          Our therapy approach is client-centered, evidence based and carefully
          tailored to your needs.
        </Text>

        <Text>
          We uphold the highest standards of ethical practice, confidentiality
          and compassion.
        </Text>

        <Text>
          With over 4 years of clinical experience, Aishvarya Krish has worked
          with clients globally dealing with anxiety, depression, PTSD, trauma,
          relationship struggles, and self-esteem challenges.
        </Text>

        <Text>
          We also provide confidential personal chat support so you’re never
          alone.
        </Text>

        <Text fontWeight="bold">Contact Support: +91 7418918459</Text>
      </Stack>
    </Box>
  );
}
