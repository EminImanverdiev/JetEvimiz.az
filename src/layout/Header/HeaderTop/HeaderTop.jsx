import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRegHeart } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import style from "../header.module.css";
import HeaderProfileCard from "../headerProfileCard/HeaderProfileCard";

export default function HeaderTop() {
  const navigate = useNavigate();
  const cities = ["Az", "Rus", "En"];
  const [selectedCity, setSelectedCity] = useState("Az");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileCardOpen, setProfileCardOpen] = useState(false);
  const profileCardRef = useRef(null);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const openProfileCard = () => setProfileCardOpen(true);
  const closeProfileCard = () => setProfileCardOpen(false);

  const handleLoginClick = () => {
    if (user) {
      if (isProfileCardOpen) {
        closeProfileCard();
      } else {
        openProfileCard();
      }
    } else {
      navigate("/login");
    }
  };

  const handleLikedPageClick = () => {
    if (user) {
      navigate("/likedPage");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUser({ username: savedUserName });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        closeProfileCard();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={style.headerTop}>
      <div className="container">
        <div className={style.headerTop_container}>
          <div className={style.headerTop_container_left}>
            <div className={style.contactNum}>
              <p>Destek: (077) 613-59-59</p>
              <div className={style.contactNum_box}><FaInstagram/>JetEvim.az</div>
            </div>
          </div>
          <div className={style.headerTop_container_right}>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className={style.headerTop_container_right_langBox}
            >
              {cities.map((city, index) => (
                <option
                  className={style.headerTop_container_right_langBox_item}
                  key={index}
                  value={city}
                >
                  {city}
                </option>
              ))}
            </select>
            <a
              className={style.headerTop_container_right_item}
              onClick={handleLikedPageClick}
            >
              <FaRegHeart className={style.headerTop_container_right_icon} />
              <span>Sevimlilər</span>
            </a>
            <a
              className={style.headerTop_container_right_item}
              onClick={handleLoginClick}
            >
              <FaUser className={style.headerTop_container_right_icon} />
              <span>
                {loading ? "Yüklenir..." : user ? <IoIosArrowDown /> : "Giriş"}
              </span>
            </a>
          </div>
        </div>
      </div>
      {isProfileCardOpen && (
        <div
          ref={profileCardRef}
          onClick={(e) => e.stopPropagation()} 
        >
          <HeaderProfileCard />
        </div>
      )}
    </div>
  );
}
