import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonBoard.css';
import PokemonDetails from './PokemonDetails';

const PokemonBoard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(pageNumber - 1) * 12}`);
      const pokemonData = response.data.results;
      const numberedPokemonData = await Promise.all(pokemonData.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: response.data.sprites.front_default,
          number: response.data.id,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities.map(ability => ability.ability.name)
        };
      }));
      setPokemonList(numberedPokemonData);
    };

    fetchPokemon();
  }, [pageNumber]);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  }

  return (
    <div>
      {selectedPokemon ? (
        <PokemonDetails pokemon={selectedPokemon} />
      ) : (
        <div className="pokemon-board">
          {pokemonList.map((pokemon) => (
            <div className="pokemon-card" key={pokemon.number} onClick={() => handlePokemonClick(pokemon)}>
              <div className="pokemon-number"># {pokemon.number}</div>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
            </div>
          ))}
          <div className="pagination">
            <button className="previous-button" onClick={handlePreviousPage} disabled={pageNumber === 1}>Previous</button>
            <button className="next-button" onClick={handleNextPage}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonBoard;
