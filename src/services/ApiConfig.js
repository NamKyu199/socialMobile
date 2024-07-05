
const ApiConfig = () => {
    const baseUrl = 'http://localhost:1050/';
  
    const getBaseUrl = () => {
      return baseUrl;
    };
  
    return {
      getBaseUrl
    };
  };
  
  export default ApiConfig;
  