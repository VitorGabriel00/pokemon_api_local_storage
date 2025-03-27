import { useState } from "react";
import "./home.css";
import Botao from "../components/botao";

export default function PokemonSearch() {
  const [busca, setBusca] = useState("");
  const [pokemonEncontrado, setPokemonEncontrado] = useState(null);
  const [mensagemErro, setMensagemErro] = useState(null);

  const buscarPokemon = async () => {
    if (!busca.trim()) return;

    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busca.toLowerCase()}`);
      if (!resposta.ok) {
        throw new Error("Pokémon não encontrado");
      }
      const dados = await resposta.json();
      setPokemonEncontrado({
        nome: dados.name,
        imagem: dados.sprites.front_default,
        tipos: dados.types.map((t) => t.type.name).join(", "),
      });
      setMensagemErro(null);
    } catch (err) {
      setMensagemErro(err.message);
      setPokemonEncontrado(null);
    }
  };

  const adicionarFavorito = () => {
    if (!pokemonEncontrado) return;
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.push(pokemonEncontrado);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Pokémon adicionado aos favoritos!");
  };

  return (
    <>
      <div className="botao">
        <Botao />
      </div>
      <div className="container">
        <input
          type="text"
          placeholder="Digite o nome ou ID do Pokémon"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input-field"
        />
        <button onClick={buscarPokemon} className="button">
          Buscar Pokémon
        </button>
        {mensagemErro && <p className="error-message">{mensagemErro}</p>}
        {pokemonEncontrado && (
          <div className="pokemon-card">
            <h2>{pokemonEncontrado.nome.toUpperCase()}</h2>
            <img src={pokemonEncontrado.imagem} alt={pokemonEncontrado.nome} />
            <p>Tipo: {pokemonEncontrado.tipos}</p>
            <button onClick={adicionarFavorito} className="favorites-button">
              Adicionar aos Favoritos
            </button>
          </div>
        )}
      </div>
    </>
  );
}