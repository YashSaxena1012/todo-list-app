import React, { useState, useEffect } from 'react'
import "./Style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {
    var [listData, setListData] = useState("");
    var [itemsList, setItemsList] = useState(getLocalData());
    var [editItem, setEditItem] = useState("");
    var [togglebtn, settogglebtn] = useState(false);

    //add items

    const addItems = () => {
        if (!listData) {
            alert("fill some data");
        }
        else if (listData && togglebtn) {
            setItemsList(itemsList.map((curele) => {
                if (curele.id === editItem)
                    return { ...curele, name: listData };
                return curele;
            }))
            setListData("");
            setEditItem(null);
            settogglebtn(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: listData,
            };
            setItemsList([...itemsList, myNewInputData]);
            setListData("");
        }
    }

    // edit items

    const editItems = (index) => {
        const item_to_edit = itemsList.find((curele) => {
            return curele.id === index;
        });
        settogglebtn(true);
        setListData(item_to_edit.name)
        setEditItem(index);
    }

    //delete items

    const deleteItem = (index) => {
        const updatedItem = itemsList.filter((curele) => {
            return curele.id !== index
        })
        setItemsList(updatedItem);
        // console.log(itemsList);
    }

    // add in local storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(itemsList));
    }, [itemsList]
    );

    return (
        <div>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="https://raw.githubusercontent.com/thapatechnical/complete_react2021/76b2900dfaba3dc794d7f14f84c6fa4315a030bd/public/images/todo.svg" alt="todo-list" />
                        <figcaption>Add Your List Here ✌ </figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder="✍ Add Item" className='form-control'
                            value={listData}
                            onChange={(event) => { setListData(event.target.value) }} />
                        {togglebtn
                            ? <i className='fa fa-edit add-btn' onClick={addItems} />
                            : <i className='fa fa-plus add-btn' onClick={addItems} />
                        }
                    </div>
                    {/* show items */}
                    <div className='showItems'>
                        {itemsList.map((items) => {
                            return (
                                <div className="eachItem" key={items.id}>
                                    <h3>{items.name}</h3>
                                    <div className="todo-btn">
                                        <i className='far fa-edit add-btn' onClick={() => editItems(items.id)}></i>
                                        <i className='fas fa-trash-alt add-btn'
                                            onClick={() => deleteItem(items.id)}></i>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    {/* remove items */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All"
                            onClick={() => { setItemsList([]); }}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Todo
