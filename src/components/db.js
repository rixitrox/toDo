import React from "react";
import * as SQLite from "expo-sqlite";

//Crea y abre la base de datos
const db = SQLite.openDatabase("todolist.db");

//Funcionalidades de la base de datos

//Obtener las tareas por hacer del usuario
const getToDos = (setToDosFunction) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from todos",
      [],
      (_, { rows: { _array } }) => {
        setToDosFunction(_array);
      },
      (_t, error) => {
        console.log("ERROR al momento de obtener las tareas por hacer");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Tareas por hacer obtenidas!");
      }
    );
  });
};

//Insertar tareas por hacer
const insertToDos = (toDo, succesFunction) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into todos (todo, status) values (?, ?)", [
        toDo,
        0,
      ]);
    },
    (_t, error) => {
      console.log("ERROR al momento de insertar las tareas por hacer");
      console.log(error);
    },
    (_t, _success) => {
      succesFunction;
    }
  );
};

// Borrar la base de datos
const dropDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table todos");
      },
      (_t, error) => {
        console.log("Error al eliminar la tabla de tareas por hacer");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
      }
    );
  });
};

// Creación de la tabla de tareas por hacer
const setupDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists todos (id integer primary key autoincrement, todo text not null, status int not null);"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla creada!");
        resolve(success);
      }
    );
  });
};

export const database = {
  getToDos,
  insertToDos,
  dropDatabaseTableAsync,
  setupDatabaseTableAsync,
};