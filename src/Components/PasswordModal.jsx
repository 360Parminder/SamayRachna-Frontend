import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import GlobalColors from '../Styles/GlobalColors';
import InputGroup from './InputGroup';
import GlobalStyles from '../Styles/GlobalStyles';
import userAuth from '../Api/userAuth';

const PasswordModal = ({ visible, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSave = async () => {
        if (!oldPassword || !newPassword) {
            Alert.alert('Please fill all fields');
        }
        else {
            setLoading(true);
            const response = await userAuth.changePassword(oldPassword, newPassword);
            if (response.success) {
                Alert.alert(response.message);
                setOldPassword('');
                setNewPassword('');
                setLoading(false);
                onClose();

            }
            else {
                Alert.alert(response.message);
                setLoading(false);
            }
        }

    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Change Password</Text>
                    <InputGroup
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        label="Old Password"
                    />
                    <InputGroup
                        value={newPassword}
                        onChangeText={setNewPassword}
                        label="New Password"
                    />
                    <TouchableOpacity disabled={loading} style={[GlobalStyles.primaryButton, { width: '100%' }]} onPress={() => handleSave()}>
                        <Text style={GlobalStyles.primaryButtonText}>{loading ? "Updating..." : "Update Password"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        marginTop: 120,
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: GlobalColors.primary,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: GlobalColors.text,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PasswordModal;