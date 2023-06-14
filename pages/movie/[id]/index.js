import axios from "axios";
import Image from "next/image";
import Meta from "../../../components/Meta";
import CommentSection from '../../../components/Comments';
import { imageServer, apiServer } from "../../../config";

const Movie = ({ movie, comments }) => {
  return (
    <div className="container max-w-4xl mx-auto pt-6 flex flex-col items-center bg-gray-800 text-gray-200 p-10">
      <Meta title={movie.title} />
      <div className="flex items-start bg-gray-700 shadow-lg rounded-lg p-6">
        <Image src={movie.image !== "N/A" ? movie.image : "https://via.placeholder.com/400"} width={300} height={400} className="rounded-md mr-6" alt={movie.title} />
        <div className="text-left">
          <h1 className="font-bold text-xl my-2">{movie.title}</h1>
          <h2 className="font-bold text-lg mt-2">Summary</h2>
          <p className="text-gray-300 text-sm mt-2 overflow-auto">{movie.summary}</p>
          <p className="mt-5 text-gray-300 text-sm">Directors: <span className="font-bold">{movie.director}</span></p>
          <p className="mt-5 text-gray-300 text-sm">Actors: <span className="font-bold">{movie.actors}</span></p>
          <p className="mt-5  text-gray-300 text-sm">Release Year: <span className="font-bold">{movie.year}</span></p>
        </div>
      </div>
      <CommentSection comments={comments} movieId={movie.id}/>
    </div>
  );
};

export async function getStaticProps(context) {
  try {
    const { id } = context.params;
    const movieRes = await axios(`${apiServer}/api/movies/movie/${id}`);
    const movie = movieRes.data;

    const commentRes = await axios(`${apiServer}/api/comments/movie/${id}`);
    const comments = commentRes.data;

    return {
      props: { movie, comments }
    }
  } catch(err) {
    console.log(err);
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const movieRes = await axios(`${apiServer}/api/movies`);
  const movies = movieRes.data;

  const paths = movies.map(movie => ({ params: { id: movie.id.toString() } }));

  return {
    paths,
    fallback: 'blocking' 
  }
}

export default Movie;

