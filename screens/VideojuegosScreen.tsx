import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function ListaExternaScreen() {
    const [data, setData] = useState([]);

    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      const resp = await fetch("https://jritsqmet.github.io/web-api/videojuegos.json");
      const json = await resp.json();
      setData(json.videojuegos);
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Card datos={item} />}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF6E9',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });