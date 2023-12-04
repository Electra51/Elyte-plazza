import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-black text-white">
        <aside>
          <Link
            to="/"
            className="normal-case text-2xl font-bold flex justify-center items-center"
          >
            <img
              src="https://i.ibb.co/Q8vpRcM/Capture-removebg-preview.png"
              alt="Capture-removebg-preview"
              width={70}
            />
            Elyte Plazza
          </Link>
          <div className="flex justify-center items-center gap-3 text-2xl max-w-3xl mx-auto pl-6">
            <FaFacebook className="text-xl hover:text-blue-500" />
            <FaInstagram className="text-xl hover:text-blue-500" />
            <FaTwitter className="text-xl hover:text-blue-500" />
            <FaLinkedin className="text-xl hover:text-blue-500" />
          </div>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className="text-center bg-black text-white">
        {" "}
        <p className="py-3 text-[13px]">
          Copyright © 2023 - All right reserved by Elyte Plazza
        </p>
      </div>
    </div>
  );
};

export default Footer;
