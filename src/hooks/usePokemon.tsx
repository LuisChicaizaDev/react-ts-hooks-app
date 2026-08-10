import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {
  // Es de tipo Pokemon o null
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Petición para traer el pokemon
  const getPokemonById = async (id: number) => {
    setIsLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });

    setIsLoading(false);
  };

  // El efecto dispara la petición a get
  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    // Props
    isLoading,
    pokemon,

    formattedId: id.toString().padStart(3, "0"),
  };
};
