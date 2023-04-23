import React from 'react';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemon }) => {
  return (
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Number: {pokemon.number}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities: {pokemon.abilities.join(', ')}</p>
    </div>
  );
};

export default PokemonDetails; 





