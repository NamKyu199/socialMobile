import { Dimensions, Platform, StyleSheet } from "react-native";
import { fontFamilies } from "~constant/fontFamilies";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    searchContainer: {
        height: 50,
        width: PAGE_WIDTH * 0.9,
        marginHorizontal: 16,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 12,
        alignItems: 'center',
        position: 'absolute'
    },
    autocompleteContainer: {
        flex: 1,
        zIndex: 999, // Đảm bảo zIndex cao hơn các thành phần khác
    },
    listView: {
        position: 'absolute',
        top: 50, // Adjust as necessary to ensure the list view doesn't overlap with the search container
        zIndex: 2,
        backgroundColor: 'white',
    },
    emptyList: {
        padding: 10,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        zIndex: 99,
        marginLeft: 12,
        marginRight: 10,
        paddingVertical: 5,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400'
    },
    searchIcons: {
        flexDirection: 'row',
        marginHorizontal: 16,
        alignItems: 'center',
        paddingVertical: 0,
    },
    iconMargin: {
        marginLeft: 15,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 16,
        marginTop: 'auto',
        marginBottom: 30,
        position: 'absolute',
        bottom: 30,
        right: 0,
        zIndex: 1,
    },
    iconButton: {
        height: 50,
        width: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 51,
        alignItems: 'center',
        marginTop: 15,
    },
    uniconButton: {
        borderRadius: 51,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonIcon: {
        marginTop: 12,
    },
    bottomSheet: {
        maxHeight: PAGE_HEIGHT * 0.45,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    bottomSheetText: {
        paddingTop: 15,
        color: 'rgba(114, 46, 209, 1)',
        fontWeight: '400',
        fontSize: 18,
        paddingHorizontal: 20,
        fontFamily: 'Roboto-Regular',
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        width: '100%'
    },
    boldText: {
        fontWeight: '700',
        fontFamily: 'Roboto-Bold'
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 8,
    },
    locationAdress: {
        fontWeight: '300',
        fontSize: 12,
        color: 'rgba(89, 89, 89, 1)',
        marginTop: 5,
        fontFamily: 'Roboto-Light',
        marginHorizontal: 20
    },
    from_backgroud_event: {
        height: PAGE_HEIGHT * 0.3,
        width: PAGE_WIDTH * 0.8,
        marginHorizontal: 10
    },
    background_envent: {
        height: PAGE_HEIGHT * 0.3,
        width: PAGE_WIDTH * 0.8,
        borderRadius: 8,
        opacity: 0.7,
        backgroundColor: 'black',
    },
    from_check_event: {
        marginTop: 20,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        width: 100,
        height: 30,
        backgroundColor: 'rgba(229, 57, 53, 1)',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
    },
    from_check_event_process: {
        marginTop: 20,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        width: 100,
        height: 30,
        backgroundColor: 'rgba(82, 26, 203, 1)',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
    },
    heading_check_event: {
        fontWeight: '600',
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 5,
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Roboto-Medium'
    },
    date_title: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 10,
    },
    title_event1: {
        marginLeft: 10,
        fontWeight: '700',
        fontSize: 16,
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center'
    },
    careAbout: {
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        paddingVertical: 10,
        marginHorizontal: 12
    },
    careAbout1: {
        height: 40,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 115,
        fontWeight: 'bold',
        marginTop: 10,
    },
    headingAbout: {
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(89, 89, 89, 1)',
        fontFamily: 'Roboto-Regular'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        width: PAGE_WIDTH * 0.9
    },
    modalEvent: {
        flex: 1,
        marginBottom: 20,
        marginTop: 20,
        width: PAGE_WIDTH * 0.95,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitleText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        color: '#000000D9'
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        color: '#00000073'
    },
    modalTextButton: {
        fontSize: 16,
        color: '#722ED1',
        marginHorizontal: 60,
        fontWeight: '600',
        fontFamily: 'Roboto-Medium',
        marginTop: 8,
    },
    modalTextButtonColor: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginTop: 8,
    },
    modalLocation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    fromButtonColor: {
        backgroundColor: '#722ED1',
        width: 112,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 20,
    },
    bodyShowSaveLocation: {
        marginBottom: 35,
    },
    numberReview: {
        fontWeight: '600',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: '#1E1E1E'
    },
    numberUserReview: {
        fontWeight: '400',
        fontSize: 14,
        color: 'rgba(173, 175, 178, 1)',
        fontFamily: 'Roboto-Regular'
    },
    locationReview: {
        fontWeight: '400',
        fontSize: 14,
        color: '#1E1E1E',
        fontFamily: 'Roboto-Regular',
        marginHorizontal: 20
    },
    timeLocation: {
        fontWeight: '400',
        fontSize: 14,
        marginTop: 5,
        fontFamily: 'Roboto-Regular',
        marginHorizontal: 20
    },
    titleIcon: {
        marginTop:2,
        marginRight: 5,
    },
    MainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    location: {
        fontWeight: '600',
        fontSize: 16,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Medium',
        marginHorizontal: 20
    },
    from_image: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 16,
        alignItems: 'center',
        marginHorizontal: 30,
        overflow: 'hidden',
    },
    style_image: {
        resizeMode: "cover",
        borderRadius: 24,
    },
    progressMiddle: {
        height: 15,
        flex: 1,
        marginHorizontal: 10,
    },
    progressWrap: {
        backgroundColor: "#F5F8FF",
        borderRadius: 18,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 2,
    },
    progressBar: {
        flex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#ffcc48",
        shadowOpacity: 1.0,
        shadowRadius: 4,
        backgroundColor: "#FFCC48",
        borderRadius: 18,
        minWidth: 5,
    },
    title1: {
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: "#323357",
    },
    totalWrap: {
        borderRadius: 40,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5
    },
    spacer: {
        marginBottom: 5,
    },
    iconWrapper: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: 'transparent',
    },
    locationContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
        paddingBottom: 12,
    },
    openingHoursContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayOfWeek: {
        fontWeight: '700',
        fontSize: 16,
        color: '#504099',
        marginRight: 10,
    },
    openingStatus: {
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    openingTime: {
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: 'black',
    },
    imageContainer: {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT * 0.3,
        position: 'absolute',
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
    from_share: {
        height: 40,
        marginTop:10,
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
    title_text: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 25
    },
    seeMore: {
        fontWeight: 'bold',
        color: 'black'
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
        fontFamily: 'Roboto-Regular',
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
})

export default styles;