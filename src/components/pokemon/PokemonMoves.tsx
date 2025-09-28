// PokemonMoves.tsx
import React from "react";
import type { Move } from "../../services/pokemon";

type Props = {
  moves: Move[];
  limit?: number;
};

const PokemonMoves: React.FC<Props> = ({ moves, limit = 10 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 w-full max-w-full mx-auto">
    <h3 className="font-bold text-lg mb-3">Moves</h3>
    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
      {moves.slice(0, limit).map((m, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-full capitalize hover:scale-105 transition-transform"
        >
          {m.move.name}
        </span>
      ))}
    </div>
  </div>
);

export default PokemonMoves;
