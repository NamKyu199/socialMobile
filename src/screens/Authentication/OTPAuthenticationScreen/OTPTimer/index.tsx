import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useTranslation } from "react-i18next";

const OTPTimer = (props: any) => {
    const {t} = useTranslation();
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevSeconds => prevSeconds - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer]);

    return (
        <>
            <Text style={styles.timer}>00:{timer}s</Text>
            <View style={styles.rowText}>
                <Text style={styles.receiveText}>{t('otp_receive')}</Text>
                <TouchableOpacity 
                style={styles.retryBtn}
                onPress={() => {
                    props.onPressSendOTP()
                    setTimer(60)
                }}
                >
                    <Text style={styles.retryText}>{t('otp_retry')}</Text>
                </TouchableOpacity>
            </View></>
    )
}

export default OTPTimer;