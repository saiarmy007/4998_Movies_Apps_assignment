import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';


const TVShowScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState([]);

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
  }, []);

  const fetchMovies = () => {
    setIsLoading(true);

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
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

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItemContainer}>
      <Image style={styles.movieImage} source={{ uri: item.image }} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>TV SHOWS</Text>
      {!isLoading && (
        <FlatList
          data={movieData}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
       
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  movieItemContainer: {
    flex: 0.5,
    alignItems: 'center',

   },
  movieImage: {
    width: '90%',
    height: 100,

  },
  movieTitle: {
    color: 'black',

  },
});

export default TVShowScreen;
