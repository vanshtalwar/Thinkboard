import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from '../lib/axios.js'
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Adjust URL if your backend uses a different port or path
      const payload = { title: title.trim(), content: content.trim() };
      const res = await api.post("/notes", payload);

      // If your backend returns created note in res.data.data or res.data, adjust accordingly.
      console.log("Create response:", res);

      toast.success("Note created!");
      resetForm();

      // Redirect to homepage (simple, reliable)
      window.location.href = "/";
    } catch (err) {
      console.error("Error creating note:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create note. Try again."
      );
      toast.error("Could not create note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Create a New Note</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Enter note title"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Write your note here..."
              disabled={saving}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary px-4 py-2 rounded-md"
            >
              {saving ? "Saving..." : "Create Note"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="btn btn-ghost px-3 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePage;
