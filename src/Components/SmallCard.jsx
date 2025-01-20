import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text } from "react-native";
import GlobalColors from "../Styles/GlobalColors";

const SmallCard = ({ icon, title, location }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate(location)} style={{ backgroundColor: GlobalColors.primary, padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 120, width: '45%' }}>
            <Image
                source={icon}
                style={{ width: 40, height: 40,marginBottom:10 }}
            />
            <Text style={{ color: GlobalColors.text, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>{title}</Text>
        </Pressable>
    );
}

export default SmallCard;