import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
      if (!title){
        title = 'Movie'
      }
        document.title = `${title} / eMovies`;
    });

  return null;
}
