import { Dimensions, StyleSheet } from "react-native";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    fromEventNew: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 15,
        paddingVertical:8,
        marginHorizontal:16
    },
    titleEvent2: {
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily:'Roboto-Medium',
        letterSpacing:0.4,
        marginHorizontal:8
    },
    from_heart:{
        backgroundColor: '#F2F2F2', 
        height: PAGE_HEIGHT*0.06, 
        width: PAGE_WIDTH*0.12, 
        borderRadius: 50, 
        marginTop: 25,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
    },
    hastag1: {
        backgroundColor: 'rgba(171, 81, 228, 1)',
        borderRadius: 16,
        alignItems: 'center',
    },
    headingHastag: {
        fontWeight: '500',
        fontSize: 12,
        color: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 12,
        fontFamily: 'Roboto-Medium',
        paddingVertical:6,
    },
})

export default styles;