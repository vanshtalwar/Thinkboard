// src/pages/NoteDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams(); // get note ID from URL
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/notes/${id}`);
        setNote({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error("Error fetching note:", err);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Both title and content are required");
      return;
    }

    try {
      setSaving(true);
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/"); // go back to homepage after update
    } catch (err) {
      console.error("Error updating note:", err);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading note...</p>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Note</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter note title"
              disabled={saving}
            />
          </div>

          <div>
            <label htmlFor="content" className="block font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={note.content}
              onChange={handleChange}
              rows={8}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter note content"
              disabled={saving}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary px-4 py-2 rounded-md"
          >
            {saving ? "Saving..." : "Update Note"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default NoteDetailPage;
