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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function RegisterScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigation.navigate("Welcome");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(
          "Error al registrar, revisa los datos ingresados",
          errorMessage
        );
        // ..
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", padding: 10 }}>
        Registrate Ahora
      </Text>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/9875/9875542.png",
        }}
        style={styles.img}
      />
      <Text style={{ fontSize: 20, padding: 15, textAlign: "center" }}>
        Unete a nuestra gran comunidad de jugadores, guardas tus puntuaciones y
        conoce tus estadisticas.
      </Text>
      <TextInput
        placeholder="Correo Electronico"
        style={styles.input}
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        onChangeText={(texto) => setcontrasenia(texto)}
        value={contrasenia}
      /> 
      <TouchableOpacity style={styles.btn2} onPress={registro}>
        <Text style={styles.textb}>Registrarse</Text>
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
  btn2: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1.5,
    alignItems: "center",
    width: 150,
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
