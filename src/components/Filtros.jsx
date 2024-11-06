import Pill from "./Shared/Pill";
import Search from "./Shared/Search";
//import { categories } from "../helpers/constants";
import { useEffect, useState } from "react";

const Filtros = (props) => {
  const { selectedCategory, setSelectedCategory, search, setSearch } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts/tag-list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(["all", ...data]);
      });
  }, []);
  return (
    <>
      <Search
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <section className="flex gap-1 w-full overflow-y-auto no-scrollbar">
        {categories.map((category, i) => (
          <Pill
            key={i}
            label={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </section>
    </>
  );
};

export default Filtros;
