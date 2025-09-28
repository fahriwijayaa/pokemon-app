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
        setError("Pokémon tidak ditemukan");
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
        alert(`${pokemon.name} kabur!`);
        return;
      }

      const nickname = prompt(`Berikan nickname untuk ${pokemon.name}:`);
      if (!nickname) {
        alert("Nickname wajib diisi!");
        return;
      }

      const isSaved = catchPokemon(pokemon, nickname);
      if (!isSaved) {
        alert("Nickname sudah dipakai, gunakan yang lain!");
        return;
      }

      setCaught(true);
      alert(
        `Selamat! Kamu menangkap ${pokemon.name} dengan nickname "${nickname}"`
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
