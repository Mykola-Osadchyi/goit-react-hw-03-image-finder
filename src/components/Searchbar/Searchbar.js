import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = event => {
    this.setState({
      search: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.search.trim() === '') {
      toast.info('The field is empty. Please enter a specific query.');
      return;
    }

    this.props.onSubmit(this.state.search);
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
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
