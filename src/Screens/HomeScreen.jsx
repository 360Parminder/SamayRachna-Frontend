import { Image, Pressable, Text, View } from "react-native"
import GlobalStyles from "../Styles/GlobalStyles"
import GlobalColors from "../Styles/GlobalColors"
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserDataContext } from "../Context/UserData";
import { getDateDay, getGreeting } from "../Utils/datetime";

const HomeScreen = () => {
    const navigation = useNavigation();
    
    const {userData}= useContext(UserDataContext);
    const {day,date} = getDateDay();
    const {greeting}=getGreeting();
    return (
        <View style={GlobalStyles.container}>
            <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                <Image source={require("../Assets/girl1.jpeg")} style={{width: 70, height: 70,borderRadius:100,marginRight:20}}/>
               <View style={{flexDirection:'column',textAlign:'left',}}>
               <Text style={{fontSize:18, fontWeight:'600',color:'white'}}>{greeting}</Text>
               <Text style={{fontSize:18, fontWeight:'600',color:'white'}}>{userData?.name}</Text>
               </View>
            </View>
            <View style={{width:'100%',flexDirection:'column',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:20}}>{date}</Text>
                <Text style={{color:'#fff',fontSize:20}}>{day}</Text>
            </View>
            <View style={{width:'100%',flexDirection:'column',justifyContent:'space-between',gap:10,marginTop:20}}>
                <Pressable onPress={()=>navigation.navigate('MyTimetable')} style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>My Time Table</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('CreateTimetable')} style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>Create Time Table</Text>
                </Pressable>
                <Pressable style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>Created Time Tables</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('AllTimetables')} style={{backgroundColor:GlobalColors.tertiary,padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',height:120}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'600'}}>All Time Tables</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default HomeScreen