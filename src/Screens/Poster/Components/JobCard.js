import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { MyContext } from '../../../Store/Global';
import { useNavigation } from '@react-navigation/native';



const JobCard = ({
    description = { en: '', ar: '' },
    title = { en: '', ar: '' },
    hiring = { en: '', ar: '' },
    bids = [],
    budget = '',
    disableButtons = false,
    handleDelete = () => { }
}) => {

    const { lang, currentLang } = useContext(MyContext);
    const navigation = useNavigation();

    const truncateDescription = (text, maxLength) => {
        if (text?.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{!currentLang ? title.en : title.ar}</Title>
                <Paragraph style={styles.description}>
                    {truncateDescription(
                        !currentLang ? description.en : description.ar,
                        70
                    )}
                </Paragraph>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>{lang["posterJobs"]["profession"]}</Text>
                    <Text style={styles.value}>{!currentLang ? hiring.en : hiring.ar}</Text>
                </View>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <Text style={[styles.value, { flex: 1, fontSize: 20, alignItems: 'flex-start' }]}>${budget}</Text>
                <Button style={styles.button} onPress={() => {
                    navigation.navigate('Bidspage', { bids: bids });
                }}>
                    <Text style={styles.buttonText}>{`${lang["posterJobs"]["Seebids"]} (${bids?.length})`}</Text>
                </Button>
            </Card.Actions>
            <View style={styles.deleteJob}>
                <IconButton
                    icon={'delete'}
                    disabled={disableButtons}
                    iconColor={'#000000'}
                    size={30}
                    onPress={handleDelete}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: '#003912',
    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#003912',
        marginTop: 8,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#003912',
    },
    value: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#1DBF73',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    button: {
        backgroundColor: '#1DBF73',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#FFFFFF',
        flex: 1,
    },
    deleteJob: {
        backgroundColor: '#1DBF73',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

    }
});

export default JobCard;