import { StyleSheet } from "react-native";
import GlobalColors from "./GlobalColors";

const GlobalStyles = StyleSheet.create({
    container: {
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
        borderColor: GlobalColors.border,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: GlobalColors.text,
        fontSize: 16,
    }
});

export default GlobalStyles;