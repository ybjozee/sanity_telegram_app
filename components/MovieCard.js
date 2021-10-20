import React from "react";
import {Box, Image} from "@chakra-ui/react";
import {urlFor} from "../utility/sanity";
import Link from 'next/link';
import {formatDate} from "../utility/dateFormat";

const MovieCard = ({_id, title, poster, releaseDate, slug}) => {

    return (
        <Link href={`/movies/${slug.current}`}>
            <a>
                <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Image
                        src={urlFor(poster).width(300).height(300)}
                        alt={`${title} movie poster`}
                    />
                    <Box p='6'>
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h3"
                            isTruncated
                        >
                            {title}
                        </Box>

                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                        >
                            Released on {formatDate(releaseDate)}
                        </Box>
                    </Box>
                </Box>
            </a>
        </Link>
    );

};

export default MovieCard;