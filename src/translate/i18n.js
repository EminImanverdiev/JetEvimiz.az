import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "az",
    resources: {
      az: {
        translation: {
            //header start
          category: "Kategoriya",
          favorite: "Sevimliler",
          support: "Dəstək",
          login: "Daxil ol",
          chooseCity: "Şəhər seçin",
          newAnnouncement: "Yeni Elan",
          filter: "Filter",
          searchInput: "Əşya və ya xidmət axtarışı",
          searchInputResult: "Axtarış nəticəsi yoxdur",
          modalResult: "Bu kateqoriyanın alt kateqoriyası yoxdur.",
          modalText: "Alt kateqoriyaları görmək üçün kateqoriya seçin",
          vipAnnoucment: "VIP ELANLAR",
          allVipAnnoucment: "Butun VIP elanlar",
          myAnnoucment: "Mənim elanlarım",          
          myAccountUpper: "Şəxsi hesabı artır",  
          mySelected: "Seçilmiş olanlar",  
          logOut: "Çıxış",  
          //header Finish
        },
      },
      en: {
        translation: {
            //header start
          category: "Category",
          favorite: "Favorite",
          support: "Support",
          login: "Login",
          chooseCity: "Choose City",
          newAnnouncement: "New Announcement",
          filter: "Filter",
          searchInput: "Search for an item or service",
          searchInputResult: "No search results",
          modalResult: "This category has no subcategories.",
          modalText: "Select a category to see subcategories",
          vipAnnoucment: "VIP ANNOUNCEMENTS",
          allVipAnnoucment: "All VIP ANNOUNCEMENTS",
          myAnnoucment: "My ads",
          myAccountUpper: "Personal account increases",  
          mySelected: "Selected ", 
          logOut: "Log Out", 
          //header Finish
        },
      },
      tr: {
        translation: {
            //header start
          category: "Kategori",
          favorite: "Sevimliler",
          support: "Support",
          chooseCity: "Şehir Seçin",
          login: "Giriş yap",
          newAnnouncement: "Yeni Ilan",
          filter: "Filtre",
          searchInput: "Mal veya hizmet arayın",
          searchInputResult: "Arama sonucu yok",
          modalResult: "Bu kategorinin alt kategorisi yoktur.",
          modalText: "Alt kategorileri görmek için bir kategori seçin",
          vipAnnoucment: "VIP Ilanlar",
          allVipAnnoucment: "Tüm VIP ilanlarim",
          myAnnoucment: "Ilanlarim",
          myAccountUpper: "Kişisel hesap artışları",  
          mySelected: "Seçilmiş olanlar",  
          logOut: "çıkış",  
          //header Finish
        },
      },
      ru: {
        translation: {
            //header start
          category: "Категори",
          favorite: "любимый",
          support: "Поддерживать",
          chooseCity: "Выберите город",
          login: "Авторизоваться",
          newAnnouncement: "Новое объявление",
          filter: "Фильтр",
          searchInput: "Поиск товаров или услуг",
          searchInputResult: "Нет результатов поиска",
          modalResult: "В этой категории нет подкатегорий.",
          modalText: "Выберите категорию, чтобы увидеть подкатегории",
          vipAnnoucment: "VIP ОБЪЯВЛЕНИЯ",
          allVipAnnoucment: "Все VIP объявления",
          myAnnoucment: "Мои объявления",
          myAccountUpper: "Увеличение личного счета ", 
          mySelected: "Избранные",  
          logOut: "выйти из системы",  
          //header Finish
        },
      },
    },
  });

export default i18n;
