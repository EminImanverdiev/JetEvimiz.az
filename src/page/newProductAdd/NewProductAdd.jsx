import React, { useState, useEffect } from 'react';
import Footer from '../../layout/footer/Footer';
import FooterResponsive from '../../layout/footer_responsive/FooterResponsive';
import style from "./newProductAdd.module.css";
import HeaderTop from '../../layout/Header/HeaderTop/HeaderTop';

const NewProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          'http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=1'
        );
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Kategori yüklenirken hata oluştu:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    setUploading(true);

    try {
      const response = await fetch(
        'http://restartbaku-001-site3.htempurl.com/api/Product/add-image',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Serverdən uğursuz cavab alındı');
      }

      const data = await response.json();

      if (data.isSuccessful) {
        console.log("Yüklənmiş şəkillər:", data.data);
        setImages((prev) => [...prev, data.data]);
      } else {
        throw new Error(data.messages.join(', '));
      }
    } catch (error) {
      console.error("Yükləmə zamanı xəta baş verdi:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={style.addBox_main_container}>
      <HeaderTop />
      <div className="container">
        <div className={style.addBox_container}>
          <p className={style.addBox_title}>Yeni elan</p>
          <div className={style.addBox}>
            <div className={style.addBox_left}>
              {/* Kateqoriya Seçimi */}
              <div className={style.addBox_left_box_top_card}>
                Kateqoriya
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className={style.addBox_left_box_top_card_item}
                  disabled={loadingCategories}
                >
                  <option value="">--Kateqoriya seçin--</option>
                  {loadingCategories ? (
                    <option disabled>Yüklənir...</option>
                  ) : (
                    categories.map((category) => (
                      <React.Fragment key={category.categoryId}>
                        <option value={category.categoryId} className={style.parentCategoryTitle} disabled>
                          {category.categoryTitle}
                        </option>
                        {category.childCategories?.map((child) => (
                          <option key={child.categoryId} value={child.categoryId}>
                            -- {child.categoryTitle}
                          </option>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </select>
              </div>

              {/* Şəkil Yükləmə */}
              <div className={style.addBox_left_box_top_card}>
                <p>Şəkil əlavə et</p>
                <div className={style.addBox_image_upload_container}>
                  <label className={style.addBox_image_add}>
                    +
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className={style.addBox_image_input}
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
                {uploading && <p>Şəkillər yüklənir...</p>}
                <div className={style.addBox_uploaded_images}>
                  {images.map((image, index) => (
                    <img key={index} src={image} alt={`Uploaded ${index + 1}`} className={style.uploaded_image} />
                  ))}
                </div>
              </div>
              {/* Digər hissələr */}
              <div className={style.addBox_left_box_main}>
                <p className={style.addBox_left_box_main_title}>
                  Əlaqə məlumatları
                </p>
                <div className={style.addBox_left_box_main_card}>
                  Adınız
                  <input
                    type="text"
                    className={style.addBox_left_box_top_card_item}
                  />
                </div>
                <div className={style.addBox_left_box_main_card}>
                  E-mail
                  <input
                    type="email"
                    className={style.addBox_left_box_top_card_item}
                  />
                </div>
                <div className={style.addBox_left_box_main_card}>
                  Mobil nömrə
                  <input
                    type="tel"
                    className={style.addBox_left_box_top_card_item}
                  />
                </div>
              </div>
              <div className={style.addBox_left_box_bottom}>
                <button className={style.addBox_left_box_bottom_btn}>Elanı əlavə et</button>
              </div>
            </div>
            <div className={style.addBox_right}>
              <p className={style.addBox_right_title}>JetEvimiz-ın sadə qaydaları</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default NewProductAdd;
