import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import Backup from "../assets/images/backup.png"
import Loader from "../components/Loader";

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  //eslint-disable-next-line
  const pageTitle = useTitle(movie.title);

  const image = movie.Poster ? movie.Poster : Backup ;

  useEffect(() => {
    async function fetchMovie(){
      setLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${params.id}&plot=short`);
      const json = await response.json()
      setMovie(json);
      setLoading(false);
    }
    fetchMovie();
  }, [params.id]);

  if (loading) return <Loader />; 
  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie.Title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{movie.Title}</h1>
          <p className="my-4">{movie.Plot}</p>
            { movie.Genre ? (
              <p className="my-7 flex flex-wrap gap-2">
              { movie.Genre.split(",").map((genre) => (
                <span className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2">{genre}</span>
              )) }
            </p>
            ) : "" }
          
          <div className="flex items-center">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-gray-900 dark:text-white">{movie.imdbRating}</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span className="text-gray-900 dark:text-white">{movie.imdbVotes} reviews</span>
          </div>

          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie.Runtime}.</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Box Office Collection:</span>
            <span>{movie.BoxOffice}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Director:</span>
            <span>{movie.Director}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Release Date:</span>
            <span>{movie.Released}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">IMDB Code:</span>
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">{movie.imdbID}</a>
          </p>

        </div>
      </section>
    </main>
  )
}
