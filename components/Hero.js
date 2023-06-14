import Image from "next/image";

const Hero = () => {
  return (
    <div className="text-center bg-gray-800 pb-10 pt-10">
      <div className="w-60 mx-auto bg-white p-4 rounded-lg">
        <Image src={"/home_cinema.png"} width={200} height={200} layout="responsive" alt="home cinema"/>
      </div>
      <h1 className="text-2xl text-gray-200 uppercase font-bold">Welcome to Movie Summaries</h1>
      <p className="text-gray-400">Latest Movies and Summaries, Keep Up With The Current Trend With Ease.</p>
    </div>
  );
};

export default Hero;

