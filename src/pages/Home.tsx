import React from 'react';
import './Home.css';

const cardData = [
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'primary' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'secondary' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'tertiary' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'success' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'warning' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'danger' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'light' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'medium' },
  { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Card Content', color: 'dark' },
];

const Home: React.FC = () => {
  return (
    <div className="home-grid">
      {cardData.map((card, index) => (
        <div key={index} className={`custom-card ${card.color}`}>
          <h5 className="card-subtitle">{card.subtitle.toUpperCase()}</h5>
          <h2 className="card-title">{card.title}</h2>
          <p className="card-content">{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
