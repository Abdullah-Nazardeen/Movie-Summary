import Link from 'next/link';

const NotFound = () => {
   
  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1 className="font-bold text-blue-600 text-9xl">404</h1>
      <h6 className="text-5xl font-bold text-gray-600">
        <span className="text-red-500">Oops!</span> Page not found
      </h6>
      <p className="text-gray-500 mt-3">{" The page you're looking for dosen't exist."}</p>
      <Link href="/" className="bg-blue-100 text-blue-800 mt-5 font-semibold px-6 py-2 text-sm">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
