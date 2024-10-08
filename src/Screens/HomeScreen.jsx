import { Image, Pressable, Text, View } from "react-native"
import GlobalStyles from "../Styles/GlobalStyles"
import GlobalColors from "../Styles/GlobalColors"
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={GlobalStyles.container}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                <Image source={require("../Assets/girl1.jpeg")} style={{width: 70, height: 70,borderRadius:100,marginRight:20}}/>
               <View style={{flexDirection:'column',textAlign:'left',}}>
               <Text style={{fontSize:18, fontWeight:'600',color:'white'}}>Welcome ..</Text>
               <Text style={{fontSize:18, fontWeight:'600',color:'white'}}>Parminder Singh</Text>
               </View>
            </View>
            <View style={{width:'100%',flexDirection:'column',justifyContent:'space-between',gap:10,marginTop:20}}>
                <Pressable style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>View Time Table</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('CreateTimetable')} style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>Create Time Table</Text>
                </Pressable>
                <Pressable style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>Created Time Tables</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default HomeScreen