'use client';
import { Card } from '@/components/Card';
import { Icons, Image } from '@/components/Image';
import {
  Film,
  FilmResult,
  PeopleResult,
  PlanetResult,
  RelativeFilm,
  RelativeHomeWorld,
  SpeciesResult,
} from '@/types';
import { Box, Container, Grid } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import useItemList from '@/hooks/useAtomReducer';
import { TYPES } from '@/utils/enum';
import { ModalTrigger } from '@/components/Modal';
import { Text } from '@/components/Typography';
import BigNumber from 'bignumber.js';
import { FetchAPI, ParameterType } from '@/utils/api';
import { delay, findByName } from '@/utils';
import dayjs from 'dayjs';
import CharacterDetailsModal from './components/CharacterDetailsModal';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import CharacterSearch from './components/CharacterSearch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';

interface Props {
  people: PeopleResult[];
  planets: PlanetResult[];
  species: SpeciesResult[];
  films: FilmResult[];
  search?: string;
  page?: number;
}

const Home: React.FC<Props> = ({
  people,
  planets,
  films,
  species,
  search = '',
  page = 1,
}: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<PeopleResult & { key: number }>();
  const [relativeFilms, setRelativeFilms] = useState<{ data: RelativeFilm[] }>();
  const [homeWorld, setHomeWorld] = useState<RelativeHomeWorld | undefined>();
  const { theme } = useTheme();
  const { itemList } = useItemList(TYPES.CHARACTER_LIST);
  const trigger = Ariakit.useDialogStore({ animated: true });
  const fetchApi = new FetchAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [filteredData, setFilteredData] = useState<any>();
  const findSpecie = findByName(species, selectedValue);

  const getRelativeFilms = useCallback(async () => {
    setLoading(true);
    setRelativeFilms({ data: [] });
    delay(500);
    if (selectedCharacter) {
      const res = await fetchApi.getRelativeFilm('films', selectedCharacter?.films, {
        page: 1,
      });
      setRelativeFilms(res);
    }
    setLoading(false);
  }, [selectedCharacter]);

  const getRelativeHomeWorld = useCallback(async () => {
    setHomeWorld(undefined);
    const res = await fetchApi.getRelativeHomeworld('planets', selectedCharacter?.homeworld, {
      page: 1,
    });
    setHomeWorld(res);
  }, [selectedCharacter]);

  const getRelativePeople = useCallback(async () => {
    const res = await fetchApi.getRelativePeople('people', findSpecie?.people, {
      page: 1,
    });
    setFilteredData(res);
  }, [findSpecie]);

  useEffect(() => {
    getRelativeHomeWorld();
  }, [getRelativeHomeWorld]);

  useEffect(() => {
    getRelativeFilms();
  }, [getRelativeFilms]);

  useEffect(() => {
    getRelativePeople();
  }, [getRelativePeople]);

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
          <Box className="bg-[#20303d] space-y-[12px]" p="3">
            <div className="flex items-center justify-end gap-x-[10px]">
              <Select
                onValueChange={value => {
                  setSelectedValue(value);
                }}
              >
                <SelectTrigger className="h-8 w-[200px]">
                  <SelectValue placeholder="Filter with Species..." />
                </SelectTrigger>
                <SelectContent side="top">
                  {species?.map((each, key) => {
                    return (
                      <SelectItem key={key} value={each?.name}>
                        {each?.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-8 w-[200px]">
                  <SelectValue placeholder="Filter with Homeworld..." />
                </SelectTrigger>
                <SelectContent side="top">
                  {planets?.map((each, key) => (
                    <SelectItem key={key} value={each?.name}>
                      {each?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-8 w-[200px]">
                  <SelectValue placeholder="Filter with Films..." />
                </SelectTrigger>
                <SelectContent side="top">
                  {films?.map((each, key) => (
                    <SelectItem key={key} value={each?.title}>
                      {each?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <CharacterSearch />

              <Link
                href={{
                  pathname: '/',
                  query: {
                    ...(search ? { search } : {}),
                    page: page > 1 ? page - 1 : 1,
                  },
                }}
                className={cn(
                  'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                  page <= 1 && 'pointer-events-none opacity-50'
                )}
              >
                Previous
              </Link>
              <Link
                href={{
                  pathname: '/',
                  query: {
                    ...(search ? { search } : {}),
                    page: page + 1,
                  },
                }}
                className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
              >
                Next
              </Link>
            </div>
            <Grid columns="4" gap="4">
              {people?.length ? (
                people?.map((each, key) => {
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
                })
              ) : (
                <Box className="h-[300px]">
                  <Text color="crimson" size="4">
                    No data found!
                  </Text>
                </Box>
              )}
            </Grid>
          </Box>
        </Container>
      </div>

      <CharacterDetailsModal
        trigger={trigger}
        selectedCharacter={selectedCharacter}
        homeWorld={homeWorld}
        films={relativeFilms}
        loading={loading}
      />
    </div>
  );
};

export default Home;
