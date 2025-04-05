import { FlatList, StyleSheet, Text, TextInput, View, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { auth, db } from "../config/Config"; // 
import { onAuthStateChanged } from "firebase/auth";

export default function RegistroPuntajesScreen({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [puntaje, setPuntaje] = useState("");
  const [fecha, setFecha] = useState(""); 
  const [puntajes, setPuntajes] = useState<{ nombre: string; puntaje: number; juego: string; fecha: string }[]>([]);
  const [data, setData] = useState([]);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<any>(null);
  const [usuarioId, setUsuarioId] = useState<string | null>(null); 

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioId(user.uid); 
      } else {
        Alert.alert("No hay usuario autenticado", "Por favor, inicia sesión.");
      }
    });

    
    getData();
  }, []);

  const getData = async () => {
    const resp = await fetch("https://jritsqmet.github.io/web-api/videojuegos.json");
    const json = await resp.json();
    setData(json.videojuegos); 
  };

  const agregarPuntaje = () => {
    if (!nombre || !puntaje || !juegoSeleccionado || !usuarioId || !fecha) {
      Alert.alert("Error", "Por favor, ingresa todos los campos.");
      return;
    }

    const timestamp = Date.now(); 

    
    set(ref(db, `usuarios/${usuarioId}/puntajes/${timestamp}`), {
      nombre,
      puntaje: parseInt(puntaje),
      juego: juegoSeleccionado.titulo,
      juegoId: juegoSeleccionado.id,
      fecha, 
    })
      .then(() => {
        Alert.alert("Éxito", "Puntaje guardado correctamente.");
        setNombre(""); 
        setPuntaje("");
        setFecha(""); 
        setJuegoSeleccionado(null); 
      })
      .catch((error) => {
        Alert.alert("Error", "No se pudo guardar el puntaje. Intenta nuevamente.");
        console.log(error);
      });
  };

  const puntajeTotal = puntajes.reduce((acc, val) => acc + val.puntaje, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Registro de Puntajes</Text>

      {juegoSeleccionado ? (
        <View style={styles.seleccionadoBox}>
          <Text style={{ fontWeight: "bold" }}>Juego seleccionado:</Text>
          <Text> {juegoSeleccionado.titulo}</Text>
          <Button title="Cambiar juego" onPress={() => setJuegoSeleccionado(null)} />
        </View>
      ) : (
        <>
          <Text style={styles.subtitulo}>Selecciona un videojuego</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.juegoBtn}
                onPress={() => setJuegoSeleccionado(item)} 
              >
                <Text>{item.titulo}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {juegoSeleccionado && (
        <>
          <TextInput
            placeholder="Nombre del jugador"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Puntaje"
            keyboardType="numeric"
            style={styles.input}
            value={puntaje}
            onChangeText={setPuntaje}
          />
          <TextInput
            placeholder="Fecha (dd/mm/yyyy)"
            style={styles.input}
            value={fecha}
            onChangeText={setFecha}
          />
          <Button title="Agregar Puntaje" onPress={agregarPuntaje} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  total: {
    marginTop: 10,
    fontStyle: "italic",
  },
  juegoBtn: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
    borderRadius: 8,
  },
  seleccionadoBox: {
    padding: 10,
    backgroundColor: "#d4f5dc",
    marginBottom: 15,
    borderRadius: 8,
  },
});