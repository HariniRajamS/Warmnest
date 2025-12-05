"use client";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";

export default function FaqSection() {
  return (
    <Box px={{ base: 6, md: 20 }} py={16}>
      <Heading color="green.700">FAQs</Heading>

      <Accordion allowToggle mt={6}>
        <AccordionItem>
          <AccordionButton>What payment options are available?</AccordionButton>
          <AccordionPanel>
            UPI, Net Banking, Debit cards & Credit cards are supported.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>Will there be a private community?</AccordionButton>
          <AccordionPanel>
            Yes, a private support community will be available.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>Who can benefit from this?</AccordionButton>
          <AccordionPanel>
            Anyone seeking emotional growth and mental clarity.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
