import { Dimensions, StyleSheet } from "react-native";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        fontSize: 30,
        lineHeight: 35,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 20,
        borderBottomWidth: 2.5,
        borderColor: 'rgba(151, 78, 195, 1)',
        fontFamily: 'Roboto-Medium',
        marginLeft: 16,
        paddingBottom:4,
        paddingLeft:4
    },
    from_backgroud_event: {
        marginTop: 15,
        height: PAGE_HEIGHT * 0.3,
        width: PAGE_WIDTH * 0.85,
        marginRight: 10
    },
    background_envent: {
        height: PAGE_HEIGHT * 0.3,
        width: PAGE_WIDTH * 0.85,
        borderRadius: 8,
    },
    date_title: {
        marginHorizontal: 8,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    hastag1: {
        borderRadius: 16,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    headingHastag: {
        fontWeight: '500',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Roboto-Regular'
    },
    footerEvent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    title_heading: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(255, 255, 255, 1)',
        marginTop: 10,
        fontFamily: 'Roboto-Medium',
        letterSpacing:0.4
    },
    header_heading: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Medium',
        marginLeft: 16
    },
    fromEventNew: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingVertical: 8,
    },
    titleEvent2: {
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Medium',
        letterSpacing:0.4
    },
    shadowNews: {
        shadowColor: '#181818',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginHorizontal: 16,
        marginTop: 10
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
})

export default styles;