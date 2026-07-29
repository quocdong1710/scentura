import React, { useState, useEffect } from 'react';

interface InfiniteSliderProps {
  children: React.ReactNode[];
  slidesToShow?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showDots?: boolean;
  fullWidth?: boolean;
}

const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  slidesToShow = 1,
  autoPlay = false,
  autoPlaySpeed = 5000,
  showDots = false,
  fullWidth = false,
}) => {
  const totalOriginal = children.length;
  const clonesAtStart = slidesToShow;
  const clonesAtEnd = slidesToShow;

  const [currentIndex, setCurrentIndex] = useState(clonesAtStart);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [allowInteraction, setAllowInteraction] = useState(true);

  // Extend children with clones
  const extendedSlides = [
    ...children.slice(-clonesAtStart),
    ...children,
    ...children.slice(0, clonesAtEnd),
  ];

  const handleNext = () => {
    if (!allowInteraction) return;
    setAllowInteraction(false);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!allowInteraction) return;
    setAllowInteraction(false);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setAllowInteraction(true);
    // Boundary checks
    if (currentIndex >= totalOriginal + clonesAtStart) {
      setIsTransitioning(false);
      setCurrentIndex(clonesAtStart);
    } else if (currentIndex < clonesAtStart) {
      setIsTransitioning(false);
      setCurrentIndex(totalOriginal + clonesAtStart - 1);
    }
  };

  // Auto scroll effect
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, autoPlaySpeed);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlaySpeed, currentIndex, allowInteraction]);

  const activeRealIndex = (currentIndex - clonesAtStart + totalOriginal) % totalOriginal;

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        overflow: 'hidden',
        ...(fullWidth ? { maxWidth: '100%', borderRadius: '0', boxShadow: 'none', background: 'transparent' } : {})
      }} 
      className="rolls_container"
    >
      <button className="roll_btn prev" onClick={handlePrev} aria-label="Previous">
        &#10094;
      </button>

      <div
        className="rolls"
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: 'flex',
          width: '100%',
          transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }}
      >
        {extendedSlides.map((slide, i) => (
          <div 
            key={i} 
            className="roll" 
            style={{ 
              minWidth: `${100 / slidesToShow}%`,
              flex: `0 0 ${100 / slidesToShow}%`,
              boxSizing: 'border-box'
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      <button className="roll_btn next" onClick={handleNext} aria-label="Next">
        &#10095;
      </button>

      {showDots && (
        <div className="rolls_dots">
          {Array.from({ length: totalOriginal }).map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeRealIndex ? 'active' : ''}`}
              onClick={() => {
                if (!allowInteraction) return;
                setAllowInteraction(false);
                setIsTransitioning(true);
                setCurrentIndex(idx + clonesAtStart);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfiniteSlider;
