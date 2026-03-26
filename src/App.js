import React, { useState } from "react";

/* ══════════════════════════════════════════════════
   [1] 문제 생성기 (2학년 & 3학년 전체)
══════════════════════════════════════════════════ */

// --- 2학년 로직 ---
const gen2_1_1 = () => { const a = Math.floor(Math.random()*800)+100; return { q: `다음 숫자를 읽어보세요: ${a}`, choices: [String(a), String(a+10), String(a-5), String(a+100)].sort(()=>Math.random()-0.5), ans: String(a), explain: "세 자리 수 읽기 연습입니다." }; };
const gen2_1_3 = () => { const a = Math.floor(Math.random()*50)+10, b = Math.floor(Math.random()*40)+5; return { q: `${a} + ${b} = ?`, choices: [String(a+b), String(a+b+10), String(a+b-1), String(a+b+2)].sort(()=>Math.random()-0.5), ans: String(a+b), explain: "덧셈을 정확히 계산해봅시다." }; };
const gen2_2_2 = () => { const a = Math.floor(Math.random()*8)+2, b = Math.floor(Math.random()*9)+1; return { q: `${a} × ${b} = ?`, choices: [String(a*b), String(a*b+a), String(a*b-a), String(a*b+1)].sort(()=>Math.random()-0.5), ans: String(a*b), explain: `구구단 ${a}단을 외워보세요!` }; };

// --- 3학년 로직 ---
const gen3_1_1 = () => {
  const a = Math.floor(Math.random() * 500) + 200, b = Math.floor(Math.random() * 400) + 100, isAdd = Math.random() > 0.5, ans = isAdd ? a + b : a - b;
  return { q: `${a} ${isAdd ? '+' : '-'} ${b} = ?`, choices: [String(ans), String(ans+10), String(ans-10), String(ans+2)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `세 자리 수의 ${isAdd?'덧셈':'뺄셈'}입니다.` };
};
const gen3_1_3 = () => {
  const b = Math.floor(Math.random() * 8) + 2, ans = Math.floor(Math.random() * 8) + 2, a = b * ans;
  return { q: `${a} ÷ ${b} = ?`, choices: [String(ans), String(ans+1), String(b), String(a-b)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `${b} × ${ans} = ${a} 이므로 정답은 ${ans}!` };
};
const gen3_1_6 = () => {
  const total = 5, part = Math.floor(Math.random()*4)+1;
  return { q: `전체를 똑같이 ${total}로 나눈 것 중 ${part}만큼을 분수로?`, choices: [`${part}/${total}`, `${total-part}/${total}`, `1/${total}`, `${total}/${part}`].sort(()=>Math.random()-0.5), ans: `${part}/${total}`, explain: "전체에 대한 부분의 크기입니다." };
};
const gen3_2_3 = () => {
  const r = Math.floor(Math.random()*9)+2;
  return { q: `반지름이 ${r}cm인 원의 지름은?`, choices: [String(r*2), String(r), String(r+2), String(r*3)].sort(()=>Math.random()-0.5), ans: String(r*2), explain: "지름은 반지름의 2배입니다." };
};

/* ══════════════════════════════════════════════════
   [2] 학년별 데이터 구조
══════════════════════════════════════════════════ */
const GRADE_DATA = {
  2: {
    name: "2학년", emoji: "🐥",
    semesters: {
      1: { title: "2학년 1학기", bg: "linear-gradient(135deg,#FFF9C4,#FFF176)", border: "#FBC02D", units: [
        {id:1, title:"세 자리 수", emoji:"🔢", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen2_1_1},
        {id:3, title:"덧셈과 뺄셈", emoji:"➕", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:gen2_1_3},
      ]},
      2: { title: "2학년 2학기", bg: "linear-gradient(135deg,#E8F5E9,#A5D6A7)", border: "#4CAF50", units: [
        {id:2, title:"구구단", emoji:"✖️", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:gen2_2_2},
      ]}
    }
  },
  3: {
    name: "3학년", emoji: "🦁",
    semesters: {
      1: { title: "3학년 1학기", bg: "linear-gradient(135deg,#E3F2FD,#BBDEFB)", border: "#64B5F6", units: [
        {id:1, title:"덧셈과 뺄셈", emoji:"➕", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen3_1_1},
        {id:3, title:"나눗셈", emoji:"➗", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen3_1_3},
        {id:6, title:"분수와 소수", emoji:"🍰", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:gen3_1_6},
      ]},
      2: { title: "3학년 2학기", bg: "linear-gradient(135deg,#FFF3E0,#FFE0B2)", border: "#FFB74D", units: [
        {id:3, title:"원", emoji:"⭕", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:gen3_2_3},
      ]}
    }
  }
};

/* ══════════════════════════════════════════════════
   [3] 메인 앱 컴포넌트
══════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("grade"); // grade, semester, unit, quiz
  const [selG, setSelG] = useState(2);
  const [selS, setSelS] = useState(1);
  const [selU, setSelU] = useState(null);
  const [stars, setStars] = useState({});

  // 공통 레이아웃
  const Layout = ({ children, onBack, title, subTitle }) => (
    <div style={{minHeight:"100vh", background:"#F8F9FA", display:"flex", justifyContent:"center", padding:20, fontFamily:"sans-serif"}}>
      <div style={{background:"white", borderRadius:32, padding:24, width:"100%", maxWidth:420, boxShadow:"0 10px 40px rgba(0,0,0,0.05)", height:"fit-content"}}>
        {onBack && <button onClick={onBack} style={{background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#B2BEC3", marginBottom:10}}>← 뒤로가기</button>}
        {title && <h1 style={{margin:"0 0 4px", fontSize:22, fontWeight:900}}>{title}</h1>}
        {subTitle && <p style={{margin:"0 0 20px", color:"#B2BEC3", fontSize:13}}>{subTitle}</p>}
        {children}
      </div>
    </div>
  );

  // 학년 선택
  if (view === "grade") return (
    <Layout title="Kim Saem Math" subTitle="학년을 선택해 주세요!">
      <div style={{display:"grid", gap:16}}>
        {[2, 3].map(g => (
          <button key={g} onClick={()=>{setSelG(g); setView("semester");}} style={{padding:30, borderRadius:24, border:"2px solid #EEE", background:"#FFF", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <span style={{fontSize:50}}>{GRADE_DATA[g].emoji}</span>
            <b style={{fontSize:20, marginTop:10}}>{GRADE_DATA[g].name}</b>
          </button>
        ))}
      </div>
    </Layout>
  );

  // 학기 선택
  if (view === "semester") return (
    <Layout onBack={()=>setView("grade")} title={`${selG}학년 과정을 골라보세요`}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {[1, 2].map(s => (
          <button key={s} onClick={()=>{setSelS(s); setView("unit");}} style={{padding:20, borderRadius:24, border:`3px solid ${GRADE_DATA[selG].semesters[s].border}`, background:GRADE_DATA[selG].semesters[s].bg, cursor:"pointer"}}>
            <div style={{fontSize:18, fontWeight:900}}>{s}학기</div>
          </button>
        ))}
      </div>
    </Layout>
  );

  // 단원 선택
  if (view === "unit") {
    const units = GRADE_DATA[selG].semesters[selS].units;
    return (
      <Layout onBack={()=>setView("semester")} title={`${selG}학년 ${selS}학기`} subTitle="학습할 단원을 선택하세요">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          {units.map(u => (
            <button key={u.id} onClick={()=>{setSelU(u); setView("quiz");}} style={{padding:15, borderRadius:20, border:`2.5px solid ${u.border}`, background:u.light, textAlign:"left", cursor:"pointer"}}>
              <div style={{fontSize:24}}>{u.emoji}</div>
              <div style={{fontSize:12, fontWeight:900, color:"#2D3436"}}>{u.id}단원</div>
              <div style={{fontSize:13, fontWeight:700, color:u.color}}>{u.title}</div>
            </button>
          ))}
        </div>
      </Layout>
    );
  }

  // 퀴즈 화면 (기존 로직 유지)
  if (view === "quiz") return <QuizScreen unit={selU} onBack={()=>setView("unit")} />;
}

function QuizScreen({ unit, onBack }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(null); // correct, wrong
  const [ans, setAns] = useState(null);
  const [q] = useState(() => unit.gen());

  const check = (c) => {
    if(status) return;
    setAns(c);
    if(c === q.ans) { setStatus("correct"); setScore(s=>s+1); }
    else setStatus("wrong");
  };

  return (
    <div style={{textAlign:"center"}}>
      <div style={{background:unit.light, padding:30, borderRadius:24, border:`2px solid ${unit.border}`, marginBottom:20}}>
        <h3 style={{fontSize:18, margin:0}}>{q.q}</h3>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        {q.choices.map((c, i) => (
          <button key={i} onClick={()=>check(c)} style={{padding:15, borderRadius:16, border:"2px solid #EEE", background:ans===c ? (status==="correct"?"#E8F5E9":"#FFEBEE") : "#FFF", fontWeight:800, cursor:"pointer"}}>
            {c}
          </button>
        ))}
      </div>
      {status && (
        <div style={{marginTop:20}}>
          <p style={{color: status==="correct"?"#2ECC71":"#E74C3C", fontWeight:800}}>{status==="correct"?"정답입니다!":"틀렸어요!"}</p>
          <button onClick={onBack} style={{width:"100%", padding:15, borderRadius:16, background:unit.color, color:"#fff", border:"none", fontWeight:800, cursor:"pointer"}}>단원 목록으로</button>
        </div>
      )}
    </div>
  );
}
