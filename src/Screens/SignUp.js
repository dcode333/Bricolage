import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, IconButton, Menu, Provider as PaperProvider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


import { useNavigation } from '@react-navigation/native';
import { MyContext } from '../Store/Global'
import { cities } from '../utils/Helpers';
import ConfirmationModal from './Confirmaton';



profs = [
  "Writer", "Carpenter", "Mechanic", "Electrician",
  "Porter", "Painter", "Driver", "Waiter", "Plumber",
  "Chef", "Artist", "Butcher", "Builder", "Potter"
]

const RegisterScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleProf, setVisibleProf] = useState(false);
  const [city, setcity] = useState('');
  const [type, settype] = useState('employee');
  const [profession, setProfession] = useState('');
  const [experience, setExperience] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [disableButtons, setDisableButtons] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dbPin, setDbPin] = useState({});
  const { lang, updateUser, updateToken, baseurl } = useContext(MyContext);
  const navigation = useNavigation();

  const uploadImage = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'jobupapp')
    data.append("cloud_name", "dw6ee3vuu")
    fetch("https://api.cloudinary.com/v1_1/dw6ee3vuu/image/upload", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }

    }).then(res => res.json()).
      then(data => {
        setImageUrl(data.secure_url)
      }).catch(err => {
        alert(err?.message)
      }).finally(() => {
        setDisableButtons(false)
      })
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setDisableButtons(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri
      const type = 'image/jpeg'
      const name = 'photo.jpg'
      const source = { uri, type, name }
      uploadImage(source)
    }
    else setDisableButtons(false)
  };

  const handleOptionSelect = (option) => {
    setcity(option);
    setVisible(false);
  }

  const handleProfSelect = (index) => {
    setProfession(profs[index]);
    setVisibleProf(false);
  }


  const handleRegister = () => {
    setDisableButtons(true)
    fetch(`${baseurl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email,
        type,
        name,
        contact,
        city,
        profession,
        experience,
        imageUrl,
        pin: dbPin.pin
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data?.success === true) {
          updateUser(data?.user)
          updateToken(data?.token)
        }
        else Alert.alert('Error', data.error ? data?.error : lang["SignUp"]["failed"], [{ text: 'OK', style: 'destructive' },],
          { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
      })
      .catch(error => console.error(error))
      .finally(() => {
        setDisableButtons(false)
      });
  }

  const handlePin = () => {
    if (disableButtons) return;
    if (type === "employer" && (!name || !email || !password || !contact || !city) || type === "employee" && (!name || !email || !password || !contact || !city || !profession || !experience)) {
      Alert.alert(
        'Error',
        lang["SignUp"]["error"],
        [{ text: lang["SignUp"]["ok"], style: 'destructive' }])
      return;
    }
    setDisableButtons(true)

    fetch(`${baseurl}/api/auth/sendmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data?.success === true) {
          setDbPin({ pin: data?.data?.pincode, expiry: data?.data?.expiry })
          setModalVisible(true)
        }

        else Alert.alert('Error', lang["SignIn"]["failed"], [{ text: 'OK', style: 'destructive' },],
          { style: styles.alertContainer, titleStyle: styles.alertText, messageStyle: styles.alertText });
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Error', lang["SignIn"]["failed"], [{ text: 'OK', style: 'destructive' }])
      })
      .finally(() => {
        setDisableButtons(false)
      });
  }


  return (
    <View style={styles.container}>
      <PaperProvider>
        <View >
          <Text style={styles.title}>{lang["SignUp"]["SignUp"]}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={lang["SignUp"]["name"]}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder={lang["SignUp"]["email"]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={lang["SignUp"]["contact"]}
              value={contact}
              onChangeText={setContact}
              keyboardType='phone-pad'

            />
            <TextInput
              style={styles.input}
              placeholder={lang["SignUp"]["password"]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View>
              <Menu
                style={styles.menuStyles}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={<TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
                  <Text style={styles.buttonText} >{city === '' ? lang["SignUp"]["Select Cities"] : city}</Text>
                </TouchableOpacity>}
              >
                <ScrollView >

                  {cities.map((option, index) => (
                    <Menu.Item
                      style={styles.buttonText}
                      key={index}
                      title={option}
                      onPress={() => handleOptionSelect(option)}
                    />
                  ))}
                </ScrollView>
              </Menu>
            </View>
          </View>
          <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 10 }}>
            <IconButton
              icon={imageUrl ? 'check' : 'camera'}
              disabled={disableButtons}
              iconColor={'#003912'}
              size={40}
              onPress={() => pickImage()}
            />
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>{lang["SignUp"]["userType"]}</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioButton, type === 'employer' ? styles.radioButtonActive : null]}
                onPress={() => settype('employee')}
              >
                <Text style={[styles.radioOption, type === 'employer' ? styles.radioOptionActive : null]}>{lang["SignUp"]["Employee"]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, type === 'employee' ? styles.radioButtonActive : null]}
                onPress={() => settype('employer')}
              >
                <Text style={[styles.radioOption, type === 'employee' ? styles.radioOptionActive : null]}>{lang["SignUp"]["Employer"]}</Text>
              </TouchableOpacity>
            </View>
          </View>


          {type === 'employee' && (
            <View style={styles.inputContainer}>
              <View>
                <Menu
                  style={styles.menuStyles}
                  visible={visibleProf}
                  onDismiss={() => setVisibleProf(false)}
                  anchor={<TouchableOpacity style={styles.input} onPress={() => setVisibleProf(true)}>
                    <Text style={styles.buttonText} >{profession === '' ? lang["SignUp"]["Select Profession"] : lang["SignUp"]["Selected"]}</Text>
                  </TouchableOpacity>}
                >
                  <ScrollView>

                    {lang["professions"].map((option, index) => (
                      <Menu.Item
                        style={styles.buttonText}
                        key={index}
                        title={option}
                        onPress={() => handleProfSelect(index)}
                      />
                    ))}
                  </ScrollView>
                </Menu>
              </View>
              <TextInput
                style={styles.input}
                placeholder={lang["SignUp"]["experience"]}
                value={experience}
                onChangeText={setExperience}
              />
            </View>
          )}
          <Text style={styles.radioLabel}>{lang["SignUp"]["alreadyhaveacc"]}  <Text onPress={() => navigation.navigate("SignIn")} style={{ color: '#003912' }}>{lang["SignUp"]["SignIn"]}</Text></Text>

          <Button disabled={disableButtons} style={[styles.button, { marginBottom: 20, backgroundColor: '#003912' }]} onPress={handlePin}>
            <Text style={[styles.buttonText]}>{lang["SignUp"]["SignUp"]}</Text>
          </Button>
        </View>
      </PaperProvider>
      <ConfirmationModal
        lang={lang}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleRegister={handleRegister}
        dbPin={dbPin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DBF73',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    color: '#003912',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownLabel: {
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
  },
  dropdownOption: {
    flex: 1,
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    elevation: 1,
    fontFamily: 'Poppins-Medium',
  },
  dropdownMenuItem: {
  },
  dropdownMenuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioLabel: {
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Medium',
  },
  radioButtonActive: {
    backgroundColor: '#1DBF73',
  },
  radioOption: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  radioOptionActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
    fontFamily: 'Poppins-Medium',
  },
  buttonText: {
    color: '#1DBF73',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  menuStyles: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }
});

export default RegisterScreen;