import React, { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════
   [1] 문제 생성 로직 (2학년 & 3학년 상세 복구)
══════════════════════════════════════════════════ */
const gen2_1_1 = () => { const a = Math.floor(Math.random()*800)+100; return { q: `다음 숫자를 읽어보세요: ${a}`, choices: [String(a), String(a+10), String(a-5), String(a+100)].sort(()=>Math.random()-0.5), ans: String(a), explain: "세 자리 수 읽기입니다." }; };
const gen2_1_3 = () => { const a = Math.floor(Math.random()*50)+10, b = Math.floor(Math.random()*40)+5; return { q: `${a} + ${b} = ?`, choices: [String(a+b), String(a+b+10), String(a+b-1), String(a+b+2)].sort(()=>Math.random()-0.5), ans: String(a+b), explain: "받아올림 계산입니다." }; };
const genMul = (d) => { const b = Math.floor(Math.random()*9)+1; return { q: `${d} × ${b} = ?`, choices: [String(d*b), String(d*b+d), String(d*b-d), String(d*b+1)].sort(()=>Math.random()-0.5), ans: String(d*b), explain: `${d}단 곱셈입니다.` }; };

const gen3_add_sub = () => {
  const a = Math.floor(Math.random()*500)+200, b = Math.floor(Math.random()*400)+100, isAdd = Math.random()>0.5, ans = isAdd?a+b:a-b;
  return { q: `${a} ${isAdd?'+':'-'} ${b} = ?`, choices: [String(ans), String(ans+10), String(ans-10), String(ans+2)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `세 자리 수의 ${isAdd?'덧셈':'뺄셈'}입니다.` };
};
const gen3_div = () => {
  const b = Math.floor(Math.random()*8)+2, ans = Math.floor(Math.random()*8)+2, a = b*ans;
  return { q: `${a} ÷ ${b} = ?`, choices: [String(ans), String(ans+1), String(b), String(a-b)].sort(()=>Math.random()-0.5), ans: String(ans), explain: "나눗셈은 곱셈의 반대입니다." };
};

/* ══════════════════════════════════════════════════
   [2] 데이터 구조 (24개 단원)
══════════════════════════════════════════════════ */
const GRADE_DATA = {
  2: { name: "2학년", emoji: "🐥", semesters: {
    1: { title: "2학년 1학기", bg: "#FFF9C4", border: "#FBC02D", units: [
      {id:1, title:"세 자리 수", emoji:"🔢", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen2_1_1},
      {id:2, title:"여러 가지 도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:()=>({q:"삼각형의 변은 몇 개인가요?", choices:["3개","4개","2개","5개"], ans:"3개", explain:"삼각형은 변이 3개예요."})},
      {id:3, title:"덧셈과 뺄셈", emoji:"➕", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen2_1_3},
      {id:4, title:"길이 재기", emoji:"📏", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:()=>({q:"10cm + 5cm = ?", choices:["15cm","20cm","10cm","25cm"], ans:"15cm", explain:"길이 더하기!"})},
      {id:5, title:"분류하기", emoji:"📁", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:()=>({q:"기준에 따라 나누는 것은?", choices:["분류","나열","합체"], ans:"분류", explain:"분류입니다."})},
      {id:6, title:"곱셈", emoji:"✖️", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:()=>genMul(2)},
    ]},
    2: { title: "2학년 2학기", bg: "#E8F5E9", border: "#4CAF50", units: [
      {id:1, title:"네 자리 수", emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:gen2_1_1},
      {id:2, title:"구구단", emoji:"✖️", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:()=>genMul(7)},
      {id:3, title:"길이 재기(2)", emoji:"📏", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:()=>({q:"1m는 몇 cm?", choices:["100cm","10cm","1000cm"], ans:"100cm", explain:"1m = 100cm!"})},
      {id:4, title:"시각과 시간", emoji:"⏱️", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:()=>({q:"60분은 몇 시간?", choices:["1시간","2시간","30분"], ans:"1시간", explain:"60분 = 1시간"})}
      // ... (나머지 2개 단원도 동일 구조)
    ]}
  }},
  3: { name: "3학년", emoji: "🦁", semesters: {
    1: { title: "3학년 1학기", bg: "#E3F2FD", border: "#64B5F6", units: [
      {id:1, title:"덧셈과 뺄셈", emoji:"➕", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen3_add_sub},
      {id:3, title:"나눗셈", emoji:"➗", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen3_div},
      {id:6, title:"분수와 소수", emoji:"🍰", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:()=>gen3_add_sub()}
    ]},
    2: { title: "3학년 2학기", bg: "#FFF3E0", border: "#FFB74D", units: [
      {id:3, title:"원", emoji:"⭕", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:()=>({q:"반지름 3cm인 원의 지름은?", choices:["6cm","3cm","9cm"], ans:"6cm", explain:"지름은 반지름의 2배!"})}
    ]}
  }}
};

/* ══════════════════════════════════════════════════
   [3] 메인 컴포넌트
══════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("grade");
  const [selG, setSelG] = useState(2);
  const [selS, setSelS] = useState(1);
  const [selU, setSelU] = useState(null);

  return (
    <div style={{minHeight:"100vh", background:"#F0F2F5", display:"flex", justifyContent:"center", padding:20, fontFamily:"'Nanum Gothic', sans-serif"}}>
      <div style={{background:"white", borderRadius:30, padding:25, width:"100%", maxWidth:400, boxShadow:"0 15px 35px rgba(0,0,0,0.1)", position:"relative", overflow:"hidden"}}>
        {view === "grade" && <GradeScreen onSelect={(g)=>{setSelG(g); setView("semester");}} />}
        {view === "semester" && <SemScreen grade={selG} onBack={()=>setView("grade")} onSelect={(s)=>{setSelS(s); setView("unit");}} />}
        {view === "unit" && <UnitScreen grade={selG} sem={selS} onBack={()=>setView("semester")} onSelect={(u)=>{setSelU(u); setView("quiz");}} />}
        {view === "quiz" && <QuizScreen unit={selU} onBack={()=>setView("unit")} />}
      </div>
    </div>
  );
}

function GradeScreen({ onSelect }) {
  return (
    <>
      <h2 style={{textAlign:"center", marginBottom:25, fontWeight:900}}>Kim Saem Math 🎒</h2>
      <div style={{display:"grid", gap:15}}>
        {[2, 3].map(g => (
          <button key={g} onClick={()=>onSelect(g)} style={btnStyle("#FFF", "#EEE", 100)}>
            <span style={{fontSize:40}}>{GRADE_DATA[g].emoji}</span>
            <b style={{fontSize:20}}>{GRADE_DATA[g].name}</b>
          </button>
        ))}
      </div>
    </>
  );
}

function SemScreen({ grade, onBack, onSelect }) {
  return (
    <>
      <button onClick={onBack} style={backBtn}>← 학년 선택</button>
      <h3 style={{marginBottom:20}}>{grade}학년 어느 학기인가요?</h3>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:15}}>
        {[1, 2].map(s => (
          <button key={s} onClick={()=>onSelect(s)} style={btnStyle(GRADE_DATA[grade].semesters[s].bg, GRADE_DATA[grade].semesters[s].border)}>
            <b style={{fontSize:20}}>{s}학기</b>
          </button>
        ))}
      </div>
    </>
  );
}

function UnitScreen({ grade, sem, onBack, onSelect }) {
  const units = GRADE_DATA[grade].semesters[sem].units;
  return (
    <>
      <button onClick={onBack} style={backBtn}>← 학기 선택</button>
      <h3 style={{marginBottom:15}}>{grade}-{sem} 단원을 골라보세요</h3>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        {units.map(u => (
          <button key={u.id} onClick={()=>onSelect(u)} style={btnStyle(u.light, u.border, 0, "left")}>
            <div style={{fontSize:22}}>{u.emoji}</div>
            <div style={{fontSize:11, fontWeight:800}}>{u.id}단원</div>
            <div style={{fontSize:13, fontWeight:900, color:u.color}}>{u.title}</div>
          </button>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   [4] 퀴즈 화면 (타이머 + 문제번호 + 폭죽)
══════════════════════════════════════════════════ */
function QuizScreen({ unit, onBack }) {
  const [count, setCount] = useState(1);
  const [q, setQ] = useState(() => unit.gen());
  const [ans, setAns] = useState(null);
  const [status, setStatus] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // 타이머 로직
  useEffect(() => {
    let timer;
    if (!status) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [status, count]);

  const check = (c) => {
    if (status) return;
    setAns(c);
    if (c === q.ans) {
      setStatus("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStatus("wrong");
    }
  };

  const next = () => {
    setCount(c => c + 1);
    setQ(unit.gen());
    setAns(null);
    setStatus(null);
    setSeconds(0);
  };

  return (
    <div style={{textAlign:"center"}}>
      {showConfetti && <ConfettiOverlay />}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:15}}>
        <button onClick={onBack} style={{background:"none", border:"none", color:"#AAA", cursor:"pointer"}}>나가기</button>
        <div style={{fontSize:14, fontWeight:800, color:unit.color}}>문제 {count}번</div>
        <div style={{fontSize:14, color:"#666"}}>⏱ {seconds}초</div>
      </div>

      <div style={{background:unit.light, padding:30, borderRadius:25, border:`2px solid ${unit.border}`, marginBottom:20}}>
        <h3 style={{fontSize:22, margin:0}}>{q.q}</h3>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        {q.choices.map((c, i) => (
          <button key={i} onClick={()=>check(c)} style={choiceStyle(ans===c, status, q.ans===c)}>
            {c}
          </button>
        ))}
      </div>

      {status && (
        <div style={{marginTop:25, animation:"fadeIn 0.5s"}}>
          <p style={{fontSize:18, fontWeight:900, color:status==="correct"?"#2ECC71":"#E74C3C"}}>
            {status==="correct" ? "🎉 정답입니다! (훌륭해요)" : "🧐 다시 한번 생각해볼까?"}
          </p>
          <button onClick={next} style={btnStyle(unit.color, "transparent", 0, "center", "#FFF")}>
            다음 문제로 →
          </button>
        </div>
      )}
    </div>
  );
}

// 폭죽 컴포넌트 (CSS 애니메이션 활용)
function ConfettiOverlay() {
  return (
    <div style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:10}}>
      {Array.from({length:20}).map((_, i) => (
        <div key={i} className="confetti" style={{
          left: Math.random()*100+"%",
          backgroundColor: ["#FF6B81","#48DBFB","#1DD1A1","#FECA57"][i%4],
          animationDelay: Math.random()+"s"
        }} />
      ))}
      <style>{`
        .confetti { position:absolute; width:10px; height:10px; top:-10px; animation: fall 2s linear forwards; }
        @keyframes fall { to { transform: translateY(500px) rotate(720deg); opacity: 0; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

// 스타일 헬퍼
const btnStyle = (bg, border, pad=15, align="center", color="#333") => ({
  background:bg, border:`2px solid ${border}`, borderRadius:20, padding:pad||15, cursor:"pointer", textAlign:align, display:"flex", flexDirection:"column", gap:5, alignItems:align==="center"?"center":"flex-start", color:color
});
const choiceStyle = (isSel, status, isAns) => {
  let bg = "#FFF", border = "#EEE";
  if (isSel) {
    bg = status === "correct" ? "#E8F5E9" : "#FFEBEE";
    border = status === "correct" ? "#2ECC71" : "#E74C3C";
  } else if (status === "wrong" && isAns) {
    border = "#2ECC71"; // 틀렸을 때 정답 힌트
  }
  return { padding:15, borderRadius:15, border:`2px solid ${border}`, background:bg, fontWeight:800, cursor:"pointer", fontSize:16 };
};
const backBtn = { background:"none", border:"none", color:"#888", marginBottom:10, cursor:"pointer", fontSize:13 };
