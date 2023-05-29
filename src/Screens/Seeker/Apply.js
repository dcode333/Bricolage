import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Text, Button, Provider, useTheme, Card, Title, Paragraph } from 'react-native-paper';
import { MyContext } from '../../Store/Global'
import { useNavigation, useRoute } from '@react-navigation/native';



const Apply = () => {

    const theme = useTheme();
    const [message, setmessage] = useState('');
    const [disabled, setDisabled] = useState(false)

    const navigation = useNavigation();
    const route = useRoute();
    const { dataToApply } = route.params || {};
    const { description, title, hiring, bids, budget, posterId, jobId } = dataToApply || {};
    const { lang, user, apiKey, baseurl, endpoint, currentLang } = useContext(MyContext);



    const translate = async (text) => {
        try {
            const response = await fetch(`${endpoint}/translate?api-version=3.0&to=ar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Ocp-Apim-Subscription-Region': 'centralus', // Replace with your actual region
                },
                body: JSON.stringify([{ text }]),
            });

            const data = await response.json();
            const translated = data[0].translations[0].text;
            return { text: translated, error: null }
        } catch (error) {
            console.error(error);
            return { text: null, error }
        }
    }

    const handlePostJob = async () => {
        if (message == '') {
            Alert.alert(
                'Error',
                lang["postjob"]["error"],
                [{ text: lang["postjob"]["ok"], style: 'destructive' }],
            );
            return;
        }

        try {
            setDisabled(true)
            const translatedMessage = await translate(message);

            const data = {
                message: { en: message, ar: translatedMessage.text },
                userId: user.id,
                jobId: jobId,
            }

            fetch(`${baseurl}/api/jobs/applyforjob`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(res => res.json()).
                then(data => {
                    console.log(data)
                    if (data.success) {
                        navigation.navigate("seekerhome")
                    }
                }).catch(err => {
                    alert(err?.message)
                }).finally(() => {
                    setmessage('');
                    setDisabled(false)
                })

        } catch (error) {
            alert("Some error occured")
            setDisabled(false)
        }


    };

    return (
        <ScrollView>
            <Provider>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.title}>{!currentLang ? title.en : title.ar}</Title>
                        <Paragraph style={styles.description}>
                            {!currentLang ? description.en : description.ar}
                        </Paragraph>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>{lang["seekerJobs"]["profession"]}</Text>
                            <Text style={styles.value}>{!currentLang ? hiring.en : hiring.ar}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>{lang["seekerJobs"]["city"]}</Text>
                            <Text style={styles.value}>{posterId.city}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>{lang["seekerJobs"]["bids"]}</Text>
                            <Text style={styles.value}>{bids?.length}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>{lang["seekerJobs"]["poster"]}</Text>
                            <Text style={styles.value}>{posterId?.name}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>{lang["seekerJobs"]["budget"]}</Text>
                            <Text style={styles.value}>{budget}</Text>
                        </View>
                    </Card.Content>
                </Card>

                <View style={styles.container}>
                    <TextInput
                        label={lang["seekerJobs"]["message"]}
                        value={message}
                        onChangeText={setmessage}
                        style={styles.input}
                        mode="outlined"
                        theme={{ colors: { primary: '#1DBF73' }, fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Poppins-Medium" } }, }}
                        multiline={true}
                        numberOfLines={4}

                    />

                    <Button
                        mode="contained"
                        onPress={handlePostJob}
                        disabled={disabled}
                        style={styles.button}
                        theme={{ colors: { primary: '#1DBF73' }, fonts: { regular: 'Poppins-Medium' } }}
                    >
                        <Text style={{ fontFamily: 'Poppins-Bold' }}> {lang["seekerJobs"]["Apply"]}</Text>
                    </Button>
                </View>
            </Provider>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: 'white',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 24,
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        marginTop: 16,
        marginBottom: 50,
    },
    card: {
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#FFFFFF',
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
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#FFFFFF',
        flex: 1,
    },
});

export default Apply;

