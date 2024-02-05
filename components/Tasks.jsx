import React, { useState, useEffect } from 'react';
import {timeSince }from "@/utils/time";
import style from "@/app/page.module.css"

const getData = async () => {
    const res = await fetch(`/api/posts`, {
        cache: "no-store", revalidate: false
    });

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return res.json();
};

const Tasks = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {        
        const fetchPosts = async () => {
            try {
                const data = await getData();
                console.log(data, "data333333")
                 setPosts(data.tasks); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
        
    }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente.

    return (
        <div>
            <div >
                {posts?.map((item) => (
                    <div key={item.id} className={ style.task }>
                        <p>{timeSince(item.startTime)}</p>
                        <h2>{item.name}</h2>
                        <p>{item.assignedTo}</p>
                        <br />
                    </div>
                ))}
            </div>
            {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
        </div>
    );
};

export default Tasks;
