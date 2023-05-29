import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Appbar, Switch } from 'react-native-paper';
import { MyContext } from '../../../Store/Global'


const Header = () => {
    const { currentLang, updateLang, user } = useContext(MyContext);
    
    const onToggleSwitch = () => {
        updateLang(currentLang ? 'en' : 'ar')
    };

    return (
        <Appbar.Header style={styles.header}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Switch value={currentLang} onValueChange={onToggleSwitch} />
                <Text style={{ fontFamily: 'Poppins-Regular', color: 'white', marginBottom: 5 }} >{currentLang ? 'عربي' : 'English'}</Text>
            </View>
            <Text style={styles.title}>BRICOLAGE</Text>
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#003912',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#003912',
    },
});

export default Header;
