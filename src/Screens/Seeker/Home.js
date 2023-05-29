import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Searchbar, Card, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { MyContext } from '../../Store/Global'
import { icons } from '../../utils/Helpers'


const JobsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, en, user } = React.useContext(MyContext)
  const theme = useTheme();
  const navigation = useNavigation();

  const professions = lang["professions"]
  const onChangeSearch = query => setSearchQuery(query);

  const filteredProfessions = professions.filter(profession => {
    return profession.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder={lang["Jobs"]["searchPlaceholder"]}
          onChangeText={onChangeSearch}
          value={searchQuery}
          theme={{ colors: { primary: '#1DBF73' }, fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Poppins-Medium" } }, }}
        />
      </View>
      <View style={styles.cardsContainer}>
        {filteredProfessions.map((profession, index) => {

          return <Card key={index} style={styles.card} onPress={() => navigation.navigate("seekerjobs", {
            profession: en["professions"][lang["professions"].indexOf(profession)]
          })}>
            <Card.Cover source={{ uri: icons[lang["professions"].indexOf(profession)] }} style={{ height: 100 }} />
            <Text style={styles.title}>{profession}</Text>
          </Card>

        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBarContainer: {
    padding: 16,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    width: '30%',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    paddingVertical: 8,
    fontSize: 12,

  }
});

export default JobsScreen;
