import axios from "axios";
import Hero from "../components/Hero";
import PopularMovie from "../components/PopularMovie";
import { imageServer, apiServer } from "../config";

export default function Home({ movies }) {
  return (
    <div className="bg-gray-700">
      <Hero />
      <PopularMovie movies={movies} />
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await axios(`${apiServer}/api/movies`);
    const movies = res.data;
  
    return {
      props: { movies }
    }
  } catch (err) {
    console.log(err)
  }
}

