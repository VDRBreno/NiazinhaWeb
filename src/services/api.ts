import axios from 'axios';

import isDevelopmentEnvironment from '@/utils/isDevelopmentEnvironment';

function getBaseURL() {
  if(isDevelopmentEnvironment()) {
    const API_LOCAL_URL = import.meta.env.API_LOCAL_URL;
    if(API_LOCAL_URL)
      return API_LOCAL_URL+'/api';
    
    return 'http://localhost:3000/api';
  }

  return 'https://nia-api.vercel.app/api';
}

const api = axios.create({
  baseURL: getBaseURL()
});

export default api;