import React, { useState } from 'react';

const initialState = {
  query: '',
  page: 1,
};

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState(initialState);

  const handleChange = e => {
    setState(prev => ({ ...prev, query: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(state.query);
    reset();
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={state.query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
