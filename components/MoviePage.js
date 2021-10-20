import React, {useState} from "react";
import {
    Alert,
    AlertIcon,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Center,
    CloseButton,
    Heading,
    Image,
    Stack
} from "@chakra-ui/react";
import {PortableText, urlFor} from "../utility/sanity";
import Link from 'next/link';
import Team from "./Team";
import {toHtmlFormat} from "../utility/objectFormat";
import {formatDate} from "../utility/dateFormat";
import {makePostRequest} from "../utility/api";


const MoviePage = ({movie}) => {
    const [shouldShowAlert, setShouldShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState(null);

    const hideAlert = () => {
        setAlertContent(null);
        setShouldShowAlert(false);
    };

    const formattedReleaseDate = formatDate(movie.releaseDate);

    const getDetailsFromCastMember = ({characterName, person}) =>
        `${person.name} as ${characterName}`;

    const getDetailsFromCrewMember = ({job, person}) =>
        `${person.name} - ${job}`;

    const sendMovieInfoToUser = async () => {
        const {cast, crew, popularity, overview, title} = movie;
        const detailsToSend = {
            releaseDate: formattedReleaseDate,
            cast: cast.map(getDetailsFromCastMember),
            crew: crew.map(getDetailsFromCrewMember),
            popularity,
            summary: overview[0].children[0].text
        };

        const response = await makePostRequest("/api/share", {
            text: toHtmlFormat(title, detailsToSend),
            parseMode: 'html'
        });

        setAlertContent(response.message);
        setShouldShowAlert(true);
        setTimeout(hideAlert, 3000);
    }

    return (
        <Stack spacing={3} padding='10'>
            {shouldShowAlert && (
                <Alert status="success">
                    <AlertIcon/>
                    {alertContent}
                    <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={hideAlert}
                    />
                </Alert>
            )}

            <Box maxW="3xl" borderRadius="lg" overflow="hidden">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link href="/">
                            <BreadcrumbLink>Movies</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <Link
                            href={`/movies/${movie.slug.current}`}
                        >
                            <BreadcrumbLink>{movie.title}</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Center>
                    <Heading as='h1'>{movie.title}</Heading>
                </Center>

                <Center>
                    <Box p='6'>
                        <Image
                            src={urlFor(movie.poster).width(300).height(300)}
                            alt={`${movie.title} movie poster`}
                        />

                        <Center mt={2}>
                            <Box>
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                >
                                    Released on {formattedReleaseDate}
                                </Box>

                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                >
                                    Popularity: {movie.popularity}
                                </Box>

                                <Center>
                                    <Button
                                        colorScheme="teal"
                                        variant="outline"
                                        mt='1'
                                        onClick={sendMovieInfoToUser}
                                    >
                                        Share details via Telegram
                                    </Button>
                                </Center>
                            </Box>

                        </Center>

                    </Box>
                </Center>

                <Box>
                    <Heading as='h3' size='lg'>Overview</Heading>
                    <PortableText blocks={movie.overview}/>
                </Box>

                <Box pt='10'>
                    <Heading as='h3' size='lg'>Cast</Heading>
                    <Team members={movie.cast} isCast={true}/>
                </Box>

                <Box pt='10'>
                    <Heading as='h3' size='lg'>Crew</Heading>
                    <Team members={movie.crew} isCast={false}/>
                </Box>

            </Box>
        </Stack>
    );

};

export default MoviePage;