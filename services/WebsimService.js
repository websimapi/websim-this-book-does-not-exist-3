export class WebsimService {
  static async generateBook(room, bookDetails) {
    // Step 1: Generate book content using LLM
    const bookContent = await this.generateBookContent(bookDetails);
    
    // Step 2: Generate book cover image based on the generated content
    const coverUrl = await this.generateCoverImage(bookContent);
    
    // Step 3: Save the book to the database
    const savedBook = await room.collection('book').create({
      title: bookContent.title,
      author: bookContent.author,
      genre: bookDetails.genre,
      description: bookContent.description,
      coverUrl: coverUrl,
      synopsis: bookContent.synopsis,
      prompt: bookDetails.prompt
    });
    
    return savedBook;
  }
  
  static async generateBookContent(bookDetails) {
    try {
      const completion = await websim.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a creative fiction writer tasked with generating realistic book details.
            Create a compelling fictional book based on the user's input.
            Respond with JSON only following this exact format:
            {
              "title": "Book Title",
              "author": "Author Name",
              "description": "A concise one-paragraph description of the book",
              "synopsis": "A detailed 3-paragraph synopsis of the book's plot",
              "coverDescription": "A detailed description of what should appear on the book cover"
            }`
          },
          {
            role: "user",
            content: `Create a ${bookDetails.genre} book with these details:
            ${bookDetails.title ? `Title: ${bookDetails.title}` : 'Generate an appropriate title'}
            ${bookDetails.author ? `Author: ${bookDetails.author}` : 'Generate an appropriate author name'}
            Concept: ${bookDetails.prompt}`
          }
        ],
        json: true
      });
      
      return JSON.parse(completion.content);
    } catch (error) {
      console.error('Error generating book content:', error);
      throw new Error('Failed to generate book content');
    }
  }
  
  static async generateCoverImage(bookContent) {
    try {
      const result = await websim.imageGen({
        prompt: `Book cover design for "${bookContent.title}" by ${bookContent.author}. ${bookContent.coverDescription}. Professional book cover style, high quality, dramatic lighting, eye-catching design.`,
        aspect_ratio: "2:3"
      });
      
      return result.url;
    } catch (error) {
      console.error('Error generating cover image:', error);
      throw new Error('Failed to generate cover image');
    }
  }
}

