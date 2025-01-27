import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import GlobalColors from '../Styles/GlobalColors';
import { UserDataContext } from '../Context/UserData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Context/Auth';
import ProfileModal from '../Components/ProfileModal';
import PasswordModal from '../Components/PasswordModal';

const Profile = () => {
    const { userData } = useContext(UserDataContext);
    const {logout} = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [passwordmodal,setPasswordmodal]=useState(false);
    return (
        <View style={GlobalStyles.container}>
            <View style={styles.profileHeader}>
                <Image
                   source={
                    userData?.profilePic
                      ? { uri: userData.profilePic }
                      : require('../Assets/profile.jpeg') }
                    style={styles.profileImage}
                />
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.profileName}>{userData.name}</Text>
                    <Text style={styles.profilePost}>{userData.role == "HOD" ? "Head of Department" : userData.role}</Text>
                </View>
            </View>
            <View style={styles.profileOptions}>
                <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.option}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons style={{ backgroundColor: GlobalColors.buttonPrimary, padding: 10, borderRadius: 100 }} name="person-outline" size={30} color={GlobalColors.primaryButtonText} />
                        <Text style={styles.optionText}>Profile</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={30} color={GlobalColors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setPasswordmodal(true)} style={styles.option}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons style={{ backgroundColor: GlobalColors.buttonPrimary, padding: 10, borderRadius: 100 }} name="lock-closed-outline" size={30} color={GlobalColors.primaryButtonText} />
                        <Text style={styles.optionText}>Change Password</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={30} color={GlobalColors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons style={{ backgroundColor: GlobalColors.buttonPrimary, padding: 10, borderRadius: 100 }} name="notifications-outline" size={30} color={GlobalColors.primaryButtonText} />
                        <Text style={styles.optionText}>Notification</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={30} color={GlobalColors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons style={{ backgroundColor: GlobalColors.buttonPrimary, padding: 10, borderRadius: 100 }} name="settings-outline" size={30} color={GlobalColors.primaryButtonText} />
                        <Text style={styles.optionText}>Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={30} color={GlobalColors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={styles.option}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons style={{ backgroundColor: GlobalColors.buttonSecondary, padding: 10, borderRadius: 100 }} name="log-out-outline" size={30} color={GlobalColors.buttonSecondaryText} />
                        <Text style={styles.optionText}>Logout</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={30} color={GlobalColors.text} />
                </TouchableOpacity>
            </View>
            <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} userDetails={userData} />
            <PasswordModal visible={passwordmodal} onClose={() => setPasswordmodal(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: GlobalColors.primary,
        borderRadius: 40,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: GlobalColors.text,
        textTransform: 'capitalize',

    },
    profilePost: {
        fontSize: 16,
        color: GlobalColors.textSecondary,
        marginTop: 5,
        textTransform: 'capitalize',
    },
    profileOptions: {
        width: '100%',
        marginTop: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        padding: 10,
        gap: 10,
    },
    optionText: {
        fontSize: 20,
        color: GlobalColors.text,
    },
});

export default Profile;