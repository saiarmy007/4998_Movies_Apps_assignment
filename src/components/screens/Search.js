import { StyleSheet, TextInput, View, Button, FlatList } from 'react-native'
import React from 'react'
import MovieCard from '../listItems/CardDetails';
import { Picker } from '@react-native-picker/picker';

const SEARCH_FILTER = {
  movie: "movie",
  multi: "multi"
}

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [movieData, setMovieData] = React.useState([]);
  const [filter, setFilter] = React.useState(SEARCH_FILTER.movie);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzhkNTZmYjIyOGMzMTA5NGU1MzgzN2I4ZWRlOGM4OSIsInN1YiI6IjY0ODMzNDY5ZDJiMjA5MDBhZDNiYTAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZX9t_i4x1PVeacqMJSeK1afAQ_QgEbO2LhGgd083geo'
    }
  };

  const imagePath = "https://image.tmdb.org/t/p/original/";

  React.useEffect(() => {
    fetchMovies();
  }, [filter])

  const fetchMovies = () => {
    setIsLoading(true);

    const queryURL = 'https://api.themoviedb.org/3/search/' + filter + "?" + "query=" + encodeURIComponent(searchText);
    console.log(queryURL)
    fetch(queryURL, options)
      .then(response => response.json())
      .then(response => {
        let data = response.results.map(item => ({ id: item.id, title: item.title, releasedate: item.release_date, popularity: item.popularity, image: imagePath + item.poster_path }));
        setMovieData(data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder='i.e James Bond'
      />
      <Button
        onPress={fetchMovies}
        title='Search'
      />
      <Picker
        selectedValue={filter}
        mode='dialog'
        onValueChange={(itemValue, itemIndex) =>
          setFilter(itemValue)
        }>
        <Picker.Item label="Movies" value={SEARCH_FILTER.movie} />
        <Picker.Item label="Multi" value={SEARCH_FILTER.multi} />
      </Picker>
      <FlatList
        data={movieData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <MovieCard
            image={item.image}
            label={item.title}
            navigation={navigation}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchScreen;
