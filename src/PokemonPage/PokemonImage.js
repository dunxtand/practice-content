import React from 'react';


function PokemonImage (props) {
  if (!props.src) {
    return null;
  }

  return <img
    src={props.src}
    alt={props.name}
    className="pokemon-image"
  />;
}

export default PokemonImage;
