import { Image, Pressable, Text, TextInput, View } from "react-native"
import GlobalStyles from "../Styles/Global"
import GlobalColors from "../Styles/GlobalColors"


const Login = () => {
    return (
       <View style={GlobalStyles.container}>
            <Image source={require("../Assets/analytics.png")} style={{width: 200, height: 200}}/>
            <View style={{width:'100%',}}>
                <Text style={{textAlign:'center',fontSize:28, fontWeight:'600'}}></Text>
                <View>
                    <Text style={GlobalStyles.label}>Email</Text>
                    <TextInput style={GlobalStyles.inputText} placeholder="Enter your email"/>
                </View>
                <View>
                <Text style={GlobalStyles.label}>Password</Text>
                <TextInput style={GlobalStyles.inputText} placeholder="Enter your password"/>
                </View>
                <Pressable style={{ marginTop: 20, backgroundColor: GlobalColors.primary, padding: 10, borderRadius: 5,justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: GlobalColors.text, fontSize: 20, fontWeight: '600'}}>Login</Text>
                </Pressable>
            </View>
       </View>
    )
}

export default Login