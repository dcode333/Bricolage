import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { MyContext } from '../../Store/Global'
import JobCard from './Components/JobCard';
 

const JobList = () => {
    const { lang, user, baseurl, jobRefetcher, setJobRefetcher } = useContext(MyContext);
    const [disableButtons, setDisableButtons] = useState(false);
    const [data, setData] = useState([]); 

    useEffect(() => {
        fetch(`${baseurl}/api/jobs/poster/${user?.id}`)
            .then(response => response.json())
            .then(data => setData(data?.data))
            .catch(error => Alert.alert('Error', lang["posterJobs"]["failed"], [{ text: 'OK', style: 'destructive' },],));
    }, [jobRefetcher]);

    handleDelete = (id) => {
        setDisableButtons(true);
        fetch(`${baseurl}/api/jobs/deletejob/${id}`)
            .then(response => response.json())
            .then(data => setJobRefetcher(!jobRefetcher))
            .catch(error => Alert.alert('Error', lang["posterJobs"]["failed"], [{ text: 'OK', style: 'destructive' },],))
            .finally(() => setDisableButtons(false));
    }


    const renderItem = ({ item }) => (
        <JobCard
            title={item.title}
            description={item.description}
            hiring={item.hiring}
            budget={item.budget}
            bids={item.bids}
            disableButtons={disableButtons}
            handleDelete={() => handleDelete(item._id)}
        />
    );


    if (data?.length === 0) return (
        <View style={styles.container}>
            <Text style={styles.title}>{lang["posterJobs"]["noJobs"]}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
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
});
