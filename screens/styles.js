import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#00726D',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    sectionContainer: {
        width: `100%`,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    LogInText: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: 15,
        lineHeight: 22,
        color: "#188F79"
    },
    LogIn: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 70
    },
    Account: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 15,
        lineHeight: 22,
        color: "#9D9393"
    }
})