// import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = ({ click }) => {
  return (
    <button type="button" className="Button" onClick={click}>
      Load more
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
};

export default Button;
