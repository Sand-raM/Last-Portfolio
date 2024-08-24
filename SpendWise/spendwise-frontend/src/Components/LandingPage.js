import React from 'react';
import '../Styles/LandingPage.css';
import landingPageImage from '../assets/SpendWise.jpeg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img src="/SpendWise.jpeg" alt="Person using SpendWise app" className="landing-page-image" />
      <div className="landing-page-content">
        <h1>Welcome to SpendWise</h1>
        <p>
          Take control of your finances with SpendWise, the easy-to-use budgeting app that helps you track your expenses, set goals, and achieve financial freedom.
        </p>
        <h2>Key Features</h2>
        <ul className="features-list">
          <li>
            <i className="fas fa-chart-bar"></i>
            Track your income and expenses with ease
          </li>
          <li>
            <i className="fas fa-piggy-bank"></i>
            Set budget goals and achieve financial stability
          </li>
          <li>
            <i className="fas fa-lock"></i>
            Secure and private, with bank-level security
          </li>
          <li>
            <i className="fas fa-mobile-alt"></i>
            Access your account anywhere, anytime
          </li>
        </ul>
        <div className="button-container">
          <a href="/login" className="primary-button">Login</a>
          <a href="/signup" className="secondary-button">Sign Up for Free</a>
        </div>
        <p className="testimonial">
          "SpendWise has been a game-changer for my finances. I finally have control over my spending and can achieve my financial goals." - Emily R.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
