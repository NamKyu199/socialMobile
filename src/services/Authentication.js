import ApiHelper from './ApiHelper';
import ApiConfig from './ApiConfig';
import { LoginResponseModel } from '~models/authentication/LoginResponseModel';
import { useId } from 'react';

const api = new ApiHelper(ApiConfig().getBaseUrl());

const Authentication = {

    handleLogin: async (username, password) => {
        try {
            return new Promise<LoginResponseModel>(async (resolve, reject) => {
                //   const response = new LoginResponseModel('12345', 'Login successful', 'admin');
                const response = await api.post('auth/login', {
                    phoneOrEmail: username,
                    password: password,
                })
                const loginResponse = new LoginResponseModel(response.data.useId, response.data.message, response.data.role)
                resolve(loginResponse);
            });
            // const response = await api.post('auth/login', {
            //     phoneOrEmail: username,
            //     password: password,
            // })

            // const loginResponse = LoginResponseModel(response.data.useId, response.data.message, response.data.role)
            // return loginResponse
        } catch (error) {

        }
    },

    handlePhone: async (text, userID) => {
        try {
            const response = await api.put('/auth/send-email', {
                email: text,
                userId: userID,
            })
            console.log(response);
            return response.userId
        } catch (error) {
            console.error(error.response.data);
        }
    }
}

export default Authentication;

