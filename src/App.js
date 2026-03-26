import React, { useState } from "react";

/* ══════════════════════════════════════════════════
   [1] 문제 생성 로직 (2학년 & 3학년 전체)
══════════════════════════════════════════════════ */
// 2학년 로직 예시 (기존 로직들)
const gen2_add = (max) => { const a = Math.floor(Math.random()*max)+10, b = Math.floor(Math.random()*max)+10; return { q: `${a} + ${b} = ?`, choices: [String(a+b), String(a+b+10), String(a+b-2), String(a+b+1)].sort(()=>Math.random()-0.5), ans: String(a+b), explain: "차분히 더해보세요!" }; };
const gen2_sub = (max) => { const a = Math.floor(Math.random()*max)+50, b = Math.floor(Math.random()*40)+1; return { q: `${a} - ${b} = ?`, choices: [String(a-b), String(a-b+10), String(a-b-5), String(a-b+2)].sort(()=>Math.random()-0.5), ans: String(a-b), explain: "뺄셈 결과입니다." }; };
const genMul = (d) => { const b = Math.floor(Math.random()*9)+1; return { q: `${d} × ${b} = ?`, choices: [String(d*b), String(d*b+d), String(d*b-d), String(d*b+1)].sort(()=>Math.random()-0.5), ans: String(d*b), explain: `${d}단 외우기!` }; };

// 3학년 로직 (새로 추가된 것들)
const gen3_div = () => { const b = Math.floor(Math.random()*8)+2, ans = Math.floor(Math.random()*8)+2, a = b*ans; return { q: `${a} ÷ ${b} = ?`, choices: [String(ans), String(ans+1), String(b), String(a-b)].sort(()=>Math.random()-0.5), ans: String(ans), explain: "나눗셈은 곱셈의 반대예요." }; };
const gen3_frac = () => { const total = 6, part = Math.floor(Math.random()*5)+1; return { q: `전체 ${total}개 중 ${part}개는 분수로?`, choices: [`${part}/${total}`, `${total-part}/${total}`, `1/${total}`, `${total}/${part}`].sort(()=>Math.random()-0.5), ans: `${part}/${total}`, explain: "전체 분의 부분입니다." }; };

/* ══════════════════════════════════════════════════
   [2] 학년/학기/단원 통합 데이터 (24개 단원)
══════════════════════════════════════════════════ */
const GRADE_DATA = {
  2: {
    name: "2학년", emoji: "🐥",
    semesters: {
      1: { title: "2학년 1학기", bg: "linear-gradient(135deg,#FFF9C4,#FFF176)", border: "#FBC02D", units: [
        {id:1, title:"세 자리 수", emoji:"🔢", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:()=>gen2_add(500)},
        {id:2, title:"여러 가지 도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:()=>({q:"삼각형의 변은 몇 개인가요?", choices:["3개","4개","5개","2개"], ans:"3개", explain:"삼각형은 변이 3개예요."})},
        {id:3, title:"덧셈과 뺄셈", emoji:"➕", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:()=>gen2_add(100)},
        {id:4, title:"길이 재기", emoji:"📏", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:()=>({q:"100cm는 몇 m인가요?", choices:["1m","10m","100m","0.1m"], ans:"1m", explain:"100cm = 1m 입니다."})},
        {id:5, title:"분류하기", emoji:"📁", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:()=>({q:"기준에 따라 나누는 것을 무엇이라 하나요?", choices:["분류","합체","나열","정리"], ans:"분류", explain:"정답은 분류입니다."})},
        {id:6, title:"곱셈", emoji:"✖️", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:()=>genMul(2)},
      ]},
      2: { title: "2학년 2학기", bg: "linear-gradient(135deg,#E8F5E9,#A5D6A7)", border: "#4CAF50", units: [
        {id:1, title:"네 자리 수", emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:()=>gen2_add(5000)},
        {id:2, title:"구구단", emoji:"✖️", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:()=>genMul(7)},
        {id:3, title:"길이 재기(2)", emoji:"📏", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:()=>({q:"1m 20cm는 몇 cm?", choices:["120cm","102cm","210cm","20cm"], ans:"120cm", explain:"1m=100cm예요."})},
        {id:4, title:"시각과 시간", emoji:"⏱️", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:()=>({q:"1시간은 몇 분인가요?", choices:["60분","100분","30분","120분"], ans:"60분", explain:"1시간 = 60분!"})},
        {id:5, title:"표와 그래프", emoji:"📊", color:"#10AC84", light:"#E0F2F1", border:"#80CBC4", gen:()=>({q:"자료를 정리한 것을 무엇이라 하나요?", choices:["표","글자","지도","일기"], ans:"표", explain:"표로 정리하면 보기 쉬워요."})},
        {id:6, title:"규칙 찾기", emoji:"✨", color:"#576574", light:"#F5F5F5", border:"#BDBDBD", gen:()=>({q:"2-4-6-? 다음 숫자는?", choices:["8","7","9","10"], ans:"8", explain:"2씩 커지는 규칙입니다."})},
      ]}
    }
  },
  3: {
    name: "3학년", emoji: "🦁",
    semesters: {
      1: { title: "3학년 1학기", bg: "linear-gradient(135deg,#E3F2FD,#BBDEFB)", border: "#64B5F6", units: [
        {id:1, title:"덧셈과 뺄셈", emoji:"➕", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:()=>gen2_add(800)},
        {id:2, title:"평면도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:()=>({q:"직각이 있는 삼각형은?", choices:["직각삼각형","정삼각형","이등변삼각형","예각삼각형"], ans:"직각삼각형", explain:"한 각이 직각이면 직각삼각형!"})},
        {id:3, title:"나눗셈", emoji:"➗", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen3_div},
        {id:4, title:"곱셈", emoji:"✖️", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:()=>genMul(12)},
        {id:5, title:"길이와 시간", emoji:"⏱️", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:()=>({q:"1km는 몇 m인가요?", choices:["1000m","100m","10m","10000m"], ans:"1000m", explain:"1km = 1000m 입니다."})},
        {id:6, title:"분수와 소수", emoji:"🍰", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:gen3_frac},
      ]},
      2: { title: "3학년 2학기", bg: "linear-gradient(135deg,#FFF3E0,#FFE0B2)", border: "#FFB74D", units: [
        {id:1, title:"곱셈(2)", emoji:"✖️", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:()=>genMul(25)},
        {id:2, title:"나눗셈(2)", emoji:"➗", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:gen3_div},
        {id:3, title:"원", emoji:"⭕", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:()=>({q:"지름 10cm인 원의 반지름은?", choices:["5cm","10cm","20cm","2cm"], ans:"5cm", explain:"반지름은 지름의 절반!"})},
        {id:4, title:"분수", emoji:"🍕", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:gen3_frac},
        {id:5, title:"들이와 무게", emoji:"⚖️", color:"#10AC84", light:"#E0F2F1", border:"#80CBC4", gen:()=>({q:"1L는 몇 mL인가요?", choices:["1000mL","100mL","10mL","500mL"], ans:"1000mL", explain:"1L = 1000mL!"})},
        {id:6, title:"자료의 정리", emoji:"📊", color:"#576574", light:"#F5F5F5", border:"#BDBDBD", gen:()=>({q:"조사한 수를 막대 모양으로 그린 것은?", choices:["막대그래프","그림그래프","원그래프","선그래프"], ans:"막대그래프", explain:"막대그래프입니다."})},
      ]}
    }
  }
};

/* ══════════════════════════════════════════════════
   [3] 메인 앱 컴포넌트
══════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("grade"); 
  const [selG, setSelG] = useState(2);
  const [selS, setSelS] = useState(1);
  const [selU, setSelU] = useState(null);

  const Layout = ({ children, onBack, title }) => (
    <div style={{minHeight:"100vh", background:"#F8F9FA", display:"flex", justifyContent:"center", padding:20, fontFamily:"sans-serif"}}>
      <div style={{background:"white", borderRadius:32, padding:24, width:"100%", maxWidth:420, boxShadow:"0 10px 40px rgba(0,0,0,0.05)", height:"fit-content"}}>
        {onBack && <button onClick={onBack} style={{background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#B2BEC3", marginBottom:10}}>← 뒤로</button>}
        {title && <h1 style={{margin:"0 0 20px", fontSize:22, fontWeight:900}}>{title}</h1>}
        {children}
      </div>
    </div>
  );

  if (view === "grade") return (
    <Layout title="학년 선택">
      <div style={{display:"grid", gap:16}}>
        {[2, 3].map(g => (
          <button key={g} onClick={()=>{setSelG(g); setView("semester");}} style={cardStyle("#FFF", "#EEE")}>
            <span style={{fontSize:50}}>{GRADE_DATA[g].emoji}</span>
            <b style={{fontSize:20, marginTop:10}}>{GRADE_DATA[g].name}</b>
          </button>
        ))}
      </div>
    </Layout>
  );

  if (view === "semester") return (
    <Layout onBack={()=>setView("grade")} title={`${selG}학년 학기`}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {[1, 2].map(s => (
          <button key={s} onClick={()=>{setSelS(s); setView("unit");}} style={cardStyle(GRADE_DATA[selG].semesters[s].bg, GRADE_DATA[selG].semesters[s].border)}>
            <div style={{fontSize:18, fontWeight:900}}>{s}학기</div>
          </button>
        ))}
      </div>
    </Layout>
  );

  if (view === "unit") return (
    <Layout onBack={()=>setView("semester")} title={`${selG}학년 ${selS}학기`}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        {GRADE_DATA[selG].semesters[selS].units.map(u => (
          <button key={u.id} onClick={()=>{setSelU(u); setView("quiz");}} style={cardStyle(u.light, u.border, "left")}>
            <div style={{fontSize:24}}>{u.emoji}</div>
            <div style={{fontSize:12, fontWeight:900}}>{u.id}단원</div>
            <div style={{fontSize:13, fontWeight:700, color:u.color}}>{u.title}</div>
          </button>
        ))}
      </div>
    </Layout>
  );

  if (view === "quiz") return (
    <Layout onBack={()=>setView("unit")} title={selU.title}>
      <QuizScreen unit={selU} onBack={()=>setView("unit")} />
    </Layout>
  );
}

function QuizScreen({ unit, onBack }) {
  const [q, setQ] = useState(() => unit.gen());
  const [ans, setAns] = useState(null);
  const [status, setStatus] = useState(null);

  const check = (c) => {
    if(status) return;
    setAns(c);
    setStatus(c === q.ans ? "correct" : "wrong");
  };

  return (
    <div style={{textAlign:"center"}}>
      <div style={{background:unit.light, padding:30, borderRadius:24, border:`2px solid ${unit.border}`, marginBottom:20}}>
        <h3 style={{fontSize:20, margin:0, wordBreak:"keep-all"}}>{q.q}</h3>
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
          <p style={{color: status==="correct"?"#2ECC71":"#E74C3C", fontWeight:800, marginBottom:10}}>{status==="correct"?"정답! 👏":"틀렸어요! 🧐"}</p>
          <button onClick={()=>{setQ(unit.gen()); setAns(null); setStatus(null);}} style={{width:"100%", padding:15, borderRadius:16, background:unit.color, color:"#fff", border:"none", fontWeight:800, cursor:"pointer"}}>다음 문제</button>
        </div>
      )}
    </div>
  );
}

const cardStyle = (bg, border, align="center") => ({
  padding:20, borderRadius:24, border:`2px solid ${border}`, background:bg, cursor:"pointer", textAlign:align, display:"flex", flexDirection:"column", gap:5
});
