'use client';
import { Card } from '@/components/Card';
import { Icons, Image } from '@/components/Image';
import { Film, PeopleResult, RelativeFilm, RelativeHomeWorld } from '@/types';
import { AspectRatio, Avatar, Box, Container, Flex, Grid } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import useItemList from '@/hooks/useAtomReducer';
import { TYPES } from '@/utils/enum';
import { Modal, ModalDescription, ModalHeading, ModalTrigger } from '@/components/Modal';
import { Text } from '@/components/Typography';
import BigNumber from 'bignumber.js';
import { FetchAPI } from '@/utils/api';
import { delay } from '@/utils';
import dayjs from 'dayjs';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<PeopleResult & { key: number }>();
  const [films, setFilms] = useState<{ data: RelativeFilm[] }>();
  const [homeWorld, setHomeWorld] = useState<RelativeHomeWorld>();
  const { theme } = useTheme();
  const { itemList } = useItemList(TYPES.CHARACTER_LIST);
  const trigger = Ariakit.useDialogStore({ animated: true });
  const fetchApi = new FetchAPI();
  const [loading, setLoading] = useState<boolean>(false);

  const getFilms = useCallback(async () => {
    setLoading(true);
    setFilms({ data: [] });
    delay(500);
    if (selectedCharacter) {
      const res = await fetchApi.getRelativeFilm('films', selectedCharacter?.films, {
        page: '1',
      });
      setFilms(res);
    }
    setLoading(false);
  }, [selectedCharacter]);

  const getHomeWorld = useCallback(async () => {
    const res = await fetchApi.getRelativeHomeworld('planets', selectedCharacter?.homeworld, {
      page: '1',
    });
    setHomeWorld(res);
  }, [selectedCharacter]);

  useEffect(() => {
    getHomeWorld();
  }, [getHomeWorld]);

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  useEffect(() => {
    itemList(people);
  }, [people]);

  console.log(homeWorld);

  return (
    <div>
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
                          height: new BigNumber(each?.height).dividedBy(100).toFixed(2),
                          created: dayjs(each.created).format('DD-MM-YYYY'),
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
      <Modal trigger={trigger} className="w-[700px]">
        <ModalHeading>{selectedCharacter?.name}</ModalHeading>
        <ModalDescription>
          <Flex justify="between">
            <Box>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Height</Text>
                <Text>: {selectedCharacter?.height}m</Text>
              </div>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Mass</Text>
                <Text>: {selectedCharacter?.mass}kg</Text>
              </div>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Created date</Text>
                <Text>: {selectedCharacter?.created}</Text>
              </div>
              <div className="flex justify-start items-center">
                <Text className="w-[130px]">Date of birth</Text>
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
                  selectedCharacter && selectedCharacter?.key + 1
                }.jpg`}
                fallback="S"
              />
            </Box>
          </Flex>
          <Flex justify="between" className="mt-4">
            <Box className="w-1/2">
              <div className="mb-2">
                <Text as="span" className="border-b-2">
                  Planet
                </Text>
              </div>
              <div className="space-y-[10px]">
                <Box>
                  <div className="flex justify-start items-center">
                    <Text className="w-[130px]">Name</Text>
                    <Text>: {homeWorld?.name}</Text>
                  </div>
                  <div className="flex justify-start items-center">
                    <Text className="w-[130px]">Terrain</Text>
                    <Text>: {homeWorld?.terrain}</Text>
                  </div>
                  <div className="flex justify-start items-center">
                    <Text className="w-[130px]">Climate</Text>
                    <Text>: {homeWorld?.climate}</Text>
                  </div>
                  <div className="flex justify-start items-start">
                    <Text className="w-[130px]">Number of residents</Text>
                    <Text>: {homeWorld?.residents?.length}</Text>
                  </div>
                </Box>
              </div>
            </Box>
            {/* <Box className="w-1/3">Box</Box> */}
            <Box className="w-1/2">
              <div className="mb-2">
                <Text as="span" className="border-b-2">
                  Films
                </Text>
              </div>
              <div className="space-y-[10px]">
                {loading ? (
                  <Icons.loading />
                ) : (
                  films?.data?.map((each, key) => (
                    <Text key={key} as="p" className="flex items-center justify-start gap-[5px]">
                      <Icons.film />
                      <span>{each?.title}</span>
                    </Text>
                  ))
                )}
              </div>
            </Box>
          </Flex>
        </ModalDescription>
      </Modal>
    </div>
  );
};

export default Home;
