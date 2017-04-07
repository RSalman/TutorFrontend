import axios from 'axios';
import { Alert, NetInfo } from 'react-native';

axios.defaults.baseURL = 'http://cpserver.eastus.cloudapp.azure.com:2000/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';

var connection = true;
function connectivityChange(isConnected) {
  connection = isConnected;
}

function showNoInternetDialog(config) {
  return new Promise(function(resolve, reject) {
    Alert.alert(
      I18n.t('globalWifiDialog.noInternetConnection'),
      I18n.t('globalWifiDialog.fixInternet'),
      [
        { text: I18n.t('retry'), onPress: () => resolve(axios(config)) },
      ],
      { cancelable: false }
    );
  });
}

NetInfo.isConnected.addEventListener('change', connectivityChange);

axios.interceptors.response.use(undefined, function(error) {
  return connection ? Promise.reject(error) : showNoInternetDialog(error.config);
});

global.axios = axios;
