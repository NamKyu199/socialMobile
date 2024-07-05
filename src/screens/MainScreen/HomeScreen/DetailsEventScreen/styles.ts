import { Dimensions, StyleSheet } from "react-native";
import { fontFamilies } from "~constant/fontFamilies";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    from_hearder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        zIndex: 999,
        marginBottom:5
    },
    back: {
        width: 10,
        height: 15,
        marginLeft: 25,
    },
    heading_header: {
        fontWeight: '700',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 1)',
        marginRight: 25,
        fontFamily: 'Roboto-Bold',
        paddingRight: 20
    },
    imageContainer: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT * 0.3,
        position:'absolute',
    },
    poster: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    gradientTop: {
        top: 0,
        height: '50%',
    },
    gradientBottom: {
        bottom: 0,
        height: '50%',
    },
    textOverlay: {
        alignSelf: 'center',
        alignItems: 'center',
        width: PAGE_WIDTH * 0.9,
    },
    title_date: {
        fontWeight: '700',
        fontSize: 12,
        color: 'rgba(240, 40, 74, 1)',
        fontFamily: 'Roboto-Bold',
    },
    title_event: {
        fontWeight: '700',
        fontSize: 28,
        color: '#000000',
        lineHeight: 35,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
    },
    from_flowing: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    careAbout: {
        height: 40,
        width: 150,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 28,
        fontWeight: 'bold',
    },
    from_share: {
        height: 40,
        width: 50,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderRadius: 8,
    },
    shareIcon: {
        tintColor: 'rgba(166, 166, 166, 1)',
        width: 26,
        height: 26,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 12
    },
    headingAbout: {
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(89, 89, 89, 1)',
        fontFamily: 'Roboto-Regular'
    },
    titleIcon: {
        marginRight: 5,
    },
    from_information: {
        marginTop: 20,
    },
    title_infomation: {
        fontWeight: '700',
        fontSize: 18,
        color: 'rgba(231, 79, 177, 1)',
        fontFamily: 'Roboto-Bold'
    },
    information: {
        flexDirection: 'row',
        marginTop: 10,
    },
    heading_information: {
        marginLeft: 15,
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Regular'
    },
    heading_information_link: {
        marginLeft: 15,
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(24, 144, 255, 1)',
        fontFamily: 'Roboto-Regular'
    },
    seeMore: {
        fontWeight: 'bold',
        color: 'black'
    },
    title_text: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 25
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(101, 103, 107, 1)',
        lineHeight: 25,
        fontFamily: 'Roboto-Regular'
    },
    from_location: {
        fontWeight: '700',
        fontSize: 16,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Bold'
    },
    body_location: {
        borderWidth: 1,
        marginTop: 10,
        paddingBottom: 10,
        borderRadius: 8,
        borderColor: 'rgba(173, 175, 178, 0.28)'
    },
    map: {
        width: '100%',
        height: 150,
        borderRadius: 8
    },
    from_location_map: {
        marginTop: 12,
        marginRight: 30,
        paddingLeft: 15
    },
    title_map: {
        fontWeight: '500',
        fontSize: 16,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 5,
        fontFamily: fontFamilies.medium,
    },
    location_map: {
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(101, 103, 107, 1)',
        marginTop: 3,
        fontFamily: 'Roboto-Regular'
    },
    location: {
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 2,
        fontFamily: 'Roboto-Regular'
    },
    title_suggested_event: {
        fontWeight: '800',
        fontSize: 16,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Black'
    },
    from_date: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(173, 175, 178, 0.28)',
        width: PAGE_WIDTH * 0.9,
        marginTop: 8
    },
    body_date: {
        paddingTop: 8,
        paddingHorizontal: 8,
        paddingBottom: 11,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 8,
        alignSelf: 'center'
    },
    month: {
        fontWeight: '500',
        fontSize: 16,
        color: 'rgba(30, 30, 30, 1)',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular'
    },
    time_event: {
        fontWeight: '400',
        fontSize: 12,
        color: 'rgba(240, 40, 74, 1)',
        marginRight: 15,
        fontFamily: 'Roboto-Regular'
    },
    title_time_event: {
        fontWeight: '600',
        fontSize: 14,
        color: 'rgba(22, 22, 22, 1)',
        marginRight: 15,
        lineHeight: 18,
        fontFamily: 'Roboto-Medium'
    },
    location_event: {
        fontWeight: '400',
        fontSize: 12,
        color: 'rgba(101, 103, 107, 1)',
        lineHeight: 18,
        fontFamily: 'Roboto-Regular',
    },
    iconWrapper: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: 'transparent',
    },
})

export default styles;