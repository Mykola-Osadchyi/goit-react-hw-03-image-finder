import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container/Container';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { toast } from 'react-toastify';
import Spinner from './components/Loader/Loader';
import Button from './components/Button/Button';

class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    images: [],
    showBtn: false,
    error: null,
    status: 'idle',
    isLoading: false,
    apiKey: '18724736-77330c9d8a28eb7073d2e9b7d',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        status: 'pending',
        images: [],
      });
      this.getImages();
    }
    if (this.state.pageNumber !== prevState.pageNumber) {
      this.getImages();
    }
  }

  getImages = () => {
    const { apiKey, searchQuery, pageNumber } = this.state;
    this.setState({ isLoading: true, showBtn: false });
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&page=${pageNumber}&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Oops.. error'));
      })
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.error('Images not found or no more images');
          this.setState({
            status: 'resolved',
            isLoading: false,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
            showBtn: true,
            isLoading: false,
          }));
          if (this.state.pageNumber !== 1) {
            this.scrollToBottom();
          }
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handleFormSubmit = data => {
    this.setState({
      searchQuery: data.search,
      pageNumber: 1,
    });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, error, status } = this.state;
    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
        </Container>
      );
    }
    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <div className="spinner">
            <Spinner />
          </div>
        </Container>
      );
    }
    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <div>{error.message}</div>
        </Container>
      );
    }
    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} />
          {this.state.isLoading && (
            <div className="spinner">
              <Spinner />
            </div>
          )}
          {this.state.showBtn && <Button click={this.incrementPage} />}
          <ToastContainer />
        </Container>
      );
    }
  }
}
export default App;
