import React from 'react';


function NotFound (props) {
  return (
    <>
      <h3>Page Not Found!</h3>
      <button onClick={props.history.goBack}>
        Back
      </button>
    </>
  );
}

export default NotFound;
