import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from "./components/HomePage";
import ResultsPage from "./components/ResultsPage";
// import ResultsPage from "./components/ResultsPage";
import "./App.css";

function App() {

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/results">Results</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );

}

export default App;