import { Outlet, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import CountryInfoDetails from "./pages/CountryInfoPage.jsx";
import FlagQuizPage from "./pages/FlagQuizPage.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Country/:info" element={<CountryInfoDetails />} />
          <Route path="/Quiz" element={<FlagQuizPage />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
