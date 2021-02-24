import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL }) => (
    <li className={s['ImageGalleryItem']} key={id} onClick={() => onClick(id)}>
      <img className={s['ImageGalleryItem-image']} src={webformatURL} alt="" />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
