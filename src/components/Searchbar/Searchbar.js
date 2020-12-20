import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
// import s from './SearchBar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
    page: 8,
    images: [],
  };

  handleChange = event => {
    this.setState({
      search: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { search } = this.state;

    if (search.trim() === '') {
      toast.info('The field is empty. Please enter a specific query.');
      return;
    }

    this.props.onSubmit(this.state);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
