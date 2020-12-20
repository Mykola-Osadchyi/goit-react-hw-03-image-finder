import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
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
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
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
