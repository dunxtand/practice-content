import React from 'react';


function PokemonImage (props) {
  if (!props.src) {
    return null;
  }

  return <img src={props.src} alt="Pokemon"/>;
}

export default PokemonImage;
