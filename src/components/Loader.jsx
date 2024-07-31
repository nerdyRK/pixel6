/* eslint-disable react/prop-types */
import { ColorRing } from 'react-loader-spinner';

const Loader = ({ style }) => (
  <div className={`absolute ${style}`}>
    <ColorRing
      visible={true}
      height='35'
      width='35'
      ariaLabel='color-ring-loading'
      wrapperStyle={{}}
      wrapperClass='color-ring-wrapper'
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  </div>
);

export default Loader;
