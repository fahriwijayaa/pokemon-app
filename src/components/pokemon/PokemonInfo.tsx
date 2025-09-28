// PokemonInfo.tsx
import React from "react";
import type { PokemonDetail } from "../../services/pokemon";

type Props = {
  pokemon: PokemonDetail;
  typeColors: Record<string, string>;
};

const PokemonInfo: React.FC<Props> = ({ pokemon, typeColors }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 w-full max-w-full mx-auto">
    <h1 className="font-bold text-2xl uppercase text-center">{pokemon.name}</h1>

    <div className="flex justify-center w-full my-2">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        alt={pokemon.name}
        className="w-40 h-40"
      />
    </div>

    <table className="w-full text-sm text-left mt-2">
      <tbody>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <th className="py-2 pr-4 font-medium text-gray-700 dark:text-gray-300 w-24">
            Weight
          </th>
          <td className="py-2 text-gray-900 dark:text-gray-100">
            {(pokemon.weight * 0.1).toFixed(1)} kg
          </td>
        </tr>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <th className="py-2 pr-4 font-medium text-gray-700 dark:text-gray-300 w-24">
            Height
          </th>
          <td className="py-2 text-gray-900 dark:text-gray-100">
            {(pokemon.height * 0.1).toFixed(1)} m
          </td>
        </tr>
        <tr>
          <th className="py-2 pr-4 font-medium text-gray-700 dark:text-gray-300 w-24">
            Type
          </th>
          <td className="py-2 flex gap-2 flex-wrap">
            {pokemon.types.map((t, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  typeColors[t.type.name.toLowerCase()] ||
                  "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                {t.type.name}
              </span>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default PokemonInfo;
