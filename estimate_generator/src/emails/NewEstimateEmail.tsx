import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
  Tailwind,
  Button
} from '@react-email/components';
import * as React from 'react';

const NewEstimateEmail = ({ 
    url, 
    host, 
    customerName, 
    contractorName 
  }: NewEstimateEmailProps) => {
  return (
    <Html>
        <Tailwind>
            <Body className='bg-primary200'>
                <Container className=''>
                    <Section className=''>
                        <Text className=''>
                            Hello {customerName}, {contractorName} has created a new work estimate
                        </Text>
                        <Text className=''>
                            Login to with the link below to view the estimate
                        </Text>
                        <Button
                            href={url}
                            className='border-solid border border-[#0b0a0a]'
                        >
                            Sign In
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}

export default NewEstimateEmail