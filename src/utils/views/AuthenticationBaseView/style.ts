import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 506
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1
    },
    logoView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    languageView: {
        marginTop: '13%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 16,
    },
    languageText: {
        marginLeft: 7,
        fontSize: 14,
        fontWeight: '400'
    },
    downIcon: {
        width: 8.48,
        height: 5.71,
        marginLeft: 4
    },
    logo: {
        marginTop: '25%',
        alignSelf: 'center'
    },
    bottomSheetView: {
        marginBottom: 10,
        zIndex:1
    },
    bottomSheetText: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 20,
        color: 'rgba(0, 0, 0, 0.85)',
        textAlign: 'center',
        marginTop: 10
    },
    view: {
        backgroundColor: '#FFFFFF',
        marginTop: '69%',
        // borderRadius: 32,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 24,
        zIndex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        
    },
    backIcon: {
        width: 7.63,
        height: 13.31,
        marginBottom: 4
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        lineHeight: 39.2,
        color: 'rgba(231, 79, 177, 1)',
        fontFamily:'Roboto-BlackItalic',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        color: 'rgba(30, 30, 30, 1)',
        marginBottom: 8,
        fontFamily:'Roboto-Regular'
    }
})

export default styles;