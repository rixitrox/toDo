import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las tareas por hacer
export const ToDosContext = createContext({});

export const ToDosContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto se obtienen desde los props
  const { toDos: initialToDos, children } = props;

  // Almacenar los valores en el estado
  const [toDos, setToDos] = useState(initialToDos);

  // Cargar u obtener las tareas por hacer
  useEffect(() => {
    refreshToDos();
  }, []);

  const refreshToDos = () => {
    return database.getToDos(setToDos);
  };

  const addNewToDo = (toDo) => {
    return database.insertToDos(toDo, refreshToDos);
  };

  // Crear el objeto de contexto
  const notesContext = {
    notes,
    addNewToDo,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <ToDosContext.Provider value={toDosContext}>
      {children}
    </ToDosContext.Provider>
  );
}
