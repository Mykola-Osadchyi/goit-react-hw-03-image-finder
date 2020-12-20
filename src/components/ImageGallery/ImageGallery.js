import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.props.images.map(item => (
            <ImageGalleryItem
              key={item.id}
              imageUrl={item.webformatURL}
              imageAlt={item.tags}
              imageForModal={item.largeImageURL}
            />
          ))}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
