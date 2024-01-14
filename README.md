# Hot Dealz

Welcome to the README for Hot Dealz, a dynamic deal sharing website built using React and Firebase.

This document provides an overview of the project, its features, and what I learned during its development.

## Tech Stack

- React
- Typescript
- Firebase
- Tailwind CSS

## Features

- Sign up via email or use existing Google account
- Search, filter and sort through deals, save favourites for later
- Submit your own deal through a guided form
- Upvote and downvote deals
- Comment and like other helpful comments

## What I Learned

1. **Firebase Integration:** I gained hands-on experience in integrating Firebase into a React application, understanding database interactions, and managing user authentication securely.

2. **React Ecosystem:** Through the use of **React**, **React Router**, **React Hook Form**, and other libraries, I honed my skills in creating a robust and interactive front-end.

3. **Custom Hooks:** Developing custom hooks improved the efficiency of the codebase, promoting reusability and maintaining a clean and modular structure.

   For example usePagination which manges the current page, returns a subset of items to be displayed, the total number of pages and a function to navigate across pages.

   ```typescript
   import { SetStateAction, useState } from "react";

   const usePagination = (items: any[], itemsPerPage: number) => {
     const [currentPage, setCurrentPage] = useState(1);

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(items.length / itemsPerPage);

     const paginate = (pageNumber: SetStateAction<number>) => {
       setCurrentPage(pageNumber);
     };

     return {
       currentPage,
       currentItems,
       totalPages,
       paginate,
     };
   };

   export default usePagination;
   ```

4. **Data Manipulation:** Implementing features like sorting, filtering, and search required thoughtful data manipulation (map, filter, sort), improving my skills in handling and presenting data dynamically.
