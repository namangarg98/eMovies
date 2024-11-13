import { useState, useEffect } from "react";

export const useFetch = (apiPath, queryTerm="") => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);
    let pagesToFetch = 1;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    useEffect(() => {
        setData([]);
        setLoading(true); // Start loading
        setError(null);
        async function fetchMovieDetail(){
          const responseData = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${queryTerm}&type=movie`)
          const dataSize = await responseData.json();
          const total = dataSize.totalResults/10;
          console.log("total",total);
          pagesToFetch = total > 2 ? 2 : Math.ceil(total);
        }
        async function fetchMovies(){
          try {
            for (let page = 1; page <= pagesToFetch; page++) {
              const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${queryTerm}&type=movie&page=${page}`);
              const data = await response.json();
              if (data.Response === "True") {
                setData(prevMovies => ([...prevMovies, ...data.Search]));
              } else {
                setError(data.Error);
                // console.log(`Error fetching page ${page}:`, data.Error);
                break;
              }
            }
          }
          catch (error) {
            console.log("Error",error);
            setError("Failed to fetch data");  
          }
          finally {
            setLoading(false); // Stop loading after fetch
          }
        }
        fetchMovieDetail();
        fetchMovies();
      }, [queryTerm])
  const shuffledArray = shuffleArray(data);
  return { shuffledArray, loading, error };
}