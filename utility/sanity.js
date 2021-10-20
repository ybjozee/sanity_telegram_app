import {createClient, createImageUrlBuilder, createPortableTextComponent,} from "next-sanity";

const config = {
    /**
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     *
     * https://nextjs.org/docs/basic-features/environment-variables
     **/
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: '2021-10-12'
    /**
     * Set useCdn to `false` if your application require the freshest possible
     * data always (potentially slightly slower and a bit more expensive).
     * Authenticated request (like preview) will always bypass the CDN
     **/
};

if (!config.projectId) {
    throw Error("The Project ID is not set. Check your environment variables.");
}

if (!config.dataset) {
    throw Error("The dataset name is not set. Check your environment variables.");
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
    ...config,
    // Serializers passed to @sanity/block-content-to-react
    // (https://github.com/sanity-io/block-content-to-react)
    serializers: {},
});

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);