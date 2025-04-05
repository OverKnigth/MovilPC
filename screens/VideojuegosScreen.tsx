import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

export default function VideojuegosScreen() {
    const [data, setData] = useState("");

    useEffect(() => {
      getData();
    //console.log(data);
    }, []);
    const getData = async () => {
      const resp = await fetch("https://jritsqmet.github.io/web-api/videojuegos.json");
      const json = await resp.json();
      setData(json);
    };
  
    return (
      <View>
        <Text>Lista Externa - API</Text>
        <FlatList
        data={data}
        renderItem={ ( {item} ) => 
          <Card datos = {item}/>
       }
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({});
  