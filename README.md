# 🎬 Movie Searcher

A modern, responsive movie search application built with React and Vite, powered by the OMDB API. Search for your favorite movies, explore detailed information, and enjoy a smooth, debounced search experience with real-time results.

## ✨ Live Demo

[View Live Demo](#)

## 🎯 Project Overview

Movie Searcher is an interactive web application that allows users to search for movies using various filters and view detailed information about each film. The app implements advanced React patterns including custom hooks, debouncing, and performance optimizations to provide a seamless user experience.

## 🚀 Features

### Core Functionality
- 🔍 **Real-time Search** - Search movies as you type with automatic results
- ⏱️ **Smart Debouncing** - Optimized API calls with debounce implementation
- 🎞️ **Movie Details** - View comprehensive information including:
  - Movie title and year
  - High-quality poster images
  - Plot synopsis
  - Cast and crew information
  - IMDB ratings
  - Genre and runtime
- 📱 **Responsive Design** - Fully responsive grid layout that works on all devices
- 🚫 **Duplicate Prevention** - Avoids redundant API calls for the same search term
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and production builds

### Technical Highlights
- **Custom Hooks** - Reusable logic for API calls and state management
- **Error Handling** - Graceful error states and user feedback
- **Loading States** - Skeleton loaders and smooth transitions
- **Memoization** - Optimized re-renders with React.memo and useMemo
- **Clean Architecture** - Well-organized component structure

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Next-generation frontend tooling
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3** - Custom styles with CSS Grid and Flexbox
- **React Hooks** - useState, useEffect, useMemo, useCallback, useRef

### API & Data
- **OMDB API** - The Open Movie Database
- **Fetch API** - Native browser API for HTTP requests
- **JSON** - Data format for API responses

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git** - Version control

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/home.png" alt="Home Screen" width="45%" />
  <img src="./screenshots/search-results.png" alt="Search Results" width="45%" />
</div>

<div align="center">
  <img src="./screenshots/movie-details.png" alt="Movie Details" width="45%" />
  <img src="./screenshots/mobile-view.png" alt="Mobile View" width="45%" />
</div>

## 🔧 Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- OMDB API Key (free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/jefercort/movie-searcher.git
   cd movie-searcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_omdb_api_key_here
   VITE_API_URL=https://www.omdbapi.com/
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
movie-searcher/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── MovieCard/
│   │   │   ├── MovieCard.jsx
│   │   │   └── MovieCard.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBar.css
│   │   ├── MovieGrid/
│   │   │   ├── MovieGrid.jsx
│   │   │   └── MovieGrid.css
│   │   └── Loading/
│   │       ├── Loading.jsx
│   │       └── Loading.css
│   ├── hooks/
│   │   ├── useMovies.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── services/
│   │   └── movieService.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎮 Usage

### Basic Search
1. Type a movie name in the search bar
2. Results appear automatically after you stop typing (debounced)
3. Click on any movie card to view more details

### Advanced Features
- **Filter by Year**: Add year to narrow down results
- **Sort Results**: Sort by year, title, or relevance
- **View Details**: Click on a movie for expanded information

## 💻 Code Examples

### Custom Debounce Hook
```javascript
// useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### Movie Service
```javascript
// movieService.js
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export const searchMovies = async (searchTerm) => {
  if (!searchTerm) return null;
  
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    
    return data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
```

## 🎯 Key Learnings

This project helped me master:

- **React Hooks Patterns**: Advanced use of useState, useEffect, and custom hooks
- **Performance Optimization**: Debouncing, memoization, and preventing unnecessary re-renders
- **API Integration**: Working with external APIs, handling async operations
- **Error Handling**: Implementing comprehensive error boundaries and user feedback
- **Responsive Design**: Creating layouts that work across all devices
- **State Management**: Managing complex state without external libraries
- **Clean Code**: Writing maintainable, reusable components

## 🚧 Future Enhancements

- [ ] Add movie favorites/watchlist functionality
- [ ] Implement advanced filters (genre, rating, year range)
- [ ] Add pagination for search results
- [ ] Include movie trailers from YouTube API
- [ ] Add user authentication and profiles
- [ ] Implement movie recommendations
- [ ] Add dark/light theme toggle
- [ ] Include more detailed movie information (cast, reviews)
- [ ] Add loading skeletons for better UX
- [ ] Implement infinite scroll
- [ ] Add unit and integration tests
- [ ] PWA functionality for offline access

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kevin Cortes**
- GitHub: [@jefercort](https://github.com/jefercort)
- LinkedIn: [Kevin Cortes PRO](https://www.linkedin.com/in/kevinc-proservices)
- Portfolio: [PRO ENGINEERING](https://proserv.com.co/)

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing the movie database
- React team for the amazing framework
- Vite team for the blazing fast build tool
- All contributors and testers

## 📞 Support

If you have any questions or need help getting started, please open an issue or contact me directly.

---

⭐ **If you like this project, please give it a star!**

🎬 **Happy Movie Searching!**
