import React from 'react';
import { Box, Button, Center, Divider, Heading, Image, Text, VStack } from 'native-base';

const MovieCard = (props) => {
  const { image, label, navigation } = props;

  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius={8} p={4} mb={4}>
      <VStack space={4} divider={<Divider />}>
        <Center>
          <Heading size="sm" textAlign="center">
            {label}
          </Heading>
          <Image alt={label} source={{ uri: image }} size="xl" mt={2} borderRadius={8} />
          <Button
            onPress={() => {
              navigation.navigate('Details', {
                title: label,
              });
            }}
            size="xl"
            colorScheme="blue"
            mt={2}
          >
            More Details
          </Button>
        </Center>
      </VStack>
    </Box>
  );
};

export default MovieCard;
