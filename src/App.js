import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import DataItem from "./Component/DataItem";
function App() {
  const [data, setData] = useState([]);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const inputRef = useRef({
    title: "",
    description: "",
  });
  const [isCompletedScreen, setCompletedScreen] = useState(false);
  const [operationMode, setOperationMode] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);

  const addData = () => {
    const newData = {
      title: inputRef.current.title?.value || "",
      description: inputRef.current.description?.value || "",
      time: new Date().toLocaleString(),
    };

    if (newData.title !== "" && newData.description !== "") {
      if (operationMode === "Add") {
        setData([...data, newData]);
        localStorage.setItem("data", JSON.stringify([...data, newData]));
      } else if (operationMode === "Update" && editIndex !== null) {
        const updateData = [...data];
        updateData[editIndex] = newData;
        setData(updateData);
        localStorage.setItem("data", JSON.stringify(updateData));
      }
    }
    resetForm();
  };

  const resetForm = () => {
    inputRef.current.title.value = "";
    inputRef.current.description.value = "";
    setOperationMode("Add");
    setEditIndex(null);
  };

  const deleteItem = (i) => {
    const updatedDataAfterDeletion = [...data];
    updatedDataAfterDeletion.splice(i, 1);
    localStorage.setItem("data", JSON.stringify(updatedDataAfterDeletion));
    setData(updatedDataAfterDeletion);
  };

  const handleComplete = (index) => {
    const newData = [...data];
    const dateComplete = new Date().toLocaleString();
    const newDataCompleted = { ...newData[index], time: dateComplete };
    let isAlreadyCompleted = CompletedTodos.some(
      (item) =>
        item.title === newDataCompleted.title &&
        item.description === newDataCompleted.description
    );
    if (!isAlreadyCompleted) {
      setCompletedTodos([...CompletedTodos, newDataCompleted]);
      localStorage.setItem(
        "dataCompleted",
        JSON.stringify([...CompletedTodos, newDataCompleted])
      );
    }
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const deleteItemCompleted = (i) => {
    const newDataCopleted = [...CompletedTodos];
    newDataCopleted.splice(i, 1);
    localStorage.setItem("dataCompleted", JSON.stringify(newDataCopleted));
    setCompletedTodos(newDataCopleted);
  };

  const handleEditItem = (i) => {
    inputRef.current.title.focus();
    const updateItem = data[i];
    inputRef.current.title.value = updateItem.title;
    inputRef.current.description.value = updateItem.description;
    setOperationMode("Update");
    setEditIndex(i);
  };

  useEffect(() => {
    let dataSaved = JSON.parse(localStorage.getItem("data"));
    let dataCompleted = JSON.parse(localStorage.getItem("dataCompleted"));
    if (dataSaved && dataCompleted) {
      setData(dataSaved);
      setCompletedTodos(dataCompleted);
    }
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-container">
        <div className="inputs">
          <div className="input-items">
            <label>Title: </label>
            <input
              ref={(el) => (inputRef.current.title = el)}
              type="text"
              placeholder="What is the title of your todo ?"
            />
          </div>
          <div className="input-items">
            <label>Description: </label>
            <input
              ref={(el) => (inputRef.current.description = el)}
              type="text"
              placeholder="What is the description of your todo ?"
            />
          </div>
          <div className="input-items">
            <button type="button" className="btn" onClick={addData}>
              {operationMode}
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn  ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setCompletedScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn  ${
              isCompletedScreen === true && "active"
            }`}
            onClick={() => setCompletedScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompletedScreen === false &&
            data.map(({ title, description, time }, index) => {
              return (
                <DataItem
                  key={index}
                  title={title}
                  description={description}
                  time={time}
                  Delete={() => deleteItem(index)}
                  completeItem={() => handleComplete(index)}
                  editItem={() => handleEditItem(index)}
                  isCompletedScreen={false}
                />
              );
            })}

          {isCompletedScreen &&
            CompletedTodos.map(({ title, description, time }, index) => {
              return (
                <DataItem
                  key={index}
                  title={title}
                  description={description}
                  time={time}
                  Delete={() => deleteItemCompleted(index)}
                  isCompletedScreen={true}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
