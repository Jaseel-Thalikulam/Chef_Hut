import "../styles/Login.css";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
function LoginPage() {
  const [isLogin,setIsLogin] =useState(true)

  useEffect(() => {
    if (window.innerWidth > 426) {
      let tl = gsap.timeline();

      tl.from('.right--content--container', {duration:1, x:'100%', ease:'back.in'})
        .from('.header', {duration:1, opacity:0});
  }
},[isLogin])
  return (
    <>
      <div className="container">
        <div className="left--container">
          <div className="img--container" /> 
        </div>
        <div className="right--container"> 
          <div className="right--content--container"> 
            
          {isLogin ? <Login setIsLogin={setIsLogin}/> : <Register setIsLogin={setIsLogin}/>}

          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;


