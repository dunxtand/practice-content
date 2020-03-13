import React from 'react';
import { deslugify } from '../helpers';


function Stats (props) {
  return (
    <>
      <div>
        STATS
      </div>
      {props.stats.map((statObj, index) => {
        const name = statObj.stat.name;
        const amount = statObj.base_stat;
        
        return (
          <div key={index}>
            {deslugify(name)}: {amount}
          </div>
        );
      })}
    </>
  );
}

export default Stats;
