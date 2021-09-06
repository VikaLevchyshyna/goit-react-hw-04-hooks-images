import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import LoaderSpinner from './Loader/Loader';
import fetchPhotos from '../services/ApiService';

const initialState = {
  hits: [],
  currentPage: 1,
  searchQuery: '',
  largeImageURL: '',
  isLoading: false,
};

const App = () => {
  const [state, setState] = useState(initialState);

  const onChangeQuery = query => {
    setState(prev => ({
      ...prev,
      searchQuery: query,
      currentPage: 1,
      hits: [],
    }));
  };

  const fetchHits = () => {
    const { currentPage, searchQuery } = state;

    const options = {
      searchQuery,
      currentPage,
    };

    setState(prev => ({ ...prev, isLoading: true }));

    fetchPhotos(options)
      .then(hits => {
        setState(prev => ({
          ...prev,
          hits: [...prev.hits, ...hits],
          currentPage: prev.currentPage + 1,
        }));
      })
      .catch(error => {
        setState(prev => ({ ...prev, error }));
      })
      .finally(() => {
        setState(prev => ({ ...prev, isLoading: false }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  useEffect(() => {
    state.searchQuery && fetchHits(state.searchQuery);
  }, [state.searchQuery]);

  const toggleModal = url => {
    setState(prev => ({ ...prev, largeImageURL: url }));
  };

  const { hits, isLoading, largeImageURL } = state;

  return (
    <div className="App">
      <Searchbar onSubmit={onChangeQuery} />
      {largeImageURL && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ImageGallery hits={state.hits} onClick={toggleModal} />
      {hits.length > 0 && !isLoading && <Button fetchHits={fetchHits} />}
      {isLoading && <LoaderSpinner />}
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     hits: [],
//     currentPage: 1,
//     searchQuery: '',
//     largeImageURL: '',
//     isLoading: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchHits();
//     }
//   }

//   onChangeQuery = query => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       hits: [],
//     });
//   };

//   fetchHits = () => {
//     const { currentPage, searchQuery } = this.state;

//     const options = {
//       searchQuery,
//       currentPage,
//     };

//     this.setState({ isLoading: true });

//     fetchPhotos(options)
//       .then(hits => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...hits],
//           currentPage: prevState.currentPage + 1,
//         }));
//       })
//       .catch(error => console.log(error))
//       .finally(() => {
//         this.setState({ isLoading: false });
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       });
//   };

//   toggleModal = url => {
//     this.setState({ largeImageURL: url ? url : '' });
//   };

//   render() {
//     const { hits, isLoading, largeImageURL } = this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.onChangeQuery} />
//         {largeImageURL && (
//           <Modal onClose={this.toggleModal} url={largeImageURL} />
//         )}
//         <ImageGallery hits={hits} onClick={this.toggleModal} />
//         {hits.length > 0 && !isLoading && <Button fetchHits={this.fetchHits} />}
//         {isLoading && <Loader />}
//       </div>
//     );
//   }
// }

// export default App;
