import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container/Container';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
  };

  handleFormSubmit = data => {
    this.setState({ searchQuery: data.search });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchData={this.state.searchQuery}
          pageNumber={this.state.pageNumber}
        />
        <ToastContainer />
      </Container>
    );
  }
}
export default App;
