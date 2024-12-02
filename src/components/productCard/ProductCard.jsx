import React, { useState, useEffect } from "react";
import style from "./productCard.module.css";
import { FaHeart } from "react-icons/fa6";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likedProducts, setLikedProducts] = useState([]);
  const [products, setProducts] = useState([]); // Ürünler
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ürünleri API'den çekme
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://restartbaku-001-site3.htempurl.com/api/Product/get-all-products"
        );
        if (!response.ok) {
          throw new Error("Ürünler alınırken hata oluştu.");
        }
        const result = await response.json();
        setProducts(result.data.items || []); // Ürünler için "items"
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Hook sırası her zaman aynı kalacak.

  // Liked ürünleri yerel depolamadan al
  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
  }, []);

  // Favorilere ekle/çıkar
  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      navigate("/login");
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    let updatedLikedProducts;
    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.productId !== productItem.productId
      );
    } else {
      updatedLikedProducts = [...likedProducts, productItem];
    }

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    dispatch(addLikedProduct(productItem));
  };

  // Yüklenme durumlarını kontrol et
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="container">
      <div className={style.productCard_container}>
        {products.map((item) => (
          <div className={style.productCard} key={item.productId}>
            <Link to={`/product-details/${item.productId}`}>
              <div className={style.productCard_imgBox}>
                <img
                  src={item.coverImage}
                  alt={item.productTitle}
                  className={style.productCard_imgBox_img}
                />
                {likedProducts.some(
                  (likedProduct) => likedProduct.productId === item.productId
                ) ? (
                  <BsFillHeartFill
                    className={style.productCard_imgBox_heartIcon_check}
                    onClick={(e) => {
                      e.preventDefault(); // Favori butonunda gezinmeyi engelle
                      toggleLiked(item);
                    }}
                  />
                ) : (
                  <FaHeart
                    className={style.productCard_imgBox_heartIcon}
                    onClick={(e) => {
                      e.preventDefault(); // Favori butonunda gezinmeyi engelle
                      toggleLiked(item);
                    }}
                  />
                )}
                <div className={style.productCard_imgBox_title}>
                  <BsShop /> Mağaza
                </div>
              </div>
              <div className={style.productCard_title}>
                <span className={style.productCard_title_price}>
                  {item.price} AZN
                </span>
                <div className={style.productCard_title_dayBox}>
                  <IoCalendarNumber /> 1 Gün
                </div>
              </div>
              <p className={style.productCard_subTitle}>{item.productTitle}</p>
              <p className={style.productCard_text}>Şehir: {item.city}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
