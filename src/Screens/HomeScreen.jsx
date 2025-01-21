import { Image, Pressable, Text, View } from "react-native"
import GlobalStyles from "../Styles/GlobalStyles"
import GlobalColors from "../Styles/GlobalColors"
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserDataContext } from "../Context/UserData";
import { getDateDay, getGreeting } from "../Utils/datetime";
import SmallCard from "../Components/SmallCard";

const HomeScreen = () => {
    const navigation = useNavigation();
    const { userData } = useContext(UserDataContext);
    const { day, date } = getDateDay();
    const { greeting } = getGreeting();
    return (
        <View style={GlobalStyles.container}>
            <Pressable style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Profile')}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{uri: userData?.profilepic}} style={{ width: 70, height: 70, borderRadius: 100, marginRight: 20 }} />
                    <View style={{ flexDirection: 'column', textAlign: 'left', }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>{greeting}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white',textTransform:'capitalize' }}>{userData?.name}</Text>
                    </View>
                </View>
            </Pressable>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{date}</Text>
                <Text style={{ color: '#fff', fontSize: 20 }}>{day}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 30, justifyContent: 'center' }}>
                <SmallCard title="My Time Table" location="MyTimetable" icon={require('../Assets/schedule.png')} />
                <SmallCard title="Create Time Table" location="CreateTimetable" icon={require('../Assets/idea.png')} />
                <SmallCard title="Created Time Tables" location="CreatedTimetables" icon={require('../Assets/inuse.png')} />
                <SmallCard title="All Time Tables" location="AllTimetables" icon={require('../Assets/checklist.png')} />
            </View>
        </View>
    )
}

export default HomeScreen