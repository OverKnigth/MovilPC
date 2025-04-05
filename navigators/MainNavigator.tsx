import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistroPuntajesScreen from "../screens/RegistroPuntajesScreen";
import EstadisticasScreen from "../screens/EstadisticasScreen";
import VideojuegosScreen from "../screens/VideojuegosScreen";

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
        <Tab.Screen name="RegistroPuntajes" component={RegistroPuntajesScreen} />
        <Tab.Screen name="Estadisticas" component={EstadisticasScreen} />
        <Tab.Screen name="Videojuegos" component={VideojuegosScreen} />
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
