import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Menu, PaperProvider } from 'react-native-paper';
import { MyContext } from '../../Store/Global'
import JobCard from './Components/JobCard';
import { useRoute } from '@react-navigation/native';
import { cities, country } from '../../utils/Helpers'


const JobList = () => {
    const { lang, baseurl, user } = useContext(MyContext);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [visible, setVisible] = useState(false);

    const route = useRoute();
    const { profession } = route.params || {};

    useEffect(() => {
        fetch(`${baseurl}/api/jobs/getjobs/${user.country}/${profession}`)
            .then(response => response.json())
            .then(data => {
                setData(data?.data)
                setFilteredData(data?.data)
            })
            .catch(error => console.error(error));
    }, []);

    const filterByCities = (city) => {
        const filtered = data.filter(item => item.posterId.city === city)
        setFilteredData(filtered)
    }


    const renderItem = ({ item }) => (
        <JobCard
            title={item.title}
            description={item.description}
            hiring={item.hiring}
            budget={item.budget}
            bids={item.bids}
            posterId={item.posterId}
            jobId={item._id}
        />
    );

    return (
        <PaperProvider style={styles.container}>
            <View contentContainerStyle={styles.containerScroller} >
                <View >
                    <Menu
                        style={styles.menuStyles}
                        visible={visible}
                        onDismiss={() => setVisible(false)}
                        anchor={<Button mode="outlined" style={styles.button} onPress={() => { setVisible(true) }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: 'white' }}>{lang["posterJobs"]["filtercity"]}</Text>
                        </Button>}
                    >
                        <ScrollView >
                            {country[user.country]?.map((option, index) => (
                                <Menu.Item
                                    style={styles.buttonText}
                                    key={index}
                                    title={option}
                                    onPress={() => { setVisible(false); filterByCities(option); }}
                                />
                            ))}
                        </ScrollView>
                    </Menu>
                </View>
            </View>
            {filteredData.length === 0 ? <View style={styles.container}>
                <Text style={styles.title}>{lang["posterJobs"]["noJobs"]}</Text>
            </View> : <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />}
        </PaperProvider>
    );
};

export default JobList;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'Poppins-Medium',
    },
    containerScroller: {
        padding: 10,
    },
    button: {
        margin: 10,
        backgroundColor: '#1DBF73',
        borderRadius: 10,

    },
    menuStyles: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: 500
    }, buttonText: {
        color: '#1DBF73',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
});
