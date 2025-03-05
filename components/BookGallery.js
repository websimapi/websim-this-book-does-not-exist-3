import React from 'react';
import { BookCard } from './BookCard.js';

export const BookGallery = ({ books, isLoading }) => {
  if (books.length === 0 && !isLoading) {
    return (
      <div className="gallery-empty">
        <h2>Book Gallery</h2>
        <p>No books have been generated yet. Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Book Gallery</h2>
      <div className="gallery">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

