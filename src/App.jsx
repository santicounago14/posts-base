import "./App.css";
import { DetalleNoticia } from "./components/DetalleNoticia";
import Noticias from "./components/Noticias";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Noticias />} />
        <Route path="/noticia/:id" element={<DetalleNoticia />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
