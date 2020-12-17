import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { imageUrl, imageAlt, imageForModal } = this.props;
    return (
      <>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} image={imageForModal} />
        )}
        <li className="ImageGalleryItem">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="ImageGalleryItem-image"
            onClick={this.toggleModal}
          />
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageForModal: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
