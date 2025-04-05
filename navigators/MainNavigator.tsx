import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistroPuntajesScreen from "../screens/RegistroPuntajesScreen";
import EstadisticasScreen from "../screens/EstadisticasScreen";
import VideojuegosScreen from "../screens/VideojuegosScreen";
import { Image } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Tab" component={MyTabs} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="RegistroPuntajes" 
        component={RegistroPuntajesScreen} 
        options={{
          tabBarLabel: 'Puntajes', 
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/6109/6109784.png' }} 
              style={{ width: 24, height: 24 }} 
            />
          ),
          headerShown: false, 
        }} 
      />
      <Tab.Screen 
        name="Estadisticas" 
        component={EstadisticasScreen} 
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/900/900772.png' }} 
              style={{ width: 24, height: 24 }} 
            />
          ),
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Videojuegos" 
        component={VideojuegosScreen} 
        options={{
          tabBarLabel: 'Videojuegos',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/686/686589.png' }} 
              style={{ width: 24, height: 24 }} 
            />
          ),
          headerShown: false, 
        }} 
      />
    </Tab.Navigator>
  );
}


export default function NavegadorPrincipal() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
