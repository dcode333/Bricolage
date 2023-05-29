import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Button, IconButton, Menu, Provider as PaperProvider, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


import { useNavigation } from '@react-navigation/native';
import { MyContext } from '../Store/Global'
import { cities } from '../utils/Helpers';
// let user = { "city": "Casablanca", "experience": "9", "id": "646bace8ab255de95a91f27b", "imageUrl": "https://res.cloudinary.com/dw6ee3vuu/image/upload/v1684778186/v6pisojfxghkq2iz32ib.jpg", "name": "Omair", "profession": "Artist", "type": "employee" }


profs = [
    "Writer", "Carpenter", "Mechanic", "Electrician",
    "Porter", "Painter", "Driver", "Waiter", "Plumber",
    "Chef", "Artist", "Butcher", "Builder", "Potter"
]

const Editprofile = () => {

    const { lang, user, baseurl, updateUser } = useContext(MyContext);
    const [name, setName] = useState(user.name);
    const [contact, setContact] = useState(user.contact);
    const [profession, setProfession] = useState(user.profession);
    const [experience, setExperience] = useState(user.experience);
    const [imageUrl, setImageUrl] = useState(user.imageCollectionUrl);
    const [visible, setVisible] = useState(false);
    const [visibleProf, setVisibleProf] = useState(false);
    const [city, setcity] = useState(user.city);
    const [disableButtons, setDisableButtons] = useState(false);
    const navigation = useNavigation();

    const uploadImage = async (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'jobupapp')
        data.append("cloud_name", "dw6ee3vuu")
        fetch("https://api.cloudinary.com/v1_1/dw6ee3vuu/image/upload", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }

        }).then(res => res.json()).
            then(data => {
                setImageUrl([...imageUrl, data.secure_url])
                alert(lang["SignUp"]["Selected"])
            }).catch(err => {
                alert(err?.message)
            }).finally(() => {
                setDisableButtons(false)
            })
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        setDisableButtons(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const uri = result.assets[0].uri
            const type = 'image/jpeg'
            const name = 'photo.jpg'
            const source = { uri, type, name }
            uploadImage(source)
        }
        else setDisableButtons(false)
    };

    const handleOptionSelect = (option) => {
        setcity(option);
        setVisible(false);
    }

    const handleProfSelect = (index) => {
        setProfession(profs[index]);
        setVisibleProf(false);
    }

    const handleRegister = () => {
        if (name === user.name && contact === user.contact && city === user.city && profession === user.profession && experience === user.experience && imageUrl === user.imageCollectionUrl) {
            Alert.alert('Error', lang["SignUp"]["nochange"], [{ text: 'OK', style: 'destructive' }])
            return;
        }

        setDisableButtons(true)
        fetch(`${baseurl}/api/auth/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                contact,
                city,
                profession,
                experience,
                imageCollectionUrl: imageUrl,
                id: user.id
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data?.success === true) {
                    updateUser(data?.data)
                }
                else Alert.alert('Error', data.error ? data?.error : lang["SignUp"]["failed"], [{ text: 'OK', style: 'destructive' },],
                    { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
            })
            .catch(error => console.error(error))
            .finally(() => {
                setDisableButtons(false)
            });
    }

    const handleDelete = (index) => {
        setImageUrl(imageUrl.filter((item, i) => i !== index))
    }


    return (
        <View style={styles.container}>
            <PaperProvider>
                <Text style={styles.title}>{lang["SignUp"]["updateinfo"]}</Text>
                <View >
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,]}
                            label={lang["SignUp"]["name"]}
                            value={name}
                            onChangeText={setName}
                            mode='flat'
                        />
                        <TextInput
                            style={styles.input}
                            label={lang["SignUp"]["contact"]}
                            value={contact}
                            onChangeText={setContact}
                            keyboardType='phone-pad'

                        />
                        <View>
                            <Menu
                                style={styles.menuStyles}
                                visible={visible}
                                onDismiss={() => setVisible(false)}
                                anchor={<TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
                                    <Text style={[styles.buttonText, { padding: 10 }]} >{city === '' ? lang["SignUp"]["Select Cities"] : city}</Text>
                                </TouchableOpacity>}
                            >
                                <ScrollView >
                                    {cities.map((option, index) => (
                                        <Menu.Item
                                            style={styles.buttonText}
                                            key={index}
                                            title={option}
                                            onPress={() => handleOptionSelect(option)}
                                        />
                                    ))}
                                </ScrollView>
                            </Menu>
                        </View>
                    </View>


                    {user.type === 'employee' && (<>
                        <View style={styles.inputContainer}>
                            <View>
                                <Menu
                                    style={styles.menuStyles}
                                    visible={visibleProf}
                                    onDismiss={() => setVisibleProf(false)}
                                    anchor={<TouchableOpacity style={styles.input} onPress={() => setVisibleProf(true)}>
                                        <Text style={[styles.buttonText, { padding: 10 }]} >{profession === '' ? lang["SignUp"]["Select Profession"] : lang["SignUp"]["Selected"]}</Text>
                                    </TouchableOpacity>}
                                >
                                    <ScrollView>

                                        {lang["professions"].map((option, index) => (
                                            <Menu.Item
                                                style={styles.buttonText}
                                                key={index}
                                                title={option}
                                                onPress={() => handleProfSelect(index)}
                                            />
                                        ))}
                                    </ScrollView>
                                </Menu>
                            </View>
                            <TextInput
                                style={styles.input}
                                label={lang["SignUp"]["experience"]}
                                value={experience}
                                onChangeText={setExperience}
                            />
                        </View>

                        <ScrollView style={styles.camera} horizontal>

                            {imageUrl?.map((item, index) => (
                                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image key={index} source={{ uri: item }} style={styles.userImages} />
                                    <TouchableOpacity style={{ position: 'relative', bottom: 30, backgroundColor: '#003912', borderRadius: 30 }} onPress={() => handleDelete(index)}>
                                        <IconButton
                                            icon={'delete'}
                                            disabled={disableButtons}
                                            iconColor={'#1DBF73'}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.camera}>
                            <IconButton
                                icon={'camera'}
                                disabled={disableButtons}
                                iconColor={'#003912'}
                                size={40}
                                onPress={() => pickImage()}
                            />
                        </View>
                    </>)}
                    <Button disabled={disableButtons} onPress={handleRegister} style={[styles.button, { marginBottom: 20, backgroundColor: '#003912' }]}>
                        <Text style={[styles.buttonText]}>{lang["SignUp"]["updateinfo"]}</Text>

                    </Button>
                </View>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1DBF73',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        color: '#003912',
        marginBottom: 10,
        fontFamily: 'Poppins-Bold',
        alignSelf: 'center',
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
    },
    dropdownContainer: {
        marginBottom: 10,
    },
    dropdownLabel: {
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Poppins-Medium',
    },
    dropdownOption: {
        flex: 1,
    },
    dropdownOptionText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    dropdownMenu: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
        elevation: 1,
        fontFamily: 'Poppins-Medium',
    },
    dropdownMenuItemText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    radioContainer: {
        marginBottom: 20,
    },
    radioLabel: {
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 25,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Medium',
    },
    radioButtonActive: {
        backgroundColor: '#1DBF73',
    },
    radioOption: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
    },
    radioOptionActive: {
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 15,
        fontFamily: 'Poppins-Medium',
    },
    buttonText: {
        color: '#1DBF73',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    menuStyles: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
    },
    camera: {
        alignSelf: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    userImages: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginHorizontal: 10
    }
});

export default Editprofile;