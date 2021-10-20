import {sanityClient} from "../../utility/sanity";
import {groq} from "next-sanity";
import {useRouter} from "next/router";
import Error from "next/error";
import MoviePage from "../../components/MoviePage";

const query = groq`*[_type == "movie" && slug.current == $slug][0]{
  releaseDate, overview, popularity, poster, title, slug,
  'crew': crewMembers[]{_key, department, job, person->{_id, name, image}},
  'cast': castMembers[]{_key, characterName, person->{_id, name, image}}
}`;

const MoviePageContainer = ({movie}) => {
    const router = useRouter();
    if (!(router.isFallback || movie?.slug)) {
        return <Error statusCode={404}/>;
    }

    return <MoviePage movie={movie}/>;
};

export const getStaticProps = async ({params}) => {
    const movie = await sanityClient.fetch(query, {
        slug: params.slug,
    });

    return {
        props: {movie},
    };
}

export const getStaticPaths = async () => {
    const paths = await sanityClient.fetch(
        `*[_type == "product" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: true,
    };
}

export default MoviePageContainer;