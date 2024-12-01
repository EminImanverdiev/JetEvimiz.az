import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import style from "./newProductAdd.module.css";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";

const NewProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingParameters, setLoadingParameters] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");

  const authToken = localStorage.getItem("authToken");

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          "http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=1"
        );
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle category change and fetch parameters
  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    setParameters([]);
    setFormData({});

    if (!categoryId) return;

    setLoadingParameters(true);
    try {
      const response = await fetch(
        `http://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=1&CategoryId=${categoryId}&RequestFrontType=1`
      );
      const data = await response.json();

      const initialFormData = data.data.reduce((acc, parameter) => {
        acc[parameter.parameterKey] = "";
        return acc;
      }, {});

      setParameters(data.data || []);
      setFormData((prevData) => ({ ...prevData, ...initialFormData }));
    } catch (error) {
      console.error("Error loading parameters:", error);
    } finally {
      setLoadingParameters(false);
    }
  };

  // Handle input change for parameters
  const handleInputChange = (event, parameterKey) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [parameterKey]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const imageData = new FormData();
    for (let i = 0; i < files.length; i++) {
      imageData.append("files", files[i]);
    }

    setUploading(true);
    try {
      const response = await fetch(
        "http://restartbaku-001-site3.htempurl.com/api/Product/add-image",
        {
          method: "POST",
          body: imageData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await response.json();
      if (data.isSuccessful) {
        setImages((prev) => [...prev, data.data]);
      } else {
        throw new Error(data.messages.join(", "));
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!productTitle || !selectedCategory || images.length === 0) {
      alert("Bütün sahələri doldurun!");
      return;
    }

    const payload = {
      productTitle,
      categoryId: selectedCategory,
      storeId: null,
      description: description || "2024121",
      images,
      parameters: formData,
    };
    console.log("Göndərilən payload:", payload); 

    try {
      const response = await fetch(
        "http://restartbaku-001-site3.htempurl.com/api/Product/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (data.isSuccessful) {
        alert("Elan uğurla əlavə edildi!");
      } else {
        alert("Xəta baş verdi: " + data.messages.join(", "));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Məhsul əlavə edilərkən xəta baş verdi: " + error.message);

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
              <div className={style.addBox_left_box_top_card}>
                <label>Məhsul adı</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Məhsulun adını daxil edin"
                  className={style.addBox_left_box_top_card_item}
                />
              </div>
              <div className={style.addBox_left_box_top_card}>
                <label>Kateqoriya</label>
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
                        <option
                          value={category.categoryId}
                          disabled
                          className={style.parentCategoryTitle}
                        >
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
              {loadingParameters ? (
                <p>Parametrlər yüklənir...</p>
              ) : parameters.length === 0 ? (
                <p>Bu kateqoriya üçün parametr yoxdur.</p>
              ) : (
                parameters.map((parameter) => (
                  <div
                    key={parameter.parameterKey}
                    className={style.addBox_left_box_top_card}
                  >
                    <label>{parameter.parameterTitle}</label>
                    {parameter.parameterTypeId === 3 ? (
                      <select
                        value={formData[parameter.parameterKey] || ""}
                        onChange={(e) =>
                          handleInputChange(e, parameter.parameterKey)
                        }
                        className={style.addBox_left_box_top_card_item}
                      >
                        <option value="">--Seçin--</option>
                        {parameter.parameterMasks?.map((mask) => (
                          <option
                            key={mask.parameterMaskId}
                            value={mask.parameterMaskData}
                          >
                            {mask.parameterMaskData}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData[parameter.parameterKey] || ""}
                        onChange={(e) =>
                          handleInputChange(e, parameter.parameterKey)
                        }
                        className={style.addBox_left_box_top_card_item}
                        placeholder={parameter.parameterTitle}
                      />
                    )}
                  </div>
                ))
              )}
              <div className={style.addBox_left_box_top_card}>
                <p>Şəkil əlavə et</p>
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
                {uploading && <p>Şəkillər yüklənir...</p>}
              </div>
              <div className={style.addBox_left_box_bottom}>
                <button
                  className={style.addBox_submit_button}
                  onClick={handleSubmit}
                  disabled={uploading}
                >
                  İrəli
                </button>
              </div>
            </div>
            <div className={style.addBox_right}>
              <h3>Elan əlavə etmə qaydaları</h3>
              <ul className={style.rules_list}>
                <li>Kateqoriyanı düzgün seçin.</li>
                <li>Parametrləri dəqiq doldurun.</li>
                <li>Şəkilləri əlavə edərkən keyfiyyətli olmasına diqqət edin.</li>
              </ul>
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
