import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Spinner from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

const apiKey = '18724736-77330c9d8a28eb7073d2e9b7d';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'resolved',
    galleryPage: 1,
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchData !== this.props.searchData) {
      this.setState({
        status: 'pending',
        // galleryPage: this.props.pageNumber,
        // gallery: [],
      });
      this.getImages();
    }
  }

  getImages = () => {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${this.props.searchData}&page=${this.state.galleryPage}&image_type=photo&orientation=horizontal&per_page=4`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Oops.. error'));
      })
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.error('Images not found');
          this.setState({ showBtn: false, status: 'resolved' });
        } else {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
            status: 'resolved',
            showBtn: true,
          }));
          if (this.state.galleryPage !== 1) {
            this.scrollToBottom();
          }
          this.incrementPage();
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  incrementPage = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  loadMoreImages = () => {
    this.getImages();
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { gallery, error, status } = this.state;
    if (status === 'pending') {
      return (
        <div className="spinner">
          <Spinner />
          <span>Loading...</span>
        </div>
      );
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {gallery.map(item => (
              <ImageGalleryItem
                key={item.id}
                imageUrl={item.webformatURL}
                imageAlt={item.tags}
                imageForModal={item.largeImageURL}
              />
            ))}
          </ul>
          {this.state.showBtn && <Button click={this.loadMoreImages} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchData: PropTypes.string.isRequired,
  // pageNumber: PropTypes.number.isRequired,
};

export default ImageGallery;
