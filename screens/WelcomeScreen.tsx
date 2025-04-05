import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:30, fontWeight:'bold', padding:10}}>Bienvenido a OverScore</Text>
      <Text style={{fontSize:20, padding:15}}>"Tu juego, tus estadísticas, tu victoria."</Text>
      <Image
      source={{uri: "https://cdn-icons-png.flaticon.com/128/2066/2066785.png"}}
      style={styles.img}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.textb}>Iniciar de Sesion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn2} onPress={()=>navigation.navigate("Register")}>
        <Text style={styles.textb}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        borderRadius:10,
        padding:10,
        margin:10,
        borderWidth:1.5,
        alignItems:'center',
        marginInline:50,
        backgroundColor:"#E3F0AF"
    },
    btn2:{
        borderRadius:10,
        padding:10,
        margin:10,
        borderWidth:1.5,
        alignItems:'center',
        width:150,
        backgroundColor:"#5DB996"
    },
    container: {
        flex: 1,
        backgroundColor: '#FBF6E9',
        alignItems: 'center',
        justifyContent: 'center',
      },
      img:{
        height:150,
        width:150,
        marginVertical:20
      }, 
      textb:{
        fontSize:18,
        fontWeight:'bold'
      },
})