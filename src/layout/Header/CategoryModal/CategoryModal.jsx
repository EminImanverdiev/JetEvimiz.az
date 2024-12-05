import React, { useState, useEffect } from 'react';
import style from './categoryModal.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"

const CategoryModal = ({ closeModal }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {t}= useTranslation()

  useEffect(() => {
    const fetchCategories = async () => {
      try { 
        const response = await fetch(
          'http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=1'
        );
        const result = await response.json();
        console.log('API Yanıtı:', result);
        if (result.isSuccessful) {
          const filteredCategories = result.data.filter(
            (category) => category.parentId === null
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Kateqoriyaları çəkməkdə səhv:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
      );
      const result = await response.json();
      console.log('Seçilen Kategorinin Verileri:', result);
      
      navigate('/CategoryProduct', { state: { products: result.data } });
    } catch (error) {
      console.error('Seçilen kateqoriyanın məlumatlarını çəkməkdə səhv:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.modalCategoryModal}>
      <div className={style.modalContent}>
        <button onClick={closeModal} className={style.modalContent_btn}>X</button>
        <div className={style.modalBody}>
          <div className={style.categories}>
            {categories.map((category) => (
              <div
                key={category.categoryId}
                onMouseEnter={() => setSelectedCategory(category)}
                onClick={() => handleCategoryClick(category.categoryId)}
                className={style.categoryItem}
              >
                <span className={style.categoryIcon}></span>
                {category.categoryTitle}
              </div>
            ))}
          </div>
          <div className={style.products}>
            {selectedCategory ? (
              <ul className={style.products_ul}>
                {selectedCategory.childCategories && selectedCategory.childCategories.length > 0 ? (
                  selectedCategory.childCategories.map((child) => (
                    <li
                      className={style.products_li}
                      key={child.categoryId}
                      onClick={() => handleCategoryClick(child.categoryId)}
                    >
                      {child.categoryTitle} <IoIosArrowForward />
                    </li>
                  ))
                ) : (
                  <p>{t('modalResult')}</p>
                )}
              </ul>
            ) : (
              <p>{t('modalText')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
