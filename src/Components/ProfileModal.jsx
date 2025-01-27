import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import GlobalColors from '../Styles/GlobalColors';

const ProfileModal = ({ visible, onClose, userDetails }) => {

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Profile</Text>
                        <View style={{ width: 50 }} />
                    </View>
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Image style={{ width: 120, height: 120, borderRadius: 100 }}
                                source={userDetails?.profilePic
                                    ? { uri: userDetails.profilePic }
                                    : require('../Assets/profile.jpeg')} />
                            <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', textTransform: 'capitalize', color: GlobalColors.text }}>{userDetails.name}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '400', textTransform: 'capitalize', color: GlobalColors.text }}>{userDetails.role == "HOD" ? "Head of department" : userDetails.role}</Text>
                        </View>

                        {/* Personal Details */}
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>Personal Details</Text>

                            <View style={{ backgroundColor: GlobalColors.secondary, padding: 10, borderRadius: 10 }}>
                                <Text style={styles.detailItem}>
                                    Name: {userDetails.name}
                                </Text>
                                <Text style={styles.detailItem}>
                                    Date of Birth: {userDetails?.dob}
                                </Text>
                                <Text style={styles.detailItem}>
                                    Gender: {userDetails.gender}
                                </Text>
                            </View>

                        </View>
                        {/* Contact Details */}
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>Contact</Text>

                            <View style={{ backgroundColor: GlobalColors.secondary, padding: 10, borderRadius: 10 }}>
                                <Text style={styles.detailItem}>Email: {userDetails.email}</Text>
                                <Text style={styles.detailItem}>Phone: {userDetails.mobile}</Text>
                            </View>

                        </View>



                        {/* Address */}
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>Address</Text>

                            <View style={{ backgroundColor: GlobalColors.secondary, padding: 10, borderRadius: 10 }}>
                                <Text style={styles.detailItem}>Street: {userDetails.street}</Text>
                                <Text style={styles.detailItem}>City: {userDetails.city}</Text>
                                <Text style={styles.detailItem}>
                                    State: {userDetails.state}
                                </Text>
                                <Text style={styles.detailItem}>Zip: {userDetails.zip}</Text>
                            </View>

                        </View>
                    </ScrollView>


                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    modalContent: {
        top: 120,
        width: '100%',
        height: '100%',
        backgroundColor: GlobalColors.primary,
        borderRadius: 40,
        padding: 20,
        paddingBottom: 50,
        // elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: GlobalColors.text
    },
    category: {
        marginBottom: 15,
        // backgroundColor: GlobalColors.secondary,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: GlobalColors.text
    },
    detailItem: {
        fontSize: 14,
        marginBottom: 3,
        marginLeft: 10,
        color: GlobalColors.text
    },
    closeButton: {
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#107ee5',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ProfileModal;
