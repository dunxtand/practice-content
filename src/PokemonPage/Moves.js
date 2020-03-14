import React from 'react';
import { Link } from 'react-router-dom';
import { deslugify } from '../helpers';
import { Bold } from '../helper-components';


function Moves (props) {
  return (
    <>
      <div>
        <Bold>MOVES</Bold>
      </div>
      {props.moves.map((move, index) => {
        const { name } = move.move;
        const urlArr = move.move.url.split('/');
        const id = urlArr[urlArr.length - 2];

        return (
          <div key={index}>
            <Link to={`/move/${id}`}>
              {deslugify(name)}
            </Link>
          </div>
        );
      })}
    </>
  )
}

export default Moves;
