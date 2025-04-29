import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Watchlist from './pages/WatchList'
import Navbar from './components/Navbar'
import { MovieProvider } from './contexts/MovieContext'
import MovieDetail from './pages/MovieDetails'


export default function App() {
  return (
   <>
   <MovieProvider>
   <Navbar/>
   <Routes>
    <Route path='/' element = {<Home />} />
    <Route path='/watchlist' element = {<Watchlist />} />
    <Route path="/movie/:id" element = {<MovieDetail />} />
   </Routes>
   </MovieProvider>

   </>
  )
}
