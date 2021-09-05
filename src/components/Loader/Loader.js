import Loader from 'react-loader-spinner';

const LoaderSpinner = () => {
  return (
    <Loader
      type="Hearts"
      color="#00BFFF"
      height={60}
      width={60}
      timeout={3000} //3 secs
      className="loader"
    />
  );
};

export default LoaderSpinner;
