import Noticia from "./Noticia";
import Filtros from "./Filtros";
import { useState, useEffect } from "react";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";
import { useQuery } from "@tanstack/react-query";

const Noticias = () => {
  //const [noticias, setNoticias] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  /* useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/posts/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search]); */

  const {
    data: noticias,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["noticias", search],
    queryFn: () =>
      fetch(`https://dummyjson.com/posts/search?q=${search}`).then((res) =>
        res.json()
      ),
  });

  const filteredNoticias = noticias?.posts?.filter(
    (post) => selectedCategory === "all" || post.tags[0] === selectedCategory
  );

  return (
    <section className="pt-8 px-4 flex flex-col gap-6">
      <header>
        <h1 className="text-4xl font-semibold">Discover</h1>
        <p className="text-xs text-gray-500">News from all around the world</p>
      </header>
      <Filtros
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
      />
      {isLoading && <Loader />}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNoticias?.map((noticia) => (
          <Noticia
            key={noticia.id}
            id={noticia.id}
            titulo={noticia.title}
            categoria={noticia.tags[0]}
          />
        ))}
      </section>
      {filteredNoticias?.length === 0 && (
        <Message variant="info" message="No hay noticias disponibles" />
      )}
      {isError && (
        <Message variant="error" message="Error al cargar las noticias" />
      )}
    </section>
  );
};

export default Noticias;
