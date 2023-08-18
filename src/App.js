import { useEffect } from "react";
import {fetchDataFromApi} from "./utils/api";
import {Routes, Route} from "react-router-dom";

import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Detais";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state)=>state.home.url);
  

  const fetchApiConfig = ()=>{
    fetchDataFromApi('/configuration')
    .then((res)=>{
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "w185",

      }
      dispatch(getApiConfiguration(url))
    })
  }

  useEffect(()=>{
    fetchApiConfig();
  }, [])


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path= "/" element={<Home/>} />
        <Route path="/:mediaType/:id" element={<Details/>} />
        <Route path="/search/:query" element={<SearchResult/>} />
        <Route path="/explore/:mediaType/" element={<Explore/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
