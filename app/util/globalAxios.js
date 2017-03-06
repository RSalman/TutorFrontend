import axios from 'axios';
import { Alert, Platform } from 'react-native';

axios.defaults.baseURL = `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.3.2'}:3000/api/v1`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';

function showNoInternetDialog(config) {
  return new Promise(function(resolve, reject) {
    Alert.alert(
      'No internet connection',
      'Please enable your internet connection and try again.',
      [
        { text: 'Retry', onPress: () => resolve(axios(config)) },
      ],
      { cancelable: false }
    );
  });
}

axios.interceptors.response.use(undefined, function(error) {
  if (error.status === undefined && error.config)
    return showNoInternetDialog(error.config);
  return Promise.reject(error);
});

global.axios = axios;
