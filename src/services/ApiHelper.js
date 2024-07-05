// const axios = axios.create();

import axios from 'axios';

class ApiHelper {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      headers: getDefaultHeader()
    });
  }

  async getDefaultHeader() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    } catch (e) {
      return {
        'Content-Type': 'application/json',
        'Authorization': ''
      }
    }
    
  }

  // Common POST request function
  async post(url, data, config = {}) {
    try {
      const response = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Common GET request function
  async get(url, params = {}, config = {}) {
    try {
      const response = await this.instance.get(url, { params, ...config });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Common PUT request function
  async put(url, data, config = {}) {
    try {
      const response = await this.instance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle error function to centralize error handling
  handleError(error) {
    // You can customize error handling based on your requirements
    console.error('API request error:', error);
    throw error; // Re-throw the error to propagate it further
  }
}

export default ApiHelper;

/// const api = new ApiHelper('https://api.example.com');

// // Making a POST request
// api.post('/users', { name: 'John Doe', email: 'john@example.com' })
//   .then(data => console.log('POST response:', data))
//   .catch(error => console.error('POST request failed:', error));

// // Making a GET request
// api.get('/users')
//   .then(data => console.log('GET response:', data))
//   .catch(error => console.error('GET request failed:', error));

// // Making a PUT request
// api.put('/users/123', { name: 'Jane Doe', email: 'jane@example.com' })
//   .then(data => console.log('PUT response:', data))
//   .catch(error => console.error('PUT request failed:', error));