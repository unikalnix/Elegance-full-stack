// Imports
import React, { useState } from 'react'
import './Hero.css'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

// Component Function
const Hero = () => {
  // Declarations
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Functions
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 10 - 5;
    const y = (clientY / window.innerHeight) * 10 - 5;
    setTransform({ x, y });
  };

  // Return Component
  return (
    <section className='hero-container' onMouseMove={handleMouseMove}>
      <div className='hero-content' style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}>
        <h1>Redefine your <span>style</span></h1>
        <p>Discover our new collection that combines timeless elegance with contemporary design. Crafted for those who appreciate quality and style.</p>
        <div className="header-btns">
          <button onClick={() => navigate('/shop')} className='btn'>Shop Now<ArrowRight className='left-arrow' /></button>
          <button className='btn'>Explore Collection</button>
        </div>
      </div>
    </section>
  )
}

export default Hero