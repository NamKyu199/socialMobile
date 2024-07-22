import { Dimensions, StyleSheet } from "react-native";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    from_header: {
        marginHorizontal: 16
    },
    header_heading: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Bold',
        marginLeft:16,
        letterSpacing:0.4
    },
    background_envent: {
        borderRadius: 8,
        width: '100%',
        height: '100%'
    },
    from_eventTop: {
        marginRight: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    from_eventTop1: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical:12,
        paddingHorizontal:12,
    },
    hastag1: {
        backgroundColor: 'rgba(171, 81, 228, 1)',
        borderRadius: 16,
        alignItems: 'center',
        marginHorizontal: 2
    },
    headingHastag: {
        fontWeight: '500',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 12,
        fontFamily: 'Roboto-Medium',
        paddingVertical:6
    },
    titleEvent: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 8,
        fontFamily: 'Roboto-Medium',
        paddingVertical: 3,
        letterSpacing:0.4
    },
    titleEvent1: {
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 8,
        fontFamily: 'Roboto-Medium',
        letterSpacing:0.4
    },
    titleEvent2: {
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily: 'Roboto-Medium',
        letterSpacing:0.4
    },
    footerEvent: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fromEventNew: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingVertical: 8
    },
    row: {
        flex: 1,
        gap: 15,
        marginVertical: 5,
        paddingHorizontal: 16,
        marginTop: 10,
    },
    shadow: {
        shadowColor: '#181818',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 25,
        marginTop: 12
    },
    shadowType: {
        shadowColor: '#181818',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginHorizontal: 16,
        marginBottom: 10,
        marginTop: 6
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