import { UpdatedEstimateEmailProps } from "@/types/email";
import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Tailwind,
  Button,
  Head,
  Preview,
  Hr,
} from "@react-email/components";
import * as React from "react";

const UpdatedEstimateEmail = ({
  url,
  customerName,
  contractorName,
}: UpdatedEstimateEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>View your updated estimate!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            {/* <Img
              src={`${baseUrl}/static/stripe-logo.png`}
              width="49"
              height="21"
              alt="Stripe"
            /> */}
            <Text style={heading}>Estimate Generator</Text>
            <Hr style={hr} />
            <Text style={paragraph}>
              {`Hello ${customerName}, ${contractorName} updated one of your estimates!`}
            </Text>
            <Text style={paragraph}>
              Click the link below to view your updated estimate!
            </Text>
            <Button style={button} href={url}>
              View your updated estimate
            </Button>
            {/* <Hr style={hr} /> */}
            {/* <Text style={paragraph}>
              If you haven't finished your integration, you might find our{" "}
              <Link style={anchor} href="https://stripe.com/docs">
                docs
              </Link>{" "}
              handy.
            </Text>
            <Text style={paragraph}>
              Once you're ready to start accepting payments, you'll just need to
              use your live{" "}
              <Link
                style={anchor}
                href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
              >
                API keys
              </Link>{" "}
              instead of your test API keys. Your account can simultaneously be
              used for both test and live requests, so you can continue testing
              while accepting live payments. Check out our{" "}
              <Link style={anchor} href="https://stripe.com/docs/dashboard">
                tutorial about account basics
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Finally, we've put together a{" "}
              <Link
                style={anchor}
                href="https://stripe.com/docs/checklist/website"
              >
                quick checklist
              </Link>{" "}
              to ensure your website conforms to card network standards.
            </Text>
            <Text style={paragraph}>
              We'll be here to help you with any step along the way. You can
              find answers to most questions and get in touch with us on our{" "}
              <Link style={anchor} href="https://support.stripe.com/">
                support site
              </Link>
              .
            </Text>
            <Text style={paragraph}>— The Stripe team</Text> */}
            <Hr style={hr} />
            {/* <Text style={footer}>
              Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
            </Text> */}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UpdatedEstimateEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
  lineHeight: "28px",
  color: "#AFC6FF",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#AFC6FF",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
