import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit,setLimit] = useState(10); // Number of items per page
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    setLoading(true);
    const skip = (page - 1) * limit;
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleLimitChange=(e)=>{
setLimit(Number(e.target.value));
setCurrentPage(1);
  }

  return (
    <div>
      <h2>Products Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div style={{marginBottom:'10px',textAlign:"center",marginBottom:'10px',padding:'20px'}}>
          <label htmlFor="limit">Items per page</label>
          <select id="limit" value={limit} onChange={handleLimitChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          </div>
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Thumbnail</th>
                <th>rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.thumbnail}</td>
                  <td>{product.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            Total Products: {total}
          </p>
        </>
      )}
    </div>
  );
};

export default App;