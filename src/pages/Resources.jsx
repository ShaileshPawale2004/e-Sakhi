import React from 'react';
import { FaDownload, FaBook, FaCalendar, FaPalette, FaFileAlt } from 'react-icons/fa';
import '../styles/Resources.css';

const Resources = () => {
  const resources = [
    {
      id: 'study-guide',
      category: 'Study Guides',
      items: [
        {
          title: 'Math Study Guide',
          description: 'Comprehensive guide for basic mathematics',
          format: 'PDF',
          fileSize: '2.5 MB',
          downloadUrl: '/resources/math-study-guide.pdf'
        },
        {
          title: 'Digital Literacy Handbook',
          description: 'Guide to essential computer and internet skills',
          format: 'PDF',
          fileSize: '3.1 MB',
          downloadUrl: '/resources/digital-literacy-guide.pdf'
        }
      ],
      icon: <FaBook />
    },
    {
      id: 'planners',
      category: 'Planners & Schedules',
      items: [
        {
          title: 'Weekly Study Planner',
          description: 'Organize your weekly learning goals',
          format: 'PDF',
          fileSize: '1.2 MB',
          downloadUrl: '/resources/weekly-planner.pdf'
        },
        {
          title: 'Monthly Goal Tracker',
          description: 'Track your monthly learning progress',
          format: 'PDF',
          fileSize: '1.5 MB',
          downloadUrl: '/resources/goal-tracker.pdf'
        }
      ],
      icon: <FaCalendar />
    },
    {
      id: 'posters',
      category: 'Educational Posters',
      items: [
        {
          title: 'Multiplication Table',
          description: 'Colorful multiplication reference chart',
          format: 'PDF',
          fileSize: '4.2 MB',
          downloadUrl: '/resources/multiplication-poster.pdf'
        },
        {
          title: 'Computer Parts Diagram',
          description: 'Visual guide to computer components',
          format: 'PDF',
          fileSize: '3.8 MB',
          downloadUrl: '/resources/computer-parts-poster.pdf'
        }
      ],
      icon: <FaPalette />
    },
    {
      id: 'worksheets',
      category: 'Practice Worksheets',
      items: [
        {
          title: 'Math Practice Set',
          description: 'Basic mathematics practice problems',
          format: 'PDF',
          fileSize: '1.8 MB',
          downloadUrl: '/resources/math-practice.pdf'
        },
        {
          title: 'Digital Skills Exercises',
          description: 'Hands-on computer skills exercises',
          format: 'PDF',
          fileSize: '2.1 MB',
          downloadUrl: '/resources/digital-exercises.pdf'
        }
      ],
      icon: <FaFileAlt />
    }
  ];

  const handleDownload = (resource) => {
    // In a real application, this would trigger the actual file download
    // For now, we'll just show an alert
    alert(`Downloading ${resource.title}...`);
  };

  return (
    <div className="resources-page">
      <div className="resources-content">
        <header className="resources-header">
          <h1>Learning Resources</h1>
          <p>Download helpful guides, planners, and educational materials</p>
        </header>

        <div className="resources-grid">
          {resources.map((category) => (
            <section key={category.id} className="resource-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2>{category.category}</h2>
              </div>
              <div className="resource-items">
                {category.items.map((item, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="resource-meta">
                        <span className="format">{item.format}</span>
                        <span className="size">{item.fileSize}</span>
                      </div>
                    </div>
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(item)}
                    >
                      <FaDownload /> Download
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
