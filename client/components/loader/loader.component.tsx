import React from 'react';
import Spinner from "react-native-loading-spinner-overlay";

type Props = {
  loading?: boolean;
  text?: string;
}
const Loader: React.FC<Props> = ({ loading = true, text = 'Loading...' }) => {
  return (
    <Spinner
      visible={loading}
      textContent={text}
      textStyle={{ color: "#FFF" }}
    />
  );
};

export default Loader;
