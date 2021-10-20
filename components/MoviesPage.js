import React from "react";
import {SimpleGrid} from "@chakra-ui/react";
import MovieCard from "./MovieCard";

const MoviesPage = ({movies}) => {

    return (
        <SimpleGrid columns={4} spacing={20} padding='10'>
            {movies.map(movie => (
                <MovieCard key={movie._id} {...movie}/>
            ))}
        </SimpleGrid>
    );

};

export default MoviesPage;