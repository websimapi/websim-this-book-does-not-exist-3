import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BookForm } from './components/BookForm.js';
import { BookGallery } from './components/BookGallery.js';
import { WebsimService } from './services/WebsimService.js';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [room] = useState(() => new WebsimSocket());
  
  useEffect(() => {
    // Subscribe to book collection changes
    const unsubscribe = room.collection('book').subscribe((updatedBooks) => {
      // Sort books by creation time, newest first
      setBooks(updatedBooks.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      ));
    });
    
    return () => unsubscribe();
  }, [room]);

  const handleBookGeneration = async (bookDetails) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const book = await WebsimService.generateBook(room, bookDetails);
      setError(null);
    } catch (err) {
      console.error('Error generating book:', err);
      setError('Failed to generate book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>This Book Does Not Exist</h1>
        <p>Generate fictional books with AI and share them with the world</p>
      </header>
      
      <BookForm onSubmit={handleBookGeneration} isLoading={isLoading} />
      
      {error && <div className="error">{error}</div>}
      
      <BookGallery books={books} isLoading={isLoading} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

