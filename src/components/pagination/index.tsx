import React from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface Props {
  offset: number;
  limit: number;
  setOffset: (newOffset: number) => void;
}

const TOTAL_POKEMON = 1300;

const Pagination: React.FC<Props> = ({ offset, limit, setOffset }) => {
  return (
    <div className="relative flex items-center justify-between my-7">
      {/* Prev Button */}
      <button
        onClick={() => setOffset(Math.max(offset - limit, 0))}
        disabled={offset === 0}
        className={`absolute left-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition ${
          offset === 0
            ? "opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-500"
            : "hover:text-yellow-400 text-gray-800 dark:text-white"
        }`}
      >
        <FaCaretLeft size={30} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => setOffset(offset + limit)}
        disabled={offset + limit > TOTAL_POKEMON}
        className={`absolute right-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition ${
          offset + limit > TOTAL_POKEMON
            ? "opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-500"
            : "hover:text-yellow-400 text-gray-800 dark:text-white"
        }`}
      >
        <FaCaretRight size={30} />
      </button>
    </div>
  );
};

export default Pagination;
