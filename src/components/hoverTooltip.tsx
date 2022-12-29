
import React, { CSSProperties } from 'react';
import { useState, useEffect, MutableRefObject } from 'react';
import "./hoverTooltip.css"

interface Props {
  text: string;
  reference: MutableRefObject<HTMLDivElement> | null;
}

export function HoverTooltip({ text, reference }: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showTimer, setShowTimer] = useState<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (!reference) return;

    const onMouseEnter = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      const timer = setTimeout(() => setTooltipVisible(true), 1200);
      setShowTimer(timer);
    };
    const onMouseLeave = () => {
      clearTimeout(showTimer!);
      setTooltipVisible(false);
    };

    reference.current.addEventListener('mouseenter', onMouseEnter);
    reference.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      reference.current.removeEventListener('mouseenter', onMouseEnter);
      reference.current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reference, showTimer]);

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: cursorPosition.x + 20,
    top: cursorPosition.y + 20,
    zIndex: 10000
  }

  // Add check to ensure tooltip is contained within the window
  if (cursorPosition.y + 200 > window.innerHeight) {
    tooltipStyle.top = cursorPosition.y - 200;
  }

  return (
    <div>
      {tooltipVisible && (
        <div
          className="tooltip"
          style={tooltipStyle}
        >
          {text}
        </div>
      )}
    </div>
  );
}