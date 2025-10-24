import { motion, useInView } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const ThoughtRadial: React.FC = () => {
  const markerCount = 5;
  const tinyMarkerCount = markerCount * 15;
  const circleRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const markersRef = React.useRef<HTMLDivElement[]>([]);
  const tinyMarkersRef = React.useRef<HTMLDivElement[]>([]);
  const labelsRef = React.useRef<HTMLDivElement[]>([]);
  const mouseAngleRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number>();
  const currentScalesRef = React.useRef<number[]>(
    new Array(markerCount).fill(1),
  );
  const currentTinyScalesRef = React.useRef<number[]>(
    new Array(tinyMarkerCount).fill(1),
  );

  const [zoomedMarker, setZoomedMarker] = React.useState<number | null>(null);
  const currentZoomRef = React.useRef<number>(1);
  const currentRotationRef = React.useRef<number>(0);
  const currentGapMultiplierRef = React.useRef<number>(1);
  const currentTranslateYRef = React.useRef<number>(0);

  // Custom content for each marker
  const markerContent = [
    { title: "the spark", description: "description" },
    { title: "the process", description: "in my mind" },
    { title: "the inner-workings", description: "processing" },
    { title: "the peace", description: "finally" },
    {
      title: "Enter, Thought",
      description:
        "The thought of action, comes from memories, from your mind's crave for more.",
    },
  ];

  // In-view detection
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Calculate coordinates for unit circle
  const getCoordinates = (angleDegrees: number) => {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const x = Math.cos(angleRadians);
    const y = Math.sin(angleRadians);
    return { x, y };
  };

  // Get angle labels (degrees and radians)
  const getAngleLabel = (angleDegrees: number) => {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const piMultiple = angleRadians / Math.PI;

    let radianLabel = "";
    if (Math.abs(piMultiple) < 0.001) radianLabel = "0";
    else if (Math.abs(piMultiple - 0.5) < 0.001) radianLabel = "π/2";
    else if (Math.abs(piMultiple - 1) < 0.001) radianLabel = "π";
    else if (Math.abs(piMultiple - 1.5) < 0.001) radianLabel = "3π/2";
    else if (Math.abs(piMultiple - 2) < 0.001) radianLabel = "2π";
    else if (Math.abs(piMultiple - 1 / 6) < 0.001) radianLabel = "π/6";
    else if (Math.abs(piMultiple - 1 / 4) < 0.001) radianLabel = "π/4";
    else if (Math.abs(piMultiple - 1 / 3) < 0.001) radianLabel = "π/3";
    else if (Math.abs(piMultiple - 2 / 3) < 0.001) radianLabel = "2π/3";
    else if (Math.abs(piMultiple - 3 / 4) < 0.001) radianLabel = "3π/4";
    else if (Math.abs(piMultiple - 5 / 6) < 0.001) radianLabel = "5π/6";
    else if (Math.abs(piMultiple - 7 / 6) < 0.001) radianLabel = "7π/6";
    else if (Math.abs(piMultiple - 5 / 4) < 0.001) radianLabel = "5π/4";
    else if (Math.abs(piMultiple - 4 / 3) < 0.001) radianLabel = "4π/3";
    else if (Math.abs(piMultiple - 5 / 3) < 0.001) radianLabel = "5π/3";
    else if (Math.abs(piMultiple - 7 / 4) < 0.001) radianLabel = "7π/4";
    else if (Math.abs(piMultiple - 11 / 6) < 0.001) radianLabel = "11π/6";

    return { degrees: `${angleDegrees}°`, radians: radianLabel };
  };

  // Smooth lerp function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Normalize angle to shortest rotation path
  const normalizeRotation = (current: number, target: number) => {
    let diff = target - current;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return current + diff;
  };

  const handleMarkerClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomedMarker === index) {
      setZoomedMarker(null);
    } else {
      setZoomedMarker(index);
    }
  };

  const updateMarkers = React.useCallback(() => {
    const mouseAngle = mouseAngleRef.current;
    const lerpFactor = 0.15;

    // Calculate zoom, rotation, and translation
    let targetZoom = 1;
    let targetRotation = 0;
    let targetGapMultiplier = 1;
    let targetTranslateY = 0;

    if (zoomedMarker !== null) {
      targetZoom = 2;
      targetGapMultiplier = 8;
      targetTranslateY = 300;

      const markerAngle = (zoomedMarker * 360) / markerCount;
      targetRotation = -markerAngle;
    }

    currentZoomRef.current = lerp(
      currentZoomRef.current,
      targetZoom,
      lerpFactor,
    );

    currentGapMultiplierRef.current = lerp(
      currentGapMultiplierRef.current,
      targetGapMultiplier,
      lerpFactor,
    );

    currentTranslateYRef.current = lerp(
      currentTranslateYRef.current,
      targetTranslateY,
      lerpFactor,
    );

    const normalizedTarget = normalizeRotation(
      currentRotationRef.current,
      targetRotation,
    );
    currentRotationRef.current = lerp(
      currentRotationRef.current,
      normalizedTarget,
      lerpFactor,
    );

    if (circleRef.current) {
      circleRef.current.style.transform = `translateY(${currentTranslateYRef.current}px) rotate(${currentRotationRef.current}deg) scale(${currentZoomRef.current})`;
    }

    markersRef.current.forEach((marker, i) => {
      if (!marker) return;

      const markerAngle = (i * 360) / markerCount;
      let targetScale = 1;

      if (zoomedMarker === null && mouseAngle !== null) {
        let angleDiff = Math.abs(mouseAngle - markerAngle);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        if (angleDiff <= 60) {
          const normalizedDist = angleDiff / 60;
          const eased = 1 - normalizedDist * normalizedDist;
          targetScale = 1 + 2 * eased;
        }
      } else if (zoomedMarker !== null) {
        targetScale = 0;
      }

      currentScalesRef.current[i] = lerp(
        currentScalesRef.current[i],
        targetScale,
        lerpFactor,
      );
      const scale = currentScalesRef.current[i];

      const width = 1.5 * scale;
      const height = 30 * scale;
      const top = -15 * scale;
      const brightness = 1 + (scale - 1) * 0.4;

      marker.style.width = `${width}px`;
      marker.style.height = `${height}px`;
      marker.style.top = `${top}px`;
      marker.style.transformOrigin = `50% ${300 + 15 * scale}px`;
      marker.style.filter = `brightness(${brightness})`;
      marker.style.opacity = `${scale < 0.01 ? 0 : 1}`;
      marker.style.pointerEvents = zoomedMarker !== null ? "none" : "auto";
    });

    tinyMarkersRef.current.forEach((marker, i) => {
      if (!marker) return;

      const tinyAngle = (i * 360) / tinyMarkerCount;
      let targetScale = 1;

      if (zoomedMarker === null && mouseAngle !== null) {
        let angleDiff = Math.abs(mouseAngle - tinyAngle);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        if (angleDiff <= 50) {
          const normalizedDist = angleDiff / 50;
          const eased = 1 - normalizedDist * normalizedDist;
          targetScale = 1 + 1.8 * eased;
        }
      } else if (zoomedMarker !== null) {
        const zoomedAngle = (zoomedMarker * 360) / markerCount;
        let angleDiff = Math.abs(tinyAngle - zoomedAngle);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        const markerSpacing = 360 / markerCount;
        const markerDistance = angleDiff / markerSpacing;

        if (markerDistance <= 5) {
          targetScale = 1.5;
        } else {
          targetScale = 0.3;
        }
      }

      currentTinyScalesRef.current[i] = lerp(
        currentTinyScalesRef.current[i],
        targetScale,
        lerpFactor,
      );
      const scale = currentTinyScalesRef.current[i];

      let adjustedAngle = tinyAngle;
      if (zoomedMarker !== null) {
        const zoomedAngle = (zoomedMarker * 360) / markerCount;
        let angleOffset = tinyAngle - zoomedAngle;
        if (angleOffset > 180) angleOffset -= 360;
        if (angleOffset < -180) angleOffset += 360;

        const markerSpacing = 360 / markerCount;
        const markerDistance = Math.abs(angleOffset) / markerSpacing;

        if (markerDistance <= 5) {
          adjustedAngle =
            zoomedAngle + angleOffset * currentGapMultiplierRef.current;
        }
      }

      const width = 1 * scale;
      const height = 10 * scale;
      const top = -5 * scale;
      const opacity = 0.6 + (scale - 1) * 0.2;

      marker.style.width = `${width}px`;
      marker.style.height = `${height}px`;
      marker.style.top = `${top}px`;
      marker.style.transform = `translateX(-50%) rotate(${adjustedAngle}deg)`;
      marker.style.transformOrigin = `50% ${300 + 5 * scale}px`;
      marker.style.opacity = `${Math.min(0.9, opacity)}`;
    });

    labelsRef.current.forEach((label, i) => {
      if (!label) return;

      if (zoomedMarker !== null) {
        label.style.opacity = "0";
      } else {
        label.style.opacity = "1";
        const labelAngle = (i * 360) / markerCount;
        label.style.transform = `rotate(${labelAngle}deg) translateY(-370px) rotate(-${labelAngle}deg)`;
      }
    });

    rafRef.current = requestAnimationFrame(updateMarkers);
  }, [markerCount, tinyMarkerCount, zoomedMarker]);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!circleRef.current || zoomedMarker !== null) return;

      const rect = circleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      let degrees = (angle * 180) / Math.PI + 90;
      if (degrees < 0) degrees += 360;

      mouseAngleRef.current = degrees;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateMarkers);
      }
    },
    [updateMarkers, zoomedMarker],
  );

  const handleMouseLeave = React.useCallback(() => {
    mouseAngleRef.current = null;
  }, []);

  React.useEffect(() => {
    rafRef.current = requestAnimationFrame(updateMarkers);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMarkers]);

  // Get current content based on selected marker
  const currentContent =
    zoomedMarker !== null
      ? markerContent[zoomedMarker]
      : {
          title: "Enter, Thought",
          description:
            "The thought of action, comes from memories, from your mind's crave for more.",
        };

  return (
    <Container ref={containerRef}>
      <StickyWrapper>
        <CenteredContent
          onClick={() => zoomedMarker !== null && setZoomedMarker(null)}
        >
          <ContentContainer
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <StyledThoughtHeader>{currentContent.title}</StyledThoughtHeader>
            <StyledThoughtDescription>
              {currentContent.description}
            </StyledThoughtDescription>
          </ContentContainer>

          <StyledCircle
            ref={circleRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          >
            {Array.from({ length: markerCount }, (_, i) => {
              const angleDegrees = (i * 360) / markerCount;
              const labels = getAngleLabel(angleDegrees);

              return (
                <React.Fragment key={`main-${i}`}>
                  <RadialMarker
                    ref={(el) => {
                      if (el) markersRef.current[i] = el;
                    }}
                    index={i}
                    total={markerCount}
                    onClick={(e) => handleMarkerClick(i, e)}
                  />
                  <MarkerLabel
                    ref={(el) => {
                      if (el) labelsRef.current[i] = el;
                    }}
                    index={i}
                    total={markerCount}
                  >
                    <div className="title">{markerContent[i].title}</div>
                    <div className="degrees">{labels.degrees}</div>
                  </MarkerLabel>
                </React.Fragment>
              );
            })}
            {Array.from({ length: tinyMarkerCount }, (_, i) => {
              const skipIndex = i % 15 === 0;
              if (skipIndex) return null;

              return (
                <TinyMarker
                  ref={(el) => {
                    if (el) tinyMarkersRef.current[i] = el;
                  }}
                  key={`tiny-${i}`}
                  index={i}
                  total={tinyMarkerCount}
                />
              );
            })}
          </StyledCircle>
        </CenteredContent>
      </StickyWrapper>
    </Container>
  );
};

export default ThoughtRadial;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenteredContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledCircle = styled(motion.div)`
  min-width: 600px;
  min-height: 600px;
  border-radius: 50%;
  position: relative;
  transform-origin: center center;
`;

const RadialMarker = styled.div<{
  index: number;
  total: number;
}>`
  position: absolute;
  width: 1.5px;
  height: 30px;
  background-color: #0d0d0d;
  top: -15px;
  left: 50%;
  transform-origin: 50% 315px;
  transform: translateX(-50%)
    rotate(${(props) => (props.index * 360) / props.total}deg);
  will-change: width, height, top, transform-origin, filter, opacity;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    filter: brightness(1.5) !important;
  }
`;

const TinyMarker = styled.div<{ index: number; total: number }>`
  position: absolute;
  width: 1px;
  height: 8px;
  background-color: #555;
  opacity: 0.4;
  top: -4px;
  left: 50%;
  transform-origin: 50% 304px;
  transform: translateX(-50%)
    rotate(${(props) => (props.index * 360) / props.total}deg);
  will-change: width, height, top, opacity, transform, transform-origin;
  pointer-events: none;
`;

const MarkerLabel = styled.div<{ index: number; total: number }>`
  position: absolute;
  top: 50%;
  left: 45%;
  transform-origin: 0 0;
  transform: rotate(${(props) => (props.index * 360) / props.total}deg)
    translateY(-370px)
    rotate(-${(props) => (props.index * 360) / props.total}deg);
  font-size: 11px;
  text-align: center;
  pointer-events: none;
  color: #333;
  white-space: nowrap;
  transition: opacity 0.3s ease;

  .title {
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 11px;
  }

  .radians {
    font-style: italic;
    margin-bottom: 1px;
    color: #666;
  }

  .degrees {
    color: #999;
    font-size: 9px;
  }
`;

const ContentContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
`;

const StyledThoughtHeader = styled.div`
  font-size: 2.5rem;
  font-weight: 450;
`;

const StyledThoughtDescription = styled.div`
  font-size: 1.5rem;
  font-weight: 410;
  color: #555;
  max-width: 400px;
  text-align: center;
  line-height: 35px;
`;
