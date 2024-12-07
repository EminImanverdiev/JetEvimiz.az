import React, { useState, useEffect } from 'react';
import style from './categoryModal.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

 const CategoryModal = ({ closeModal, isOpen }) => {
 const [categories, setCategories] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState(null);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const { t } = useTranslation();

  const fetchCategories = async () => {
    setLoading(true); // Yüklənmə vəziyyətini göstər
    try {
      const response = await fetch(
        'http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az'
      );
      const result = await response.json();
      if (result.isSuccessful) {
        const filteredCategories = result.data.filter(
          (category) => category.parentId === null
        );
        setCategories(filteredCategories);
      }
    } catch (error) {
      console.error('Kateqoriyaları çəkməkdə səhv:', error);
    } finally {
      setLoading(false); // Yüklənmə bitdi
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories(); // Modal açıldığında məlumatları yenidən çək
    }
    return () => {
      setCategories([]); // Modal bağlanarkən state təmizlənir
      setSelectedCategory(null);
    };
  }, [isOpen]);

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
      );
      const result = await response.json();
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
        <button
          onClick={() => {
            closeModal();
            setCategories([]); // Modal bağlananda təmizlə
            setSelectedCategory(null);
          }}
          className={style.modalContent_btn}
        >
          X
        </button>
        <div className={style.modalBody}>
          {loading ? (
            <p>{t('loading')}</p>
          ) : (
            <>
              <div className={style.categories}>
                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    onMouseEnter={() => setSelectedCategory(category)}
                    onClick={() => handleCategoryClick(category.categoryId)}
                    className={style.categoryItem}
                  >
                    {category.categoryTitle}
                  </div>
                ))}
              </div>
              <div className={style.products}>
                {selectedCategory ? (
                  <ul className={style.products_ul}>
                    {selectedCategory.childCategories?.length > 0 ? (
                      selectedCategory.childCategories.map((child) => (
                        <li
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
