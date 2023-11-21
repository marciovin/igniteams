<<<<<<< HEAD
import { Groups } from "./src/screens/groups/index"
=======
import theme from "./src/theme";
import { Routes} from "./src/routes";
import { StatusBar } from "react-native";

import { Loading } from "./src/components/Loading";

import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto";
>>>>>>> storage

export default function App() {
  return (
<<<<<<< HEAD
   <Groups/>
=======
    <ThemeProvider theme={theme}>
      <StatusBar 
      barStyle="light-content"
      backgroundColor='transparent'
      translucent
       />

     { fontsLoaded ? <Routes/> : <Loading/>}
    </ThemeProvider>
>>>>>>> storage
  );
}
