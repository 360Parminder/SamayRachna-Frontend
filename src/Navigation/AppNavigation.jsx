import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CreateTimetable from "../Screens/CreateTimetable";
import TimetableScreen from "../Screens/TimeTable";
import AllTimetables from "../Screens/AllTimetables";
import MyTimetable from "../Screens/MyTimetable";
import Profile from "../Screens/Profile";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateTimetable" component={CreateTimetable} options={{ headerShown: false }}/>
            <Stack.Screen name="TimeTable" component={TimetableScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="AllTimetables" component={AllTimetables}  options={{ headerShown: false }}/>
            <Stack.Screen name="MyTimetable" component={MyTimetable}  options={{ headerShown: false }}/>  
            <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};  

export default AppNavigation;