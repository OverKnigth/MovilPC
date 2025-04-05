import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function LoginScreen({navigation}:any) {
  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Tab")
        //console.log(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error al iniciar sesión, revisa tus credenciales", errorMessage);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", padding: 10 }}>
        Inicio de Sesion
      </Text>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/6711/6711581.png",
        }}
        style={styles.img}
      />
      <Text style={{ fontSize: 20, padding: 15, textAlign: "center" }}>
        Ingresa tus credenciales, guarda y visializa tus estadisticas.
      </Text>
      <TextInput placeholder="Correo Electronico" style={styles.input} onChangeText={(texto)=>setcorreo(texto)} value={correo}/>
      <TextInput placeholder="Contraseña" style={styles.input} onChangeText={(texto)=>setcontrasenia(texto)} value={contrasenia}/>
      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.textb}>Iniciar de Sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF6E9",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    width: 300,
    fontSize: 18,
  },
  btn: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1.5,
    alignItems: "center",
    marginInline: 50,
    backgroundColor: "#E3F0AF",
  },
  textb: {
    fontSize: 18,
    fontWeight: "bold",
  },
  img: {
    height: 50,
    width: 50,
  },
});
