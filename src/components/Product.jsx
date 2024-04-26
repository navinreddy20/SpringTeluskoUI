import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axois";
import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { id } = useParams();
  const { data } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
          console.log(response.data.imageName);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
      console.log(response.data);
    };

    fetchProduct();
  }, [id]);

  console.log("URL Parameter ID:", id);
  // console.log("Product Data:", data);

  

  const deleteProduct =  () => {
    try {
       axios.delete(`http://localhost:8080/api/product/${id}`);
      navigate("/"); // Redirect to a different route after successful deletion
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response) {
        // Error if i am getting it from backend
        console.error("Backend error:", error.response.data);
        alert("Failed to delete product. Backend error.");
      } else if (error.request) {
        // error if network errors
        console.error("Network error:", error.request);
        alert("Failed to delete product. Network error.");
      } else {
        // error if Handle other errors
        console.error("Other error:", error.message);
        alert("Failed to delete product. Please try again.");
      }
    }
  };
  
  const handleEditClick = () => {
    navigate(`/product/update/${id}`); 
  };

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="containers">
        {/* <div className="left-column-img"> */}
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
        />

        {/* </div> */}
        <div className="right-column">
          <div className="product-description">
            <span>{product.category}</span>
            <h1>{product.name}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-price">
            <span>{"$" + product.price}</span>
            <a href="#" className="cart-btn">
              Add to cart
            </a>
            <h6>
              Stock Available :{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
            <p className="release-date">
              <h6>Product listed on:</h6>
              <i> {new Date(product.releaseDate).toLocaleDateString()}</i>
            </p>
          </div>
          <div className="update-button ">
            <button className="btn btn-primary" type="button"  onClick={handleEditClick}>
              Update
            </button> 
            {/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteProduct}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
