'use client'

import { useState } from "react";



export default function Home() {
  const [id, setID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');


  const BASE_URL = "http://127.0.0.1:8000"
  function searchItem(itemID) {
    fetch(`${BASE_URL}/read/${itemID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Static JSON data:', data)
        setResult(data.data)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  function post(item) {
    fetch(`${BASE_URL}/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Object created:', data)
        setResult(data.message)
      }
      )
      .catch((error) => console.error('Error creating object:', error));

  }

  function put(item) {

    fetch(`${BASE_URL}/update/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Object updated:', data)
        setResult(data.message)
      })
      .catch((error) => console.error('Error updating object:', error));


  }

  function handleDelete(itemID) {
    const objectIdToDelete = 123;

    fetch(`${BASE_URL}/delete/${itemID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Object deleted:', data)
        setResult(data.message)
      })
      .catch((error) => console.error('Error deleting object:', error));

  }

  const handleIDChange = (event) => {
    setID(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }


  const handleDesChange = (event) => {
    setDescription(event.target.value);
  }

  return (
    <main className="bg-white flex flex-col justify-center items-center">
      <div className="mt-10 flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="ml-10 mr-3">
            ID:
          </div>
          <input value={id} onChange={handleIDChange} name="input" type="text" className="border-gray-400 border-2 rounded-full bg-gray-100 dark:bg-gray-500 w-1000 pl-7 h-10 text-black" placeholder="" />
        </div>
        <div className="mt-10 flex flex-row justify-center items-center">
          <div className="ml-10 mr-3">
            Title
          </div>
          <input value={title} onChange={handleTitleChange} name="input" type="text" className=" border-gray-400 border-2 rounded-full bg-gray-100 dark:bg-gray-500 w-1000 pl-7 h-10 text-black" placeholder="" />
        </div>
        <div className="mt-10 flex flex-row justify-center items-center">
          <div className="ml-10 mr-3">
            Description
          </div>
          <input value={description} onChange={handleDesChange} name="input" type="text" className=" border-gray-400 border-2 rounded-full bg-gray-100 dark:bg-gray-500 w-1000 pl-7 h-10 text-black" placeholder="" />
        </div>
      </div>

      <div className="flex flex-row justify-between mt-10">
        <div onClick={() => searchItem(id)} className="content-center  border-2 border-solid border-black w-auto rounded-sm mx-1.5 my-1.5 px-2 py-1">
          search
        </div>
        <div onClick={() => post({ 'id': id, 'title': title, 'description': description })} className="content-center  border-2 border-solid border-black w-auto rounded-sm mx-1.5 my-1.5 px-2 py-1">
          insert
        </div>
        <div onClick={() => put({ 'id': id, 'title': title, 'description': description })} className="content-center  border-2 border-solid border-black w-auto rounded-sm mx-1.5 my-1.5 px-2 py-1">
          update
        </div>
        <div onClick={() => handleDelete(id)} className="content-center  border-2 border-solid border-black w-auto rounded-sm mx-1.5 my-1.5 px-2 py-1">
          delete
        </div>
      </div>

      <div className="mt-10">
        Result:

        {JSON.stringify(result)}
      </div>

    </main>
  );
}
