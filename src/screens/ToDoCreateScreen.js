import React, { useEffect, useState, useContext }  from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Content, H1, Text, Textarea, Spinner, Icon  } from "native-base";
import * as Font from "expo-font";
import { ToDosContext } from "../context/ToDosContext"; // Utilizar el contexto de toDo

const ToDoCreateScreen = ({ navigation }) => {
  const [toDo, setToDo] = useState("");
  const [errorToDo, setErrorToDo] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [enableSave, setEnableSave] = useState(true);


  const toDosContext = useContext(ToDosContext);
  const { addNewToDo, refreshToDos } = toDosContext;

   // Cargar la fuente de manera asíncrona
   useEffect(() => {
    const loadFontsAsync = async () => {
      await Font.loadAsync({
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }).then(() => {
        setFontsLoaded(true);
      });
    };
    loadFontsAsync();
  }, []);

  // Ejecutar el efecto cuando el valor de toDo cambie
  useEffect(() => {
    if (toDo) setEnableSave(false);
    else setEnableSave(true);
  },[toDo]);

  const handlerNewTodo = async () => {
    // Validar que la tarea tiene valor
    if (toDo) {
      await addNewToDo(toDo, refreshToDos);

      // Regresar a la pantalla anterior
      navigation.goBack();
    } else {
      setErrorToDo(true);
    }
  };

  if (!fontsLoaded)
    return (
      <Content contentContainerStyle={styles.content}>
        <Spinner color="blue" />
      </Content>
    );
    
  return (
    <Container s>
      <Content style={styles.container}>
        <H1>Ingresa tu Tarea por hacer</H1>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Escribe algo..."
          value={toDo}
          onChangeText={setToDo}
          style={errorToDo ? styles.inputError : styles.toDo}
        />
        {errorToDo ? (
          <Text style={styles.error}>¡Debes ingresar una tarea por hacer!</Text>
        ) : null}
        <Button iconLeft onPress={handlerNewTodo} disabled={enableSave}>
          <Icon name='addfile' type="AntDesign" />
          <Text>Añadir tarea</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  error: {
    fontSize: 20,
    color: "red"
  },
  inputError: {
    borderColor: "red",
  },
  toDo: {
    borderColor: "gray",
    marginBottom: 10,
  },
});

export default ToDoCreateScreen;