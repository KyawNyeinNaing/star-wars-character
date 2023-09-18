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
import CharacterFilter from './components/CharacterFilter';

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
  const [getPeopleData, setGetPeopleData] = useState<PeopleResult[]>();

  const findWithSpecie = findByName(species, selectedValue);
  const findWithHomeWorld = findByName(planets, selectedValue);
  const findWithFlims = findByName(films, selectedValue);

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

  const getRelativePeopleBySpecies = useCallback(async () => {
    setLoading(true);
    delay(500);
    if (findWithSpecie) {
      const res = await fetchApi.getRelativePeople('people', findWithSpecie?.people, {
        page: 1,
      });
      setFilteredData(res);
    }
    setLoading(false);
  }, [findWithSpecie]);

  const getRelativePeopleByHomeWorld = useCallback(async () => {
    setLoading(true);
    delay(500);
    if (findWithHomeWorld) {
      const res = await fetchApi.getRelativePeople('people', findWithHomeWorld?.residents, {
        page: 1,
      });
      setFilteredData(res);
    }
    setLoading(false);
  }, [findWithHomeWorld]);

  const getRelativePeopleByFilms = useCallback(async () => {
    setLoading(true);
    delay(500);
    if (findWithFlims) {
      const res = await fetchApi.getRelativePeople('people', findWithFlims?.characters, {
        page: 1,
      });
      setFilteredData(res);
    }
    setLoading(false);
  }, [findWithFlims]);

  console.log('loading -> ', loading);

  useEffect(() => {
    getRelativeHomeWorld();
  }, [getRelativeHomeWorld]);

  useEffect(() => {
    getRelativeFilms();
  }, [getRelativeFilms]);

  useEffect(() => {
    getRelativePeopleBySpecies();
    getRelativePeopleByHomeWorld();
    getRelativePeopleByFilms();
  }, [getRelativePeopleBySpecies, getRelativePeopleByHomeWorld, getRelativePeopleByFilms]);

  useEffect(() => {
    itemList(people);
  }, [people]);

  useEffect(() => {
    if (filteredData?.data?.length) {
      setGetPeopleData(filteredData?.data);
    } else {
      setGetPeopleData(people);
    }
  }, [people, filteredData?.data]);

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
              <CharacterFilter
                filterData={species}
                selectedValue={setSelectedValue}
                placeholder="Filter with species..."
              />
              <CharacterFilter
                filterData={planets}
                selectedValue={setSelectedValue}
                placeholder="Filter with homeworld..."
              />
              <CharacterFilter
                filterData={films}
                selectedValue={setSelectedValue}
                placeholder="Filter with films..."
              />

              <CharacterSearch />
              <div className="flex items-center gap-x-[10px]">
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
            </div>
            {getPeopleData?.length ? (
              <Grid columns="4" gap="4">
                {getPeopleData?.map((each, key) => {
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
            ) : (
              <Box className="h-[300px] flex justify-center items-center w-full">
                <Icons.loading />
              </Box>
            )}
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
