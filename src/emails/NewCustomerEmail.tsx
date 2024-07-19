import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";
import { NewCustomerEmailProps } from "../types/email";

const NewCustomerEmail = ({
  url,
  customerName,
  contractorName,
}: NewCustomerEmailProps) => {
  return (
    <Html>
      <Body className="bg-blue-200 rounded-lg flex flex-col gap-32 justify-center items-center p-8">
        <Container className="">
          <Section className="">
            <Text className="text-2xl font-semibold text-black">
              Hello {customerName}, {contractorName} has added you as a new
              customer to Estimate Generator
            </Text>
            <Text className="text-xl font-medium text-black">
              Login to your customer dashboard with the link below
            </Text>
            <Button
              href={url}
              className="p-4 rounded-full bg-amber-400 text-black text-lg"
            >
              Sign In to your customer dashboard
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewCustomerEmail;
