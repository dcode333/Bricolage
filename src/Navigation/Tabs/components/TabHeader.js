import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Switch } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';;
import { MyContext } from '../../../Store/Global'

const Header = () => {
    const { currentLang, updateLang, user, updateToken, updateUser, lang } = useContext(MyContext);
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    drops = [
        {
            id: 1,
            title: lang["tabheader"]["profile"],
            onPress: () => {
                setShow(false)
                navigation.navigate(user?.type === 'employee' ? 'Editprofile' : 'EditprofilePoster')
            }
        },
        {
            id: 2,
            title: lang["tabheader"]["help"],
            onPress: () => {
                Alert.alert(
                    lang["tabheader"]["contact"],
                    'contact@Bricolage.com',
                    [{ text: lang["tabheader"]["cancel"], style: 'cancel', },
                    {
                        text: lang["tabheader"]["ok"],
                        onPress: () => setShow(false)
                    }
                    ]
                );
            }
        },
        {
            id: 3,
            title: lang["tabheader"]["logouttext"],
            onPress: () => {
                Alert.alert(
                    lang["tabheader"]["confirmation"],
                    lang["tabheader"]["logout"],
                    [{ text: lang["tabheader"]["cancel"], style: 'cancel', },
                    {
                        text: lang["tabheader"]["ok"],
                        onPress: () => {
                            updateToken(null);
                            updateUser(null);
                            setShow(false);
                        }
                    }
                    ]
                );
            }
        }
    ]

    const onToggleSwitch = () => {
        updateLang(currentLang ? 'en' : 'ar')
    };

    return (
        <Appbar.Header style={styles.header}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Switch value={currentLang} onValueChange={onToggleSwitch} />
                <Text style={{ fontFamily: 'Poppins-Regular' }} >{currentLang ? 'عربي' : 'English'}</Text>
            </View>
            <Text style={styles.title}>BRICOLAGE</Text>
            <TouchableOpacity onPress={() => { setShow(!show) }}>
                <Image source={{ uri: user?.imageUrl ? `${user.imageUrl}` : 'https://res.cloudinary.com/dw6ee3vuu/image/upload/v1683906531/business-man-icon-free-vector_j8kavj.webp' }} style={styles.image} />
            </TouchableOpacity>
            {show && (<View style={styles.dropdown}>
                {drops.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.dropdownItem} key={index} onPress={item.onPress}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10 }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>)}
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1DBF73',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#003912',
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',

    },

    dropdownItem: {
        padding: 10,
        backgroundColor: '#1DBF73',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        borderRadius: 10,
        marginVertical: 5
    }

});

export default Header;
