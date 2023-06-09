import { Box, Button, Center, Divider, Heading, Image, Text, VStack } from 'native-base'

const MovieCard = props => {
  const { image, label, source, uri, navigation } = props
  return (
    <Box borderWidth={1}>
      <VStack space={4} divider={<Divider />}>
        <Center>
          <Heading size='xs'>{label}</Heading>
          <Image alt={label} source={{ uri: image }} size='xs' />
          <Button
            onPress={() => {
              navigation.navigate('Details', {
                title:label
              })
            }}
          >
            More Details
          </Button>
        </Center>
      </VStack>
    </Box>
  )
}

export default MovieCard
