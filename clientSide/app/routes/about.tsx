import { Link } from '@remix-run/react';
import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Footer from '~/components/footer';
import Header from '~/components/header';

const About = () => {
  const newDate = new Date().getFullYear();
  
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50  ">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row justify-center items-start gap-8">
        {/* Left: Text Section */}
        <div className=' flex flex-col justify-center items-center px-2 md:flex-col md:justify-center md:items-center lg:justify-start lg:items-start lg:gap-10'>
          <h2 className=" text-4xl font-bold text-amber-900 mb-4">About Me</h2>
          <p className="text-amber-950 lg:text-lg mb-6 lg:leading-loose">
            Welcome to our marquee service – where dreams meet design. We
            specialize in providing luxury marquees for weddings, corporate
            events, parties, and special celebrations. Our team transforms
            venues with elegant décor, lighting, and full-service event support.
            From intimate gatherings to grand occasions, we craft unforgettable
            experiences under beautifully styled canopies.
          </p>
          <Link className='bg-amber-700 text-amber-50 font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition' to={"/contact"}> Contact Us </Link>
          
        </div>

        {/* Right: Profile Image */}
        <div className="flex justify-center items-center self-center">
          <div className="rounded-full flex justify-center items-center w-48 h-48 lg:w-96 lg:h-96 overflow-hidden relative bg-yellow-400">
            <img
              src="/m1.jpg" // 
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex gap-6 text-2xl text-amber-900">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaEnvelope /></a>
      </div>

      <p className="mt-4 text-sm text-amber-950">Contact through Social media {newDate}</p>
    </div>
    <Footer/>
    </>
  );
};

export default About;
