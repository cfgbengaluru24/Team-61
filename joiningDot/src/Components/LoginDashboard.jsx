import React, { useState, useEffect } from 'react';
import './LoginDashboard.css'
import { useNavigate } from 'react-router-dom';
const LoginDashboard = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([
        { src: 'image1.jpg', alt: 'Image 1' },
        { src: 'image2.jpg', alt: 'Image 2' },
        { src: 'image3.jpg', alt: 'Image 3' },
    ]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [images.length]);


    const handleSignup = () => {
        navigate('/loginpage');
    };

    return <>
        <div class="container">
            <nav className="navbar-logindashboard">
                <div className="navbar-left">
                    <h2>Educate Girls</h2>
                </div>
                <div className="navbar-right">
                    <button className="loginpage-btn">Home</button>
                    <button className="loginpage-btn">About</button>
                    <button className="loginpage-btn">Contact</button>
                </div>
            </nav>

            <div class="container-logindashboard">
                <div className="info-section">
                    <h2>Empowering Underprivileged Girls Through Education</h2>
                    <p>Our mission is to provide access to quality education for girls in underserved communities, breaking the cycle of poverty and empowering them to reach their full potential.</p>
                </div>
                <div className="carousel-section">
                    <div className="carousel">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
                            >
                                <img src={image.src} alt={image.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="cards-section">
                <div className="card">
                    <h3>Card 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
                <div className="card">
                    <h3>Card 2</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
                <div className="card">
                    <h3>Card 3</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
            </div>
        </div>
    </>
}

export default LoginDashboard;