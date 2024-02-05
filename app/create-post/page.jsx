"use client";
import styles from "./create.module.css";
import { useEffect, useState } from "react";


const CreateTask = () => {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task, name}),
    });

    if (res.status === 200) {
      const data = await res.json();
      alert("Post created successfully.");
    } else {
      console.error("Failed to create post.");
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Nombre:</legend>
        {["Olaf", "Mirre", "Rene"].map((personName) => (
          <label key={personName}>
            <input
              type="radio"
              value={personName}
              checked={name === personName}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            {personName}
          </label>
        ))}
      </fieldset>

      <label htmlFor="task-select">Tarea:</label>
      <select
        id="task-select"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      >
        <option value="">Seleccione una tarea</option>
        <option value="Limpiar baño">Limpiar baño</option>
        <option value="Limpiar cocina">Limpiar cocina</option>
        <option value="Limpiar piso">Limpiar piso</option>
      </select>

      <button type="submit">Enviar</button>
    </form>
  );
};
  


export default CreateTask;
