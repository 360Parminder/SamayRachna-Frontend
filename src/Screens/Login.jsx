import { Image, Pressable, Text, TextInput, useWindowDimensions, View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import GlobalColors from "../Styles/GlobalColors";
import userAuth from "../Api/userAuth";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/Auth";

const Login = () => {
    const { authenticated, loading, login } = useContext(AuthContext);
    const { width, height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async() => {
        if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        // if (password.length < 6) {
        //     Alert.alert("Invalid Password", "Password must be at least 6 characters long.");
        //     return;
        // }

        await login(email, password);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={GlobalStyles.container}
        >
            <View style={{ width: width * 0.8 }}>
                <Image source={require("../Assets/analytics.png")} style={{ width: 200, height: 200 }} />
                <View style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '600' }}>Login</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={GlobalStyles.label}>Email</Text>
                        <TextInput
                            onChangeText={setEmail}
                            style={GlobalStyles.inputText}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={GlobalStyles.label}>Password</Text>
                        <TextInput
                            onChangeText={setPassword}
                            style={GlobalStyles.inputText}
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                    </View>
                    <Pressable
                        onPress={handleLogin}
                        style={{
                            marginTop: 20,
                            backgroundColor: GlobalColors.primary,
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        disabled={loading}
                    >
                        <Text style={{ color: GlobalColors.text, fontSize: 20, fontWeight: '600' }}>
                            {loading ? "Logging in..." : "Login"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;