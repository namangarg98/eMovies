import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { Card } from "../components";
import Loader from "../components/Loader";

export const Search = ({apiPath}) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("t");
  const {shuffledArray : movies, loading, error}  = useFetch(apiPath, queryTerm);

  useTitle(`Search result for ${queryTerm}`);
  if (loading) return <Loader />; // Display loader
  if (error) return <div>Error: {error}</div>; // Display error message if any
  return (
    <main>
      <section className="py-7">
        <p className="text-3xl text-gray-700 dark:text-white">{ movies?.length === 0 ? `No result found for '${queryTerm}'` : `Result for '${queryTerm}'` }</p>
      </section>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">  
          { movies.length>0 ? (movies.map((movie) => (
            <Card movie={movie} />
          ))) :  <div>No movies found.</div> }          
        </div>
      </section>
    </main>
  )
}
