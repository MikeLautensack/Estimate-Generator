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

const EstimateEmail = () => {
  return (
    <Html>
        <Tailwind>
            <Body className='bg-white'>
                <Container>
                    <Section className='border border-secondary800'>
                        <Text className='border border-primary500 font-bold'>
                            Testing email actions
                        </Text>
                        <Button
                            className='border bg-primary500 mx-4'
                        >
                            Accept
                        </Button>
                        <Button
                            className='border bg-primary500 mx-4'
                        >
                            Reject
                        </Button>
                        <Button
                            className='border bg-primary500 mx-4'
                        >
                            Request Change Order
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}

export default EstimateEmail