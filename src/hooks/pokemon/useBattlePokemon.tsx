import { useState, useEffect } from "react";
import {
  catchPokemon,
  getPokemonDetail,
  type PokemonDetail,
} from "../../services/pokemon";

interface UseBattlePokemonProps {
  name: string;
  onSuccess?: () => void; // callback ketika berhasil ditangkap
}

export const useBattlePokemon = ({
  name,
  onSuccess,
}: UseBattlePokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caught, setCaught] = useState(false);
  const [pokemonVisible, setPokemonVisible] = useState(true);
  const [throwing, setThrowing] = useState(false);
  const [showBall, setShowBall] = useState(false);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await getPokemonDetail(name);
      if (!data) {
        setError("No Pokémon found");
        setLoading(false);
        return;
      }

      setPokemon(data);

      const myPokemons = JSON.parse(
        localStorage.getItem("myPokemons") || "[]"
      ) as { name: string; nickname: string }[];

      setCaught(myPokemons.some((p) => p.name === data.name));
      setLoading(false);
    };

    fetchData();
  }, [name]);

  const handleCatch = () => {
    if (!pokemon) return;

    setThrowing(true);
    setShowBall(true);

    setTimeout(() => {
      setThrowing(false);
      setShowBall(false);

      const success = Math.random() < 0.5;
      if (!success) {
        setPokemonVisible(false);
        alert(`${pokemon.name} run away!`);
        return;
      }

      const nickname = prompt(`Give a nickname to ${pokemon.name}:`);
      if (!nickname) {
        alert("Nickname must be filled in!");
        return;
      }

      const isSaved = catchPokemon(pokemon, nickname);
      if (!isSaved) {
        alert("That nickname is already taken, please use another one!");
        return;
      }

      setCaught(true);
      alert(
        `Congratulations! You caught ${pokemon.name} with the nickname “${nickname}”.`
      );

      // langsung kembali ke home
      onSuccess?.();
    }, 1000);
  };

  const handleEscape = () => {
    setPokemonVisible(false);
  };

  return {
    pokemon,
    loading,
    error,
    caught,
    pokemonVisible,
    throwing,
    showBall,
    handleCatch,
    handleEscape,
  };
};
