import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import AuthenticationBaseView from "~utils/views/AuthenticationBaseView";
import styles from "./style";
import CommonButton from "~utils/views/CommonButton";
import OTPTimer from "./OTPTimer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "~services/ApiBaseUrl";

const OTPAuthenticationScreen = ({ navigation, route }: any) => {
    const { t } = useTranslation();
    const { phone, userId1 } = route.params || { phone: '', userId1: '' }
    const [inputOTPValue, setInputOTPValue] = useState<string[]>(['', '', '', '']);
    const [isFocused, setIsFocused] = useState(false);
    const [userID1, setUserID1] = useState('');
    const inputRef = useRef<TextInput[]>([]);

    console.log(userId1)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    const updateOTPValue = (index: number, newValue: string) => {
        inputOTPValue[index] = newValue;
        setInputOTPValue(inputOTPValue);
        if (newValue && index < 3) {
            inputRef.current[index + 1].focus()

        }
    }

    const handleSendOTP = async () => {
        const otpString = inputOTPValue.join("")

        try {
            const response = await axios.put(`${BASE_URL}auth/OTP-vertify/userId/${userId1}`, {
                otp: otpString,
                userId: userID1,
            });

            // Xử lý phản hồi từ API ở đây
            console.log(response.data);
            console.log(response.data.userId)
            setUserID1(response.data.userId)
            // navigation.navigate('ChangePasswordScreen', {userId2: userID1})
        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleResendOTP  = async () => {
        try {
            const response = await axios.put(`${BASE_URL}auth/send-email`, {
                email: phone,
            })
        } catch (error: any) {
            console.error(error.response.data)
        }
    }

    useEffect(() => {
        if (userID1) {
            navigation.navigate('ChangePasswordScreen', { userId2: userID1 });
        }
    }, [userID1]);

    return (
        <AuthenticationBaseView
            backIcon
            onPressBackIcon={() => navigation.goBack()}
            title={t('otp_title')}
            subTitle={
                <Text>
                    {t('otp_subTitle')} <Text style={styles.phone}>{phone}</Text>
                </Text>}
            view={
                <>
                    <View style={styles.rowOTP}>
                        {[...Array(4).keys()].map((_, index) => (
                            <TextInput
                                style={[styles.textInput, { borderColor: isFocused ? 'rgba(231, 79, 177, 1)' : 'rgba(222, 226, 230, 1)' }]}
                                key={index}
                                maxLength={1}
                                inputMode="numeric"
                                onChangeText={(text) => updateOTPValue(index, text)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                ref={(ref) => (inputRef.current[index] = ref!)} />
                        ))}
                    </View>
                    <OTPTimer onPressSendOTP={handleResendOTP}/>
                    <CommonButton text={t('otp_btn')} onPress={handleSendOTP} />
                </>
            }
        />
    )
}

export default OTPAuthenticationScreen;