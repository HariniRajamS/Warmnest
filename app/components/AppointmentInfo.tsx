"use client";
import { Box, Heading, Text, Stack, Badge } from "@chakra-ui/react";

export default function AppointmentInfo() {
  return (
    <Box px={{ base: 5, md: 20 }} py={16} bg="white">
      <Heading size="lg" color="green.700">
        About the Appointment
      </Heading>

      <Text mt={4} color="gray.700">
        This is a safe and non-judgmental space where healing begins from the
        very first session itself. You may reschedule your booking if required.
        <b> Refunds are not available.</b>
      </Text>

      <Box mt={6} p={5} borderRadius="lg" bg="green.50">
        <Text fontWeight="bold">General Counseling</Text>
        <Text mt={2}>₹1199 | Multiple Slots | 55 minutes</Text>
      </Box>
    </Box>
  );
}
