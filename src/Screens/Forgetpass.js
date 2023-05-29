import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { MyContext } from '../Store/Global'
import ConfirmationModal from './Confirmaton';



const Forgetpass = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableButtons, setDisableButtons] = useState(false);
    const [dbPin, setDbPin] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [type, settype] = useState('');
    const { lang, updateUser, updateToken, baseurl } = useContext(MyContext);
    const navigation = useNavigation();


    const handleRegister = () => {

        if (disableButtons) return;

        setDisableButtons(true)

        fetch(`${baseurl}/api/auth/changepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email,
                type,
                pin: dbPin.pin
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data?.success === true) {
                    navigation.navigate("SignIn")
                }
                else Alert.alert('Error', data?.message, [{ text: 'OK', style: 'destructive' },],
                    { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
            })
            .catch(error => {
                Alert.alert('Error', lang["SignIn"]["failed"], [{ text: 'OK', style: 'destructive' },],
                    { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
                console.error(error)
            }).finally(() => setDisableButtons(false));
    }

    const handlePin = () => {
        if (disableButtons) return;
        if (email === '' || password === '' || type === '') {
            Alert.alert(
                'Error',
                lang["SignIn"]["error"],
                [{ text: lang["SignIn"]["ok"], style: 'destructive' }]);
            return;
        }


        setDisableButtons(true)
        fetch(`${baseurl}/api/auth/sendmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data?.success === true) {
                    setDbPin({ pin: data?.data?.pincode, expiry: data?.data?.expiry })
                    setModalVisible(true)
                }

                else Alert.alert('Error', lang["SignIn"]["failed"], [{ text: 'OK', style: 'destructive' },],
                    { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
            })
            .catch(error => {
                console.log(error)
                Alert.alert('Error', lang["SignIn"]["failed"], [{ text: 'OK', style: 'destructive' }])
            })
            .finally(() => {
                setDisableButtons(false)
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{lang["SignIn"]["newPassword"]}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={lang["SignIn"]["email"]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder={lang["SignIn"]["newPassword"]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>{lang["SignIn"]["login as"]} </Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={[styles.radioButton, type === 'employer' ? styles.radioButtonActive : null]}
                        onPress={() => settype('employee')}
                    >
                        <Text style={[styles.radioOption, type === 'employer' ? styles.radioOptionActive : null]}>{lang["SignIn"]["Employee"]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, type === 'employee' ? styles.radioButtonActive : null]}
                        onPress={() => settype('employer')}
                    >
                        <Text style={[styles.radioOption, type === 'employee' ? styles.radioOptionActive : null]}>{lang["SignIn"]["Employer"]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Button style={styles.button} onPress={handlePin} disabled={disableButtons} >
                <Text style={styles.buttonText}>{lang["SignIn"]["change"]}</Text>
            </Button>
            <ConfirmationModal
                lang={lang}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleRegister={handleRegister}
                dbPin={dbPin}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        backgroundColor: '#f0ad4e',
        borderRadius: 18,
        padding: 16,
    },
    alertText: {
        color: 'tomato',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
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
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1DBF73',
    },
});

export default Forgetpass;
