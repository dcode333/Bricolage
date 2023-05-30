import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';

function isCurrentDateGreaterThanFutureDate(date) {
    const currentTime = new Date(date);
    const futureTime = new Date(currentTime.getTime() + 2 * 60 * 1000); // Add 2 minutes (2 * 60 seconds * 1000 milliseconds)
    return currentTime > futureTime;
}

const ConfirmationModal = ({ lang, modalVisible, setModalVisible, dbPin, handleRegister }) => {

    const [pincode, setPincode] = useState('');

    const handleLogin = () => {
        if (pincode === '')
            return;

        if (pincode === dbPin.pin && !isCurrentDateGreaterThanFutureDate(dbPin.expiry)) {

            Alert.alert(
                lang["SignIn"]["Success"],
                lang["SignIn"]["SuccessMessage"],
                [{
                    text: "OK", onPress: () => {
                        handleRegister();
                        setModalVisible(false)
                    }
                }]
            );
        } else {
            Alert.alert(
                lang["SignIn"]["Error"],
                lang["SignIn"]["ErrorMessage"],
                [{ text: "OK", onPress: () => setModalVisible(false) }]
            )
        }
    };

    return (
        <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>{lang["SignIn"]["Confirmation"]}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={lang["SignIn"]["pin"]}
                        value={pincode}
                        onChangeText={setPincode}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                    />
                    <Text style={[styles.radioLabel, { alignSelf: 'center' }]}>{lang["SignIn"]["Confirmprompt"]}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{lang["SignIn"]["enter"]}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1DBF73',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 32,
    },
    input: {
        fontFamily: 'Poppins-Medium',
        backgroundColor: '#FFFFFF',
        height: 50,
        width: 300,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    radioLabel: {
        fontFamily: 'Poppins-Medium',
        color: '#FFFFFF',
        marginRight: 16,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 16,
    },
    radioButtonActive: {
        backgroundColor: '#1DBF73',
    },
    radioOption: {
        fontFamily: 'Poppins-Medium',
        color: '#1DBF73',
        fontWeight: 'bold',
    },
    radioOptionActive: {
        fontFamily: 'Poppins-Medium',
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 45,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1DBF73',
    },
});

export default ConfirmationModal;
