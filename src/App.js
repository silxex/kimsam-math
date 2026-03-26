import React, { useState, useEffect } from "react";

// [1] 유틸리티: 숫자를 한글로 변환 (문제 질 유지)
const numToKorean = (num) => {
  const units = ["", "십", "백", "천"];
  const digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  let res = ""; let s = String(num);
  for (let i = 0; i < s.length; i++) {
    let n = s[s.length - 1 - i];
    if (n !== "0") res = ((n === "1" && i > 0) ? "" : digits[Number(n)]) + units[i] + res;
  }
  return res || "영";
};

// [2] 문제 생성 로직 (클로드 버전의 정교함 복구)
const gen2_1_1 = () => {
  const a = Math.floor(Math.random() * 899) + 101;
  const ans = numToKorean(a);
  const choices = [ans, numToKorean(a+10), numToKorean(a-10), numToKorean(a+1)].sort(() => Math.random() - 0.5);
  return { q: `${a}을(를) 읽어보세요.`, choices, ans };
};

// [3] 디자인 테마 및 데이터 (24개 단원 전체 뼈대)
const GRADE_DATA = {
  2: { name: "2학년", emoji: "🐥", semesters: {
    1: { title: "2학년 1학기", bg: "#FFF9C4", border: "#FBC02D", units: [
      {id:1, title:"세 자리 수", emoji:"🔢", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen2_1_1},
      {id:2, title:"여러 가지 도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:()=>({q:"변이 3개인 도형은?", choices:["삼각형","사각형","원"], ans:"삼각형"})},
      {id:3, title:"덧셈과 뺄셈", emoji:"➕", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen2_1_1},
      {id:4, title:"길이 재기", emoji:"📏", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:gen2_1_1},
      {id:5, title:"분류하기", emoji:"📁", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:gen2_1_1},
      {id:6, title:"곱셈", emoji:"✖️", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:gen2_1_1},
    ]},
    2: { title: "2학년 2학기", bg: "#E8F5E9", border: "#4CAF50", units: [
      {id:1, title:"네 자리 수", emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:gen2_1_1},
      {id:2, title:"구구단", emoji:"✖️", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:gen2_1_1},
      {id:3, title:"길이 재기(2)", emoji:"📏", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:gen2_1_1},
      {id:4, title:"시각과 시간", emoji:"⏱️", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:gen2_1_1},
      {id:5, title:"표와 그래프", emoji:"📊", color:"#10AC84", light:"#E0F2F1", border:"#80CBC4", gen:gen2_1_1},
      {id:6, title:"규칙 찾기", emoji:"✨", color:"#576574", light:"#F5F5F5", border:"#BDBDBD", gen:gen2_1_1},
    ]}
  }},
  3: { name: "3학년", emoji: "🦁", semesters: {
    1: { title: "3학년 1학기", bg: "#E3F2FD", border: "#64B5F6", units: [
      {id:1, title:"덧셈과 뺄셈", emoji:"➕", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen2_1_1},
      {id:2, title:"평면도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:gen2_1_1},
      {id:3, title:"나눗셈", emoji:"➗", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen2_1_1},
      {id:4, title:"곱셈", emoji:"✖️", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:gen2_1_1},
      {id:5, title:"길이와 시간", emoji:"⏱️", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:gen2_1_1},
      {id:6, title:"분수와 소수", emoji:"🍰", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:gen2_1_1},
    ]},
    2: { title: "3학년 2학기", bg: "#FFF3E0", border: "#FFB74D", units: [
      {id:1, title:"곱셈(2)", emoji:"✖️", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:gen2_1_1},
      {id:2, title:"나눗셈(2)", emoji:"➗", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:gen2_1_1},
      {id:3, title:"원", emoji:"⭕", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:gen2_1_1},
      {id:4, title:"분수", emoji:"🍕", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:gen2_1_1},
      {id:5, title:"들이와 무게", emoji:"⚖️", color:"#10AC84", light:"#E0F2F1", border:"#80CBC4", gen:gen2_1_1},
      {id:6, title:"자료의 정리", emoji:"📊", color:"#576574", light:"#F5F5F5", border:"#BDBDBD", gen:gen2_1_1},
    ]}
  }}
};

export default function App() {
  const [view, setView] = useState("grade");
  const [selG, setSelG] = useState(2);
  const [selS, setSelS] = useState(1);
  const [selU, setSelU] = useState(null);

  const Layout = ({ children, onBack, title }) => (
    <div style={{minHeight:"100vh", background:"#F8F9FA", display:"flex", justifyContent:"center", padding:20, fontFamily:"sans-serif"}}>
      <div style={{background:"white", borderRadius:32, padding:24, width:"100%", maxWidth:420, boxShadow:"0 10px 40px rgba(0,0,0,0.05)"}}>
        {onBack && <button onClick={onBack} style={{background:"none", border:"none", color:"#AAA", marginBottom:15, cursor:"pointer"}}>← 뒤로가기</button>}
        {title && <h1 style={{fontSize:22, fontWeight:900, marginBottom:20}}>{title}</h1>}
        {children}
      </div>
    </div>
  );

  if (view === "grade") return (
    <Layout title="Kim Saem Math">
      <div style={{display:"grid", gap:16}}>
        {[2, 3].map(g => (
          <button key={g} onClick={()=>{setSelG(g); setView("semester");}} style={cardStyle("#FFF", "#EEE")}>
            <span style={{fontSize:40}}>{GRADE_DATA[g].emoji}</span>
            <b style={{fontSize:20}}>{GRADE_DATA[g].name}</b>
          </button>
        ))}
      </div>
    </Layout>
  );

  if (view === "semester") return (
    <Layout onBack={()=>setView("grade")} title={`${selG}학년 학기 선택`}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {[1, 2].map(s => (
          <button key={s} onClick={()=>{setSelS(s); setView("unit");}} style={cardStyle(GRADE_DATA[selG].semesters[s].bg, GRADE_DATA[selG].semesters[s].border)}>
            <b>{s}학기</b>
          </button>
        ))}
      </div>
    </Layout>
  );

  if (view === "unit") return (
    <Layout onBack={()=>setView("semester")} title={`${selG}-${selS} 단원`}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        {GRADE_DATA[selG].semesters[selS].units.map(u => (
          <button key={u.id} onClick={()=>{setSelU(u); setView("quiz");}} style={cardStyle(u.light, u.border, "left")}>
            <span style={{fontSize:20}}>{u.emoji}</span>
            <div style={{fontSize:11, fontWeight:800}}>{u.id}단원</div>
            <div style={{fontSize:13, fontWeight:900, color:u.color}}>{u.title}</div>
          </button>
        ))}
      </div>
    </Layout>
  );

  if (view === "quiz") return <QuizScreen unit={selU} onBack={()=>setView("unit")} />;
}

function QuizScreen({ unit, onBack }) {
  const [count, setCount] = useState(1);
  const [q, setQ] = useState(() => unit.gen());
  const [ans, setAns] = useState(null);
  const [status, setStatus] = useState(null);
  const [sec, setSec] = useState(0);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    let t = setInterval(() => { if(!status) setSec(s=>s+1) }, 1000);
    return () => clearInterval(t);
  }, [status, count]);

  const onCheck = (c) => {
    if(status) return;
    setAns(c);
    if(c === q.ans) { setStatus("correct"); setConfetti(true); setTimeout(()=>setConfetti(false), 2000); }
    else setStatus("wrong");
  };

  return (
    <div style={{textAlign:"center", position:"relative"}}>
      {confetti && <div style={{position:"absolute", top:0, width:"100%", fontSize:40, animation:"bounce 0.5s infinite"}}>🎉 정답! 🎉</div>}
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:20, fontSize:13, fontWeight:800, color:"#AAA"}}>
        <span>문제 {count}번</span>
        <span>⏱ {sec}초</span>
      </div>
      <div style={{background:unit.light, padding:40, borderRadius:24, border:`2px solid ${unit.border}`, marginBottom:20}}>
        <h3 style={{fontSize:24, margin:0}}>{q.q}</h3>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        {q.choices.map((c, i) => (
          <button key={i} onClick={()=>onCheck(c)} style={{padding:18, borderRadius:20, border:`3px solid ${ans===c?(status==='correct'?'#2ECC71':'#E74C3C'):'#F1F3F5'}`, background:"#FFF", fontWeight:900, fontSize:16, cursor:"pointer"}}>
            {c}
          </button>
        ))}
      </div>
      {status && (
        <button onClick={()=>{setCount(c=>c+1); setQ(unit.gen()); setAns(null); setStatus(null); setSec(0);}} style={{marginTop:25, width:"100%", padding:18, borderRadius:20, background:unit.color, color:"#fff", border:"none", fontWeight:900, fontSize:18, cursor:"pointer"}}>다음 문제 →</button>
      )}
      <button onClick={onBack} style={{marginTop:15, background:"none", border:"none", color:"#CCC", cursor:"pointer"}}>그만하기</button>
    </div>
  );
}

const cardStyle = (bg, border, align="center") => ({
  padding:20, borderRadius:24, border:`2px solid ${border}`, background:bg, cursor:"pointer", textAlign:align, display:"flex", flexDirection:"column", gap:5, alignItems:align==="center"?"center":"flex-start"
});
