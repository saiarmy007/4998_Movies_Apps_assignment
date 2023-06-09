import { FlatList } from 'native-base'
import MovieCard from '../listItems/CardDetails'

const MovieList = props => {
  const { movies, navigation } = props
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieCard
          label={item.title}
          image={item.image}
          navigation = {navigation}
        />
      )}
    />
  )
}

export default MovieList

