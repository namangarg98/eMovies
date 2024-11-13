import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { Card } from "../components";
import Loader from "../components/Loader";


export const MovieList = ({apiPath, title}) => {
  const {shuffledArray:data,loading} = useFetch(apiPath,title);
  useTitle(title);
  if (loading) return <Loader />; // Display loader
  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap other:justify-evenly">    
          { data.map((movie) => (
            <Card movie={movie} />
          )) }          
        </div>
      </section>
    </main>
  )
}
