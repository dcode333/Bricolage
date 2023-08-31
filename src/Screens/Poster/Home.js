import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Text, Button, Provider, useTheme } from 'react-native-paper';
import Dropdown from 'react-native-paper-dropdown'
import { MyContext } from '../../Store/Global'
import { useNavigation } from '@react-navigation/native';



const PostJobForm = () => {
  const theme = useTheme();

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [disabled, setDisabled] = useState(false)

  const navigation = useNavigation();
  const { lang, user, apiKey, baseurl, endpoint, jobRefetcher, setJobRefetcher } = useContext(MyContext);
// console.log("user", user)
  const professions = [
    { label: lang["professions"][0], value: "Carpenter" },
    { label: lang["professions"][1], value: "Mechanic" },
    { label: lang["professions"][2], value: "Electrician" },
    { label: lang["professions"][3], value: "Porter" },
    { label: lang["professions"][4], value: "Painter" },
    { label: lang["professions"][5], value: "Driver" },
    { label: lang["professions"][6], value: "Plumber" },
    { label: lang["professions"][7], value: "Cook" },
    { label: lang["professions"][8], value: "Builder" },
    { label: lang["professions"][9], value: "Landscaper" },
    { label: lang["professions"][10], value: "Security" },
    { label: lang["professions"][11], value: "Construction" },
    { label: lang["professions"][12], value: "Delivery" },
    { label: lang["professions"][13], value: "Dj" },
    { label: lang["professions"][14], value: "Maintainance" },
    { label: lang["professions"][15], value: "AppDev" },
    { label: lang["professions"][16], value: "Mover" },
    { label: lang["professions"][17], value: "WebDev" },
    { label: lang["professions"][18], value: "Secretary" },
    { label: lang["professions"][19], value: "Plaster" },
    { label: lang["professions"][20], value: "Tailor" },
    { label: lang["professions"][21], value: "SandwichMaker" },
    { label: lang["professions"][22], value: "Repairer" },
    { label: lang["professions"][23], value: "Server" },
    { label: lang["professions"][24], value: "Solder" },
    { label: lang["professions"][25], value: "Cleaner" },
    { label: lang["professions"][26], value: "FruitPicker" },
    { label: lang["professions"][27], value: "Other" }
  ];

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
    if (jobTitle == '' || jobDescription == '' || jobBudget == '' || selectedProfession == '') {
      Alert.alert(
        'Error',
        lang["postjob"]["error"],
        [{ text: lang["postjob"]["ok"], style: 'destructive' }],
      );
      return;
    }

    try {
      setDisabled(true)
      const translatedTitle = await translate(jobTitle);
      const translatedDescription = await translate(jobDescription);
      const translateProfession = await translate(selectedProfession);

      const data = {
        title: { en: jobTitle, ar: translatedTitle.text },
        description: { en: jobDescription, ar: translatedDescription.text },
        budget: jobBudget,
        posterId: user.id,
        hiring: { en: selectedProfession, ar: translateProfession.text },
        country: user.country,
      }

      fetch(`${baseurl}/api/jobs/postjob`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }

      }).then(res => res.json()).
        then(data => {
          console.log(data)
          if (data.success) {
            setJobRefetcher(!jobRefetcher)
            navigation.navigate("Jobs")
          }
        }).catch(err => {
          alert(err?.message)
        }).finally(() => {
          setJobTitle('');
          setJobDescription('');
          setJobBudget('');
          setSelectedProfession('');
          setDisabled(false)
        })

    } catch (error) {
      alert("Some error occured")
      setDisabled(false)
    }


  };

  return (
    <Provider>

      <View style={styles.container}>

        <Text style={styles.title}>{lang["postjob"]["Post Job"]}</Text>
        <TextInput
          label={lang["postjob"]["Job Title"]}
          value={jobTitle}
          onChangeText={setJobTitle}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#1DBF73' }, fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Poppins-Medium" } } }}
        />
        <TextInput
          label={lang["postjob"]["Job Description"]}
          value={jobDescription}
          onChangeText={setJobDescription}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#1DBF73' }, fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Poppins-Medium" } }, }}
          multiline={true}
          numberOfLines={4}

        />
        <Dropdown
          label={lang["postjob"]["Select Profession"]}
          mode="outlined"
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          list={professions}
          value={selectedProfession}
          setValue={setSelectedProfession}
          theme={{ colors: { primary: '#1DBF73' }, fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Poppins-Medium" } } }} />
        <TextInput
          label={lang["postjob"]["Job Budget"]}
          value={jobBudget}
          onChangeText={setJobBudget}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#1DBF73' }, fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Poppins-Medium" } } }}
          keyboardType="numeric"
        />

        <Button
          mode="contained"
          onPress={handlePostJob}
          disabled={disabled}
          style={styles.button}
          theme={{ colors: { primary: '#1DBF73' }, fonts: { regular: 'Poppins-Medium' } }}
        >
          <Text style={{ fontFamily: 'Poppins-Bold' }}> {lang["postjob"]["Post"]}</Text>
        </Button>
      </View>
    </Provider>
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
});

export default PostJobForm;
