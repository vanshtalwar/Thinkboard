import Note from '../models/Note.js'

export async function getNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getNotes controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}


export async function getNotesById(req, res) {
    try {
  
        const notes = await Note.findById(req.params.id)
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getNotesById controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}




export async function createNotes(req, res) {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title, content })

        await newNote.save()
        res.status(201).json({ message: "Note Created Successfully" })
    } catch (error) {
        console.log("Error in createNotes controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}






export async function updateNotes(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            {title, content})
    res.status(200).json({message: "Note Updated Successfully"})

    } catch (error) {
        console.log("Error in updateNotes controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}







export async function deleteNotes(req, res) {
    try {
        const { title, content } = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Note Deleted Successfully"})

    } catch (error) {
        console.log("Error in deleteNotes controller ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}