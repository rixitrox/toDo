import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, List, ListItem, Text, Fab, Icon, Body, Right } from "native-base";

// Utilizar el contexto de toDos
import { ToDosContext } from "../context/ToDosContext";

const ToDosListScreen = ({ navigation }) => {
    const { toDos } = useContext(ToDosContext);
    console.log(toDos);

    return (
      <Container>
        <Content>
          <Text> YOUR TO DO'S</Text>
          <List>
            {toDos
              ? toDos.map((toDo) => (
                  <ListItem
                    key={toDo.id.toString()}
                    onPress={() => {
                      navigation.navigate("ToDoModify", { id: toDos.id });
                    }}
                  >
                    <Body>
                      <Text numberOfLines={1}>{toDo.todo}</Text>
                    </Body>
                    <Right>
                      <Icon 
                        name="right"
                        type="AntDesign"
                      />
                    </Right>
                  </ListItem>
                ))
              : null}
          </List>
        </Content>
        <Fab
            active={true}
            position="bottomRight"
            style={{ backgroundColor: "#FF0023" }}
            direction="up"
            onPress={() => navigation.navigate("ToDoCreate")}
          >
            <Icon name="plus" type="AntDesign" />
          </Fab>
      </Container>
    );
}

const styles = StyleSheet.create({

});

export default ToDosListScreen;