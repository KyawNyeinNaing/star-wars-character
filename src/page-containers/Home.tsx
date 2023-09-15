import { Card, CardContent } from '@/components/Card';
import { PeopleResult } from '@/types';
import React from 'react';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  return (
    <div>
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              Username :
            </p>
            &nbsp;
          </div>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              Bio :
            </p>
            &nbsp;
          </div>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              Source ID :
            </p>
            &nbsp;
          </div>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              ID :
            </p>
            &nbsp;
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
