import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';
import UpdateRecipe from './pages/UpdateRecipe';
import {useState} from 'react';
import RandomRecipe from './pages/RandomRecipe';
import RecipeOrganizer from './pages/RecipeOrganizer';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  }

  return (
    <div className="App dark:bg-gray-900 dark:text-white">
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/update-recipe/:id" element={<UpdateRecipe />} />
        <Route path="/random-recipe" element={<RandomRecipe />} />
        <Route path="/organize" element={<RecipeOrganizer />} />
      </Routes>
      <button className="fixed w-10 h-10 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold" onClick={toggleDarkMode}>
        {darkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
}

export default App;
