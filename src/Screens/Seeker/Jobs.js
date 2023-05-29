import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { MyContext } from '../../Store/Global'
import JobCard from './Components/JobCard';
import { useRoute } from '@react-navigation/native';
import { cities } from '../../utils/Helpers'


const JobList = () => {
    const { lang, baseurl } = useContext(MyContext);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const route = useRoute();
    const { profession } = route.params || {};

    useEffect(() => {
        fetch(`${baseurl}/api/jobs/getjobs/${profession}`)
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
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerScroller}
            >
                {cities.map((city, index) => (
                    <Button key={index} mode="outlined" style={styles.button} onPress={() => filterByCities(city)}>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: 'white' }}>{city}</Text>
                    </Button>
                ))}
            </ScrollView>
            {filteredData.length === 0 ? <View style={styles.container}>
                <Text style={styles.title}>{lang["posterJobs"]["noJobs"]}</Text>
            </View> : <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />}
        </View>
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
        marginRight: 5,
        backgroundColor: '#1DBF73',
    },
});
