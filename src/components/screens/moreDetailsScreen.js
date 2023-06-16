import React from 'react';
import { Image, Text, VStack } from 'native-base';

const DetailScreen = ({ route }) => {
  const { title, image } = route.params;

  return (
    <VStack space={4} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">{title}</Text>
      <Image source={{ uri: image }} alt={title} size="xl" />
    </VStack>
  );
}

export default DetailScreen;
