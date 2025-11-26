import * as React from "react";
import styled from "styled-components";

const GlassmorphicButtonComponent: React.FC = () => {
  return (
    <Container>
      <StyledGlassmorphicButton>
        <StyledGlassmorphicButtonSpan>Click me</StyledGlassmorphicButtonSpan>
        <GlassmorphicShadow />
      </StyledGlassmorphicButton>
    </Container>
  );
};

export default GlassmorphicButtonComponent;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
`;

const GlassmorphicShadow = styled.div`
  width: calc(100% + var(--shadow-cuttoff-fix));
  height: calc(100% + var(--shadow-cuttoff-fix));
  top: calc(0% - var(--shadow-cuttoff-fix) / 2);
  left: calc(0% - var(--shadow-cuttoff-fix) / 2);
  filter: blur(clamp(2px, 0.125em, 12px));
  pointer-events: none;
  position: absolute;
  overflow: visible;

  &:after {
    content: "";
    z-index: 0;
    width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
    height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
    inset: 0;
    top: calc(var(--shadow-cuttoff-fix) - 0.5em);
    left: calc(var(--shadow-cuttoff-fix) - 0.875em);
    box-sizing: border-box;
    opacity: 1;
    background: linear-gradient(#0003, #0000001a);
    border-radius: 999vw;
    padding: 0.125em;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    position: absolute;
    overflow: visible;
    -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    -webkit-mask-position:
      0 0,
      0 0;
    mask-position:
      0 0,
      0 0;
    -webkit-mask-size: auto, auto;
    mask-size: auto, auto;
    -webkit-mask-repeat: repeat, repeat;
    mask-repeat: repeat, repeat;
    -webkit-mask-clip: content-box, border-box;
    mask-clip: content-box, border-box;
    -webkit-mask-origin: content-box, border-box;
    mask-origin: content-box, border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    -webkit-mask-source-type: auto, auto;
    mask-mode: match-source, match-source;
  }
`;

const StyledGlassmorphicButtonSpan = styled.span`
  -webkit-user-select: none;
  user-select: none;
  color: #323232;
  text-shadow: 0 0.05em 0.05em #0000000d;
  letter-spacing: -0.18px;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-inline: 1.75em;
  font-size: 1.125rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  position: relative;

  &:after {
    content: "";
    z-index: 1;
    width: calc(100% - var(--border-width));
    height: calc(100% - var(--border-width));
    top: calc(0% + var(--border-width) / 2);
    left: calc(0% + var(--border-width) / 2);
    box-sizing: border-box;
    background: linear-gradient(
      var(--angle-2, -75deg),
      #fff0 0,
      #ffffff80 40% 50%,
      #fff0 55%
    );
    z-index: 3;
    mix-blend-mode: screen;
    pointer-events: none;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 200% 200%;
    border-radius: 999vw;
    transition:
      background-position 0.5s cubic-bezier(0.25, 1, 0.5, 1),
      --angle-2 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    display: block;
    position: absolute;
    overflow: clip;
  }
`;

const StyledGlassmorphicButton = styled.button`
  --border-width: clamp(1px, 0.0625em, 4px);
  --shadow-cuttoff-fix: 2em;
  --angle-1: -75deg;
  --angle-2: -75deg;
  all: unset;
  cursor: pointer;
  -webkit-tap-highlight-color: #0000;
  pointer-events: auto;
  z-index: 3;
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  background: linear-gradient(-75deg, #ffffff0d, #fff3, #ffffff0d);
  border-radius: 999vw;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 68px;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  position: relative;
  box-shadow:
    inset 0 0.125em 0.125em #0000000d,
    inset 0 -0.125em 0.125em #ffffff80,
    0 0.25em 0.125em -0.125em #0003,
    inset 0 0 0.1em 0.25em #fff3,
    0 0 #fff;

  &:active {
    --angle-2: -15deg;
    box-shadow:
      inset 0 0.125em 0.125em #0000000d,
      inset 0 -0.125em 0.125em #ffffff80,
      0 0.125em 0.125em -0.125em #0003,
      inset 0 0 0.1em 0.25em #fff3,
      0 0.225em 0.05em #0000000d,
      0 0.25em #ffffffbf,
      inset 0 0.25em 0.05em #00000026 !important;
    transform: rotateX(25deg) !important;

    ${StyledGlassmorphicButtonSpan}::after {
      --angle-2: -15deg !important;
      background-position: 50% 15% !important;
    }

    ${GlassmorphicShadow} {
      filter: blur(clamp(2px, 0.125em, 12px));
    }

    ${GlassmorphicShadow}::after {
      top: calc(var(--shadow-cuttoff-fix) - 0.5em);
      opacity: 0.75;
    }
  }

  &:active:after {
    --angle-1: -75deg;
  }

  &:hover {
    --angle-1: -125deg;
    -webkit-backdrop-filter: blur(0.01em);
    backdrop-filter: blur(0.01em);
    transform: scale(0.975);
    box-shadow:
      inset 0 0.125em 0.125em #0000000d,
      inset 0 -0.125em 0.125em #ffffff80,
      0 0.15em 0.05em -0.1em #00000040,
      inset 0 0 0.05em 0.1em #ffffff80,
      0 0 #fff;

    ${GlassmorphicShadow}::after {
      filter: blur(clamp(2px, 0.0625em, 6px));
      transition: filter 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
  }

  &:after {
    content: "";
    z-index: 1;
    width: calc(100% + var(--border-width));
    height: calc(100% + var(--border-width));
    inset: 0;
    top: calc(0% - var(--border-width) / 2);
    left: calc(0% - var(--border-width) / 2);
    padding: var(--border-width);
    box-sizing: border-box;
    background:
      conic-gradient(
        from var(--angle-1) at 50% 50%,
        #00000080,
        #0000 5% 40%,
        #00000080 50%,
        #0000 60% 95%,
        #00000080
      ),
      linear-gradient(180deg, #ffffff80, #ffffff80);
    box-shadow: inset 0 0 0 calc(var(--border-width) / 2) #ffffff80;
    border-radius: 999vw;
    transition:
      all 0.4s cubic-bezier(0.25, 1, 0.5, 1),
      --angle-1 0.5s;
    position: absolute;
    -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    -webkit-mask-position:
      0 0,
      0 0;
    mask-position:
      0 0,
      0 0;
    -webkit-mask-size: auto, auto;
    mask-size: auto, auto;
    -webkit-mask-repeat: repeat, repeat;
    mask-repeat: repeat, repeat;
    -webkit-mask-clip: content-box, border-box;
    mask-clip: content-box, border-box;
    -webkit-mask-origin: content-box, border-box;
    mask-origin: content-box, border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    -webkit-mask-source-type: auto, auto;
    mask-mode: match-source, match-source;
  }
`;
