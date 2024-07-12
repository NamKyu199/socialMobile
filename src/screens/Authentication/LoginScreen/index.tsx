import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppImage from "~utils/images/app_images";
import styles from "./style";
import * as Yup from "yup"
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import CheckBox from "@react-native-community/checkbox";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "~services/ApiBaseUrl";
import AuthenticationBaseView from "~utils/views/AuthenticationBaseView";
import CommonButton from "~utils/views/CommonButton";
import CommonTextInput from "~utils/views/CommonTextInput";

const LoginScreen = ({ navigation }: any) => {
    const usernameField = 'username';
    const passwordField = 'password';

    const [showPassword, setShowPassword] = useState(false);
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const { t } = useTranslation();

    const toggleSHowPassword = () => {
        setShowPassword(!showPassword)
    }

    const Login = Yup.object().shape({
        username: Yup.string()
            .matches(/(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)|(^[0-9]{10}$)/, t('lg_errorUsername'))
            .required(t('lg_errorEmpty')),
        password: Yup.string()
            .matches(/^[a-zA-Z0-9\s]+$/, t('lg_errorPassword'))
            .min(8, t('lg_errorLengthPassword'))
            .max(15, t('lg_errorLengthPassword'))
            .required(t('lg_errorEmpty')),
    })

    const handleLogin = async (values: any) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login`, {
                phoneOrEmail: values.username,
                password: values.password,
            });
            // Xử lý phản hồi từ API ở đây
            const userId = response.data.userId;
            const accessToken = response.data.accessToken
            await AsyncStorage.setItem('userId', userId)
            await AsyncStorage.setItem('accessToken', accessToken)
            if (accessToken != null) {
                navigation.navigate('MainScreen')
            }  
        } catch (error: any) {
            if (error.response.status == 400) {
                setErrorPassword(error.response.data.message)
            }
            if (error.response.status == 404) {
                setErrorUsername(error.response.data.message);
            }
        }
    };
     
    return (
        <AuthenticationBaseView
            title={t('lg_title')}
            subTitle={t('lg_subTitle')}
            view={
                <Formik
                    initialValues={{
                        username: 'namkyu@gmail.com',
                        password: '123456789',
                    }}
                    onSubmit={(value, { setFieldTouched }) => {
                        setFieldTouched(usernameField, true)
                        setFieldTouched(passwordField, true)
                        handleLogin(value)
                    }}
                    validationSchema={Login}
                >
                    {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                        <>
                            <CommonTextInput
                                prefixIcon={AppImage.userIcon}
                                placeholder={t('lg_username')}
                                value={values.username}
                                onChangeText={handleChange(usernameField)}
                                onBlur={() => setFieldTouched(usernameField)}
                                error={touched.username && errors.username}
                                suffixIcon={values.username && !errors.username ? AppImage.checkIcon : null}
                            />
                            {(touched.username && errors.username || errorUsername) && (
                                <Text style={styles.error}>{errors.username || errorUsername}</Text>
                            )}
                            <CommonTextInput
                                prefixIcon={AppImage.passwordIcon}
                                placeholder={t('lg_password')}
                                secureTextEntry={!showPassword}
                                suffixIcon={showPassword ? AppImage.showPasswordIcon : AppImage.hidePasswordIcon}
                                onPressSuffixIcon={toggleSHowPassword}
                                value={values.password}
                                onChangeText={handleChange(passwordField)}
                                onBlur={() => setFieldTouched(passwordField)}
                                error={touched.password && errors.password}
                            />
                            {(touched.password && errors.password || errorPassword) && (
                                <Text style={styles.error}>{errors.password || errorPassword}</Text>
                            )}
                            <View style={styles.rowPass}>
                                <View style={styles.rowSaveBox}>
                                    <CheckBox
                                        style={styles.box}
                                        boxType="square"
                                        onFillColor='rgba(102, 85, 208, 1)'
                                        onTintColor='rgba(102, 85, 208, 1)'
                                        lineWidth={1}
                                        onCheckColor="rgba(255, 255, 255, 1)"
                                        tintColors = {{ true:'rgba(102, 85, 208, 1)', false: "grey" }}
                                        value={checked}
                                        onValueChange={() => setChecked(!checked)}
                                        
                                    />
                                    <Text style={styles.savePass}>{t('lg_savePassword')}</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                                    <Text style={styles.forgotPass}>{t('lg_forgotPassword')}</Text>
                                </TouchableOpacity>
                            </View>
                            <CommonButton text={t('lg_btn')} onPress={handleSubmit} />
                            <View style={styles.rowRegister}>
                                <Text style={styles.text}>{t('lg_text')}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                                    <Text style={styles.register}>{t('lg_register')}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            }
        />
    )
}

export default LoginScreen;