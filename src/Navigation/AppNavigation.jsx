import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CreateTimetable from "../Screens/CreateTimetable";
import TimetableScreen from "../Screens/TimeTable";
import AllTimetables from "../Screens/AllTimetables";
import MyTimetable from "../Screens/MyTimetable";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateTimetable" component={CreateTimetable}/>
            <Stack.Screen name="TimeTable" component={TimetableScreen} />
            <Stack.Screen name="AllTimetables" component={AllTimetables} />
            <Stack.Screen name="MyTimetable" component={MyTimetable} />  
        </Stack.Navigator>
    );
};  

export default AppNavigation;