import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MOVIE_FILTER = {
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
  upcoming: "upcoming"
}

const MovieScreen = ({ navigation }) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(MOVIE_FILTER.nowPlaying);

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
  }, [filter])

  const fetchMovies = () => {
    setIsLoading(true);

    fetch('https://api.themoviedb.org/3/movie/' + filter, options)
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
      }).catch(err => console.error(err));

    setIsLoading(false);
  }

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItemContainer}
      onPress={() => navigation.navigate('Details', { title: item.title, image: item.image })}
    >
      <Image style={styles.movieImage} source={{ uri: item.image }} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Picker
        selectedValue={filter}
        mode='dialog'
        onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Movies Now Playing" value={MOVIE_FILTER.nowPlaying} />
        <Picker.Item label="Most Popular Movies" value={MOVIE_FILTER.popular} />
        <Picker.Item label="Top Rated Movies" value={MOVIE_FILTER.topRated} />
        <Picker.Item label="Upcoming Movies" value={MOVIE_FILTER.upcoming} />
      </Picker>
      {!isLoading && (
        <FlatList
          data={movieData}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          contentContainerStyle={styles.movieListContainer}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default MovieScreen;

const styles = StyleSheet.create({

  picker: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
  },

  movieItemContainer: {
  
    alignItems: 'center',
  
  },
  movieImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  movieTitle: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
  },
});

