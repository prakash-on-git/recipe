import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import './addRecipe.css';

const AddRecipe = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", description: "", ingredients: [], steps: [], prepTime: "", cookTime: "", totalTime: "", servings: "", category: "", cuisine: "", image: "",});

    const [ingredientInput, setIngredientInput] = useState("");
    const [stepInput, setStepInput] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add ingredient
    const addIngredient = () => {
        if (ingredientInput.trim() !== "") {
        setFormData({ ...formData, ingredients: [...formData.ingredients, ingredientInput] });
        setIngredientInput("");
        }
    };

    // Add step
    const addStep = () => {
        if (stepInput.trim() !== "") {
        setFormData({ ...formData, steps: [...formData.steps, stepInput] });
        setStepInput("");
        }
    };

    // Handle image drop or selection
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Show preview
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const uploadImageToCloudinary = async () => {
        if (!image) return null;
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        // imageFormData.append("upload_preset", "your_upload_preset"); // Set this in Cloudinary
        imageFormData.append("upload_preset", "recipe"); 
        imageFormData.append("cloud_name", "djoeysvfn");
    
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/djoeysvfn/image/upload`, imageFormData );            
            return response.data.secure_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
    
        try {
            const imageUrl = await uploadImageToCloudinary();
            if (!imageUrl) throw new Error("Image upload failed!");            
    
            const updatedFormData = { ...formData, image: imageUrl }; // Add image URL to formData            
    
            await axios.post("http://localhost:8080/recipe/create", updatedFormData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            setMessage("Recipe added successfully!");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error adding recipe");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
      <Header/>
      <div className="container">
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Recipe Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Short Description" onChange={handleChange} required />

          <div className="flex">
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange} required />
          </div>

          <div className="flex">
            <input type="number" name="prepTime" placeholder="Prep Time (mins)" onChange={handleChange} required />
            <input type="number" name="cookTime" placeholder="Cook Time (mins)" onChange={handleChange} required />
            <input type="number" name="totalTime" placeholder="Total Time (mins)" onChange={handleChange} required />
            <input type="number" name="servings" placeholder="Servings" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input type="text" value={ingredientInput} placeholder="Add Ingredient" onChange={(e) => setIngredientInput(e.target.value)} />
            <button type="button" onClick={addIngredient}>+</button>
          </div>
          <ul>{formData.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>

          <div className="input-group">
            <input type="text" value={stepInput} placeholder="Add Step" onChange={(e) => setStepInput(e.target.value)} />
            <button type="button" onClick={addStep}>+</button>
          </div>
          <ol>{formData.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>

          <div className="image-upload">
            <input type="file" accept="image/*" hidden id="imageUpload" onChange={handleImageChange} />
            <label htmlFor="imageUpload">
              {imagePreview ? <img src={imagePreview} alt="Preview" /> : <p>Drag & drop an image here or <span>click to upload</span></p>}
            </label>
          </div>

          <div className="center-button">
            <button type="submit">{loading ? "Adding..." : "Add Recipe"}</button>
          </div>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
  </div>
  )
}

export default AddRecipe
