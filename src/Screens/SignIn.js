import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { MyContext } from '../Store/Global'



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, settype] = useState('');
    const [disabled, setDisabled] = useState(false);
    const { lang, updateUser, updateToken, baseurl } = useContext(MyContext);
    const navigation = useNavigation();


    const handleLogin = () => {

        if (email === '' || password === '' || type === '') {
            Alert.alert(
                'Error',
                lang["SignIn"]["error"],
                [{ text: lang["SignIn"]["ok"], style: 'destructive' }],
                {
                    style: styles.alertContainer,
                    titleStyle: styles.alertText,
                    messageStyle: styles.alertText,
                }
            ); return;
        }
        setDisabled(true)

        fetch(`${baseurl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email,
                type,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data?.success === true) {
                    updateUser(data?.user)
                    updateToken(data?.token)
                }
                else Alert.alert('Error', data?.message, [{ text: 'OK', style: 'destructive' },],
                    { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
            })
            .catch(error => {
                Alert.alert('Error', lang["SignIn"]["failed"], [{ text: 'OK', style: 'destructive' },],
                    { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
                console.error(error)
            }).finally(() => setDisabled(false));
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/adaptive-icon.png')} style={{ width: 250, height: 180,marginTop:-50}} />
            <Text style={styles.title}>{lang["SignIn"]["login"]}</Text>
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
                    placeholder={lang["SignIn"]["password"]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.radioLabel}>{lang["SignIn"]["Dont have an account"]} ? <Text onPress={() => navigation.navigate("SignUp")} style={{ color: '#003912' }}>{lang["SignIn"]["Signup"]}</Text></Text>
                <Text onPress={() => navigation.navigate("Forgetpass")} style={[styles.radioLabel, { color: '#003912' }]}>{lang["SignIn"]["forget"]}</Text>

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
            <Button style={styles.button} onPress={handleLogin} disabled={disabled} >
                <Text style={styles.buttonText}>{lang["SignIn"]["login"]}</Text>
            </Button>


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
        fontWeight: 'bold',
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
        marginBottom: 20,
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

export default SignIn;
