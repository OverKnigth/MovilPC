import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function Card(props: any) {
    const [modalVisible, setModalVisible] = useState(false);

    if (!props.datos) return null;
  
    return (
      <>
        <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
          <Text>🎮 {props.datos.titulo}</Text>
          <Image source={{ uri: props.datos.imagen }} style={styles.img} />
        </TouchableOpacity>
  
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{props.datos.titulo}</Text>
              <Image source={{ uri: props.datos.imagen }} style={styles.imgModal} />
              <Text style={styles.modalTitle}>Precio: {props.datos.precio}</Text>
              <Text style={styles.modalTitle}>Plataforma: {props.datos.plataforma}</Text>
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    img: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    imgModal: {
      width: 200,
      height: 200,
      marginVertical: 20,
      borderRadius: 10,
    },
    btn: {
      backgroundColor: "#f8f8f8",
      margin: 10,
      padding: 15,
      borderRadius: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: 300,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: "center",
    },
  });