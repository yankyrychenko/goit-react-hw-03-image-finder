import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Modal from './components/Modal';
import Button from './components/Button';
import Loader from 'react-loader-spinner';
import { fetchImages } from './services/pixabay-api';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    largeImage: '',
    currentPage: 1,
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) this.onFetchImages();
  }

  onSearchImages = query => {
    this.setState({
      images: [],
      searchQuery: query,
      currentPage: 1,
    });
  };

  onFetchImages = e => {
    this.setState({ isLoading: true });

    fetchImages(this.state.searchQuery, this.state.currentPage)
      .then(fetchedImages => {
        this.setState(prevState => ({
          images: [...prevState.images, ...fetchedImages],
          currentPage: prevState.currentPage + 1,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  openImage = currentId => {
    const currentImg = this.state.images.find(image => image.id === currentId);
    this.setState({ largeImage: currentImg.largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const shouldRenderLoadMoreButton =
      this.state.images.length > 0 && !this.state.isLoading;

    return (
      <>
        <Searchbar onSubmit={this.onSearchImages} />

        <ImageGallery>
          <ImageGalleryItem
            images={this.state.images}
            onClick={this.openImage}
          />
        </ImageGallery>

        {shouldRenderLoadMoreButton && <Button onClick={this.onFetchImages} />}

        {this.state.isLoading && (
          <Loader type="Circles" color="#3f51b5" height={80} width={80} />
        )}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal} src={this.state.largeImage}></Modal>
        )}
      </>
    );
  }
}

export default App;
