// PokemonAbilities.tsx
import React from "react";
import type { Ability } from "../../services/pokemon";

type Props = {
  abilities: Ability[];
};

const PokemonAbilities: React.FC<Props> = ({ abilities }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 w-full max-w-full mx-auto">
    <h3 className="font-bold text-lg mb-3">Abilities</h3>
    <div className="flex flex-wrap gap-2">
      {abilities.map((a, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full capitalize hover:scale-105 transition-transform"
        >
          {a.ability.name}
        </span>
      ))}
    </div>
  </div>
);

export default PokemonAbilities;
