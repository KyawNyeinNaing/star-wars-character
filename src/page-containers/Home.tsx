import { Card, CardContent } from '@/components/Card';
import { Image } from '@/components/Image';
import { PeopleResult } from '@/types';
import React from 'react';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  return (
    <div>
      <Image
        src="https://lumiere-a.akamaihd.net/v1/images/ahsoka-tentpole-desktop_87875115.jpeg?region=0,0,1600,600"
        width={1600}
        height={600}
        alt="test"
      />
      <Image
        src="https://lumiere-a.akamaihd.net/v1/images/ahsoka-tentpole-desktop-gumstick_840a96c4.jpeg?region=0,0,1600,175"
        width={1600}
        height={175}
        alt="test"
      />
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">Username :</p>
            &nbsp;
          </div>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">Bio :</p>
            &nbsp;
          </div>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">Source ID :</p>
            &nbsp;
          </div>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">ID :</p>
            &nbsp;
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
