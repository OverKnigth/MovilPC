import { Alert, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function Card(props: any) {
    const [modalVisible, setmodalVisible] = useState(false);
  
    return (
        <View>
            <Text>{props.datos.titulo}</Text>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    img: {
      width: 50,
      height: 50,
    },
    imgLarge: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginVertical: 10,
    },
    btn: {
      backgroundColor: "white",
      margin: 10,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center"
    },
    modalContent: {
      width: "90%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      maxHeight: "90%"
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center"
    },
    sectionTitle: {
      marginTop: 10,
      fontWeight: "bold",
    },
    opinionBox: {
      marginVertical: 5,
      backgroundColor: "#f1f1f1",
      padding: 10,
      borderRadius: 8,
    }
  });