import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hook/useFetch';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Img from "../../../components/lazyload/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import "./heroBanner.scss";

const HeroBanner = () => {
    const navigate = useNavigate();
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");

    const {data, loading} = useFetch("/movie/upcoming");
    
    const {url} = useSelector((state)=> state.home)
    

    const searchQueryHandler = (event) =>{
        if(event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`);
        }
    }

    useEffect(()=>{
        const bg =  url.backdrop +  data?.results[parseInt(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
        console.log(background);
    }, [data])

  return (
    <div className='heroBanner'>
        
        {!loading && <div className="backdrop-img">
            <Img src={background}/>
        </div>
        }
        <div className="opacity-layer">

        </div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">
                    Millions of movies, TV shows and people
                    to discover.
                    Explore now.
                </span>
                <div className="searchInput">
                    <input type="text"
                        placeholder='Searches for movies and TV shows...'
                        onKeyUp={(event)=>searchQueryHandler(event)}
                        onChange={(event)=> setQuery(event.target.value)}
                    />
                    
                    <button>
                        Search
                    </button>
                </div>
            </div>
        </ContentWrapper>        
    </div>
  )
}

export default HeroBanner
