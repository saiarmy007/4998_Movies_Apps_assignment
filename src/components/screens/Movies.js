import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MovieCard from '../listItems/CardDetails';
import { Picker } from '@react-native-picker/picker';

const MOVIE_FILTER = {
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
  upcoming: "upcoming"
}

const MovieScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState([]);
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
        let data = response.results.map(item => ({ id: item.id, title: item.title, releasedate: item.release_date, popularity: item.popularity, image: imagePath + item.poster_path }));
        setMovieData(data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filter}
        mode='dialog'
        onValueChange={(itemValue, itemIndex) =>
          setFilter(itemValue)
        }>
        <Picker.Item label="Now Playing" value={MOVIE_FILTER.nowPlaying} />
        <Picker.Item label="Popular" value={MOVIE_FILTER.popular} />
        <Picker.Item label="Top Rated" value={MOVIE_FILTER.topRated} />
        <Picker.Item label="Upcoming" value={MOVIE_FILTER.upcoming} />
      </Picker>
      <View style={styles.movieGrid}>
        {!isLoading && movieData.map(movie => (
          <MovieCard
            key={movie.id}
            image={movie.image}
            label={movie.title}
            navigation={navigation}
          />
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  movieGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default MovieScreen;
