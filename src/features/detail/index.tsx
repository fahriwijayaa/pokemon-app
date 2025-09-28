import React from "react";
import PokemonStats from "../../components/pokemon/PokemonStats";
import PokemonInfo from "../../components/pokemon/PokemonInfo";
import PokemonAbilities from "../../components/pokemon/PokemonAbilities";
import PokemonMoves from "../../components/pokemon/PokemonMoves";
import { useNavigate } from "react-router";
import { usePokemonDetail } from "../../hooks/pokemon/usePokemonDetail";
import DetailSkeleton from "../../components/skeleton/DetailSkeleton";

// Warna tipe Pokémon
const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-black",
  ice: "bg-cyan-400 text-black",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-300 text-black",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-black",
  rock: "bg-yellow-800 text-white",
  ghost: "bg-indigo-700 text-white",
  dark: "bg-gray-800 text-white",
  dragon: "bg-indigo-600 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-black",
};

// Ambil pokeName dan status dari URL
const getParamsFromUrl = () => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const pokeName = pathParts[1]; // "pikachu"
  return { pokeName };
};

const DetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { pokeName } = getParamsFromUrl();
  const { pokemon, loading, error, isCaught } = usePokemonDetail({
    name: pokeName || "",
  });

  if (loading) return <DetailSkeleton />;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!pokemon)
    return <div className="p-4 text-center">Data Pokémon tidak ditemukan</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <PokemonInfo pokemon={pokemon} typeColors={typeColors} />
      <PokemonStats stats={pokemon.stats} />
      <PokemonAbilities abilities={pokemon.abilities} />
      <PokemonMoves moves={pokemon.moves} />

      {!isCaught && (
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            onClick={() => navigate(`/battle/${pokemon.name}`)}
            className="px-6 py-2 bg-yellow-400 text-black cursor-pointer rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            Catch!
          </button>
        </div>
      )}

      {isCaught && (
        <div className="col-span-1 md:col-span-2 text-center text-green-400 font-semibold">
          Pokémon ini sudah ditangkap!
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
