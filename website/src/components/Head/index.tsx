import NextHead from 'next/head';

const ogImage = 'https://logger.polgubau.com/og.png';

const Head = () => (
  <NextHead>
    {/* Title */}
    <title>Logger</title>
    <meta name="og:title" content="Logger" />

    {/* Description */}
    <meta name="description" content="A complete logging UI and logic for React" />
    <meta name="og:description" content="A complete logging UI and logic for React" />

    {/* Image */}
    <meta name="twitter:image" content={ogImage} />
    <meta name="og:image" content={ogImage} />

    {/* URL */}
    <meta name="og:url" content="https://logger.polgubau.com/" />

    {/* General */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@PolGubau_" />
    <meta name="author" content="Emil Kowalski" />

    {/* Favicons */}
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
  </NextHead>
);

export default Head;
