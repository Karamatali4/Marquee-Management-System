import { Link } from '@remix-run/react';
import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Footer from '~/components/footer';
import Header from '~/components/header';

const About = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50  ">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Section */}
        <div className=' flex md:flex-col md:justify-center md:items-center lg:justify-start lg:items-start'>
          <h2 className=" text-4xl font-bold text-gray-900 mb-4">About me</h2>
          <p className="text-gray-600 text-lg mb-6">
            Welcome to our marquee service – where dreams meet design. We
            specialize in providing luxury marquees for weddings, corporate
            events, parties, and special celebrations. Our team transforms
            venues with elegant décor, lighting, and full-service event support.
            From intimate gatherings to grand occasions, we craft unforgettable
            experiences under beautifully styled canopies.
          </p>
          <Link className='bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition' to={"/contact"}> Contact Us </Link>
          
        </div>

        {/* Right: Profile Image */}
        <div className="flex justify-center">
          <div className="rounded-full w-72 h-72 overflow-hidden relative bg-yellow-400">
            <img
              src="/m1.jpg" // Replace with your local or hosted image path
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex gap-6 text-2xl text-gray-800">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaEnvelope /></a>
      </div>

      <p className="mt-4 text-sm text-gray-500">Madelyn Torff 2021</p>
    </div>
    <Footer/>
    </>
  );
};

export default About;
