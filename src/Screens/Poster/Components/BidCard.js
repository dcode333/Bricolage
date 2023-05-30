import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';
import { MyContext } from '../../../Store/Global'


const UserCard = ({ bids = {} }) => {
    const { lang, currentLang } = useContext(MyContext)
    const { message, userId } = bids;
    const [visible, setVisible] = useState(false);


    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.row}>
                    <Avatar.Image
                        source={{ uri: userId.imageUrl ? userId.imageUrl : 'https://res.cloudinary.com/dw6ee3vuu/image/upload/v1683906531/business-man-icon-free-vector_j8kavj.webp' }}
                        size={60}
                    />

                    <Text style={styles.name}>{userId.name}</Text>
                    <Button style={{ backgroundColor: '#1DBF73', marginHorizontal: 10 }} onPress={() => setVisible(true)}> <Text style={styles.label}>{lang["Bids"]["work"]} </Text></Button>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{lang["Bids"]["experience"]} </Text>
                    <Text style={styles.value}>{userId.experience}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{lang["Bids"]["city"]} </Text>
                    <Text style={styles.value}>{userId.city}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{lang["Bids"]["email"]} </Text>
                    <Text style={styles.value}>{userId.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{lang["Bids"]["contact"]} </Text>
                    <Text style={styles.value}>{userId.contact}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: '#1DBF73' }]}>{lang["Bids"]["message"]}</Text>
                </View>
                <Text style={[styles.value, { marginBottom: 5 }]}>{!currentLang ? message.en : message.ar}</Text>
            </Card.Content>
            <Modal visible={visible} animationType='slide'>
                <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
                    <Text style={styles.closeButtonText}>{lang["Bids"]["close"]}</Text>
                </TouchableOpacity>
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.imageContainer}>
                        {userId.imageCollectionUrl?.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.image} />
                        ))}
                    </View>
                </ScrollView>
            </Modal>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginLeft: 12,
        color: '#003912',
    },
    label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#003912',
        marginRight: 8,
    },
    value: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#003912',
    },
    actions: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    button: {
        backgroundColor: '#1DBF73',
        borderRadius: 20,
        marginVertical: 10,
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,

    },
    imageContainer: {
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        margin: 10,
    },
    closeButton: {
        backgroundColor: '#1DBF73',
        padding: 10,
        borderRadius: 5,
        margin: 10,

    },
    closeButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
    },
});

export default UserCard;