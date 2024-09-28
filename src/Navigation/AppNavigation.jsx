import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CreateTimetable from "../Screens/CreateTimetable";
import TimetableScreen from "../Screens/TimeTable";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateTimetable" component={CreateTimetable}/>
            <Stack.Screen name="TimeTable" component={TimetableScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};  

export default AppNavigation;