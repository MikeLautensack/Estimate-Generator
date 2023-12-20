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

const EstimateEmail = ({ url, host }: emailProps) => {
  return (
    <Html>
        <Tailwind>
            <Body className='bg-primary200'>
                <Container className=''>
                    <Section className=''>
                        <Text className=''>
                            Testing resend email
                        </Text>
                        <Text className=''>
                            Login to {host}
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

export default EstimateEmail