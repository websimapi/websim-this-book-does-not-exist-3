import React from 'react';

export const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.coverUrl} alt={`Cover of ${book.title}`} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-description">
          <p>{book.description}</p>
        </div>
        
        <div className="book-genre">
          <small>Genre: {book.genre}</small>
        </div>
        
        <div className="creator-info">
          <img 
            className="creator-avatar" 
            src={`https://images.websim.ai/avatar/${book.username}`} 
            alt={`${book.username}'s avatar`} 
          />
          <span>Created by {book.username}</span>
        </div>
      </div>
    </div>
  );
};

