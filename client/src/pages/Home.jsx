import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <Header />


      <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        CRUD OPERATION
      </p>
      <Link to='/users' className="btn btn-primary">All Users</Link>
    </div>
  </div>
</div>


      <Footer />
    </>
  );
}

export default Home;
