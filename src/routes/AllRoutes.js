import { Routes, Route } from "react-router-dom";
import { MovieList, MovieDetail, Search, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
        <Routes>
            <Route path="" element={<MovieList apiPath="movie/comedy" title="comedy" />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="movies/action" element={<MovieList apiPath="movie/action" title="action" />} />
            <Route path="movies/drama" element={<MovieList apiPath="movie/drama" title="drama" />} />
            <Route path="movies/thriller" element={<MovieList apiPath="movie/thriller" title="thriller" />} />
            <Route path="search" element={<Search apiPath="search/movie" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  )
}
