import theme from "./src/theme";
import { Players } from "./src/screens/Players/index";
import { StatusBar } from "react-native";

import { Loading } from "./src/components/Loading";

import { ThemeProvider } from "styled-components";
import { useFonts, Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
      barStyle="light-content"
      backgroundColor='transparent'
      translucent
       />

     { fontsLoaded ? <Players/> : <Loading/>}
    </ThemeProvider>
  );
}
