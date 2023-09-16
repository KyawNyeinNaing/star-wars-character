'use client';
import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import { PeopleResult } from '@/types';
import { Box, Container, Grid } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import React from 'react';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  const { theme } = useTheme();

  return (
    <div>
      {/* <Image
        src="https://lumiere-a.akamaihd.net/v1/images/ahsoka-tentpole-desktop_87875115.jpeg?region=0,0,1600,600"
        width={1600}
        height={600}
        alt="test"
      /> */}
      <Image
        src="https://lumiere-a.akamaihd.net/v1/images/ahsoka-tentpole-desktop-gumstick_840a96c4.jpeg?region=0,0,1600,175"
        width={1600}
        height={175}
        alt="test"
      />
      <div className="bg-[#1b2731] -mt-[60px]">
        <Container size="4">
          <Box className="bg-[#20303d]" p="3">
            <Grid columns="4" gap="4">
              {people?.map((each, key) => (
                <Box key={key}>
                  <Card data={each} urlId={key} />
                </Box>
              ))}
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Home;
