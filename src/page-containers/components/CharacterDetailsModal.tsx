'use client';
import React from 'react';

import { Icons } from '@/components/Image';
import { Modal, ModalDescription, ModalHeading } from '@/components/Modal';
import { Text } from '@/components/Typography';
import { PeopleResult, RelativeFilm, RelativeHomeWorld } from '@/types';
import { Avatar, Box, Flex } from '@radix-ui/themes';

interface Props {
  trigger?: any;
  selectedCharacter: (PeopleResult & { key: number }) | undefined;
  homeWorld: RelativeHomeWorld | undefined;
  films: { data: RelativeFilm[] } | undefined;
  loading: boolean;
}

const CharacterDetailsModal: React.FC<Props> = ({
  trigger,
  selectedCharacter,
  homeWorld,
  films,
  loading,
}: Props) => {
  return (
    <Modal trigger={trigger} className="w-[700px]">
      <ModalHeading>{selectedCharacter?.name}</ModalHeading>
      <ModalDescription>
        <Flex justify="between">
          <Box>
            <div className="flex justify-start items-center">
              <Text className="w-[160px]">Height</Text>
              <Text className="text-[#ff802b]">: {selectedCharacter?.height}m</Text>
            </div>
            <div className="flex justify-start items-center">
              <Text className="w-[160px]">Mass</Text>
              <Text className="text-[#ff802b]">: {selectedCharacter?.mass}kg</Text>
            </div>
            <div className="flex justify-start items-center">
              <Text className="w-[160px]">Created date</Text>
              <Text className="text-[#ff802b]">: {selectedCharacter?.created}</Text>
            </div>
            <div className="flex justify-start items-center">
              <Text className="w-[160px]">Date of birth</Text>
              <Text className="text-[#ff802b]">: {selectedCharacter?.birth_year}</Text>
            </div>
            <div className="flex justify-start items-center">
              <Text className="w-[160px]">Number of films</Text>
              <Text className="text-[#ff802b]">: {selectedCharacter?.films?.length}</Text>
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
          {loading ? (
            <div className="flex justify-center w-full">
              <Icons.loading />
            </div>
          ) : (
            <>
              <Box className="w-1/2">
                <div className="mb-2">
                  <Text as="span" className="border-b-2">
                    Planet
                  </Text>
                </div>
                <div className="space-y-[10px]">
                  <Box>
                    <div className="flex justify-start items-center">
                      <Text className="w-[160px]">Name</Text>
                      <Text className="text-[#ff802b]">: {homeWorld?.name}</Text>
                    </div>
                    <div className="flex justify-start items-center">
                      <Text className="w-[160px]">Terrain</Text>
                      <Text className="text-[#ff802b]">: {homeWorld?.terrain}</Text>
                    </div>
                    <div className="flex justify-start items-center">
                      <Text className="w-[160px]">Climate</Text>
                      <Text className="text-[#ff802b]">: {homeWorld?.climate}</Text>
                    </div>
                    <div className="flex justify-start items-start">
                      <Text className="w-[160px]">Number of residents</Text>
                      <Text className="text-[#ff802b]">: {homeWorld?.residents?.length}</Text>
                    </div>
                  </Box>
                </div>
              </Box>
              <Box className="w-1/2">
                <div className="mb-2">
                  <Text as="span" className="border-b-2">
                    Films
                  </Text>
                </div>
                <div className="space-y-[10px]">
                  {films?.data?.map((each, key) => (
                    <Text key={key} as="p" className="flex items-center justify-start gap-[5px]">
                      <Icons.film />
                      <span>{each?.title}</span>
                    </Text>
                  ))}
                </div>
              </Box>
            </>
          )}
        </Flex>
      </ModalDescription>
    </Modal>
  );
};

export default CharacterDetailsModal;
