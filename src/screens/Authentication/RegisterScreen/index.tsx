import React, { useEffect, useState } from "react";
import { Text, View, } from "react-native";
import styles from "./styles";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import AppImage from "~utils/images/app_images";
import i18n from "~translations/i18n";
import AuthenticationBaseView from "~utils/views/AuthenticationBaseView";
import CommonTextInput from "~utils/views/CommonTextInput";
import CommonButton from "~utils/views/CommonButton";
import { BASE_URL } from "~services/ApiBaseUrl";


const Register = Yup.object().shape({
    fullname: Yup.string()
        .matches(/^[\p{L}\s]+$/u, 'Họ và tên không có hợp lệ')
        .required('Vui lòng không bỏ trống Họ và tên'),
    email: Yup.string()
        .matches(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, 'Email của bạn không hợp lệ')
        .required('Vui lòng không bỏ trống Email'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Số điện thoại của bạn không hợp lệ')
        .min(10)
        .max(10)
        .required('Vui lòng không bỏ trống Số điện thoại'),
    password: Yup.string()
        .matches(/^(?=.*[a-z])?(?=.*[A-Z])?(?=.*[0-9])?[a-zA-Z0-9]{8,16}$/, 'Mật khẩu tối thiểu từ 8-15 ký tự và không được chứa ký tự đặc biệt')
        .min(8)
        .max(15)
        .required('Vui lòng không bỏ trống Mật khẩu'),
    checkpassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu của bạn không trùng khớp')
        .required('Vui lòng không bỏ trống Nhập lại mật khẩu'),
})

const RegisterScreen = ({ navigation }: any) => {

    const { t } = useTranslation();

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleShowPassWord = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleSignUp = async (values: any) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/signup`, {
                fullName: values.fullname,
                email: values.email,
                phoneNumber: values.phone,
                password: values.password,
            });
            console.log(response.data); // In ra phản hồi từ máy chủ
            navigation.navigate('LoginScreen')
            console.log('Đăng ký thành công!');
        } catch (error: any) {
            console.error(error.response.data);
            console.log('Có lỗi xảy ra khi đăng ký, vui lòng thử lại sau.');
        }
    };

    return (
        <AuthenticationBaseView
            backIcon
            onPressBackIcon={() => navigation.goBack()}
            title={t('register_title')}
            subTitle={t('register_text')}
            view={
                <Formik
                    initialValues={{
                        fullname: '',
                        email: '',
                        phone: '',
                        password: '',
                        checkpassword: '',
                    }}
                    validationSchema={Register}
                    onSubmit={values => { handleSignUp(values) }}
                >
                    {({ values, errors, touched, handleChange, setFieldTouched, handleSubmit }) => (
                        <View>
                            <CommonTextInput
                                placeholder={t('register_fullname')}
                                value={values.fullname}
                                onChangeText={handleChange('fullname')}
                                onBlur={() => setFieldTouched('fullname')}
                            />
                            {touched.fullname && errors.fullname && (
                                <Text style={styles.errors}>{errors.fullname}</Text>
                            )}
                            <CommonTextInput
                                placeholder={t('register_email')}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                            />
                            {touched.email && errors.email && (
                                <Text style={styles.errors}>{errors.email}</Text>
                            )}
                            <CommonTextInput
                                placeholder={t('register_phoneNumber')}
                                value={values.phone}
                                onChangeText={handleChange('phone')}
                                onBlur={() => setFieldTouched('phone')}
                            />
                            {touched.phone && errors.phone && (
                                <Text style={styles.errors}>{errors.phone}</Text>
                            )}
                            <CommonTextInput
                                placeholder={t('register_password')}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                suffixIcon={secureTextEntry ? AppImage.hidePasswordIcon : AppImage.showPasswordIcon}
                                onPressSuffixIcon={toggleShowPassWord}
                                secureTextEntry={secureTextEntry}
                                onBlur={() => setFieldTouched('password')}
                            />
                            {touched.password && errors.password && (
                                <Text style={styles.errors}>{errors.password}</Text>
                            )}
                            <CommonTextInput
                                placeholder={t('register_checkpassword')}
                                value={values.checkpassword}
                                onChangeText={handleChange('checkpassword')}
                                suffixIcon={secureTextEntry ? AppImage.hidePasswordIcon : AppImage.showPasswordIcon}
                                onPressSuffixIcon={toggleShowPassWord}
                                secureTextEntry={secureTextEntry}
                                onBlur={() => setFieldTouched('checkpassword')}
                            />
                            {touched.checkpassword && errors.checkpassword && (
                                <Text style={styles.errors}>{errors.checkpassword}</Text>
                            )}
                            <CommonButton text={t('register_title')} onPress={handleSubmit} />
                        </View>
                    )}
                </Formik>
            }
        />
    );
};

export default RegisterScreen;