import React, { useState } from "react";

/* ══════════════════════════════════════════════════
   3학년 1학기 문제 생성기
══════════════════════════════════════════════════ */
function gen3_1_1() {
  const a = Math.floor(Math.random() * 500) + 200, b = Math.floor(Math.random() * 400) + 100;
  const isAdd = Math.random() > 0.5;
  const ans = isAdd ? a + b : a - b;
  return { q: `${a} ${isAdd ? '+' : '-'} ${b} = ?`, choices: [String(ans), String(ans+10), String(ans-10), String(ans+2)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `세 자리 수의 ${isAdd?'덧셈':'뺄셈'}입니다. 정답은 ${ans}이에요.` };
}
function gen3_1_2() {
  const types = ["직각삼각형", "직사각형", "정사각형"];
  const pick = types[Math.floor(Math.random() * types.length)];
  const desc = pick === "직각삼각형" ? "한 각이 직각인 삼각형" : pick === "정사각형" ? "네 변의 길이가 모두 같고 네 각이 모두 직각인 사각형" : "네 각이 모두 직각인 사각형";
  return { q: `다음 중 "${desc}"은/는 무엇일까요?`, choices: types.sort(()=>Math.random()-0.5), ans: pick, explain: `${pick}의 특징을 잘 기억하세요!` };
}
function gen3_1_3() {
  const b = Math.floor(Math.random() * 8) + 2, ans = Math.floor(Math.random() * 8) + 2, a = b * ans;
  return { q: `${a} ÷ ${b} = ?`, choices: [String(ans), String(ans+1), String(b), String(a-b)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `${b} × ${ans} = ${a} 이므로, ${a} ÷ ${b} = ${ans}입니다.` };
}
function gen3_1_4() {
  const a = Math.floor(Math.random() * 40) + 11, b = Math.floor(Math.random() * 8) + 2, ans = a * b;
  return { q: `${a} × ${b} = ?`, choices: [String(ans), String(ans+b), String(ans-b), String(ans+10)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `십의 자리와 일의 자리를 각각 곱해서 더해보세요.` };
}
function gen3_1_5() {
  const type = Math.random() > 0.5;
  if (type) { const km = Math.floor(Math.random()*5)+1; return { q: `${km}km 500m는 몇 m인가요?`, choices: [`${km}500m`, `${km}050m`, `${km}50m`, `${km*1000}m`].sort(()=>Math.random()-0.5), ans: `${km}500m`, explain: `1km = 1000m 입니다.` }; }
  const m = Math.floor(Math.random()*40)+10; return { q: `1분 ${m}초는 몇 초인가요?`, choices: [String(60+m), String(100+m), String(m), "120초"].sort(()=>Math.random()-0.5), ans: String(60+m), explain: `1분 = 60초입니다. 60 + ${m} = ${60+m}초!` };
}
function gen3_1_6() {
  const total = 5, part = Math.floor(Math.random()*4)+1;
  return { q: `전체를 똑같이 ${total}로 나눈 것 중 ${part}만큼을 분수로 나타내면?`, choices: [`${part}/${total}`, `${total-part}/${total}`, `1/${total}`, `${total}/${part}`].sort(()=>Math.random()-0.5), ans: `${part}/${total}`, explain: `전체 분의 부분으로 나타냅니다.` };
}

/* ══════════════════════════════════════════════════
   3학년 2학기 문제 생성기
══════════════════════════════════════════════════ */
function gen3_2_1() {
  const a = Math.floor(Math.random()*80)+12, b = Math.floor(Math.random()*8)+2, ans = a * b;
  return { q: `${a} × ${b} = ?`, choices: [String(ans), String(ans+10), String(ans-10), String(ans+b)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `곱셈 결과는 ${ans}입니다.` };
}
function gen3_2_2() {
  const b = Math.floor(Math.random()*7)+2, ans = Math.floor(Math.random()*30)+10, a = b * ans;
  return { q: `${a} ÷ ${b} = ?`, choices: [String(ans), String(ans+1), String(ans-1), String(ans+10)].sort(()=>Math.random()-0.5), ans: String(ans), explain: `나눗셈의 몫은 ${ans}입니다.` };
}
function gen3_2_3() {
  const r = Math.floor(Math.random()*9)+2;
  return { q: `반지름이 ${r}cm인 원의 지름은 몇 cm일까요?`, choices: [String(r*2), String(r), String(r+2), String(r*3)].sort(()=>Math.random()-0.5), ans: String(r*2), explain: `원의 지름은 반지름의 2배입니다.` };
}
function gen3_2_4() {
  return { q: `분모가 7인 진분수 중에서 가장 큰 수는?`, choices: ["6/7", "7/7", "1/7", "5/7"], ans: "6/7", explain: `진분수는 분자가 분모보다 작아야 하므로 6/7이 가장 커요.` };
}
function gen3_2_5() {
  const L = Math.floor(Math.random()*5)+2;
  return { q: `${L}L는 몇 mL인가요?`, choices: [`${L}000mL`, `${L}00mL`, `${L}0mL`, `${L*10}mL`].sort(()=>Math.random()-0.5), ans: `${L}000mL`, explain: `1L = 1000mL 입니다.` };
}
function gen3_2_6() {
  return { q: `그림그래프에서 큰 그림이 10명, 작은 그림이 1명을 나타낼 때,\n큰 그림 3개와 작은 그림 5개는 몇 명인가요?`, choices: ["35명", "53명", "8명", "305명"], ans: "35명", explain: `30 + 5 = 35명입니다.` };
}

const SEMESTER_DATA = {
  1: {
    title:"3학년 1학기", emoji:"🌱", bg:"linear-gradient(135deg,#E3F2FD,#BBDEFB)", border:"#64B5F6",
    units:[
      {id:1,title:"덧셈과 뺄셈", emoji:"➕",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gen:gen3_1_1},
      {id:2,title:"평면도형", emoji:"📐",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gen:gen3_1_2},
      {id:3,title:"나눗셈", emoji:"➗",color:"#1DD1A1",light:"#E8F5E9",border:"#A5D6A7",gen:gen3_1_3},
      {id:4,title:"곱셈", emoji:"✖️",color:"#FECA57",light:"#FFF8E1",border:"#FFD54F",gen:gen3_1_4},
      {id:5,title:"길이와 시간", emoji:"⏱️",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gen:gen3_1_5},
      {id:6,title:"분수와 소수", emoji:"🍰",color:"#FF9FF3",light:"#FDF2F8",border:"#F9A8D4",gen:gen3_1_6},
    ]
  },
  2: {
    title:"3학년 2학기", emoji:"🍎", bg:"linear-gradient(135deg,#FFF3E0,#FFE0B2)", border:"#FFB74D",
    units:[
      {id:1,title:"곱셈", emoji:"✖️",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gen:gen3_2_1},
      {id:2,title:"나눗셈", emoji:"➗",color:"#00D2D3",light:"#E0F7FA",border:"#80DEEA",gen:gen3_2_2},
      {id:3,title:"원", emoji:"⭕",color:"#54A0FF",light:"#E3F2FD",border:"#90CAF9",gen:gen3_2_3},
      {id:4,title:"분수", emoji:"🍕",color:"#EE5253",light:"#FFEBEE",border:"#EF9A9A",gen:gen3_2_4},
      {id:5,title:"들이와 무게", emoji:"⚖️",color:"#10AC84",light:"#E0F2F1",border:"#80CBC4",gen:gen3_2_5},
      {id:6,title:"자료의 정리", emoji:"📊",color:"#576574",light:"#F5F5F5",border:"#BDBDBD",gen:gen3_2_6},
    ]
  }
};

const TOTAL_Q = 20;

function Confetti() {
  const colors=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E"];
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>
      {Array.from({length:36},(_,i)=>(
        <div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-20px",width:8+Math.random()*8,height:8+Math.random()*8,borderRadius:Math.random()>0.5?"50%":"2px",background:colors[i%6],animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`}}/>
      ))}
    </div>
  );
}

function SemesterSelect({ starCounts, onSelect }) {
  return (
    <div style={{textAlign:"center",padding:"8px 0"}}>
      <div style={{fontSize:52,marginBottom:8}}>🎒</div>
      <h1 style={{margin:0,fontSize:24,fontWeight:900,color:"#2D3436"}}>3학년 수학</h1>
      <p style={{margin:"6px 0 24px",color:"#B2BEC3",fontSize:13}}>오늘도 Kim Saem과 함께 열공!</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {[1,2].map(sem => {
          const sd=SEMESTER_DATA[sem];
          const sc=starCounts[sem]||0;
          return (
            <button key={sem} onClick={()=>onSelect(sem)} style={{background:sd.bg,border:`3px solid ${sd.border}`,borderRadius:24,padding:"24px 16px",cursor:"pointer",boxShadow:`0 8px 24px rgba(0,0,0,0.08)`}}>
              <div style={{fontSize:40,marginBottom:6}}>{sd.emoji}</div>
              <div style={{fontSize:16,fontWeight:900,color:"#2D3436",marginBottom:4}}>{sd.title}</div>
              <div style={{fontSize:11,color:"#888",marginBottom:10}}>6단원 완비</div>
              <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginBottom:4}}>
                {Array.from({length:18},(_,j)=><span key={j} style={{fontSize:11,opacity:j<sc?1:0.18}}>⭐</span>)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UnitSelect({ semester, stars, onSelect, onBack }) {
  const sd=SEMESTER_DATA[semester];
  return (
    <div style={{padding:"0 4px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div>
          <div style={{fontSize:11,color:"#B2BEC3"}}>초등 3학년</div>
          <div style={{fontSize:18,fontWeight:900,color:"#2D3436"}}>{sd.emoji} {sd.title}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {sd.units.map((u,i)=>(
          <button key={u.id} onClick={()=>onSelect(u.id)}
            style={{background:u.light,border:`2.5px solid ${u.border}`,borderRadius:20,padding:"14px 12px",cursor:"pointer",textAlign:"left",boxShadow:"0 3px 12px rgba(0,0,0,0.06)"}}>
            <div style={{fontSize:24,marginBottom:4}}>{u.emoji}</div>
            <div style={{fontSize:12,fontWeight:900,color:"#2D3436"}}>{u.id}단원</div>
            <div style={{fontSize:11,fontWeight:700,color:u.color}}>{u.title}</div>
            <div style={{marginTop:6,display:"flex",gap:1}}>
              {Array.from({length:3},(_,j)=><span key={j} style={{fontSize:12,opacity:j<(stars[`${semester}-${u.id}`]||0)?1:0.2}}>⭐</span>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuizScreen({ semester, unitId, onBack, onStar }) {
  const unit=SEMESTER_DATA[semester].units.find(u=>u.id===unitId);
  const [questions]=useState(()=>Array.from({length:TOTAL_Q},()=>unit.gen()));
  const [qIdx,setQIdx]=useState(0);
  const [selected,setSelected]=useState(null);
  const [status,setStatus]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);

  const q=questions[qIdx];

  const pick=(choice)=>{
    if(status)return;
    setSelected(choice);
    if(choice===q.ans){ setStatus("correct"); setScore(s=>s+1); } 
    else { setStatus("wrong"); }
  };

  const next=()=>{
    if(qIdx+1>=TOTAL_Q){
      const fs=score+(status==="correct"?1:0);
      onStar(`${semester}-${unitId}`,fs>=18?3:fs>=12?2:1);
      setDone(true);
    } else {
      setQIdx(i=>i+1); setSelected(null); setStatus(null);
    }
  };

  if(done){
    return(
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <Confetti/>
        <div style={{fontSize:72,marginBottom:12}}>🏆</div>
        <div style={{fontSize:24,fontWeight:900,color:unit.color,marginBottom:4}}>{unit.title} 학습 완료!</div>
        <div style={{fontSize:16,color:"#636E72",marginBottom:24}}>{TOTAL_Q}문제 중 {score}개 정답</div>
        <button onClick={onBack} style={btnStyle(unit.color)}>단원 선택으로</button>
      </div>
    );
  }

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{flex:1, height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(qIdx/TOTAL_Q)*100}%`,background:unit.color,transition:"width 0.4s"}}/>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:unit.color}}>{qIdx+1}/{TOTAL_Q}</span>
      </div>

      <div style={{background:unit.light,border:`2px solid ${unit.border}`,borderRadius:24,padding:"30px 20px",marginBottom:20,textAlign:"center"}}>
        <div style={{fontSize:18,fontWeight:800,color:"#2D3436",lineHeight:1.6}}>{q.q}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {q.choices.map((c,i)=>{
          let bg="#fff",border="2px solid #E0E0E0";
          if(selected===c){
            bg=status==="correct"?"#E8F5E9":"#FFEBEE";
            border=status==="correct"?"2px solid #66BB6A":"2px solid #EF9A9A";
          }
          if(status&&c===q.ans) border="2px solid #66BB6A";
          return(<button key={i} onClick={()=>pick(c)} style={{padding:"15px",borderRadius:16,background:bg,border,fontWeight:800,cursor:"pointer"}}>{c}</button>);
        })}
      </div>

      {status && (
        <div style={{marginBottom:15,padding:"15px",borderRadius:16,background:status==="correct"?"#E8F5E9":"#FFF9E6",fontSize:13,lineHeight:1.5}}>
          <b>{status==="correct"?"정답입니다!":"아쉬워요!"}</b><br/>{q.explain}
        </div>
      )}

      {status && <button onClick={next} style={btnStyle(unit.color)}>다음 문제로</button>}
    </div>
  );
}

function btnStyle(bg){return{width:"100%",padding:"15px",borderRadius:16,border:"none",background:bg,color:"white",fontSize:16,fontWeight:900,cursor:"pointer",boxShadow:`0 4px 12px ${bg}44`};}

export default function App() {
  const [screen,setScreen]=useState("semester");
  const [activeSem,setActiveSem]=useState(null);
  const [activeUnit,setActiveUnit]=useState(null);
  const [stars,setStars]=useState({});

  const starCounts={
    1:SEMESTER_DATA[1].units.reduce((s,u)=>s+(stars[`1-${u.id}`]||0),0),
    2:SEMESTER_DATA[2].units.reduce((s,u)=>s+(stars[`2-${u.id}`]||0),0),
  };

  return(
    <div style={{minHeight:"100vh",background:"#F8F9FA",display:"flex",justifyContent:"center",padding:20,fontFamily:"sans-serif"}}>
      <div style={{background:"white",borderRadius:32,padding:24,width:"100%",maxWidth:420,boxShadow:"0 10px 40px rgba(0,0,0,0.05)", height:"fit-content"}}>
        {screen==="semester"&&<SemesterSelect starCounts={starCounts} onSelect={sem=>{setActiveSem(sem);setScreen("units");}}/>}
        {screen==="units"&&<UnitSelect semester={activeSem} stars={stars} onSelect={uid=>{setActiveUnit(uid);setScreen("quiz");}} onBack={()=>setScreen("semester")}/>}
        {screen==="quiz"&&<QuizScreen semester={activeSem} unitId={activeUnit} onBack={()=>setScreen("units")} onStar={(key,s)=>setStars(p=>({...p,[key]:Math.max(p[key]||0,s)}))}/>}
      </div>
      <style>{`@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  );
}
