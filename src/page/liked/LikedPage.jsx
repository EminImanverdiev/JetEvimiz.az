import React, { useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/footer/Footer";
import style from "./likedPage.module.css";
import { FaHeart } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import data from "../../data.json"; // Eğer ürünler API'den geliyorsa burayı düzenleyin
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next";

const LikedPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [likedProducts, setLikedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
  }, []);


  const toggleLiked = (productItem) => {
    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.id === productItem.id
    );
    const updatedLikedProducts = isLiked
      ? likedProducts.filter(
          (likedProduct) => likedProduct.id !== productItem.id
        )
      : [...likedProducts, productItem];

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    dispatch(addLikedProduct(productItem));
  };

  const filteredProducts = data.filter((product) =>
    likedProducts.some((likedProduct) => likedProduct.id === product.id)
  );

  return (
    <div>
      <div className={style.likedPage}>
        <Header />
        <div className="container">
          <p
            className={style.productCard_goBack}
            onClick={() => navigate(-1)}
          >
            <MdOutlineKeyboardArrowLeft /> {t("goBack")}
          </p>
          <div className={style.productCard_container}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div className={style.productCard} key={item.id}>
                  <div className={style.productCard_imgBox}>
                    <img
                      src={item.thumbnail}
                      alt=""
                      className={style.productCard_imgBox_img}
                    />
                    <FaHeart
                      className={
                        likedProducts.some(
                          (likedProduct) => likedProduct.id === item.id
                        )
                          ? style.productCard_imgBox_heartIcon_active
                          : style.productCard_imgBox_heartIcon
                      }
                      onClick={() => toggleLiked(item)}
                    />
                    <div className={style.productCard_imgBox_title}>
                      <BsShop /> {t("likedPageStoreText")}
                    </div>
                  </div>
                  <Link to={`/product-details/${item.id}`}>
                    <div className={style.productCard_title}>
                      <span className={style.productCard_title_pirce}>
                        {item.price} AZN
                      </span>
                      <div className={style.productCard_title_dayBox}>
                        <IoCalendarNumber /> 1 Gün
                      </div>
                    </div>
                    <p className={style.productCard_subTitle}>{item.title}</p>
                    <p className={style.productCard_text}>Baki</p>
                  </Link>
                </div>
              ))
            ) : (
              <p className={style.noLikedItems}>{t("likedPageNotProduct")}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default LikedPage;