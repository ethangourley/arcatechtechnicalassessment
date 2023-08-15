import NavBar from "./components/NavBar.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Trending from "./components/Trending";
import Explore from "./components/Explore";
import MovieDetails from "./components/MovieDetail";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
