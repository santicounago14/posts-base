import { useNavigate, useParams } from "react-router-dom";
import IconButton from "./Shared/IconButton";
import { otrosDetalles } from "../helpers/constants";
import DetallesMedio from "./DetallesMedio";
import HeaderNoticia from "./HeaderNoticia";
import { useState, useEffect } from "react";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const DetalleNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(false);
  //const [noticia, setNoticia] = useState({});

  const {
    data: noticia,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["noticia", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/posts/${id}`).then((res) => res.json()),
  });

  /* useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNoticia(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]); // si cambia el id, que se vuelva a ejecutar el fetch */

  const { mutate: handleFav } = useMutation({
    mutationFn: () =>
      fetch(`https://dummyjson.com/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isFavorite: true,
        }),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noticia", id] });
    },
  });

  /* const handleFav = () => {
    fetch(`https://dummyjson.com/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isFavorite: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => setNoticia(data))
      .catch((error) => console.log(error));
  }; */

  const { mutate: handleDelete } = useMutation({
    mutationFn: () =>
      fetch(`https://dummyjson.com/posts/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
    onSuccess: () => navigate("/"),
  });

  /* const handleDelete = () => {
    fetch(`https://dummyjson.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(navigate("/"))
      .catch((error) => log.error(error));
  }; */

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    ); // cuando se hace el return, no sigue leyendo todo el codigo

  if (isError) return;
  <div className="h-screen w-screen flex justify-center items-center">
    <Message variant="error" message="Error al cargar la noticia" />
  </div>;
  return (
    <section>
      <div className="relative">
        <img
          src={otrosDetalles.bannerImg}
          alt="Portada de la noticia"
          className="w-full h-96 object-cover"
        />
        {
          <div className="fixed top-2 left-0 w-full flex justify-end gap-2 px-3">
            <div className="mr-auto">
              <IconButton onClick={() => navigate(-1)} icon="arrow_back" />
            </div>
            <IconButton onClick={() => handleFav()} icon="bookmark" />
            <IconButton onClick={() => handleDelete()} icon="delete" />
          </div>
        }
        {
          <HeaderNoticia
            titulo={noticia.title}
            categoria={noticia?.tags?.[0]}
            {...otrosDetalles}
          />
        }
      </div>

      <main className="bg-white text-black p-4 rounded-t-2xl mt-[-20px] relative z-10">
        <DetallesMedio {...otrosDetalles.media} />
        <p className="text-sm">{noticia.body} </p>
      </main>
    </section>
  );
};
