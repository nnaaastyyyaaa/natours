/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    //console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in succesfully');
      window.setTimeout(() => {
        location.assign('/'), 1500;
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status = 'succes')) {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out try again');
  }
};
