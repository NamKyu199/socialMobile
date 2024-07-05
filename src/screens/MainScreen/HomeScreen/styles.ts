import { Dimensions, StyleSheet } from "react-native";
import { fontFamilies } from "~constant/fontFamilies";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    header_heading: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: fontFamilies.bold
    },
    from_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:16
    },
    header_hyperlink: {
        color: 'rgba(210, 82, 165, 1)',
        marginTop: 5,
        fontWeight: '400',
        fontSize: 14,
        borderBottomWidth: 0.2,
        borderColor: 'rgba(210, 82, 165, 1)',
        fontFamily: 'Roboto-Regular'
    },
    header_chart1: {
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
    },
    header_chart2: {
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
        marginLeft: 55,
    },
    header_chart4: {
        fontWeight: '700',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Bold',
        // marginHorizontal:'auto'
        marginRight: 'auto',
        marginLeft: 32
    },
    header_chart3: {
        fontWeight: '500',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
        marginLeft: 'auto',
        fontFamily: 'Roboto-Medium',
    },
    header_chart5: {
        fontWeight: '700',
        fontSize: 14,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Medium',
        marginRight: 40
    },
    buttonSwitch: {
        borderRadius: 20
    },
    selectedButton: {
        backgroundColor: 'white'
    },
    unselectedButton: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        fontWeight: '600',
        fontFamily: 'Roboto-Medium',
        textAlign: "center",
        paddingVertical: 4,
        fontSize: 14
    },
    selectedButtonText: {
        color: 'rgba(151, 78, 195, 1)',
        fontWeight: '600',
        fontFamily: 'Roboto-Medium',
    },
    unselectedButtonText: {
        color: 'rgba(248, 249, 252, 1)',
        fontWeight: '600',
        fontFamily: 'Roboto-Medium',
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },
    style_image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 15,
    },
    overlayText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: fontFamilies.medium,
        backgroundColor: 'transparent',
        marginHorizontal: 12,
        marginBottom: 12,
        lineHeight: 25
    },
    from_top: {
        backgroundColor: 'rgba(114, 46, 209, 1)',
        borderRadius: 40,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    from_gold_Medal: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'space-between',
        // paddingLeft:20,
        // paddingRight:40,
    },
    top_Medal: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: -8,
        height: 28,
        width: 16
    },
    ontop_Medal: {
        position: 'absolute',
        zIndex: 1,
        top: -5,
        left: -5,
        height: 16,
        width: 16,
        backgroundColor: 'rgba(232, 122, 19, 1)',
        borderRadius: 25
    },
    number_medal: {
        color: 'rgba(255, 255, 255, 1)',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 12
    },
    header_topComment: {
        marginTop: 30,
        marginLeft: 15,
        fontWeight: '600',
        fontSize: 16,
        color: 'rgba(96, 96, 96, 1)',
        fontFamily: 'Roboto-Bold'
    },
    from_backgroud_event: {
        marginTop: 15,
        height: PAGE_HEIGHT * 0.3,
        width: PAGE_WIDTH * 0.85,
        marginHorizontal:10,
        position: 'relative',
    },
    background_envent: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        opacity: 1,
        backgroundColor: 'black',
    },
    shareIcon: {
        marginTop: 15,
        marginRight: 5,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        width: PAGE_WIDTH * 0.09,
        height: 36
    },
    from_check_event: {
        marginTop: 20,
        marginRight: 5,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 30,
        backgroundColor: 'rgba(229, 57, 53, 1)',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
    },
    from_check_event_process: {
        marginTop: 20,
        marginRight: 5,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 30,
        backgroundColor: 'rgba(82, 26, 203, 1)',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
    },
    heading_check_event: {
        fontWeight: '600',
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 5,
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Roboto-Regular'
    },
    title_event1: {
        marginLeft: 10,
        fontWeight: '700',
        fontSize: 16,
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Roboto-Bold',
        backgroundColor: 'transparent',
    },
    interested_participate1: {
        marginLeft: 10,
        fontWeight: '400',
        fontSize: 12,
        marginTop: 'auto',
        color: 'rgba(248, 249, 252, 1)',
        fontFamily: 'Roboto-Regular',
        backgroundColor: 'transparent',
    },
    date_title: {
        marginHorizontal: 8,
        marginBottom: 10,
        flexDirection: 'row'
    },
    date_title1: {
        width: 311,
        height: 70,
        zIndex: 1,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        marginHorizontal: 10,
        flexDirection: 'row',
        marginBottom: 45,
    },
    heading_date: {
        fontWeight: '700',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 1)',
    },
    title_event2: {
        fontWeight: '700',
        fontSize: 16,
        color: 'rgba(255, 255, 255, 1)'
    },
    interested_participate2: {
        fontWeight: '400',
        fontSize: 12,
        marginTop: 5,
        color: 'rgba(248, 249, 252, 1)'
    },
    from_question: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 15,
        paddingHorizontal: 15,
        paddingTop: 12,
        paddingBottom: 10,
    },
    name_user: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.1,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Bold'
    },
    time_question: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(204, 204, 204, 1)',
        fontFamily: 'Roboto-Medium'
    },
    title_question: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.4,
        marginTop: 12,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Bold'
    },
    title_summary: {
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.4,
        color: 'rgba(89, 89, 89, 1)',
        marginTop: 5,
        fontFamily: 'Roboto-Regular'
    },
    hashtag: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    from_hashtag: {
        height: 26,
        borderRadius: 16,
        justifyContent: 'center',
        marginLeft: 4
    },
    heading_hashtag: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 12,
        fontFamily: 'Roboto-Regular'
    },
    from_heart: {
        height: 36,
        width: 98,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heart: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    icon_heart: {
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(89, 89, 89, 1)',
        marginLeft: 2,
        fontFamily: 'Roboto-Regular'
    },
    number_comment: {
        marginLeft: 2,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(89, 89, 89, 1)',
        marginRight: 24
    },
    number_eye: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(89, 89, 89, 1)'
    },
    tabfooter: {
        borderWidth: 0.4,
        borderColor: 'rgba(215, 215, 215, 0.8)',
        marginVertical: 8
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body_date: {
        paddingTop: 10,
        paddingBottom: 7,
        paddingHorizontal: 3,
        width: PAGE_WIDTH * 0.2,
        height: '100%',
        borderRadius: 8,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        alignSelf: 'center',
    },
    month: {
        fontWeight: '500',
        fontSize: 12,
        color: 'rgba(30, 30, 30, 1)',
        alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
        textAlign:'center'
    },
})
export default styles;