import { Text } from "native-base"

const DetailScreen = ({route}) => {
  return (
    <Text>{route.params.title}</Text>
  )
}

export default DetailScreen