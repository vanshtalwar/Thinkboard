import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI  from '../components/RateLimitedUI.jsx'
import api from '../lib/axios.js'
import NoteCard from '../components/NoteCard.jsx'

const HomePage = () => {

const [isRateLimited, setIsRateLimited]=useState(false)
const [notes,setNotes]=useState([])

useEffect(()=> {

const fetchNotes = async ()=> {
   try {
    const res = await api.get("/notes")
    setNotes(res.data)
    setIsRateLimited(false)
   } catch (error) {
    console.log("Error fetching notes");
    
   }

  }
  
  fetchNotes()
},[])

 return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">



        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;