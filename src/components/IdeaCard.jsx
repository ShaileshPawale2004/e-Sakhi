import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Entrepreneurship.css';

const IdeaCard = ({ idea }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/entrepreneurship/${idea.id}`);
  };

  return (
    <div className="idea-card" onClick={handleClick}>
      <img src={idea.image} alt={idea.title} className="idea-img" />
      <h3 className="idea-title">{idea.title}</h3>
      <p className="idea-income">{idea.income}</p>
    </div>
  );
};

export default IdeaCard;