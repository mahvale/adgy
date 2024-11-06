import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ImageBackground, Dimensions, Alert, ActivityIndicator, StyleSheet,KeyboardAvoidingView,ScrollView,Platform,StatusBar } from 'react-native';

import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs,onSnapshot,orderBy,where} from '../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get('window');

const Loader = ({ text }) => (
    <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#205e23" />
        <Text style={styles.loaderText}>{text}</Text>
    </View>
);

const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [loader, setLoader] = useState(false);
    const [isConnected, setIsConnected] = useState(null);
    const [nom, setNom] = useState('');
    const [passe, setPasse] = useState('');

    useEffect(() => {

        AsyncStorage.getItem('user').then((value) => {
            if (value !== null) {
                navigation.navigate('Home');
            }
        });
    }, []);

const handleLogin = async () => {
    setLoader(true);
    try {
        const usersCollection = collection(dbstorage, 'users');
        const userQuery = query(usersCollection, where('numero', '==', nom));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            Alert.alert('Erreur', 'Nom d\'utilisateur incorrect');
            setLoader(false);
            return;
        }

        let userData = null;
        querySnapshot.forEach((doc) => {
            userData = doc.data(); // On récupère les données de l'utilisateur
        });

        const email = userData.email;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await signInWithEmailAndPassword(auth, email, passe);
        navigation.navigate('Home');
        setLoader(false);
    } catch (error) {
        console.error(error);
        setLoader(false);
        Alert.alert('Erreur', "Vous n'êtes pas connecté");
    }
};

    if (loader) {
        return <Loader text="Chargement en cours..." />;
    }

    return (
        <ImageBackground
            style={styles.imageBackground}
            source={require('../assets/bg_green.png')}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ marginHorizontal: 22 }}>
                        <View style={{ marginVertical: 2 }}>
                            <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 60 }}>
                                {['A', 'D', 'G', 'Y'].map((letter, index) => (
                                    <Text
                                        key={index}
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                            marginVertical: 12,
                                            color: ['darkgreen', 'blue', 'red', 'green'][index],
                                            fontFamily: "Roboto",
                                            marginLeft: 10,
                                        }}
                                    >
                                        {letter}
                                    </Text>
                                ))}
                                <Text style={styles.wavingHand}>👋</Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 12, marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Numéro</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Entrer votre numéro'
                                    placeholderTextColor={"#000"}
                                    keyboardType='email-address'
                                    onChangeText={setNom}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={{ marginBottom: 12 }}>
                            <Text style={styles.inputLabel}>Mot de passe</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Entrez votre mot de passe'
                                    placeholderTextColor={"#000"}
                                    secureTextEntry={isPasswordShown}
                                    onChangeText={setPasse}
                                    style={styles.input}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsPasswordShown(!isPasswordShown)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={isPasswordShown ? 'red' : 'green'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            style={styles.loginButton}
                            labelStyle={styles.loginButtonText}
                            buttonColor="#4cc259"
                        >
                            SE CONNECTER
                        </Button>

                        <View style={styles.registerContainer}>
                            <Text style={{ fontSize: 16, color: "#000", fontFamily: "Roboto" }}>
                                Vous n'avez pas de compte?
                            </Text>
                            <Pressable onPress={() => navigation.navigate("Compte")}>
                                <Text style={styles.registerText}>CRÉER</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <StatusBar hidden={true} />
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: "#000",
    },
    imageBackground: {
        flex: 1,
        backgroundColor: "#fff",
        width,
        height,
        resizeMode: 'contain'
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
        fontFamily: "Roboto"
    },
    inputContainer: {
        width: "100%",
        height: 48,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22
    },
    input: {
        width: "100%",
        fontFamily: "Roboto"
    },
    eyeIcon: {
        position: "absolute",
        right: 12
    },
    loginButton: {
        marginTop: 18,
        marginBottom: 4,
        fontFamily: "Roboto",
        backgroundColor: "#2c7061"
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22,
        marginTop: 20
    },
    registerText: {
        fontSize: 16,
        color: "#06099c",
        fontWeight: "bold",
        marginLeft: 6,
        fontFamily: "Roboto"
    },
    wavingHand: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: "#000",
        fontFamily: "Roboto",
        marginLeft: 10,
        color: "#000"
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
    loginButton: {
        marginVertical: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
