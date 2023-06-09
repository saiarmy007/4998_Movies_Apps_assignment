import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from '../lists/ListofMovies';

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
                //console.log(response);
                let data = response.results.map(item => ({ id: item.id, title: item.title, releasedate: item.release_date, popularity: item.popularity, image: imagePath + item.poster_path }));
                setMovieData(data);
                //console.log(data);
            })
            .catch(err => console.error(err));

        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TV SHOWS</Text>
            {/* {!isLoading && <MovieList movies={movieData} />} */}
            {/* <StatusBar style="auto" /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default TVShowScreen;
