import { Link } from "react-router-dom";
import Backup from "../assets/images/backup.png"

export const Card = ({movie}) => {
  const {imdbID, Title, Poster} = movie;
  const image = Poster ? Poster : Backup ;

  return (
    <div className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
        <Link to={`/movie/${imdbID}`}>
            <img className="rounded-t-lg" src={image} alt="" />
        </Link>
        <div className="p-5">
            <Link to={`/movie/${imdbID}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Title}</h5>
            </Link>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p> */}
        </div>
    </div>
  )
}
