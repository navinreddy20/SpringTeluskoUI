import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

const Home = () => {
  const { data, isError } = useContext(AppContext);
  console.log(data);
  if (isError) {
    return <h2 className="text-center " style={{padding: "10rem"}}>Loading...</h2>;
  } 


  return (
    <>
      {isError && <h2>{isError}</h2>}
      

      <div className="grid">
        {data&&data.map((curProduct) => {
          const { id, brand, name, price, productAvailable } = curProduct;
          const cardStyle = {
            width: "18rem",
            height: "12rem",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
            backgroundColor: productAvailable ? "#fff" : "#ccc", 
          };
          return (
            <div
              className="card mb-3"
              style={{
                width: "18rem",
                height: "12rem",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
              }}
              key={id}
            >
              <div className="card-body" style={{ position: "relative" }}>
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="card-title mb-0">
                    {curProduct.name.toUpperCase()}
                  </h5>
                  <div
                    className="card-description"
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      width: "100%",
                    }}
                  >
                    <i className="card-brand">{"~ " + curProduct.brand}</i>
                    <h5 className="card-text mb-0 " style={{ fontWeight: "600" }}>
                      {"$" + curProduct.price}
                    </h5>
                  </div>
                  <div className="card-button-container">
                    <a
                      href="#"
                      className="btn btn-primary"
                      style={{ position: "absolute", bottom: "0"  }}
                    >
                      Add to Cart
                    </a>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
