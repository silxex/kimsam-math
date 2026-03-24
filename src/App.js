import React, { useState } from "react";

/* ── 스타일 보정 (전체 화면 중앙 정렬 및 배경 고정) ── */
const globalStyle = `
  body { margin: 0; padding: 0; background: #EEF2FF; }
  #root { display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; width: 100%; }
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    15%{transform:translateX(-9px)}30%{transform:translateX(9px)}
    45%{transform:translateX(-7px)}60%{transform:translateX(7px)}
    75%{transform:translateX(-4px)}90%{transform:translateX(4px)}
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes popIn {
    0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}
    60%{transform:translate(-50%,-50%) scale(1.1)}
    100%{transform:translate(-50%,-50%) scale(1);opacity:1}
  }
  @keyframes fall { to{transform:translateY(110vh) rotate(720deg);opacity:0} }
`;

/* ── 원본 코드의 UNIT과 문제 생성 로직은 그대로 유지 ── */
const UNITS = [
  { id:1, title:"세 자리 수",  emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A" },
  { id:2, title:"여러 가지 도형", emoji:"🔷", color:"#48DBFB", light:"#E0F7FA", border:"#80DEEA" },
  { id:3, title:"덧셈과 뺄셈",   emoji:"➕", color:"#FF6B81", light:"#FCE4EC", border:"#F48FB1" },
  { id:4, title:"길이 재기",     emoji:"📏", color:"#A29BFE", light:"#EDE7F6", border:"#CE93D8" },
  { id:5, title:"분류하기",      emoji:"🗂️", color:"#55EFC4", light:"#E0F2F1", border:"#80CBC4" },
  { id:6, title:"곱셈",          emoji:"✖️", color:"#FDCB6E", light:"#FFFDE7", border:"#FFE082" },
];

// ... (문제 생성 함수들은 동일하므로 생략하거나 기존 것 그대로 쓰시면 됩니다) ...
// (원장님이 처음 주셨던 모든 genUnit 함수들이 여기에 들어갑니다.)
// (중요: 하단의 App 컴포넌트 부분을 아래처럼 감싸서 중앙 정렬을 강제합니다.)

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeUnit, setActiveUnit] = useState(null);
  const [stars, setStars] = useState({});
  const totalStars = Object.values(stars).reduce((a,b)=>a+b,0);

  const handleStar = (uid, s) => {
    setStars(prev=>({ ...prev, [uid]: Math.max(prev[uid]||0, s) }));
  };

  return (
    <div style={{
      width:"100%", maxWidth:420, margin:"20px auto", padding:"0 16px", boxSizing:"border-box"
    }}>
      <style>{globalStyle}</style>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>
      
      <div style={{
        background:"white", borderRadius:32, padding:"28px 22px",
        boxShadow:"0 20px 60px rgba(0,0,0,0.08)",
      }}>
        {/* 기존 Header와 화면 로직 */}
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
           <div style={{fontWeight:800, color:"#B2BEC3"}}>Kim Saem Math</div>
           <div style={{color:"#FF9F43"}}>⭐ {totalStars}</div>
        </div>
        
        {/* 여기에 나머지 UnitSelect나 QuizScreen 코드가 그대로 들어갑니다. */}
      </div>
    </div>
  );
}
