import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/Header/Header";
import { FaPhoneAlt, FaHeart, FaFlag } from "react-icons/fa";
import { MdDiamond, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detailPage.module.css";

const DetailPage = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://restartbaku-001-site3.htempurl.com/api/Product/get-product?LanguageCode=az&Slug=${slug}`
        );
        if (!response.ok) {
          throw new Error("Məhsul məlumatı alınarkən xəta baş verdi.");
        }
        const result = await response.json();
        setProduct(result.data || {});
        setMainImage(result.data.coverImage || null);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleImageClick = (newImage) => {
    setMainImage(newImage);
  };

  const toggleComplaintBox = () => {
    setOpenComplaintBox((prev) => !prev);
  };

  return (
    <div className={style.detailPage}>
      <Header />
      <div className="container">
        <p
          className={style.detailPage_goBack}
          onClick={() => navigate(-1)}
        >
          <MdOutlineKeyboardArrowLeft /> Geri qayıt
        </p>
        <div className={style.detailPage_main}>
          <div className={style.detailPage_main_head}>
            <div className={style.detailPage_main_head_left}>
              <div className={style.detailPage_main_head_left_mainImgBox}>
                <img
                  src={mainImage || product.coverImage}
                  alt="Məhsul"
                  className={style.detailPage_main_head_left_mainImgBox_img}
                />
              </div>
              <div className={style.detailPage_main_head_left_slideImgBox}>
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className={style.detailPage_main_head_left_slideImgBox_img}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
              </div>
            </div>
            <div className={style.detailPage_main_head_right}>
              <h4 className={style.detailPage_main_head_right_humanName}>
                {product.title || "Unknown Seller"}
              </h4>
              <p className={style.detailPage_main_head_right_phone}>
                <FaPhoneAlt className={style.detailPage_main_head_right_phone_icon} /> 
                {product.phone || "0504002200"} 
              </p>
              <button className={style.detailPage_main_head_right_btn}>
                <MdDiamond /> Elanı VIP et
              </button>
              <p className={style.detailPage_main_head_right_otherSale}>
                Satıcının bütün elanlarını gör
              </p>
            </div>
          </div>
          <div className={style.detailPage_main_bottom}>
            {/* Əlavə detalları burada göstərmək olar */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
