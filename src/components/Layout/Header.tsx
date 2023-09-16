import { Container, Grid } from '@radix-ui/themes';
import React from 'react';
import { Image, Icons } from '../Image';
import { Input } from '../Input';

const Header: React.FC = () => {
  return (
    <Container size="4">
      <Grid columns="1">
        <div className="flex justify-between items-center py-[20px]">
          <div>
            <Image
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
              width={184}
              height={80}
              alt="logo"
            />
          </div>
          <div className="flex items-center justify-start border-none rounded-[5px] h-[40px] outline-none text-white text-[16px] relative">
            {/* <input className="h-full outline-none pl-[16px]" type="text" /> */}
            <Input />
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default Header;
