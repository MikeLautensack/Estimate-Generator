import { NewEstimateEmailProps } from "@/types/email";
import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Tailwind,
  Button,
} from "@react-email/components";
import * as React from "react";

const NewEstimateEmail = ({
  url,
  customerName,
  contractorName,
}: NewEstimateEmailProps) => {
  return (
    <Html>
      <Tailwind>
      <Body className="bg-blue-200 rounded-lg flex flex-col gap-32 justify-center items-center p-8">
        <Container className="">
          <Section className="">
            <Text className="text-2xl font-semibold text-black">
              Hello {customerName}, {contractorName} has created a new work
              estimate
            </Text>
            <Text className="text-xl font-medium text-black">
              Login to view your estimate with the link below
            </Text>
            <Button
              href={url}
              className="p-4 rounded-full bg-amber-400 text-black text-lg"
            >
              View your estimate!
            </Button>
          </Section>
        </Container>
      </Body>
      </Tailwind>
      
    </Html>
  );
};

export default NewEstimateEmail;
