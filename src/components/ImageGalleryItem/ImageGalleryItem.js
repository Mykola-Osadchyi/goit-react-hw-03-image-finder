import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

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
        <li className={s.ImageGalleryItem}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className={s.ImageGalleryItem_image}
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
