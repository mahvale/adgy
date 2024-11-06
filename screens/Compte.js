import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, Image, Pressable, TextInput, TouchableOpacity,
  ImageBackground, Alert, Dimensions, StyleSheet, ActivityIndicator, ScrollView,StatusBar,KeyboardAvoidingView,Platform,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection } from '../firebase';

const { height, width } = Dimensions.get('window');

const Loader = ({ text }) => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#205e23" />
    <Text style={styles.loaderText}>{text}</Text>
  </View>
);
 
const COLORS = {
  white: "#FFFFFF",
  black: "#222222",
  primary: "#06099c",
  secondary: "#2c7ff5",
  grey: "#CCCCCC"
};

const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,
  width,
  height,
};

const FONTS = {
  largeTitle: { fontFamily: 'black', fontSize: SIZES.largeTitle, lineHeight: 55 },
  h1: { fontFamily: "Felix Titling", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Felix Titling", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Felix Titling", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Felix Titling", fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontFamily: 'Felix Titlin', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'Felix Titlin', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'Felix Titlin', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'Felix Titlin', fontSize: SIZES.body4, lineHeight: 20 },
};

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedBgColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedBgColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  const isLoading = props.isLoading || false;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.btn, backgroundColor: bgColor, ...props.style }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={{ ...FONTS.body2, color: textColor,textAlign:'center' }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const InputField = ({ label, children }) => (
  <View style={[styles.inputFieldContainer,{position:'relative',top:-60 }]}>
   <Text style={styles.inputFieldLabel}>{label}</Text>
    <View style={styles.inputFieldInputs}>
      {children}
    </View>
  </View>
);

const InputField1 = ({ label, children }) => (
  <View style={[styles.inputFieldContainer,{position:'relative',top:-60 }]}>
   <Text style={styles.inputFieldLabel}>{label}</Text>
    <View style={styles.inputFieldInputs}>
      {children}
    </View>
  </View>
);

const InputFieldP = ({ label, children }) => (
  <View style={[styles.inputFieldContainer,{position:'relative',top:-60 }]}>
  <Text style={styles.inputFieldLabel}>{label}</Text>
    <View style={styles.inputFieldInputsp}>
      {children}
    </View>
  </View>
);


const Input = (props) => (
  <TextInput
    {...props}
    style={styles.input}
  />
);

const InputPasse = (props) => (
  <TextInput
    {...props}
    style={styles.input2}
  />
);

const DateInput = React.forwardRef((props, ref) => (
  <TextInput
    ref={ref}
    {...props}
    style={[styles.input, styles.dateInput]}
  />
));

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [sexe, setSexe] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [passe, setPasse] = useState('');
  const [errors, setErrors] = useState({});
  const [jj, setJj] = useState('');
  const [mm, setMm] = useState('');
  const [yy, setYy] = useState('');
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState('Membre');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    
  }, []);



  const validate = () => {
    const newErrors = {};
    if (nom.length < 2) newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    if (prenom.length < 2) newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email invalide';
    if (!['m', 'f'].includes(sexe.toLowerCase())) newErrors.sexe = 'Sexe invalide';
    if (!/^\d{9}$/.test(numero)) newErrors.numero = 'Numéro de téléphone invalide';
    if (passe.length < 8) newErrors.passe = 'Le mot de passe doit contenir au moins 8 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

const handleSignup = async () => {
  setLoader(true);
  if (validate()) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, passe);
      const user = userCredential.user;

      let profileImageUrl = '';
      if (selectedImage) {
        const storageReference = storageRef(storageFile, `profile_images/${user.uid}.jpg`);
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);
        profileImageUrl = await getDownloadURL(storageReference);
      }

      // Référence au document utilisateur dans Firestore
      const userRef = doc(dbstorage, 'users', user.uid);
      const newUser = {
        nom,
        prenom,
        sexe,
        status: selectedMonth, // Changez cela selon votre logique d'application
        dateNaissance: `${jj}/${mm}/${yy}`,
        numero,
        email,
        profileImageUrl
      };

      // Enregistrement des données dans Firestore
      await setDoc(userRef, newUser);

      // Enregistrement des informations de l'utilisateur en local
      AsyncStorage.setItem('user', JSON.stringify(newUser));

      setLoader(false);
      navigation.navigate('Statut');
    } catch (error) {
      Alert.alert('Erreur', error.message);
      setLoader(false);
    }
  } else {
    Alert.alert('Erreur', 'Veuillez corriger les erreurs dans le formulaire');
    setLoader(false);
    console.log('object');
  }
};

  if (loader) {
    return <Loader text={`Chargement`} />;
  } else {
    return (
      <ImageBackground
        style={{ flex: 1, backgroundColor: "#fff", width: "100%", height: "100%" }}
        source={require('../assets/bg_green.png')}
      >
      <KeyboardAvoidingView
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                      style={styles.keyboardAvoidingView} 
                    >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Image source={require('../assets/bg_green3.png')} style={{ width: 250, height: 250, marginHorizontal: 62, position: 'relative', top:-30 }} />
          <View style={{ flex: 1, marginHorizontal: 22, marginTop: 5, position: 'relative', top: -200 }}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={pickImage}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={[styles.profileImage,{marginBottom:50}]} />
                ) : (
                   <Image source={require('../assets/photo.png')} style={styles.profileImage2} />
                )}
              </TouchableOpacity>
            </View>

            <InputField1 label="Nom et Prenom">
              <Input
                placeholder="Nom"
                placeholderTextColor={COLORS.black}
                onChangeText={(text) => setNom(text)}
              />
              <Input
                placeholder="Prenom"
                placeholderTextColor={COLORS.black}
                onChangeText={(text) => setPrenom(text)}
              />
            </InputField1>

            <InputField label="Date d'adhesion JJ-MM-AAAA'">
              <DateInput
                placeholder="JJ"
                placeholderTextColor={COLORS.black}
                maxLength={2}
                onChangeText={(value) => setJj(value)}
                keyboardType='numeric'
              />
              <DateInput
                placeholder="MM"
                placeholderTextColor={COLORS.black}
                maxLength={2}
                onChangeText={(value) => setMm(value)}
                keyboardType='numeric'
              />
              <DateInput
                placeholder="AAAA"
                placeholderTextColor={COLORS.black}
                maxLength={4}
                onChangeText={(value) => setYy(value)}
                keyboardType='numeric'
              />
            </InputField>

            <InputField label="Email et Téléphone">
              <Input
                placeholder="Email"
                placeholderTextColor={COLORS.black}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
              />
              <Input
                placeholder="Telephone"
                placeholderTextColor={COLORS.black}
                keyboardType='numeric'
                onChangeText={(text) => setNumero(text)}
              />
            </InputField>

           

            <InputField label="Status et Sexe">
              <Picker
          selectedValue={selectedMonth}
          style={{ height: 50, width: 150, marginVertical: 10, borderColor: '#8ba694', borderWidth: 2, borderRadius: 10 }}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="Status" value="" />
          <Picker.Item label="Membre" value="Membre" />
          <Picker.Item label="président" value="président" />
          <Picker.Item label="vice-président" value="vice-président" />
          <Picker.Item label="Secrétaire générale" value="Secrétaire générale" />
          <Picker.Item label="secrétaire générale Adjoint" value="secrétaire générale Adjoint" />
          <Picker.Item label="Trésorerie général" value="Trésorerie général" />
          <Picker.Item label="Commissaire aux comptes 1" value="Commissaire aux comptes 1" />
          <Picker.Item label="Commissaire aux comptes 2" value="Commissaire aux comptes 2" />
          <Picker.Item label="Délégué chargé de la conception et de l’élaboration des projets" value="Délégué chargé de la conception et de l’élaboration des projets" />
          <Picker.Item label="Contrôleurs des travaux 1" value="Contrôleurs des travaux 1" />
          <Picker.Item label="Contrôleurs des travaux 2" value="Contrôleurs des travaux 2" /> 
          <Picker.Item label="Contrôleurs travaux 3 : conseillers Municipaux" value="Contrôleurs travaux 3 : conseillers Municipaux" />
          <Picker.Item label="Censeur 1" value="Censeur 1" />
          <Picker.Item label="Censeur 2" value="Censeur 2" />
          <Picker.Item label="Chargé de la communication 1" value="Chargé de la communication 1" />
          <Picker.Item label="Chargé de la communication 1" value="Chargé de la communication 2" /> 
          <Picker.Item label="CONSEILLERS 2" value="CONSEILLERS" />
        </Picker>
              <Input
                placeholder="Sexe (M/F)"
                placeholderTextColor={COLORS.black}
                maxLength={1}
                onChangeText={(text) => setSexe(text)}
              />
            </InputField>

             <InputFieldP label="Mot de passe">
                  <InputPasse
                    placeholder="Mot de passe"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={!isPasswordShown}
                    onChangeText={(text) => setPasse(text)}
                  />
                </InputFieldP>

            <Button title="S'inscrire" filled color='#3cc154' style={{padding:10,borderRadius: 15}} onPress={handleSignup} />

            <View style={styles.registerContainer}>
              <Text style={{ fontSize: 16, color: COLORS.black, fontFamily: "Roboto" }}>
                Vous'avez dejas un compte?
              </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.registerText}>connexion</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
        <StatusBar hidden={true} />
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#205e23'
  },
  inputFieldContainer: {
    flexDirection: 'column',
    marginVertical:8,
    width: '100%',
    marginBottom:10
  },
  inputFieldLabel: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 5,
  },
  inputFieldInputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputFieldInputsp: {
    flex: 1,
    flexDirection: 'row',
    width: "100%"
  },
  input: {
    width: '50%',
    height: 50,
    backgroundColor:"#ebf1f0",
    borderRadius:5,
    paddingHorizontal: SIZES.padding3,
    ...FONTS.body3,
    marginBottom: 10,
    marginRight:10,
    borderColor: '#8ba694',
    borderWidth: 1
  },
   input2: {
    width: '100%',
    height: 50,
    backgroundColor:"#ebf1f0",
    borderRadius:5,
    paddingHorizontal: SIZES.padding3,
    ...FONTS.body3,
    marginBottom: 10,
    marginRight:10,
     borderColor: '#8ba694',
    borderWidth: 1 
  },
  dateInput: {
    width: 70,
  },
  btn: {
    height: 50,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    padding:50
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImage2: {
    width:200,
    height:200,
    borderRadius: 50,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
    marginTop: 20
  },
  registerText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6,
    fontFamily: "Roboto"
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Signup;
