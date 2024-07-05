import React, { useState } from "react";
import AppImage from "~utils/images/app_images";
import AuthenticationBaseView from "~utils/views/AuthenticationBaseView";
import CommonButton from "~utils/views/CommonButton";
import CommonTextInput from "~utils/views/CommonTextInput";
import { Formik } from "formik";
import * as Yup from "yup"
import { Text } from "react-native";
import axios from "axios";
import { BASE_URL } from "~services/ApiBaseUrl";

const ChangePasswordScreen = ({ navigation, route }: any) => {
    const { userId2 } = route.params
    const [showPassword, setShowPassword] = useState(false);

    const toggleSHowPassword = () => {
        setShowPassword(!showPassword);
    };

    const ChangePassword = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Vui lòng nhập mật khẩu từ 8-15 ký tự')
            .max(15, 'Vui lòng nhập mật khẩu từ 8-15 ký tự')
            .required('Trường này không được để trống')
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                'Mật khẩu tối thiểu từ 8-15 ký tự và không được chứa ký tự đặc biệt',
            ),
        confirmPassword: Yup.string()
            .min(8, 'Vui lòng nhập mật khẩu từ 8-15 ký tự')
            .max(15, 'Vui lòng nhập mật khẩu từ 8-15 ký tự')
            .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
            .required('Trường này không được để trống')
    })

    const handleChangePassword = async (values: any) => {
        try {
            console.log(userId2)
            const response = await axios.post(`${BASE_URL}auth/reset-password/userId/${userId2}`, {
                password: values.password,
                repassword: values.confirmPassword,
            });
            // Xử lý phản hồi từ API ở đây
            navigation.navigate('MainScreen')
            console.log(response.data);
        } catch (error: any) {
            console.error(error.response.data);
            console.log(userId2)

        }
    };

    return (
        <AuthenticationBaseView
            backIcon
            onPressBackIcon={() => navigation.goBack()}
            title='Tạo mật khẩu mới'
            subTitle='Nhập mật khẩu mới của bạn'
            view={
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={(value) => { handleChangePassword(value) }}
                    validationSchema={ChangePassword}
                >
                    {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                        <>
                            <CommonTextInput
                                prefixIcon={AppImage.passwordIcon}
                                placeholder='Nhập mật khẩu'
                                secureTextEntry={!showPassword}
                                suffixIcon={showPassword ? AppImage.showPasswordIcon : AppImage.hidePasswordIcon}
                                onPressSuffixIcon={toggleSHowPassword}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                            />
                            {touched.password && errors.password && (
                                <Text>{errors.password}</Text>
                            )}
                            <CommonTextInput
                                prefixIcon={AppImage.passwordIcon}
                                placeholder='Nhập lại mật khẩu'
                                secureTextEntry={!showPassword}
                                suffixIcon={showPassword ? AppImage.showPasswordIcon : AppImage.hidePasswordIcon}
                                onPressSuffixIcon={toggleSHowPassword}
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={() => setFieldTouched('confirmPassword')}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text>{errors.confirmPassword}</Text>
                            )}
                            <CommonButton text='Xác nhận' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            }
        />
    )
}

export default ChangePasswordScreen;