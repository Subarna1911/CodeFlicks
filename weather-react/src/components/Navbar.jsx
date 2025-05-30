import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { resetSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = async () => {
    await resetSearch();
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="top-0 left-0 w-full z-50 text-black p-6 flex justify-between items-center bg-white/30 backdrop-blur-lg">
        <div className="text-3xl font-bold mb-2 md:mb-0">
          <Link to="/" className="hover:cursor-pointer" onClick={handleHomeClick}>CatFlex</Link>
        </div>
        <ul className="flex gap-8  text-lg font-bold">
          <li><Link  onClick={handleHomeClick} to="/">Home</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
        </ul>
        <div className="w-full mt-4 md:mt-0 md:w-auto">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
}
