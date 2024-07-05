import React, { useRef, useState } from "react";
import { Image, KeyboardAvoidingView, Modal, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import AppImage from "~utils/images/app_images";
import styles from "./style";
import { useTranslation } from "react-i18next"
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { locales } from "~translations/i18n";

const AuthenticationBaseView = (props: any) => {
    //set language
    const { i18n } = useTranslation();
    const currentLanguage = locales[i18n.language as keyof typeof locales]
    const [languageData] = useState<string[]>(['Tiếng Việt', 'English'])
    const bottomSheetGenderRef = useRef<BottomSheetModal>(null)

    const changeLanguage = (lng: 'vi' | 'en') => {
        i18n.changeLanguage(lng)
        bottomSheetGenderRef.current?.dismiss();
    }

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1 }}>
                <Image style={styles.image} source={AppImage.background} />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.languageView} onPress={() => bottomSheetGenderRef.current?.present()}>
                        <Image source={AppImage.flag} />
                        <Text style={styles.languageText}>{currentLanguage}</Text>
                        <Image style={styles.downIcon} source={AppImage.downArrowIcon} />
                    </TouchableOpacity>
                    <BottomSheetModal
                        ref={bottomSheetGenderRef}
                        index={0}
                        snapPoints={['30%']}
                        backdropComponent={() => <View style={{ flex: 0.4 }} />}
                    >
                        <BottomSheetView style={styles.bottomSheetView}>
                            {languageData.map((language) => (
                                <TouchableOpacity
                                    key={language}
                                    onPress={() => changeLanguage(language === 'Tiếng Việt' ? 'vi' : 'en')}
                                    style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#FFFFFF' }}
                                >
                                    <Text style={styles.bottomSheetText}>{language}</Text>
                                </TouchableOpacity>
                            ))}
                        </BottomSheetView>
                    </BottomSheetModal>
                </View>
                <View style={styles.logoView}>
                    <Image style={styles.logo} source={AppImage.logo} />
                </View>
                <ScrollView style={styles.view}>
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity onPress={props.onPressBackIcon}>
                            {props.backIcon != null && (
                                <Image style={styles.backIcon} source={AppImage.leftArrowIcon} />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.subTitle}>{props.subTitle}</Text>
                        {props.view}
                    </View>
                </ScrollView>
            </View>
        </BottomSheetModalProvider>
    )
}

export default AuthenticationBaseView;
