import React from "react";
import { useNavigate } from "react-router";

type PokemonType = { type: { name: string } };

export type PokemonCardData = {
  id: number;
  name: string;
  types?: PokemonType[];
  nickname?: string;
};

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

interface PokemonCardProps {
  pokemon: PokemonCardData;
  isFavorite?: boolean;
  onRemove?: (nickname: string) => void;
  captured?: boolean; // ✅ baru
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite = false,
  onRemove,
  captured = false, // default false
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`cursor-pointer rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition relative
        ${
          isFavorite
            ? "bg-gray-800"
            : captured
            ? "bg-green-500/30"
            : "bg-white dark:bg-gray-800"
        }
      `}
      onClick={() => navigate(`/detail/${pokemon.name}`)}
    >
      {/* Tombol hapus jika favorite */}
      {isFavorite && pokemon.nickname && onRemove && (
        <button
          className="absolute top-1 right-1 text-red-500 bg-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(pokemon.nickname!);
          }}
        >
          ×
        </button>
      )}

      {/* Nickname jika favorite */}
      {isFavorite && pokemon.nickname && (
        <p className="text-sm font-semibold text-yellow-400 mb-1">
          {pokemon.nickname}
        </p>
      )}

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
        onError={(e) => {
          (
            e.target as HTMLImageElement
          ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        }}
        alt={pokemon.name}
        className="w-24 h-24 mb-2"
      />

      <p className="capitalize font-medium text-black dark:text-white">
        {pokemon.name}
      </p>

      {pokemon.types && (
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((t, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                typeColors[t.type.name] || "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;

// import React from "react";
// import { useNavigate } from "react-router";

// type PokemonDetail = {
//   id: number;
//   name: string;
//   types: { type: { name: string } }[];
// };

// const typeColors: Record<string, string> = {
//   normal: "bg-gray-400",
//   fire: "bg-red-500 text-white",
//   water: "bg-blue-500 text-white",
//   grass: "bg-green-500 text-white",
//   electric: "bg-yellow-400 text-black",
//   ice: "bg-cyan-400 text-black",
//   fighting: "bg-orange-700 text-white",
//   poison: "bg-purple-500 text-white",
//   ground: "bg-yellow-700 text-white",
//   flying: "bg-indigo-300 text-black",
//   psychic: "bg-pink-500 text-white",
//   bug: "bg-lime-500 text-black",
//   rock: "bg-yellow-800 text-white",
//   ghost: "bg-indigo-700 text-white",
//   dark: "bg-gray-800 text-white",
//   dragon: "bg-indigo-600 text-white",
//   steel: "bg-gray-500 text-white",
//   fairy: "bg-pink-300 text-black",
// };

// const PokemonCard: React.FC<{ pokemon: PokemonDetail }> = ({ pokemon }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="bg-white cursor-pointer dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition"
//       onClick={() => navigate(`/detail/wild/${pokemon.name}`)}
//     >
//       <img
//         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
//         onError={(e) => {
//           (
//             e.target as HTMLImageElement
//           ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
//         }}
//         alt={pokemon.name}
//         className="w-24 h-24 mb-2"
//       />

//       <p className="capitalize font-medium text-black dark:text-white">
//         {pokemon.name}
//       </p>

//       <div className="flex gap-2 mt-2">
//         {pokemon.types?.map((t, i) => (
//           <span
//             key={i}
//             className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
//               typeColors[t.type.name] || "bg-gray-200 dark:bg-gray-700"
//             }`}
//           >
//             {t.type.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PokemonCard;
