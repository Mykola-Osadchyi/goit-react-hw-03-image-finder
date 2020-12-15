import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Spinner from '../Loader/Loader';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const apiKey = '18724736-77330c9d8a28eb7073d2e9b7d';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'resolved',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchData !== this.props.searchData) {
      const searchData = this.props.searchData;
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchData}&per_page=12`;
      this.setState({ status: 'pending' });
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Oops.. error'));
        })
        .then(({ hits }) => {
          this.setState({ gallery: hits, status: 'resolved' });
          if (hits.length === 0) {
            toast.error('Images not found');
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { gallery, error, status } = this.state;
    if (status === 'pending') {
      return (
        <>
          <Spinner />
          <div>Loading...</div>
        </>
      );
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {gallery.map(item => (
            <ImageGalleryItem
              key={item.id}
              imageUrl={item.webformatURL}
              imageAlt={item.tags}
              // imageForModal={item.largeImageURL}
            />
          ))}
        </ul>
      );
    }
  }
}

// ImageGallery.propTypes = {
//   key: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   isOnline: PropTypes.bool.isRequired,
// };

export default ImageGallery;
