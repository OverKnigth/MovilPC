import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/Config";
import { onValue, ref } from "firebase/database";

export default function EstadisticasScreen({ navigation }: any) {
  const [uid, setUid] = useState("");
  const [puntajes, setPuntajes] = useState<any[]>([]);
  const [juegosApi, setJuegosApi] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigation.navigate("Welcome");
      }
    });
  }, []);

  useEffect(() => {
    if (uid) {
      leerPuntajes();
    }
  }, [uid]);

  useEffect(() => {
    getJuegosApi();
  }, []);

  const getJuegosApi = async () => {
    const resp = await fetch(
      "https://jritsqmet.github.io/web-api/videojuegos.json"
    );
    const json = await resp.json();
    setJuegosApi(json.videojuegos);
  };

  const leerPuntajes = () => {
    const puntajesRef = ref(db, `usuarios/${uid}/puntajes`);
    onValue(puntajesRef, (snapshot) => {
      const data = snapshot.val();
      let puntajesArray: any[] = [];

      for (let key in data) {
        puntajesArray.push({ id: key, ...data[key] });
      }

      setPuntajes(puntajesArray);
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUid("");
        setPuntajes([]);
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const puntajeTotal = puntajes.reduce((acc, val) => acc + val.puntaje, 0);
  const puntajeMaximo =
    puntajes.length > 0 ? Math.max(...puntajes.map((item) => item.puntaje)) : 0;
  const puntajePromedio =
    puntajes.length > 0 ? puntajeTotal / puntajes.length : 0;

  const obtenerImagenJuego = (juegoId: string) => {
    const juego = juegosApi.find((juego) => juego.id === juegoId);
    return juego ? juego.imagen : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tus Puntajes</Text>
      <FlatList
        data={puntajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const imagenJuego = obtenerImagenJuego(item.juegoId);

          return (
            <View style={styles.puntajeItem}>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Juego: {item.juego}</Text>
              <Text>Puntaje: {item.puntaje} pts</Text>
              <Text>Fecha: {item.fecha}</Text>

              {imagenJuego && (
                <Image
                  source={{ uri: imagenJuego }}
                  style={styles.imagenJuego}
                />
              )}
            </View>
          );
        }}
      />

      <View style={styles.estadisticasBox}>
        <Text style={styles.estadistica}>
          Puntaje Total: {puntajeTotal} pts
        </Text>
        <Text style={styles.estadistica}>
          Puntaje Más Alto: {puntajeMaximo} pts
        </Text>
        <Text style={styles.estadistica}>
          Puntaje Promedio: {puntajePromedio.toFixed(2)} pts
        </Text>
      </View>

      <Button title="Cerrar Sesión" onPress={logout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FBF6E9",
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  puntajeItem: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 8,
  },
  imagenJuego: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  estadisticasBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E3F0AF",
    borderRadius: 8,
    marginBottom: 20, // Para dar espacio antes del botón
  },
  estadistica: {
    fontSize: 16,
    marginBottom: 8,
  },
});
