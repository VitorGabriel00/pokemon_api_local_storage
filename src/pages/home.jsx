import { useState } from "react";
import "./home.css";
import Botao from "../components/botao"

export default function PokemonSearch() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }
      const data = await response.json();
      setPokemon({
        nome: data.name,
        imagem: data.sprites.front_default,
        tipos: data.types.map((t) => t.type.name).join(", "),
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setPokemon(null);
    }
  };

  const adicionarAosFavoritos = () => {
    if (!pokemon) return;
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.push(pokemon);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Pokémon adicionado aos favoritos!");
  };

  return (
<>
<div className="botao">
  <Botao/>
</div>

    <div className="container">
      <input
        type="text"
        placeholder="Digite o nome ou ID do Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field"
      />
      <button onClick={fetchPokemon} className="button">
        Buscar Pokémon
      </button>

      {error && <p className="error-message">{error}</p>}

      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.nome.toUpperCase()}</h2>
          <img src={pokemon.imagem} alt={pokemon.nome} />
          <p>Tipo: {pokemon.tipos}</p>
          <button onClick={adicionarAosFavoritos} className="favorites-button">
            Adicionar aos Favoritos
          </button>
        </div>
      )}
    </div>
    </>
  );
}
