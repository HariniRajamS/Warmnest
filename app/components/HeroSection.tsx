"use client";

import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Flex
      px={{ base: 6, md: 20 }}
      py={16}
      direction={{ base: "column", md: "row" }}
      gap={12}
      align="center"
    >
      <Box flex={1}>
        <Heading fontSize={{ base: "3xl", md: "5xl" }} color="brand.700">
          Mental Wellness Sessions with{" "}
          <Text as="span" color="brand.900">
            Aishvarya Krish
          </Text>
        </Heading>

        <Text mt={4} fontSize="lg" color="gray.700" maxW="lg">
          A certified therapist helping individuals heal emotionally and improve
          self-awareness. Book your personalized session today.
        </Text>

        <Button mt={6} colorScheme="brand" size="lg">
          Book Now
        </Button>
      </Box>

      <Box flex={1} display="flex" justifyContent="center">
        <Image
          src="/aishwaryaKrish.jpg"
          alt="Aishwarya Krish"
          borderRadius="2xl"
          boxShadow="xl"
        />
      </Box>
    </Flex>
  );
}
