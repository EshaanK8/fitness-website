import styles from '../../styles/Slug.module.css'
import {GraphQLClient, gql} from 'graphql-request';
import YoutubeEmbed from "../../components/YoutubeEmbed";

const graphcms = new GraphQLClient('https://api-ca-central-1.graphcms.com/v2/cl4g4ujw70ytc01z65xgxbgmm/master');

const QUERY = gql`
  query Exercise($slug: String!) {
    exercise(where: { slug: $slug }) {
      id
      title
      slug
      video
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    exercises(first: 36) {
      slug,
    }
  }
`;

export async function getStaticPaths() {
  const { exercises } = await graphcms.request(SLUGLIST);
  return {
    paths: exercises.map((exercise) => ({ params: { slug: exercise.slug } })),
    fallback: false,
  };
}

//Generate info from api calls
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const exercise = data.exercise;
  return {
    props: {
      exercise,
    },
    revalidate: 30,
  };
}

export default function Post({exercise}) {
  return (
    <main className={styles.blog}>
      <img src={exercise.coverPhoto.url} className={styles.cover} alt=""/>
      <div className={styles.title}>
      </div>
      <h2>{exercise.title}</h2>
      <div className={styles.content} dangerouslySetInnerHTML={{__html: exercise.content.html}}></div>
      <YoutubeEmbed embedId={exercise.video} />
    </main>
  )
}