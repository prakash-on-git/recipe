import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'

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
    <div className="h-[100vh] flex items-center justify-center">
      <div className="max-w-3xl mx-auto h-[80vh] p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Add a New Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Description */}
          <input type="text" name="title" placeholder="Recipe Title" className="w-full p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          <textarea name="description" placeholder="Short Description" className="w-full p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />

          {/* Category & Cuisine */}
          <div className="flex space-x-4">
            <input type="text" name="category" placeholder="Category" className="w-1/2 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
            <input type="text" name="cuisine" placeholder="Cuisine" className="w-1/2 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          </div>

          {/* Prep, Cook, Total Time & Servings */}
          <div className="flex space-x-4">
            <input type="number" name="prepTime" placeholder="Prep Time (mins)" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
            <input type="number" name="cookTime" placeholder="Cook Time (mins)" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
            <input type="number" name="totalTime" placeholder="Total Time (mins)" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
            <input type="number" name="servings" placeholder="Servings" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          </div>

          {/* Ingredients Input */}
          <div className="space-y-2">
            <div className="flex">
              <input type="text" value={ingredientInput} placeholder="Add Ingredient" className="w-full p-2 border rounded dark:bg-gray-800" onChange={(e) => setIngredientInput(e.target.value)} />
              <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={addIngredient}>+</button>
            </div>
            <ul className="list-disc pl-5 text-gray-700">
              {formData.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
            </ul>
          </div>

          {/* Steps Input */}
          <div className="space-y-2">
            <div className="flex">
              <input type="text" value={stepInput} placeholder="Add Step" className="w-full p-2 border rounded dark:bg-gray-800" onChange={(e) => setStepInput(e.target.value)} />
              <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={addStep}>+</button>
            </div>
            <ol className="list-decimal pl-5 text-gray-700">
              {formData.steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
          </div>

          {/* Drag & Drop Image Upload */}
          <div className="border-dashed border-2 p-6 text-center" onDrop={handleDrop} onDragOver={handleDragOver}>
              <input type="file" accept="image/*" hidden id="imageUpload" onChange={handleImageChange} />
              <label htmlFor="imageUpload" className="cursor-pointer">
              {imagePreview ? (
                  <img src={imagePreview} alt="Recipe Preview" className="w-full h-60 object-cover rounded-md" />
              ) : (
                  <p className="text-gray-500">Drag & drop an image here or <span className="text-blue-500">click to upload</span></p>
              )}
              </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">{loading ? "Adding..." : "Add Recipe"}</button>

          {/* Message */}
          {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddRecipe
