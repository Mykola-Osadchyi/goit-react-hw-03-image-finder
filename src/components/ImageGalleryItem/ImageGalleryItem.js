import React, { Component } from 'react';

import PropTypes from 'prop-types';
// import s from './ImageGalleryItem.module.css';
// import Modal from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { imageUrl, imageAlt } = this.props;
    return (
      <>
        {/* {this.state.showModal && <Modal />} */}
        <li className="ImageGalleryItem">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="ImageGalleryItem-image"
          />
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
