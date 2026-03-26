import React, { useState } from "react";

/* ══════════════════════════════════════════════════
   [1] 문제 생성 로직 (2학년 & 3학년 전 단원)
══════════════════════════════════════════════════ */

// --- 공통 및 2학년 로직 ---
const gen2_1_1 = () => { const a = Math.floor(Math.random()*800)+100; return { q: `다음 숫자를 읽어보세요: ${a}`, choices: [String(a), String(a+10), String(a-5), String(a+100)].sort(()=>Math.random()-0.5), ans: String(a), explain: "세 자리 수 읽기 연습입니다." }; };
const gen2_1_3 = () => { const a = Math.floor(Math.random()*50)+10, b = Math.floor(Math.random()*40)+5; return { q: `${a} + ${b} = ?`, choices: [String(a+b), String(a+b+10), String(a+b-1), String(a+b+2)].sort(()=>Math.random()-0.5), ans: String(a+b), explain: "받아올림이 있는 덧셈입니다." }; };
const gen2_1_3_sub = () => { const a = Math.floor(Math.random()*50)+50, b = Math.floor(Math.random()*40)+1; return { q: `${a} - ${b} = ?`, choices: [String(a-b), String(a-b-10), String(a-b+5), String(a-b+1)].sort(()=>Math.random()-0.5), ans: String(a-b), explain: "받아내림이 있는 뺄셈입니다." }; };
const genMul = (d) => { const b = Math.floor(Math.random()*9)+1; return { q: `${d} × ${b} = ?`, choices: [String(d*b), String(d*b+d), String(d*b-d), String(d*b+1)].sort(()=>Math.random()-0.5), ans: String(d*b), explain: `${d}단 곱셈입니다.` }; };

// --- 3학년 로직 ---
const gen3_add_sub = () => {
  const a = Math.floor(Math.random()*500)+200, b = Math.floor(Math.random()*400)+100, isAdd = Math.random()>0.5, ans = isAdd?a+b:a-b;
  return { q: `${a} ${isAdd?'+':'-'} ${b} = ?`, choices: [String(ans), String(ans+10), String(ans-10), String(ans+2)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `세 자리 수의 ${isAdd?'덧셈':'뺄셈'}입니다.` };
};
const gen3_div = () => {
  const b = Math.floor(Math.random()*8)+2, ans = Math.floor(Math.random()*8)+2, a = b*ans;
  return { q: `${a} ÷ ${b} = ?`, choices: [String(ans), String(ans+1), String(b), String(a-b)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `${b} × ${ans} = ${a} 이므로 정답은 ${ans}!` };
};
const gen3_mul_large = () => {
  const a = Math.floor(Math.random()*50)+10, b = Math.floor(Math.random()*8)+2, ans = a*b;
  return { q: `${a} × ${b} = ?`, choices: [String(ans), String(ans+b), String(ans-b), String(ans+10)].sort(()=>Math.random()-0.5), ans: String(ans), explain: "두 자리 수와 한 자리 수의 곱셈입니다." };
};
const gen3_frac = () => {
  const total = 8, part = Math.floor(Math.random()*6)+1;
  return { q: `전체를 똑같이 ${total}로 나눈 것 중 ${part}만큼을 분수로?`, choices: [`${part}/${total}`, `${total-part}/${total}`, `1/${total}`, `${total}/${part}`].sort(()=>Math.random()-0.5), ans: `${part}/${total}`, explain: "분수는 전체에 대한 부분의 크기입니다." };
};

/* ══════════════════════════════════════════════════
   [2] 데이터 구조 (24개 단원 전체 복구)
══════════════════════════════════════════════════ */
const GRADE_DATA = {
  2: {
    name: "2학년", emoji: "🐥",
    semesters: {
      1: { title: "2학년 1학기", bg: "linear-gradient(135deg,#FFF9C4,#FFF176)", border: "#FBC02D", units: [
        {id:1, title:"세 자리 수", emoji:"🔢", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen2_1_1},
        {id:2, title:"여러 가지 도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:()=>({q:"삼각형의 꼭짓점은 몇 개인가요?", choices:["3개","4개","2개","5개"], ans:"3개", explain:"삼각형은 꼭짓점이 3개입니다."})},
        {id:3, title:"덧셈과 뺄셈", emoji:"➕", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen2_1_3},
        {id:4, title:"길이 재기", emoji:"📏", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:()=>({q:"15cm + 10cm = ?", choices:["25cm","35cm","15cm","20cm"], ans:"25cm", explain:"길이의 합입니다."})},
        {id:5, title:"분류하기", emoji:"📁", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:()=>({q:"기준에 따라 나누는 것은?", choices:["분류","나열","합치기","정리"], ans:"분류", explain:"분류의 정의입니다."})},
        {id:6, title:"곱셈", emoji:"✖️", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:()=>genMul(2)},
      ]},
      2: { title: "2학년 2학기", bg: "linear-gradient(135deg,#E8F5E9,#A5D6A7)", border: "#4CAF50", units: [
        {id:1, title:"네 자리 수", emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:()=>gen2_1_1},
        {id:2, title:"구구단", emoji:"✖️", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:()=>genMul(7)},
        {id:3, title:"길이 재기(2)", emoji:"📏", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:()=>({q:"2m 30cm는 몇 cm?", choices:["230cm","203cm","320cm","50cm"], ans:"230cm", explain:"1m = 100cm입니다."})},
        {id:4, title:"시각과 시간", emoji:"⏱️", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:()=>({q:"1시간 20분은 몇 분?", choices:["80분","60분","120분","100분"], ans:"80분", explain:"1시간은 60분입니다."})},
        {id:5, title:"표와 그래프", emoji:"📊", color:"#10AC84", light:"#E0F2F1", border:"#80CBC4", gen:()=>({q:"자료를 한눈에 보기 좋게 정리한 것?", choices:["표","그림","글","낙서"], ans:"표", explain:"표와 그래프의 용도입니다."})},
        {id:6, title:"규칙 찾기", emoji:"✨", color:"#576574", light:"#F5F5F5", border:"#BDBDBD", gen:()=>({q:"5-10-15-? 다음은?", choices:["20","25","16","30"], ans:"20", explain:"5씩 커지는 규칙입니다."})},
      ]}
    }
  },
  3: {
    name: "3학년", emoji: "🦁",
    semesters: {
      1: { title: "3학년 1학기", bg: "linear-gradient(135deg,#E3F2FD,#BBDEFB)", border: "#64B5F6", units: [
        {id:1, title:"덧셈과 뺄셈", emoji:"➕", color:"#FF6B81", light:"#FFF5F5", border:"#FFA8A8", gen:gen3_add_sub},
        {id:2, title:"평면도형", emoji:"📐", color:"#48DBFB", light:"#E3FAFC", border:"#99E9F2", gen:()=>({q:"네 각이 모두 직각인 사각형?", choices:["직사각형","삼각형","원","오각형"], ans:"직사각형", explain:"직사각형의 특징입니다."})},
        {id:3, title:"나눗셈", emoji:"➗", color:"#1DD1A1", light:"#EBFBEE", border:"#B2F2BB", gen:gen3_div},
        {id:4, title:"곱셈", emoji:"✖️", color:"#FECA57", light:"#FFF9DB", border:"#FFE066", gen:gen3_mul_large},
        {id:5, title:"길이와 시간", emoji:"⏱️", color:"#5F27CD", light:"#F3E5F5", border:"#D1C4E9", gen:()=>({q:"1km는 몇 m인가요?", choices:["1000m","100m","10m","10000m"], ans:"1000m", explain:"1km = 1000m입니다."})},
        {id:6, title:"분수와 소수", emoji:"🍰", color:"#FF9FF3", light:"#FFF0F6", border:"#FFB2D1", gen:gen3_frac},
      ]},
      2: { title: "3학년 2학기", bg: "linear-gradient(135deg,#FFF3E0,#FFE0B2)", border: "#FFB74D", units: [
        {id:1, title:"곱셈(2)", emoji:"✖️", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A", gen:gen3_mul_large},
        {id:2, title:"나눗셈(2)", emoji:"➗", color:"#00D2D3", light:"#E0F7FA", border:"#80DEEA", gen:gen3_div},
        {id:3, title:"원", emoji:"⭕", color:"#54A0FF", light:"#E7F5FF", border:"#A5D8FF", gen:()=>({q:"원의 반지름이 4cm면 지름은?", choices:["8cm","4cm","2cm","12cm"], ans:"8cm", explain:"지름은 반지름의 2배입니다."})},
        {id:4, title:"분수", emoji:"🍕", color:"#EE5253", light:"#FFEBEE", border:"#EF9A9A", gen:gen3_frac},
        {id:5, title:"들이와 무게", emoji:"⚖️", color:"#10AC84", light:"#E0F2F1", border:"#80CBC4", gen:()=>({q:"1L는 몇 mL인가요?", choices:["1000mL","100mL","500mL","10mL"], ans:"1000mL", explain:"들이의 단위 환산입니다."})},
        {id:6, title:"자료의 정리", emoji:"📊", color:"#576574", light:"#F5F5F5", border:"#BDBDBD", gen:()=>({q:"막대 모양으로 나타낸 그래프는?", choices:["막대그래프","그림그래프","원그래프","꺾은선그래프"], ans:"막대그래프", explain:"막대그래프입니다."})},
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
      <QuizScreen unit={selU} />
    </Layout>
  );
}

function QuizScreen({ unit }) {
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
