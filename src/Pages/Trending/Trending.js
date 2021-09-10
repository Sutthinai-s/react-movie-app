import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from '../../Components/SingleContent/SingleContent';
import './Trending.css'
import CustomPagination from '../../Components/Pagination/CustomPagination';

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)

    const fetchTrending = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=2031c92c7fb28d758515c2f5e72bd2d2&page=${page}`
        );
    
        setContent(data.results);
      };

      useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
      }, [page]);

    return (
        <div>
            <span className='pageTitle'> Trending </span>
            <div className='trending'>
                {content && content.map((c) => (
                    <SingleContent 
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path} 
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={c.media_type}
                    vote_average={c.vote_average} />
            ))}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending
