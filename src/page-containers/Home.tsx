'use client';
import { Card } from '@/components/Card';
import { Image } from '@/components/Image';
import { PeopleResult } from '@/types';
import { AspectRatio, Avatar, Box, Container, Flex, Grid } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import useItemList from '@/hooks/useAtomReducer';
import { TYPES } from '@/utils/enum';
import { Modal, ModalDescription, ModalHeading, ModalTrigger } from '@/components/Modal';
import { Text } from '@/components/Text';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<any>();
  const { theme } = useTheme();
  const { itemList } = useItemList(TYPES.CHARACTER_LIST);
  const trigger = Ariakit.useDialogStore({ animated: true });

  useEffect(() => {
    itemList(people);
  }, [people]);

  console.log('selectedCharacter -> ', selectedCharacter);

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
        alt="background image"
      />

      <div className="bg-[#1b2731] -mt-[60px]">
        <Container size="4">
          <Box className="bg-[#20303d]" p="3">
            <Grid columns="4" gap="4">
              {people?.map((each, key) => {
                return (
                  <Box key={key}>
                    <ModalTrigger
                      onClick={() => {
                        trigger.show();
                        setSelectedCharacter({
                          ...each,
                          key,
                        });
                      }}
                    >
                      <Card data={each} urlId={key} />
                    </ModalTrigger>
                  </Box>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </div>
      <Modal trigger={trigger} className="w-[600px]">
        <ModalHeading>{selectedCharacter?.name}</ModalHeading>
        <ModalDescription>
          <Flex justify="between">
            <Box>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Height</Text>
                <Text>: {selectedCharacter?.height}</Text>
              </div>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Mass</Text>
                <Text>: {selectedCharacter?.mass}</Text>
              </div>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Birth Date</Text>
                <Text>: {selectedCharacter?.birth_year}</Text>
              </div>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Number of films</Text>
                <Text>: {selectedCharacter?.films?.length}</Text>
              </div>
            </Box>
            <Box>
              <Avatar
                size="7"
                width={80}
                height={80}
                src={`https://starwars-visualguide.com/assets/img/characters/${
                  selectedCharacter?.key + 1
                }.jpg`}
                fallback="S"
              />
            </Box>
          </Flex>
        </ModalDescription>
      </Modal>
    </div>
  );
};

export default Home;
