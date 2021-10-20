import {sanityClient} from "../utility/sanity";
import MoviesPage from "../components/MoviesPage";
import {groq} from "next-sanity";

const query = groq`*[_type == "movie" && defined(slug.current)]`;

const Home = ({movies}) => {
    return (
        <MoviesPage movies={movies}/>
    )
}

export const getStaticProps = async () => {
    const movies = await sanityClient.fetch(query);
    return {
        props: {
            movies,
        },
    };
}

export default Home;
