import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, ScrollView, Image } from 'react-native';
import MovieList from '../lists/ListofMovies';
import { Picker } from '@react-native-picker/picker';

const SEARCH_FILTER = {
  movie: "movie",
  multi: "multi"
};

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [filter, setFilter] = useState(SEARCH_FILTER.movie);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzhkNTZmYjIyOGMzMTA5NGU1MzgzN2I4ZWRlOGM4OSIsInN1YiI6IjY0ODMzNDY5ZDJiMjA5MDBhZDNiYTAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZX9t_i4x1PVeacqMJSeK1afAQ_QgEbO2LhGgd083geo'
    }
  };

  const imagePath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  const fetchMovies = () => {
    setIsLoading(true);

    const queryURL = 'https://api.themoviedb.org/3/search/' + filter + "?" + "query=" + encodeURIComponent(searchText);
    console.log(queryURL);
    fetch(queryURL, options)
      .then(response => response.json())
      .then(response => {
        let data = response.results.map(item => ({
          id: item.id,
          title: item.title,
          releasedate: item.release_date,
          popularity: item.popularity,
          image: imagePath + item.poster_path
        }));
        setMovieData(data);
      })
      .catch(err => console.error(err));

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder='search for any movie name...'
      />
      <Button
        onPress={fetchMovies}
        title='Search'
        color='#841584'
      />
      <Picker
        selectedValue={filter}
        mode='dialog'
        onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Movies" value={SEARCH_FILTER.movie} />
        <Picker.Item label="Multi" value={SEARCH_FILTER.multi} />
      </Picker>
      {!isLoading && (
        <ScrollView>
          <MovieList movies={movieData} navigation={navigation} />
        </ScrollView>
      )}
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({

  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },

});

