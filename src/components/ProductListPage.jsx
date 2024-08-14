import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
//import mockData from "../mockData";
import "./ProductListPage.css";
import axios from "axios";

const ProductListPage = () => {
  const [data, setData] = useState([]); //api'dan alınan veri
  const [filter, setFilter] = useState("all"); //eserleri filtrelemek için
  const [searchQuery, setSearchQuery] = useState(""); //arama yapacağız
  const [loading, setLoading] = useState(true); //verimizin yüklenme durumu
  const [error, setError] = useState(null); //hata durumu

  const location = useLocation(); //url konumu
  const searchParams = new URLSearchParams(location.search); //urldeki sorgu parametreleri
  const urlSearchQuery = searchParams.get("search") || ""; //arama sorgusu alindi

  useEffect(() => {
    setSearchQuery(urlSearchQuery.toLowerCase()); //yazilanlar kucuk harf oldu
  }, [urlSearchQuery]);
  useEffect(() => {
    axios
      .get("https://66bc896924da2de7ff6af509.mockapi.io/api/v1/:artworks")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((item) => {
    const matchesFilter =
      filter === "all" || //filtre all ise tum urun gosterilir
      item.subcategory.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.artist.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery) ||
      item.subcategory.toLowerCase().includes(searchQuery);
    //filtreye uygun urunler
    //filtreye ve aramaya uyuyorsa
    return matchesFilter && matchesSearch;
  });
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error:{error.message}</p>;

  return (
    <div className="product-list-page">
      <h1>Works</h1>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        {Array.from(new Set(data.map((item) => item.subcategory))).map(
          (subcategory) => (
            <button key={subcategory} onClick={() => setFilter(subcategory)}>
              {subcategory}
            </button>
          )
        )}
      </div>
      <div className="product-grid">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="product-card" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.imageURL} //API'den alınan resim
                  alt={item.title}
                  className="product-image"
                />
                <h2>{item.title}</h2>
                <p>{item.price} TL</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
