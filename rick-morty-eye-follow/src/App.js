import "./styles.css";
import back from "./assets/back.png";
import eye from "./assets/eye.png";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [angleDeg, setAngleDeg] = useState(0);
  const eyesRef = useRef(null);
  const anchorRef = useRef(null);

  const handleMouseMove = (event) => {
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const anchorX = anchorRect.left + anchorRect.width / 2;
    const anchorY = anchorRect.top + anchorRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    setAngleDeg(angleDeg);
    // Access the eyes element inside the handleMouseMove function
    const eyes = eyesRef.current.querySelectorAll(".eye");
    eyes.forEach((eye) => {
      eye.style.transform = `rotate(${90 + angleDeg}deg)`;
    });
    anchorRef.current.style.filter = `hue-rotate(${angleDeg}deg)`;
  };

  function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
  }

  return (
    <main onMouseMove={handleMouseMove}>
      <img id="anchor" src={back} alt="scared-stuff" ref={anchorRef} />
      <div id="eyes" ref={eyesRef}>
        <img
          className="eye"
          src={eye}
          alt="eye"
          style={{ top: "289px", right: "16px" }}
        />
        <img
          className="eye"
          src={eye}
          alt="eye"
          style={{ top: "300px", right: "99px" }}
        />
        <img
          className="eye"
          src={eye}
          alt="eye"
          style={{ top: "120px", left: "100px" }}
        />
        <img
          className="eye"
          src={eye}
          alt="eye"
          style={{ top: "120px", left: "176px" }}
        />
      </div>
    </main>
  );
}
