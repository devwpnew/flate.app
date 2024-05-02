import { useState, useEffect } from 'react';

const useDynamicWidth = (maxWidthValue = 300, duration = 2000, depth = []) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let animationStartTime;
    let animationFrameId;

    const increaseWidth = (timestamp) => {
      if (!animationStartTime) {
        animationStartTime = timestamp;
      }

      const elapsedTime = timestamp - animationStartTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newWidth = progress * maxWidthValue;

      setWidth(newWidth);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(increaseWidth);
      }
    };

    animationFrameId = requestAnimationFrame(increaseWidth);

    return () => {
      // Clear the animation frame when the component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxWidthValue, duration, ...depth]);

  return width;
};

export default useDynamicWidth;
