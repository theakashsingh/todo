import React from "react";
import todo from "../images/todo.png";
import "./Todo.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { useState, useEffect } from "react";

// To get local storage data
const getLocalData = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [addItem, setaddItem] = useState("");

  const [items, setitems] = useState(getLocalData());

  // use state hook for toggle btn
  const [toggleaUpdate, settoggleaUpdate] = useState(true);

  // use state for item id for update
  const [updateItem, setupdateItem] = useState(null);

  const addData = () => {
    if (!addItem) {
      alert("Please fill data");
    } else if (addItem && !toggleaUpdate) {
      setitems(
        items.map(elem => {
          if (elem.id == updateItem) {
            return { ...elem, name: addItem };
          }

          return elem;
        })
      );

      settoggleaUpdate(true);

      setaddItem("");

      setupdateItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: addItem,
      };
      setitems([...items, allInputData]);
      setaddItem("");
    }
  };

  // edit item
  const editItem = id => {
    let newEditItem = items.find(elem => {
      return elem.id == id;
    });

    settoggleaUpdate(false);

    setaddItem(newEditItem.name);

    setupdateItem(id);
  };

  // remove or delete item
  const removeItem = index => {
    const updateItems = items.filter(elem => {
      return index !== elem.id;
    });

    setitems(updateItems);
  };

  // add data in local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="todo-div">
          <img src={todo} alt="todo-img" srcSet="" />
          <figcaption>Add Your List Here ✌</figcaption>

          <form className="add-items" onSubmit={addData}>
            <input
              type="text"
              name=""
              value={addItem}
              onChange={e => setaddItem(e.target.value)}
              placeholder="Add Item..."
              id=""
            />

            {toggleaUpdate ? (
              <AddIcon
                titleAccess="add items"
                className="add-btn"
                onClick={addData}
              />
            ) : (
              <DoneIcon
                titleAccess="Update"
                className="update-item"
                onClick={addData}
              />
            )}
            <button type="submit" hidden>
              Submit
            </button>
          </form>

          <div className="show-items">
            {items.map(elem => {
              return (
                <div className="item-disply">
                  <div className="each-item" key={elem.id}>
                    <h5>{elem.name}</h5>
                    <EditIcon
                      titleAccess="Edit"
                      className="edit-item"
                      onClick={() => editItem(elem.id)}
                    />
                  </div>
                  <DeleteIcon
                    titleAccess="remove item"
                    className="remove-btn"
                    onClick={() => removeItem(elem.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
