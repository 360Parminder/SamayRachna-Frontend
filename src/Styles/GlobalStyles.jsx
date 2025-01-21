import { Platform, StyleSheet } from "react-native";
import GlobalColors from "./GlobalColors";

const GlobalStyles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 70 : 10,
        paddingBottom: Platform.OS === "ios" ? 70 : 10,
        flex: 1,
        backgroundColor: GlobalColors.background,
        paddingHorizontal: 20,
        // justifyContent: 'center',
        alignItems:'center'
    },
    label: {
        color: GlobalColors.textSecondary,
        fontSize: 22,
        fontWeight: "400",
        marginBottom: 10,
    },
    inputText:{
        // borderColor: GlobalColors.border,
        // borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: GlobalColors.secondary,
        color: GlobalColors.text,
        placeholderTextColor: GlobalColors.textSecondary,
        fontSize: 16,
    },
    header:{
        color: GlobalColors.text,
        fontSize: 26,
        fontWeight: "600",
        marginBottom: 20,

    },
    primaryButton: {
        backgroundColor: GlobalColors.buttonPrimary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    primaryButtonText: {
        color: GlobalColors.primaryButtonText,
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: GlobalColors.buttonSecondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    secondaryButtonText: {
        color: GlobalColors.buttonSecondaryText,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GlobalStyles;