import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

// IMPORT NEXT COMPONENTS
import Header from "@/app/components/header/Header";

// Local Fonts
const geistSans = localFont({

    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",

});
const geistMono = localFont({

    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",

});

// Metadata for SEO
export const metadata = {

    title: "Codify-Club",
    description: "Welcome to Codify Club — where opportunity meets innovation! We're a community of passionate coders, creators, and problem-solvers.",
    keywords: "coding club, programming, student coding, coding education, learn to code, coding workshops, software development, computer science, coding tutorials, tech community, student projects, coding resources, programming languages, hackathons, coding bootcamp, student support",
    author: "Shiva",

};

export default function RootLayout({ children }) {

    return (

        <html lang="en">
            <Head>
                {/* Title and Meta Description */}
                <title>{ metadata.title }</title>
                <meta name="description" content={ metadata.description } />
                <meta name="keywords" content={ metadata.keywords } />
                <meta name="author" content={ metadata.author } />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={ metadata.title } />
                <meta property="og:description" content={ metadata.description } />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={ metadata.title } />
                <meta name="twitter:description" content={ metadata.description } />
                <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
                <link rel="icon" href="/favicon.png" type="png" sizes="any" />

                {/* Fonts */}

            </Head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
                <Header />
                <main>{ children }</main>

            </body>
        </html>

    );

}
