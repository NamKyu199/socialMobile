import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    errors:{
        fontSize:12,
        color:'red',
        fontStyle:'italic',
    },
    language:{
        marginTop: 15,
        height: 45,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 15,
    },
    from_container:{
        backgroundColor: '#FFFFFF',
        marginTop: 222,
        borderRadius: 32,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 24,
        zIndex: 1,
    },
    logo:{
        marginTop: 60,
        width: '100%',
        marginHorizontal: 50,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    from_language:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    title:{
        fontSize: 28,
        color: 'rgba(231, 79, 177, 1)',
        fontWeight: 'bold'
    },
    title_heading:{
        fontSize: 16,
        color: '#000000',
    },
    button:{
        marginTop: 40,
        height: 48,
        borderRadius: 8,
        backgroundColor: 'rgba(235, 47, 150, 1)',
        marginBottom: 50
    },
    button_heading:{
        alignSelf: 'center',
        marginTop: 12,
        color: '#FFFFFF'
    },
    lefticon:{
        width:15,
        height:15,
    },
});
export default styles;