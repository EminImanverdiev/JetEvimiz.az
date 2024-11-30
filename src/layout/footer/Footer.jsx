import React, { useState } from 'react'
import style from "./footer.module.css"
import { FaFacebook,FaPinterest } from "react-icons/fa";
import { FaXTwitter,FaInstagram } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate=useNavigate()

    const[email,setEmail]=useState('')
    const handleClickEmail=(e)=>{
      setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submitted email:", email);
  };
  return (
      <div className={style.footer}>
      <div className={style.footerMain}>
        <div className={style.footerMain_infoBox}>
            <p className={style.footerMain_infoBox_title}>Bizim missiyamız</p>
            <p className={style.footerMain_infoBox_mainText}>Multi-də biz müştərilərimizə bazarda ən yüksək keyfiyyətli məhsul və xidmətlər təqdim etməyə çalışırıq. Məhsullarımızın davamlı olduğunu və xidmətlərimizin gözləntiləri üstələdiyini bilməklə fəxr edirik.</p>
            <em className={style.footerMain_infoBox_mainText}>Bu, nümayiş mağazasıdır. Heç bir sifariş yerinə yetirilməyəcək.</em>
        </div>
        <div className={style.footerMain_Link}>
            <p className={style.footerMain_title}>Mağaza</p>
            <ul className={style.footerMain_Link_ul}>
                <a href="" className={style.footerMain_Link_ul_links} >Laptop</a>
                <a href="" className={style.footerMain_Link_ul_links}>PC</a>
                <a href="" className={style.footerMain_Link_ul_links} >Kompüter hissələri</a>
                <a href="" className={style.footerMain_Link_ul_links}>Qulaqlıq</a>
                <a href="" className={style.footerMain_Link_ul_links}>Aksesuarlar</a>
            </ul>
        </div>
        <div className={style.footerMain_Link}>
            <p className={style.footerMain_title}>Məlumat</p>
            <ul className={style.footerMain_Link_ul}>
                <a href="" className={style.footerMain_Link_ul_links}>Axtar</a>
                <a href="" className={style.footerMain_Link_ul_links}>Əlaqə</a>
                <a href="" className={style.footerMain_Link_ul_links} onClick={()=>navigate('/about')}>Haqqımızda</a>
            </ul>
        </div>
        <div className={style.footerMain_login}>
            <p className={style.footerMain_title}>Xəbər məktubu</p>
            <div className={style.footerMain_login_inputBox}>
            <form onSubmit={handleSubmit} className={style.footerMain_login_inputBox}>
              <input
                type="email"
                value={email}
                required
                onChange={handleClickEmail}
                className={style.footerMain_login_inputBox_input}
                placeholder='Enter your e-mail'
              />
            </form>
            </div>
            <p className={style.footerMain_login_text}>Bülletenimizə qoşulun və ən son tendensiyaları və promosyonları heç vaxt qaçırmayın.</p>
            <div className={style.footerMain_login_contackLogo}>
                <FaFacebook className={style.footerMain_login_contackLogo_icon} href='https://www.facebook.com/shopify'/>
                <FaXTwitter className={style.footerMain_login_contackLogo_icon} href='https://www.twitter.com/shopify/'/>
                <FaPinterest className={style.footerMain_login_contackLogo_icon} href='https://www.pinterest.com/shopify/'/>
                <FaInstagram className={style.footerMain_login_contackLogo_icon} href='https://www.instagram.com/shopify/'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
