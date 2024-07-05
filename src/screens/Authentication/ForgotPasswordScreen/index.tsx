import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AppImage from '~utils/images/app_images';
import AuthenticationBaseView from '~utils/views/AuthenticationBaseView';
import CommonButton from '~utils/views/CommonButton';
import CommonTextInput from '~utils/views/CommonTextInput';
import { useTranslation } from "react-i18next"
import axios from 'axios';
import Authentication from '~services/Authentication';
import { BASE_URL } from '~services/ApiBaseUrl';

const ForgotPasswordScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [userID, setUserID] = useState('');

    const handlePhone = async () => {
        try {
            const response = await axios.put(`${BASE_URL}auth/send-email`, {
                email: text,
                userId: userID,
            })
            setUserID(response.data.userId);
            // navigation.navigate('OTPAuthenticationScreen', { phone: text, userId1: userID });
            console.log(response.data.userId)
        } catch (error: any) {

        }
    }

    useEffect(() => {
        if (userID) {
            navigation.navigate('OTPAuthenticationScreen', { phone: text, userId1: userID });
        }
    }, [userID]);

    return (
        <AuthenticationBaseView
            backIcon
            onPressBackIcon={() => navigation.goBack()}
            title={t('forgot_title')}
            subTitle={t('forgot_subTitle')}
            view={
                <View>
                    <CommonTextInput
                        prefixIcon={AppImage.phoneIcon}
                        placeholder={t('forgot_phone')}
                        value={text}
                        onChangeText={setText}
                    />
                    {/* <CommonButton text={t('forgot_btn')} onPress={async () => {
                        const response =  Authentication.handlePhone(text, userID)
                        if(response != null){
                            navigation.navigate('OTPAuthenticationScreen', { phone: text, userId1: userID });
                        }

                        // setUserID(userId);
                        // navigation.navigate('OTPAuthenticationScreen', { phone: text, userId1: userId });

                    }} /> */}
                    <CommonButton text={t('forgot_btn')} onPress={() => handlePhone()} />
                </View>
            }
        />
    )
}

export default ForgotPasswordScreen;

//{navigation.navigate('OTPAuthenticationScreen', { phone: text })}
