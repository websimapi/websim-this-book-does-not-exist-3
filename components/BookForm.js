import React, { useState } from 'react';

export const BookForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    prompt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.title.trim() && formData.author.trim() && 
                 formData.genre.trim() && formData.prompt.trim();

  return (
    <div className="book-form">
      <h2>Generate a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title (or leave empty for AI to generate)</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. The Midnight Library"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author Name (or leave empty for AI to generate)</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="e.g. Jane Austen"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Science Fiction, Fantasy, Mystery"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="prompt">Book Concept (describe your idea)</label>
          <textarea
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            placeholder="e.g. A story about a librarian who discovers a library where each book represents a different version of their life"
            required
          />
        </div>
        
        <button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? 'Generating...' : 'Generate Book'}
        </button>
      </form>
    </div>
  );
};

