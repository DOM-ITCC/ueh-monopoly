import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import LoginPage from './pages/Account/Login';
import Layout from './pages/Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="account">
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
