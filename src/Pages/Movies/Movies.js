import React, { useEffect, useState } from 'react'
import axios from "axios";
import SingleContent from '../../Components/SingleContent/SingleContent';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import Genres from "../../Components/Genres";
import useGenre from "../../hooks/useGenre";




const Movies = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);


    const fetchMovies = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=2031c92c7fb28d758515c2f5e72bd2d2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
      };

      useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
      }, [genreforURL, page]);

    return (
        <div>
            <span className='pageTitle'> Movies </span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className='trending'>
                {content && content.map((c) => (
                    <SingleContent 
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path} 
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type='movie'
                    vote_average={c.vote_average} />
            ))}
            </div>
            {numOfPages > 1 && 
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            }
        </div>
    )
}

export default Movies
