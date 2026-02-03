import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { toast } from "react-toastify"
import { http } from "../../api/http"
import { getproducts } from "../../api/products.api";
import AdminProd from "../../components/skeletons/adminProduct";

const initialCategories = [
    { id: 1, name: "Furniture" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Decor" }
];

export default function ProductsPage() {
    const [Loading, setLoading] = useState(false);
    const [loading, setloading] = useState(false);
    const [initialProducts, setInitialProducts] = useState([])
    const [form, setForm] = useState({
        name: "",
        description: "",
        originalPrice: "",
        category: "",
        price: "",
        quantity: "",
        images: []
    });
    useEffect(() => {
        async function GetProducts() {
            setloading(true);
            try {
                const products = await getproducts()
                setInitialProducts(products)
                setloading(false)
            } catch (error) {
                console.log("error while fetching products", error)
                setloading(false)
            }
        }
        GetProducts()
    }, [])

    const UPLOAD_PRESET = "ml_default";
    const CLOUD_NAME = "dreuxokhl";
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImages = (e) => {
        console.log("im in")
        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const files = Array.from(e.target.files);
        if (files.length + form.images.length > 5) {
            toast.warn("You can upload a maximum of 5 images");
            return;
        }
        for (const file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                toast.warn("Please upload only JPEG, PNG, or WebP images");
                return;
            }
        }
        const previews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setForm(prev => ({
            ...prev,
            images: [...prev.images, ...previews],
        }));
        e.target.value = null
    };
    const resetForm = async () => {
        setForm({
            name: "",
            description: "",
            originalPrice: "",
            category: "",
            price: "",
            quantity: "",
            images: []
        });

        const products = await getproducts();
        setInitialProducts(products);
    };

    const removeImage = index => {
        setForm(prev => {
            URL.revokeObjectURL(prev.images[index].preview);
            return {
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            };
        });
    };
    console.log("form images", form.images)

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // 1️⃣ Upload images to Cloudinary
            const uploadedImages = [];
            if (!form.images.length) {
                toast.warn("Please upload at least one image");
                return;
            }
            if (!form.name || !form.price || !form.category) {
                toast.warn("Please fill in all required fields");
                return;
            }
            for (let image of form.images) {

                const formData = new FormData();
                formData.append("file", image.file);
                formData.append("upload_preset", UPLOAD_PRESET);

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await res.json();
                console.log("Cloudinary response:", data);
                uploadedImages.push(data.url);
            }
            console.log("Uploaded Images:", uploadedImages);
            // 2️⃣ Send product data to backend
            const token = localStorage.getItem("token");

            const data = await http("/auth/createProduct", {
                method: "POST",
                body: {
                    name: form.name,
                    description: form.description,
                    price: form.price,
                    originalPrice: form.originalPrice,
                    category: form.category,
                    quantity: form.quantity,
                    image: uploadedImages,
                    auth: false
                }
            }
            )

            toast.success("Added item to the database")
            resetForm()
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product: " + error.message);
        } finally {
            setLoading(false);

        }
    };


    const removeProduct = id => {
        setInitialProducts(prev => prev.filter(p => p._id !== id));
    };
    if (loading) {
        return <AdminProd />
    }
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LEFT FORM */}
            <div className="xl:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4">Description</h3>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full border rounded p-2 mb-3"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Business description"
                        className="w-full border rounded p-2 h-32"
                    />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4">Category</h3>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select category</option>
                        {initialCategories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4">Inventory</h3>
                    <input
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-full border rounded p-2"
                    />
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4">Product Images</h3>
                    <label className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer block">
                        <input type="file" multiple className="hidden" onChange={handleImages} />
                        Click to upload or drag & drop
                    </label>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {form.images.map((img, i) => (
                            <div key={i} className="relative">
                                <img src={img.preview} className="rounded-lg object-cover h-24 w-full" />
                                <button
                                    onClick={() => removeImage(i)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4">Pricing</h3>
                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border rounded p-2 mb-2"
                    />
                    <input
                        name="originalPrice"
                        value={form.originalPrice}
                        onChange={handleChange}
                        placeholder="Original price"
                        className="w-full border rounded p-2"
                    />
                </div>

                <button
                    onClick={(e) => { if (!Loading) { handleAddProduct(e) } }}
                    className={`w-full bg-purple-600 text-white py-3 rounded-xl gap-3 font-semibold flex items-center justify-center ${Loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    Add Product
                    {Loading && (<div className="spinner size-6"></div>)}
                </button>
            </div>

            {/* PRODUCT LIST */}
            <div className="xl:col-span-3">
                <h3 className="font-semibold mt-6 mb-2">Product List</h3>
                {initialProducts.map(p => (
                    <div key={p._id} className="bg-white p-4 rounded-xl flex justify-between mb-2">
                        <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-sm text-slate-500">₹{p.price}</p>
                        </div>
                        <button onClick={() => removeProduct(p.id)} className="text-red-500">
                            <Trash2 />
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}