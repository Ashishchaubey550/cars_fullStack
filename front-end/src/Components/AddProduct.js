import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [company, setCompany] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [distanceCovered, setDistanceCovered] = useState('');
    const [modelYear, setModelYear] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // State for image
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const addProduct = async () => {
        if (!company || !model || !color || !distanceCovered || !modelYear || !price || !image) {
            setError(true);
            return false;
        }

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append("company", company);
        formData.append("model", model);
        formData.append("color", color);
        formData.append("distanceCovered", distanceCovered);
        formData.append("modelYear", modelYear);
        formData.append("price", price);
        formData.append("image", image);

        try {
            let result = await fetch("https://cars-fullstack.onrender.com/add", {
                method: "POST",
                body: formData,
            });

            if (!result.ok) {
                throw new Error("Failed to add car");
            }

            result = await result.json();
            console.warn("Car added:", result);
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            setError(true);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col m-[25px]">
            <h1 className="font-bold text-4xl">Add Car</h1>

            {/* Company Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="text"
                placeholder="Enter Car Company"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
            />
            {error && !company && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Enter valid company</span>}

            {/* Model Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="text"
                placeholder="Enter Car Model"
                onChange={(e) => setModel(e.target.value)}
                value={model}
            />
            {error && !model && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Enter valid model</span>}

            {/* Color Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="text"
                placeholder="Enter Car Color"
                onChange={(e) => setColor(e.target.value)}
                value={color}
            />
            {error && !color && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Enter valid color</span>}

            {/* Distance Covered Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="text"
                placeholder="Enter Distance Covered (in km)"
                onChange={(e) => setDistanceCovered(e.target.value)}
                value={distanceCovered}
            />
            {error && !distanceCovered && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Enter valid distance</span>}

            {/* Model Year Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="text"
                placeholder="Enter Model Year"
                onChange={(e) => setModelYear(e.target.value)}
                value={modelYear}
            />
            {error && !modelYear && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Enter valid model year</span>}

            {/* Price Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="text"
                placeholder="Enter Car Price in Lakhs"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            {error && !price && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Enter price In Lakhs</span>}

            {/* Image Upload Input */}
            <input
                className="block m-[25px] p-2 w-[300px] border-solid border-blue-400 border-[1px]"
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // Update image state
            />
            {error && !image && <span className="text-red-600 block mt-[-20px] ml-[-170px]">Please upload an image</span>}

            {/* Submit Button */}
            <button
                onClick={addProduct}
                className="m-[25px] p-[10px] w-[150px] bg-blue-300 border-black border-solid border-2"
            >
                Add Car
            </button>
        </div>
    );
}

export default AddProduct;
