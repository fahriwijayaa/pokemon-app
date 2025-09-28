import React from "react";
import { useSearchParams } from "react-router";
import PokemonGrid from "../../components/pokemon";
import Pagination from "../../components/pagination";
import Skeleton from "../../components/skeleton";
import { usePokemons } from "../../hooks/pokemon/usePokemons";

const HomeScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit")) || 20;
  const offset = Number(searchParams.get("offset")) || 0;

  const { pokemons, loading } = usePokemons({ offset, limit });

  const myPokemons = JSON.parse(localStorage.getItem("myPokemons") || "[]") as {
    name: string;
    nickname: string;
  }[];

  const TOTAL_POKEMON = 1300;

  const handleSetOffset = (newOffset: number) => {
    const maxOffset = TOTAL_POKEMON;
    const safeOffset = Math.max(0, Math.min(newOffset, maxOffset));
    setSearchParams({ limit: String(limit), offset: String(safeOffset) });
  };

  return (
    <div className="p-2">
      {loading ? (
        <Skeleton limit={limit} />
      ) : (
        <PokemonGrid
          pokemons={pokemons}
          capturedPokemons={myPokemons.map((p) => p.name)}
        />
      )}

      <Pagination offset={offset} limit={limit} setOffset={handleSetOffset} />
    </div>
  );
};

export default HomeScreen;
