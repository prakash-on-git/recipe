import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRecipe = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", description: "", ingredients: [], steps: [], prepTime: "", cookTime: "", totalTime: "", servings: "", category: "", cuisine: "", image: "",});

    const [ingredientInput, setIngredientInput] = useState("");
    const [stepInput, setStepInput] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    // Fetch recipe from DB
    const fetchRecipe = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/recipe/get/${id}`);
            
            setFormData(response.data);
            setImagePreview(response.data.image);
        } catch (error) {
            console.error("Error fetching recipe:", error);
            setMessage("Error fetching recipe");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchRecipe();
    }, [id]);

    // Handle input change with debounce
    // const updateFormData = (e) => {
    // };
    
    
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Add ingredient
    const addIngredient = () => {
        if (ingredientInput.trim()) {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredientInput],
        }));
        setIngredientInput("");
        }
    };

    // Add step
    const addStep = () => {
        if (stepInput.trim()) {
        setFormData((prev) => ({
            ...prev,
            steps: [...prev.steps, stepInput],
        }));
        setStepInput("");
        }
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImageToCloudinary = async () => {
        if (!image) return formData.image;
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        imageFormData.append("upload_preset", "recipe");
        imageFormData.append("cloud_name", "djoeysvfn");

        try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/djoeysvfn/image/upload",
            imageFormData
        );
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
          console.log("tokenn is:" ,token);
          
          const imageUrl = await uploadImageToCloudinary();
          if (!imageUrl) throw new Error("Image upload failed!");

          const updatedFormData = { ...formData, image: imageUrl };

          await axios.put(`http://localhost:8080/recipe/update/${id}`, updatedFormData, {
              headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              },
          });

          setMessage("Recipe updated successfully!");
          setTimeout(() => navigate(`/recipe/${id}`), 2000);
        } catch (error) {
          setMessage(error.response?.data?.message || "Error updating recipe");
        } finally {
          setLoading(false);
        }
    };
 
  return (
      <div className="h-[100vh] flex items-center justify-center">
    <div className="max-w-3xl h-[80vh] mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-center mb-6 dark:bg-gray-800">Update Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} placeholder="Recipe Title" className="w-full p-2 border rounded dark:bg-gray-800" onChange={handleChange} required contentEditable='true'/>
        <textarea name="description" value={formData.description} placeholder="Short Description" className="w-full p-2 border rounded dark:bg-gray-800" onChange={handleChange} required/>

        <div className="flex space-x-4">
          <input type="text" name="category" value={formData.category} placeholder="Category" className="w-1/2 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          <input type="text" name="cuisine" value={formData.cuisine} placeholder="Cuisine" className="w-1/2 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
        </div>

        <div className="flex space-x-4">
          <input type="number" name="prepTime" value={formData.prepTime} placeholder="Prep Time (mins)" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          <input type="number" name="cookTime" value={formData.cookTime} placeholder="Cook Time (mins)" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          <input type="number" name="totalTime" value={formData.totalTime} placeholder="Total Time (mins)" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
          <input type="number" name="servings" value={formData.servings} placeholder="Servings" className="w-1/4 p-2 border rounded dark:bg-gray-800" onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <div className="flex">
            <input type="text" value={ingredientInput} placeholder="Add Ingredient" className="w-full p-2 border rounded dark:bg-gray-800" onChange={(e) => setIngredientInput(e.target.value)} />
            <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={addIngredient}>+</button>
          </div>
          <ul className="list-disc pl-5 text-gray-700">{formData.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
        </div>

        <div className="space-y-2">
          <div className="flex">
            <input type="text" value={stepInput} placeholder="Add Step" className="w-full p-2 border rounded dark:bg-gray-800" onChange={(e) => setStepInput(e.target.value)} />
            <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={addStep}>+</button>
          </div>
          <ol className="list-decimal pl-5 text-gray-700">{formData.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
        </div>

        <input type="file" accept="image/*" hidden id="imageUpload" onChange={handleImageChange} />
        <label htmlFor="imageUpload" className="cursor-pointer">
          {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-60 object-cover rounded-md" /> : <p className="text-gray-500">Click to upload image</p>}
        </label>

        <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">{loading ? "Updating..." : "Update Recipe"}</button>
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </form>
      </div>
  </div>
  );
};

export default UpdateRecipe;
