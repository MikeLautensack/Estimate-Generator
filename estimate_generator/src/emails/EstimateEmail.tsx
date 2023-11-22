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
            <Body className='bg-[#d13b90]'>
                <Container className='border border-[#0b0a0a]'>
                    <Section className='border border-[#0b0a0a]'>
                        <Text className='text-[#66c13f] font-bold'>
                            Testing resend email
                        </Text>
                        <Text className='text-[#5e35cf] font-bold'>
                            Login to {host}
                        </Text>
                        <Button
                            href={url}
                            className='border border-[#0b0a0a]'
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