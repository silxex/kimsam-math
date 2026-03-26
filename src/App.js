import React, { useState } from "react";

/* ══════════════════════════════════════════════════
   도형 SVG 컴포넌트
══════════════════════════════════════════════════ */
function ShapeSVG({ shape, size = 80 }) {
  const s = size;
  if (shape === "삼각형") return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <polygon points="50,8 95,92 5,92" fill="#FFD8A8" stroke="#FF9F43" strokeWidth="4" strokeLinejoin="round"/>
    </svg>
  );
  if (shape === "사각형") return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="80" rx="6" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="4"/>
    </svg>
  );
  if (shape === "원") return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="42" fill="#B2F2BB" stroke="#51CF66" strokeWidth="4"/>
    </svg>
  );
  if (shape === "오각형") return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <polygon points="50,5 97,36 79,91 21,91 3,36" fill="#E9BBFD" stroke="#BE4BDB" strokeWidth="4" strokeLinejoin="round"/>
    </svg>
  );
  if (shape === "직사각형") return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="5" y="22" width="90" height="56" rx="5" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="4"/>
    </svg>
  );
  return null;
}

/* ══════════════════════════════════════════════════
   단원 1 – 세 자리 수 (20문제 풀)
══════════════════════════════════════════════════ */
function genUnit1() {
  const type = Math.floor(Math.random() * 5);

  if (type === 0) {
    // 자릿값 읽기
    const n = Math.floor(Math.random()*900)+100;
    const h=Math.floor(n/100), t=Math.floor((n%100)/10), o=n%10;
    const place = ["백","십","일"][Math.floor(Math.random()*3)];
    const ans = place==="백"?h : place==="십"?t : o;
    return {
      q:`${n}에서 ${place}의 자리 숫자는 무엇인가요?`,
      choices:[String(ans),String((ans+1)%10),String((ans+2)%10),String((ans+3)%10)].sort(()=>Math.random()-0.5),
      ans:String(ans), explain:`${n} = ${h}백 + ${t}십 + ${o} → ${place}의 자리는 ${ans}이에요.`
    };
  }
  if (type === 1) {
    // 수 읽기
    const h=Math.floor(Math.random()*8)+1, t=Math.floor(Math.random()*9)+1, o=Math.floor(Math.random()*9)+1;
    const n=h*100+t*10+o;
    return {
      q:`${h}백 ${t}십 ${o}은 얼마인가요?`,
      choices:[String(n),String(n+10),String(n-1),String(n+100)].sort(()=>Math.random()-0.5),
      ans:String(n), explain:`${h}백(${h*100}) + ${t}십(${t*10}) + ${o} = ${n}이에요.`
    };
  }
  if (type === 2) {
    // 크기 비교
    const a=Math.floor(Math.random()*899)+100, b=Math.floor(Math.random()*899)+100;
    const bigger=a>b?a:b;
    return {
      q:`더 큰 수는 무엇인가요?`,
      choices:[String(a),String(b)],
      ans:String(bigger), explain:`${a}와 ${b} 중 더 큰 수는 ${bigger}이에요.`
    };
  }
  if (type === 3) {
    // 뛰어세기
    const start=Math.floor(Math.random()*50)*10+100, step=[10,100][Math.floor(Math.random()*2)];
    const seq=[start,start+step,start+step*2,"?",start+step*4];
    const ans=start+step*3;
    return {
      q:`규칙에 맞게 빈칸에 들어갈 수는?\n${seq.join(" → ")}`,
      choices:[String(ans),String(ans+step),String(ans-step),String(ans+10)].sort(()=>Math.random()-0.5),
      ans:String(ans), explain:`${step}씩 커지는 규칙이에요. ${start+step*2} + ${step} = ${ans}`
    };
  }
  // 자릿값 분해
  const n=Math.floor(Math.random()*900)+100;
  const h=Math.floor(n/100), t=Math.floor((n%100)/10), o=n%10;
  return {
    q:`${n} = □백 + ${t}십 + ${o}일 때, □에 들어갈 수는?`,
    choices:[String(h),String(h+1),String(h-1),String(t)].sort(()=>Math.random()-0.5),
    ans:String(h), explain:`${n}에서 백의 자리는 ${h}이므로 ${h}백이에요.`
  };
}

/* ══════════════════════════════════════════════════
   단원 2 – 여러 가지 도형 (20문제 풀, 그림 포함)
══════════════════════════════════════════════════ */
const SHAPES = [
  { name:"삼각형", sides:3, vertices:3, desc:"꼭짓점 3개, 변 3개인 도형" },
  { name:"사각형", sides:4, vertices:4, desc:"꼭짓점 4개, 변 4개인 도형" },
  { name:"원",     sides:0, vertices:0, desc:"둥글고 꼭짓점이 없는 도형" },
  { name:"오각형", sides:5, vertices:5, desc:"꼭짓점 5개, 변 5개인 도형" },
  { name:"직사각형",sides:4,vertices:4, desc:"네 각이 모두 직각인 사각형" },
];

function genUnit2() {
  const type = Math.floor(Math.random()*4);
  const s = SHAPES[Math.floor(Math.random()*SHAPES.length)];

  if (type === 0) {
    // 도형 이름 맞추기 (그림 제시)
    const others = SHAPES.filter(x=>x.name!==s.name).sort(()=>Math.random()-0.5).slice(0,3);
    return {
      showShape: s.name,
      q:`이 도형의 이름은 무엇인가요?`,
      choices:[s.name,...others.map(x=>x.name)].sort(()=>Math.random()-0.5),
      ans:s.name, explain:`${s.desc}이에요.`
    };
  }
  if (type === 1) {
    // 변의 수
    const filtered = SHAPES.filter(x=>x.sides>0);
    const sh = filtered[Math.floor(Math.random()*filtered.length)];
    const wrongs = [sh.sides-1, sh.sides+1, sh.sides+2].filter(x=>x>0);
    return {
      showShape: sh.name,
      q:`이 도형의 변은 몇 개인가요?`,
      choices:[String(sh.sides),...wrongs.map(String)].slice(0,4).sort(()=>Math.random()-0.5),
      ans:String(sh.sides), explain:`${sh.name}은 변이 ${sh.sides}개 있어요.`
    };
  }
  if (type === 2) {
    // 꼭짓점 수
    const filtered = SHAPES.filter(x=>x.vertices>0);
    const sh = filtered[Math.floor(Math.random()*filtered.length)];
    return {
      showShape: sh.name,
      q:`이 도형의 꼭짓점은 몇 개인가요?`,
      choices:[String(sh.vertices),String(sh.vertices+1),String(sh.vertices-1),String(sh.vertices+2)].sort(()=>Math.random()-0.5),
      ans:String(sh.vertices), explain:`${sh.name}의 꼭짓점은 ${sh.vertices}개예요.`
    };
  }
  // 설명 보고 도형 맞추기
  const sh = SHAPES[Math.floor(Math.random()*SHAPES.length)];
  const others = SHAPES.filter(x=>x.name!==sh.name).sort(()=>Math.random()-0.5).slice(0,3);
  return {
    q:`"${sh.desc}" — 어떤 도형일까요?`,
    choices:[sh.name,...others.map(x=>x.name)].sort(()=>Math.random()-0.5),
    ans:sh.name, explain:`${sh.name}은 ${sh.desc}이에요.`
  };
}

/* ══════════════════════════════════════════════════
   단원 3 – 덧셈과 뺄셈 (20문제 풀)
══════════════════════════════════════════════════ */
function genUnit3() {
  const type = Math.floor(Math.random()*5);

  if (type === 0) {
    // 두 자리 + 한 자리 (받아올림)
    const a=Math.floor(Math.random()*40)+10, b=Math.floor(Math.random()*9)+1;
    const ans=a+b;
    return {
      q:`${a} + ${b} = ?`,
      choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),
      ans:String(ans), explain:`${a} + ${b} = ${ans}`
    };
  }
  if (type === 1) {
    // 두 자리 + 두 자리
    const a=Math.floor(Math.random()*49)+10, b=Math.floor(Math.random()*40)+10;
    const ans=a+b;
    return {
      q:`${a} + ${b} = ?`,
      choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),
      ans:String(ans), explain:`${a} + ${b}:\n십의 자리끼리, 일의 자리끼리 더해요.\n= ${ans}`
    };
  }
  if (type === 2) {
    // 두 자리 - 한 자리
    const a=Math.floor(Math.random()*80)+20, b=Math.floor(Math.random()*9)+1;
    const ans=a-b;
    return {
      q:`${a} - ${b} = ?`,
      choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),
      ans:String(ans), explain:`${a} - ${b} = ${ans}`
    };
  }
  if (type === 3) {
    // 빈칸 채우기 덧셈
    const a=Math.floor(Math.random()*40)+10, b=Math.floor(Math.random()*20)+5;
    const ans=a+b;
    return {
      q:`${a} + □ = ${ans}\n□에 들어갈 수는?`,
      choices:[String(b),String(b+1),String(b-1),String(b+10)].sort(()=>Math.random()-0.5),
      ans:String(b), explain:`${ans} - ${a} = ${b}이에요.`
    };
  }
  // 빈칸 채우기 뺄셈
  const ans2=Math.floor(Math.random()*40)+10, b2=Math.floor(Math.random()*10)+1;
  const a2=ans2+b2;
  return {
    q:`${a2} - □ = ${ans2}\n□에 들어갈 수는?`,
    choices:[String(b2),String(b2+1),String(b2-1),String(b2+2)].sort(()=>Math.random()-0.5),
    ans:String(b2), explain:`${a2} - ${ans2} = ${b2}이에요.`
  };
}

/* ══════════════════════════════════════════════════
   단원 4 – 길이 재기 (20문제 풀)
══════════════════════════════════════════════════ */
function genUnit4() {
  const type = Math.floor(Math.random()*4);
  const cm = Math.floor(Math.random()*15)+2;

  if (type === 0) {
    return {
      q:`자로 재었더니 눈금이 0에서 시작해서 ${cm}에서 끝났어요. 길이는 몇 cm인가요?`,
      choices:[String(cm),String(cm+1),String(cm-1),String(cm+2)].sort(()=>Math.random()-0.5),
      ans:String(cm), explain:`0에서 ${cm}까지이므로 길이는 ${cm} cm예요.`
    };
  }
  if (type === 1) {
    const a=Math.floor(Math.random()*10)+5, b=a-Math.floor(Math.random()*4)-1;
    return {
      q:`연필은 ${a} cm, 색연필은 ${b} cm예요.\n두 길이의 합은 몇 cm인가요?`,
      choices:[String(a+b),String(a+b+1),String(a+b-1),String(a+b+2)].sort(()=>Math.random()-0.5),
      ans:String(a+b), explain:`${a} + ${b} = ${a+b} cm예요.`
    };
  }
  if (type === 2) {
    const a=Math.floor(Math.random()*10)+5, b=Math.floor(Math.random()*a-1)+1;
    return {
      q:`리본이 ${a} cm 있었는데 ${b} cm를 잘랐어요.\n남은 리본은 몇 cm인가요?`,
      choices:[String(a-b),String(a-b+1),String(a-b-1),String(a-b+2)].sort(()=>Math.random()-0.5),
      ans:String(a-b), explain:`${a} - ${b} = ${a-b} cm예요.`
    };
  }
  const a=Math.floor(Math.random()*12)+3, b=Math.floor(Math.random()*12)+3;
  const longer = a>=b?"막대 A":"막대 B";
  return {
    q:`막대 A는 ${a} cm, 막대 B는 ${b} cm예요.\n더 긴 막대는?`,
    choices:["막대 A","막대 B"],
    ans:longer, explain:`${a} cm ${a>=b?">":"<"} ${b} cm 이므로 ${longer}이 더 길어요.`
  };
}

/* ══════════════════════════════════════════════════
   단원 5 – 분류하기 (20문제 풀)
══════════════════════════════════════════════════ */
function genUnit5() {
  const type = Math.floor(Math.random()*3);

  const fruitSets = [
    { label:"과일 종류", items:["🍎","🍌","🍊","🍎","🍌","🍎","🍊","🍎"], groups:{"🍎":4,"🍌":2,"🍊":2} },
    { label:"동물 종류", items:["🐶","🐱","🐶","🐰","🐱","🐶","🐰","🐱"], groups:{"🐶":3,"🐱":3,"🐰":2} },
    { label:"탈것 종류", items:["🚗","🚌","🚗","✈️","🚌","🚗","✈️","🚗"], groups:{"🚗":4,"🚌":2,"✈️":2} },
    { label:"모양",      items:["🔺","🔵","🟦","🔺","🔵","🟦","🔺","🔵"], groups:{"🔺":3,"🔵":3,"🟦":2} },
  ];
  const cat = fruitSets[Math.floor(Math.random()*fruitSets.length)];
  const entries = Object.entries(cat.groups);

  if (type === 0) {
    const [ansKey, ansVal] = entries.reduce((a,b)=>b[1]>a[1]?b:a);
    return {
      q:`아래를 ${cat.label}로 분류할 때, 가장 많은 것은?`,
      items: cat.items,
      choices: entries.map(e=>`${e[0]} (${e[1]}개)`).sort(()=>Math.random()-0.5),
      ans:`${ansKey} (${ansVal}개)`,
      explain:`${entries.map(e=>`${e[0]}이 ${e[1]}개`).join(", ")}. 가장 많은 것은 ${ansKey}이에요.`
    };
  }
  if (type === 1) {
    const [ansKey, ansVal] = entries.reduce((a,b)=>b[1]<a[1]?b:a);
    return {
      q:`아래를 ${cat.label}로 분류할 때, 가장 적은 것은?`,
      items: cat.items,
      choices: entries.map(e=>`${e[0]} (${e[1]}개)`).sort(()=>Math.random()-0.5),
      ans:`${ansKey} (${ansVal}개)`,
      explain:`${entries.map(e=>`${e[0]}이 ${e[1]}개`).join(", ")}. 가장 적은 것은 ${ansKey}이에요.`
    };
  }
  const target = entries[Math.floor(Math.random()*entries.length)];
  return {
    q:`아래를 ${cat.label}로 분류할 때, ${target[0]}은 몇 개인가요?`,
    items: cat.items,
    choices:[String(target[1]),String(target[1]+1),String(target[1]-1),String(target[1]+2)].sort(()=>Math.random()-0.5),
    ans:String(target[1]),
    explain:`${cat.items.filter(x=>x===target[0]).length}개예요.`
  };
}

/* ══════════════════════════════════════════════════
   단원 6 – 곱셈 (20문제 풀)
══════════════════════════════════════════════════ */
function genUnit6() {
  const type = Math.floor(Math.random()*5);
  const a=Math.floor(Math.random()*7)+2, b=Math.floor(Math.random()*7)+2;

  if (type === 0) {
    return {
      q:`${a}씩 ${b}묶음이면 모두 몇 개인가요?`,
      choices:[String(a*b),String(a*b+a),String(a*(b-1)),String(a*b+1)].sort(()=>Math.random()-0.5),
      ans:String(a*b), explain:`${a}씩 ${b}묶음 → ${a}×${b} = ${a*b}개`
    };
  }
  if (type === 1) {
    return {
      q:`${a}+${a}+${a}를 곱셈식으로 나타내면?`,
      choices:[`${a}×3`,`${a}×2`,`3×${a+1}`,`${a+1}×3`].sort(()=>Math.random()-0.5),
      ans:`${a}×3`, explain:`같은 수 ${a}을 3번 더하면 ${a}×3이에요. = ${a*3}`
    };
  }
  if (type === 2) {
    return {
      q:`${a}×${b}의 값은 얼마인가요?`,
      choices:[String(a*b),String(a*b+a),String(a*b-a),String(a*b+b)].sort(()=>Math.random()-0.5),
      ans:String(a*b), explain:`${a}×${b} = ${Array.from({length:b},(_,i)=>a).join("+")} = ${a*b}`
    };
  }
  if (type === 3) {
    const ans=a*b;
    return {
      q:`□×${b} = ${ans}\n□에 들어갈 수는?`,
      choices:[String(a),String(a+1),String(a-1),String(b)].sort(()=>Math.random()-0.5),
      ans:String(a), explain:`${ans} ÷ ${b} = ${a}이에요.`
    };
  }
  return {
    q:`사과가 한 봉지에 ${a}개씩 들어 있어요.\n${b}봉지에는 모두 몇 개인가요?`,
    choices:[String(a*b),String(a*b+a),String(a*(b+1)),String(a*b-1)].sort(()=>Math.random()-0.5),
    ans:String(a*b), explain:`${a}×${b} = ${a*b}개예요.`
  };
}

/* ══════════════════════════════════════════════════
   문제 풀 생성 (단원별 20문제)
══════════════════════════════════════════════════ */
const GEN = [genUnit1,genUnit2,genUnit3,genUnit4,genUnit5,genUnit6];

function makePool(unitId) {
  return Array.from({length:20}, ()=>GEN[unitId-1]());
}

/* ══════════════════════════════════════════════════
   상수
══════════════════════════════════════════════════ */
const UNITS = [
  { id:1, title:"세 자리 수",     emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A" },
  { id:2, title:"여러 가지 도형", emoji:"🔷", color:"#48DBFB", light:"#E0F7FA", border:"#80DEEA" },
  { id:3, title:"덧셈과 뺄셈",   emoji:"➕", color:"#FF6B81", light:"#FCE4EC", border:"#F48FB1" },
  { id:4, title:"길이 재기",     emoji:"📏", color:"#A29BFE", light:"#EDE7F6", border:"#CE93D8" },
  { id:5, title:"분류하기",      emoji:"🗂️", color:"#55EFC4", light:"#E0F2F1", border:"#80CBC4" },
  { id:6, title:"곱셈",          emoji:"✖️", color:"#FDCB6E", light:"#FFFDE7", border:"#FFE082" },
];

/* ══════════════════════════════════════════════════
   Confetti
══════════════════════════════════════════════════ */
function Confetti() {
  const colors=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E"];
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>
      {Array.from({length:36},(_,i)=>(
        <div key={i} style={{
          position:"absolute",left:`${Math.random()*100}%`,top:"-20px",
          width:8+Math.random()*8,height:8+Math.random()*8,
          borderRadius:Math.random()>0.5?"50%":"2px",
          background:colors[i%colors.length],
          animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`,
        }}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   단원 선택 화면
══════════════════════════════════════════════════ */
function UnitSelect({ stars, onSelect }) {
  return (
    <div style={{padding:"0 4px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:48,marginBottom:4}}>📚</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>
          2학년 1학기 수학
        </h1>
        <p style={{margin:"6px 0 0",color:"#B2BEC3",fontSize:13,fontFamily:"'Nunito',sans-serif"}}>
          단원을 선택해서 공부해보세요!
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {UNITS.map((u,i)=>(
          <button key={u.id} onClick={()=>onSelect(u.id)}
            style={{
              background:u.light,border:`2.5px solid ${u.border}`,
              borderRadius:20,padding:"16px 12px",cursor:"pointer",textAlign:"left",
              boxShadow:"0 3px 12px rgba(0,0,0,0.06)",
              animation:`slideUp 0.4s ${i*0.07}s both`,
              transition:"transform 0.15s",
            }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <div style={{fontSize:28,marginBottom:6}}>{u.emoji}</div>
            <div style={{fontSize:13,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{u.id}단원</div>
            <div style={{fontSize:11,fontWeight:700,color:u.color,fontFamily:"'Nunito',sans-serif"}}>{u.title}</div>
            <div style={{marginTop:8,display:"flex",gap:2}}>
              {Array.from({length:3},(_,j)=>(
                <span key={j} style={{fontSize:14,opacity:j<(stars[u.id]||0)?1:0.2}}>⭐</span>
              ))}
            </div>
            <div style={{marginTop:4,fontSize:11,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>
              20문제
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   퀴즈 화면
══════════════════════════════════════════════════ */
const TOTAL_Q = 20;

function QuizScreen({ unitId, onBack, onStar }) {
  const unit = UNITS.find(u=>u.id===unitId);
  const [questions] = useState(()=>makePool(unitId));
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[qIdx];
  const progress = (qIdx / TOTAL_Q) * 100;

  const pick = (choice) => {
    if (status) return;
    setSelected(choice);
    if (choice === q.ans) {
      setStatus("correct");
      setConfetti(true);
      setTimeout(()=>setConfetti(false),1800);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore(s=>s+1);
      if (newCombo >= 3) { setShowCombo(true); setTimeout(()=>setShowCombo(false),1600); }
    } else {
      setStatus("wrong");
      setShake(true);
      setShowHint(true);
      setCombo(0);
      setTimeout(()=>setShake(false),600);
    }
  };

  const next = () => {
    if (qIdx + 1 >= TOTAL_Q) {
      const finalScore = score + (status==="correct"?1:0);
      onStar(unitId, finalScore>=18?3:finalScore>=12?2:1);
      setDone(true);
    } else {
      setQIdx(i=>i+1);
      setSelected(null); setStatus(null); setShowHint(false);
    }
  };

  const retry = () => {
    setSelected(null); setStatus(null); setShowHint(false);
  };

  /* ── 완료 화면 ── */
  if (done) {
    const finalScore = score;
    return (
      <div style={{textAlign:"center",padding:"20px 0"}}>
        {confetti && <Confetti/>}
        <div style={{fontSize:72,marginBottom:12}}>
          {finalScore>=18?"🏆":finalScore>=12?"🥈":"🎯"}
        </div>
        <div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>
          {unit.title} 완료!
        </div>
        <div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>
          20문제 중 {finalScore}개 정답
        </div>
        <div style={{fontSize:28,marginBottom:8}}>
          {Array.from({length:3},(_,i)=>(
            <span key={i} style={{opacity:i<(finalScore>=18?3:finalScore>=12?2:1)?1:0.25}}>⭐</span>
          ))}
        </div>
        <div style={{fontSize:13,color:"#B2BEC3",marginBottom:24,fontFamily:"'Nunito',sans-serif"}}>
          {finalScore>=18?"완벽해요! 최고예요 🎊":finalScore>=12?"잘 했어요! 다시 하면 더 잘 할 수 있어요 💪":"조금 더 연습해봐요! 화이팅 🌟"}
        </div>
        <button onClick={onBack} style={btnStyle(unit.color)}>단원 목록으로</button>
      </div>
    );
  }

  /* ── 퀴즈 진행 ── */
  return (
    <div>
      {confetti && <Confetti/>}

      {/* 콤보 오버레이 */}
      {showCombo && (
        <div style={{
          position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          background:"white",borderRadius:24,padding:"20px 36px",
          boxShadow:"0 20px 60px rgba(0,0,0,0.2)",
          textAlign:"center",zIndex:999,animation:"popIn 0.4s ease",
        }}>
          <div style={{fontSize:48}}>🔥</div>
          <div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>
            {combo}연속 정답!
          </div>
        </div>
      )}

      {/* 상단 바 */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>
              {unit.emoji} {unit.title} · {qIdx+1}/{TOTAL_Q}
            </span>
            {combo>=3&&(
              <span style={{background:unit.color,color:"white",fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:99,fontFamily:"'Nunito',sans-serif"}}>
                🔥{combo}연속
              </span>
            )}
          </div>
          <div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${unit.color},${unit.border})`,transition:"width 0.4s ease",borderRadius:99}}/>
          </div>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>
          ✅{score}
        </span>
      </div>

      {/* 문제 카드 */}
      <div style={{
        background:unit.light,border:`2px solid ${unit.border}`,
        borderRadius:24,padding:"22px 18px",marginBottom:16,
        animation:shake?"shake 0.5s":"none",textAlign:"center",
      }}>
        {/* 도형 그림 */}
        {q.showShape && (
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
            <ShapeSVG shape={q.showShape} size={90}/>
          </div>
        )}
        {/* 분류 아이템 */}
        {q.items && (
          <div style={{fontSize:26,marginBottom:12,letterSpacing:6,lineHeight:1.8}}>
            {q.items.join(" ")}
          </div>
        )}
        <div style={{fontSize:16,fontWeight:800,color:"#2D3436",fontFamily:"'Nunito',sans-serif",lineHeight:1.6,whiteSpace:"pre-line"}}>
          {q.q}
        </div>
      </div>

      {/* 선택지 */}
      <div style={{display:"grid",gridTemplateColumns:q.choices.length===2?"1fr 1fr":"1fr 1fr",gap:10,marginBottom:14}}>
        {q.choices.map((c,i)=>{
          let bg="#fff", border="2px solid #E0E0E0", color="#2D3436";
          if (selected===c) {
            if (status==="correct") { bg="#E8F5E9"; border="2px solid #66BB6A"; color="#2E7D32"; }
            else { bg="#FFEBEE"; border="2px solid #EF9A9A"; color="#C62828"; }
          }
          if (status && c===q.ans && selected!==c) { bg="#E8F5E9"; border="2px solid #66BB6A"; color="#2E7D32"; }
          return (
            <button key={i} onClick={()=>pick(c)} style={{
              padding:"14px 10px",borderRadius:16,background:bg,border,color,
              fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",
              cursor:status?"default":"pointer",
              boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
              transition:"transform 0.12s",
            }}
              onMouseEnter={e=>{ if(!status) e.currentTarget.style.transform="scale(1.03)"; }}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              {c}
            </button>
          );
        })}
      </div>

      {/* 힌트 */}
      {showHint && status==="wrong" && (
        <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:16,padding:"12px 14px",marginBottom:14,animation:"slideUp 0.3s ease"}}>
          <div style={{fontSize:12,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>💡 이렇게 생각해봐요!</div>
          <div style={{fontSize:13,color:"#636E72",fontFamily:"'Nunito',sans-serif",whiteSpace:"pre-line",lineHeight:1.6}}>{q.explain}</div>
        </div>
      )}

      {/* 정답 메시지 */}
      {status==="correct" && (
        <div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:16,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8,animation:"slideUp 0.3s ease"}}>
          <span style={{fontSize:22}}>🎉</span>
          <div>
            <div style={{fontSize:15,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div>
            <div style={{fontSize:12,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain.split("\n")[0]}</div>
          </div>
        </div>
      )}

      {/* 버튼 */}
      {status==="correct" && (
        <button onClick={next} style={btnStyle(unit.color)}>
          {qIdx+1>=TOTAL_Q?"결과 보기 🏆":"다음 문제 →"}
        </button>
      )}
      {status==="wrong" && (
        <button onClick={retry} style={btnStyle("#EF9A9A","#C62828")}>
          다시 풀기 🔄
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   버튼 스타일 헬퍼
══════════════════════════════════════════════════ */
function btnStyle(bg, color="white") {
  return {
    width:"100%",padding:"14px",borderRadius:18,border:"none",
    background:bg,color,fontSize:16,fontWeight:900,
    cursor:"pointer",fontFamily:"'Nunito',sans-serif",
    boxShadow:`0 6px 18px ${bg}55`,transition:"transform 0.12s",
  };
}

/* ══════════════════════════════════════════════════
   메인 App
══════════════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeUnit, setActiveUnit] = useState(null);
  const [stars, setStars] = useState({});
  const totalStars = Object.values(stars).reduce((a,b)=>a+b,0);

  return (
    <div style={{
      minHeight:"100vh",background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:20,boxSizing:"border-box",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{
        background:"white",borderRadius:32,padding:"28px 22px",
        width:"100%",maxWidth:420,
        boxShadow:"0 20px 60px rgba(0,0,0,0.08)",
      }}>
        {/* 헤더 */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:screen==="home"?20:0,paddingBottom:screen==="home"?16:0,borderBottom:screen==="home"?"2px dashed #F0F0F0":"none"}}>
          <div style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>2학년 1학기</div>
          <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:99,padding:"4px 14px",fontSize:13,fontWeight:900,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>
            ⭐ {totalStars}개
          </div>
        </div>

        {screen==="home" ? (
          <UnitSelect stars={stars} onSelect={uid=>{ setActiveUnit(uid); setScreen("unit"); }}/>
        ) : (
          <QuizScreen
            unitId={activeUnit}
            onBack={()=>setScreen("home")}
            onStar={(id,s)=>setStars(p=>({...p,[id]:Math.max(p[id]||0,s)}))}
          />
        )}
      </div>

      <style>{`
        @keyframes fall { to{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes shake {
          0%,100%{transform:translateX(0)} 15%{transform:translateX(-9px)} 30%{transform:translateX(9px)}
          45%{transform:translateX(-7px)} 60%{transform:translateX(7px)} 75%{transform:translateX(-4px)}
        }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn {
          0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}
          60%{transform:translate(-50%,-50%) scale(1.1)}
          100%{transform:translate(-50%,-50%) scale(1);opacity:1}
        }
        body { margin:0; font-family:'Nunito',sans-serif; }
      `}</style>
    </div>
  );
}
