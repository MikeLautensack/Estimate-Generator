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
            <Body className='bg-primary300'>
                <Container>
                    <Section className='border border-secondary800'>
                        <Text className='border border-primary500 font-bold'>
                            Testing resend email login
                        </Text>
                        <Text className='border border-primary500 font-bold'>
                            Login to {host}
                        </Text>
                        <Link
                            href={url}

                        >
                            Sign In
                        </Link>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}

export default EstimateEmail