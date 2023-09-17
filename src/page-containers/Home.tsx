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
import CharacterDetailsModal from './components/CharacterDetailsModal';

interface Props {
  people: PeopleResult[];
}

const Home: React.FC<Props> = ({ people }: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<PeopleResult & { key: number }>();
  const [films, setFilms] = useState<{ data: RelativeFilm[] }>();
  const [homeWorld, setHomeWorld] = useState<RelativeHomeWorld | undefined>();
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
        page: 1,
      });
      setFilms(res);
    }
    setLoading(false);
  }, [selectedCharacter]);

  const getHomeWorld = useCallback(async () => {
    setHomeWorld(undefined);
    const res = await fetchApi.getRelativeHomeworld('planets', selectedCharacter?.homeworld, {
      page: 1,
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

      <CharacterDetailsModal
        trigger={trigger}
        selectedCharacter={selectedCharacter}
        homeWorld={homeWorld}
        films={films}
        loading={loading}
      />
    </div>
  );
};

export default Home;
