import React from 'react';
import { FlatList } from 'react-native';
import MovieCard from '../listItems/CardDetails';

const MovieList = ({ movies, navigation }) => {
  const renderMovieCard = ({ item }) => {
    return (
      <MovieCard
        label={item.title}
        image={item.image}
        navigation={navigation}
      />
    );
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderMovieCard}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default MovieList;
