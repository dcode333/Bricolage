import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import BidCard from './Components/BidCard';
import { MyContext } from '../../Store/Global'


const JobList = () => {
    const { lang } = useContext(MyContext);
    const route = useRoute();
    const { bids } = route.params || {};

    const renderItem = ({ item }) => (
        <BidCard
            bids={item}
        />
    );


    if (bids?.length === 0) return (
        <View style={styles.container}>
            <Text style={styles.title}>{lang["Bids"]["noBids"]}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={bids}
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
        fontFamily: 'Poppins-Bold',
    },
});
