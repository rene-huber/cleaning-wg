"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Tasks from "./Tasks";


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
    toast.success("hinzugefügte Aufgabe");
      console.log(data, "data")
    } else {
      console.error("Fehler beim Hochladen der Aufgabe");
    }
  };



  return (
 <>
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Wer?</legend>
        {[ " Mirren ", " Olaf " , " Rene"].map((personName) => (
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

      <label htmlFor="task-select">Wähle die Aufgabe aus, die du gemacht hast:</label>
      <select
        id="task-select"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      >
     
        <option value="Badezimmer reinigen">Auswahl</option>
        <option value="Badezimmer reinigen">🚽 &nbsp; Badezimmer reinigen</option>
        <option value="Küche reinigen">🍳 &nbsp; Küche reinigen</option>
        <option value="Boden reinigen">🧹 &nbsp; Boden reinigen</option>
        <option value="Müll rausbringen">🗑️ &nbsp; Müll rausbringen</option>
      </select>

      <button type="submit">Senden</button>
    </form>
    <Tasks/>
 </>
  );
};
  


export default CreateTask;
