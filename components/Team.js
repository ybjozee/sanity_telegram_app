import React from "react";
import {urlFor} from "../utility/sanity";
import {Box, Image, SimpleGrid} from "@chakra-ui/react";

const Team = ({members, isCast}) => {

    const defaultImageUrl = "https://bit.ly/3aUzAKZ";

    return (
        <SimpleGrid columns={3} spacing={10} padding='5'>
            {members.map(member => {
                const {name, _key, image} = member.person;
                const imageUrl = image ? urlFor(image).width(50).height(50) :
                    defaultImageUrl;
                const extra = isCast ? member.characterName : member.job;

                return (
                    <Box key={_key}>
                        <Image
                            src={imageUrl}
                            alt={`${name}`}
                            w={50}
                            h={50}
                        />
                        <Box key={1}>{name}</Box>
                        <Box
                            key={2}
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                        >
                            {extra}
                        </Box>
                    </Box>
                )
            })}
        </SimpleGrid>
    );

};

export default Team;