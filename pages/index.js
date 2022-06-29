import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GraphQLClient, gql} from 'graphql-request';
import Link from 'next/link';

//Components
import BPCard from "../components/BPCard";


const graphcms = new GraphQLClient('https://api-ca-central-1.graphcms.com/v2/cl4g4ujw70ytc01z65xgxbgmm/master');

const QUERY = gql `
  {
    bodyParts {
      id, 
      title,
      slug,
      coverPhoto {
        url
      }
    }
  }
`
//Generate info from api calls
export async function getStaticProps() {
  const {bodyParts} = await graphcms.request(QUERY);
  return {
    props: {
      bodyParts,
    },
    revalidate: 30,
  };
}

export default function Home({ bodyParts }) {
  return (
    <div className={styles.bigContainer}>
      <Head>
        <title>Digital Scribbles</title>
        <meta name="description" content="A blog tutorial made with JAMstack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <img className={styles.imageBox} src="/bg.jpg"/>
      </div>

      <main className={styles.main}>
        {bodyParts.map((post) => (
          <BPCard
            title={post.title}
            coverPhoto={post.coverPhoto}
            key={post.id}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
