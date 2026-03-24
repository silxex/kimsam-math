import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════
   초등 2학년 1학기 수학 앱
   단원: 1.세자리수  2.여러가지도형  3.덧셈과뺄셈
         4.길이재기  5.분류하기      6.곱셈
══════════════════════════════════════════════════════ */

const UNITS = [
  { id:1, title:"세 자리 수",     emoji:"🔢", color:"#FF9F43", light:"#FFF3E0", border:"#FFD08A" },
  { id:2, title:"여러 가지 도형", emoji:"🔷", color:"#48DBFB", light:"#E0F7FA", border:"#80DEEA" },
  { id:3, title:"덧셈과 뺄셈",   emoji:"➕", color:"#FF6B81", light:"#FCE4EC", border:"#F48FB1" },
  { id:4, title:"길이 재기",     emoji:"📏", color:"#A29BFE", light:"#EDE7F6", border:"#CE93D8" },
  { id:5, title:"분류하기",      emoji:"🗂️", color:"#55EFC4", light:"#E0F2F1", border:"#80CBC4" },
  { id:6, title:"곱셈",          emoji:"✖️", color:"#FDCB6E", light:"#FFFDE7", border:"#FFE082" },
];

/* ── Question generators ─────────────────────────── */
function genUnit1() {
  const variants = [
    () => {
      const n = Math.floor(Math.random()*900)+100;
      const h=Math.floor(n/100), t=Math.floor((n%100)/10), o=n%10;
      return {
        type:"place", q:`${n}에서 십의 자리 숫자는 무엇인가요?`,
        choices:[String(t),String(h),String(o),String((t+1)%10)].sort(()=>Math.random()-0.5),
        ans:String(t), explain:`${n} = ${h}백 + ${t}십 + ${o}이므로, 십의 자리 숫자는 ${t}예요.`
      };
    },
    () => {
      const h=Math.floor(Math.random()*8)+1, t=Math.floor(Math.random()*9)+1, o=Math.floor(Math.random()*9)+1;
      const n=h*100+t*10+o;
      return {
        type:"read", q:`${h}백 ${t}십 ${o} 은 얼마인가요?`,
        choices:[String(n),String(n+10),String(n-1),String(n+100)].sort(()=>Math.random()-0.5),
        ans:String(n), explain:`${h}백(${h*100}) + ${t}십(${t*10}) + ${o} = ${n}이에요.`
      };
    },
    () => {
      const a=Math.floor(Math.random()*899)+100, b=Math.floor(Math.random()*899)+100;
      const bigger = a>b?a:b;
      return {
        type:"compare", q:`더 큰 수는 무엇인가요?`,
        choices:[String(a),String(b)],
        ans:String(bigger), explain:`${a}와 ${b} 중 더 큰 수는 ${bigger}이에요.`
      };
    }
  ];
  return variants[Math.floor(Math.random()*variants.length)]();
}

function genUnit2() {
  const shapes = [
    { name:"삼각형", sides:3, emoji:"🔺", desc:"꼭짓점이 3개, 변이 3개인 도형" },
    { name:"사각형", sides:4, emoji:"🟦", desc:"꼭짓점이 4개, 변이 4개인 도형" },
    { name:"원",     sides:0, emoji:"🔵", desc:"둥글고 꼭짓점이 없는 도형" },
  ];
  const variants = [
    () => {
      const s = shapes[Math.floor(Math.random()*shapes.length)];
      return {
        type:"shape_name",
        q: s.sides>0 ? `꼭짓점이 ${s.sides}개인 도형의 이름은 무엇인가요?` : `둥글고 꼭짓점이 없는 도형은 무엇인가요?`,
        choices: shapes.map(x=>x.name).sort(()=>Math.random()-0.5),
        ans: s.name, explain: `${s.name}은 ${s.desc}이에요.`
      };
    },
    () => {
      const s = shapes.filter(x=>x.sides>0)[Math.floor(Math.random()*2)];
      const wrong = s.sides===3?4:3;
      return {
        type:"sides",
        q:`${s.emoji} ${s.name}의 변은 몇 개인가요?`,
        choices:[String(s.sides),String(wrong),"2","5"].sort(()=>Math.random()-0.5),
        ans:String(s.sides), explain:`${s.name}은 변이 ${s.sides}개 있어요.`
      };
    }
  ];
  return variants[Math.floor(Math.random()*variants.length)]();
}

function genUnit3() {
  const type = Math.random()<0.5?"add":"sub";
  if(type==="add") {
    const a=Math.floor(Math.random()*89)+10, b=Math.floor(Math.random()*9)+1;
    const ans=a+b;
    return { type:"add", q:`${a} + ${b} = ?`, ans:String(ans),
      choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),
      explain:`${a} + ${b}:\n일의 자리: ${a%10}+${b}=${(a%10+b)>=10?(a%10+b-10)+"(받아올림)":a%10+b}\n= ${ans}`
    };
  } else {
    const a=Math.floor(Math.random()*80)+20, b=Math.floor(Math.random()*9)+1;
    const ans=a-b;
    return { type:"sub", q:`${a} - ${b} = ?`, ans:String(ans),
      choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),
      explain:`${a} - ${b}:\n일의 자리: ${a%10} < ${b}이면 십의 자리에서 받아내림\n= ${ans}`
    };
  }
}

function genUnit4() {
  const cm = Math.floor(Math.random()*15)+2;
  const variants = [
    () => ({
      type:"ruler",
      q:`자로 재었더니 눈금이 0에서 시작해서 ${cm}에서 끝났어요. 길이는 몇 cm인가요?`,
      choices:[String(cm),String(cm+1),String(cm-1),String(cm+2)].sort(()=>Math.random()-0.5),
      ans:String(cm), explain:`0에서 ${cm}까지이므로 길이는 ${cm} cm예요.`
    }),
    () => {
      const a=Math.floor(Math.random()*10)+3, b=Math.floor(Math.random()*a-1)+1;
      return {
        type:"longer",
        q:`연필 길이가 ${a} cm, 지우개 길이가 ${b} cm예요. 더 긴 것은?`,
        choices:["연필","지우개"],
        ans:"연필", explain:`${a} cm > ${b} cm 이므로 연필이 더 길어요.`
      };
    }
  ];
  return variants[Math.floor(Math.random()*variants.length)]();
}

function genUnit5() {
  const categories = [
    { label:"모양으로 분류", items:["🔺","🔵","🟦","🔺","🔵","🟦","🔺"], groups:{"🔺":3,"🔵":2,"🟦":2} },
    { label:"색깔로 분류",   items:["🔴","🔵","🔴","🟡","🔵","🔴","🟡"], groups:{"🔴":3,"🔵":2,"🟡":2} },
  ];
  const cat = categories[Math.floor(Math.random()*categories.length)];
  const entries = Object.entries(cat.groups);
  const [ansKey, ansVal] = entries.reduce((a,b)=>b[1]>a[1]?b:a);
  return {
    type:"classify",
    q:`아래 물건들을 ${cat.label}했을 때, 가장 많은 것은?`,
    items: cat.items,
    choices: entries.map(e=>`${e[0]} (${e[1]}개)`).sort(()=>Math.random()-0.5),
    ans: `${ansKey} (${ansVal}개)`,
    explain:`${cat.label}하면 ${entries.map(e=>`${e[0]}이 ${e[1]}개`).join(", ")}이에요. 가장 많은 것은 ${ansKey}이에요.`
  };
}

function genUnit6() {
  const a=Math.floor(Math.random()*5)+2, b=Math.floor(Math.random()*5)+2;
  const variants=[
    () => ({
      type:"mult",
      q:`${a}씩 ${b}묶음이면 모두 몇 개인가요?`,
      choices:[String(a*b),String(a*b+a),String(a*(b-1)),String(a*b-1)].sort(()=>Math.random()-0.5),
      ans:String(a*b), explain:`${a}씩 ${b}묶음 → ${a}×${b} = ${Array.from({length:b},(_,i)=>a*(i+1)).join(", ")} → ${a*b}개`
    }),
    () => ({
      type:"expr",
      q:`${a}+${a}+${a} 를 곱셈식으로 나타내면?`,
      choices:[`${a}×3`,`${a}×2`,`3×${a+1}`,`${a+1}×3`].sort(()=>Math.random()-0.5),
      ans:`${a}×3`, explain:`같은 수(${a})를 3번 더하면 ${a}×3으로 쓸 수 있어요. ${a}×3=${a*3}`
    }),
  ];
  return variants[Math.floor(Math.random()*variants.length)]();
}

const GEN = [genUnit1,genUnit2,genUnit3,genUnit4,genUnit5,genUnit6];

/* ── Confetti ───────────────────────────────────── */
function Confetti() {
  const colors=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E","#fff"];
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>
      {Array.from({length:36},(_,i)=>(
        <div key={i} style={{
          position:"absolute",
          left:`${Math.random()*100}%`,
          top:"-20px",
          width:8+Math.random()*8,
          height:8+Math.random()*8,
          borderRadius:Math.random()>0.5?"50%":"2px",
          background:colors[i%colors.length],
          animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`,
          transform:`rotate(${Math.random()*360}deg)`,
        }}/>
      ))}
    </div>
  );
}

/* ── Star XP bar ─────────────────────────────────── */
function XPBar({ xp, maxXp=50 }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:16}}>⭐</span>
      <div style={{flex:1,height:12,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
        <div style={{
          height:"100%",width:`${Math.min(xp/maxXp*100,100)}%`,
          background:"linear-gradient(90deg,#FDCB6E,#FF9F43)",
          borderRadius:99,transition:"width 0.5s ease",
        }}/>
      </div>
      <span style={{fontSize:13,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>{xp}/{maxXp}</span>
    </div>
  );
}

/* ── Unit Select Screen ──────────────────────────── */
function UnitSelect({ stars, onSelect }) {
  return (
    <div style={{padding:"0 4px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:48,marginBottom:4}}>📚</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",letterSpacing:-0.5}}>
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
              background:u.light, border:`2.5px solid ${u.border}`,
              borderRadius:20, padding:"16px 12px",
              cursor:"pointer", textAlign:"left",
              transition:"transform 0.15s, box-shadow 0.15s",
              boxShadow:"0 3px 12px rgba(0,0,0,0.06)",
              animation:`slideUp 0.4s ${i*0.07}s both`,
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 3px 12px rgba(0,0,0,0.06)";}}>
            <div style={{fontSize:28,marginBottom:6}}>{u.emoji}</div>
            <div style={{fontSize:13,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",lineHeight:1.3}}>
              {u.id}단원
            </div>
            <div style={{fontSize:11,fontWeight:700,color:u.color,fontFamily:"'Nunito',sans-serif",marginTop:2}}>
              {u.title}
            </div>
            <div style={{marginTop:8,display:"flex",gap:2}}>
              {Array.from({length:3},(_,j)=>(
                <span key={j} style={{fontSize:14,opacity:j<(stars[u.id]||0)?1:0.2}}>⭐</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Quiz Screen ─────────────────────────────────── */
function QuizScreen({ unitId, onBack, onStar }) {
  const unit = UNITS.find(u=>u.id===unitId);
  const [questions] = useState(()=>Array.from({length:5},()=>GEN[unitId-1]()));
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null); // null|"correct"|"wrong"
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [xp, setXp] = useState(0);

  const q = questions[qIdx];
  const progress = (qIdx/5)*100;

  const pick = (choice) => {
    if (status) return;
    setSelected(choice);
    if (choice === q.ans) {
      setStatus("correct");
      setConfetti(true);
      setTimeout(()=>setConfetti(false),1800);
      const newCombo = combo+1;
      setCombo(newCombo);
      setScore(s=>s+1);
      setXp(x=>x+10);
      if (newCombo>=3) { setShowCombo(true); setTimeout(()=>setShowCombo(false),1600); }
    } else {
      setStatus("wrong");
      setShake(true);
      setShowHint(true);
      setCombo(0);
      setTimeout(()=>setShake(false),600);
    }
  };

  const next = () => {
    if (qIdx+1>=5) {
      const stars = score+1>=5?3:score+1>=3?2:1;
      onStar(unitId, stars);
      setDone(true);
    } else {
      setQIdx(i=>i+1);
      setSelected(null); setStatus(null); setShowHint(false);
    }
  };

  const retry = () => {
    setSelected(null); setStatus(null); setShowHint(false);
  };

  if (done) return (
    <div style={{textAlign:"center",padding:"20px 0"}}>
      {confetti && <Confetti/>}
      <div style={{fontSize:72,marginBottom:12}}>
        {score>=4?"🏆":score>=2?"🥈":"🎯"}
      </div>
      <div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>
        {unit.title} 완료!
      </div>
      <div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>
        5문제 중 {score}개 정답
      </div>
      <div style={{fontSize:28,marginBottom:24}}>
        {Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(score>=5?3:score>=3?2:1)?1:0.2}}>⭐</span>)}
      </div>
      <button onClick={onBack} style={btnStyle(unit.color)}>단원 목록으로</button>
    </div>
  );

  return (
    <div>
      {confetti && <Confetti/>}
      {showCombo && (
        <div style={{
          position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          background:"white",borderRadius:24,padding:"20px 36px",
          boxShadow:"0 20px 60px rgba(0,0,0,0.2)",
          textAlign:"center",zIndex:999,
          animation:"popIn 0.4s ease",
        }}>
          <div style={{fontSize:48}}>🔥</div>
          <div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>
            {combo}연속 정답!
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <button onClick={onBack} style={{
          background:"none",border:"none",fontSize:20,cursor:"pointer",padding:4,color:"#B2BEC3"
        }}>←</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>
              {unit.emoji} {unit.title} · {qIdx+1}/5
            </span>
            {combo>=2&&<span style={{
              background:unit.color,color:"white",fontSize:11,fontWeight:800,
              padding:"2px 9px",borderRadius:99,fontFamily:"'Nunito',sans-serif",
            }}>🔥{combo}연속</span>}
          </div>
          <div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
            <div style={{
              height:"100%",width:`${progress}%`,borderRadius:99,
              background:`linear-gradient(90deg,${unit.color},${unit.border})`,
              transition:"width 0.4s ease",
            }}/>
          </div>
        </div>
      </div>

      {/* Question card */}
      <div style={{
        background:unit.light, border:`2px solid ${unit.border}`,
        borderRadius:24, padding:"22px 18px", marginBottom:16,
        animation: shake?"shake 0.5s":"none",
        minHeight:90,
      }}>
        {q.items && (
          <div style={{fontSize:24,marginBottom:10,letterSpacing:4,textAlign:"center"}}>
            {q.items.join(" ")}
          </div>
        )}
        <div style={{
          fontSize:17,fontWeight:800,color:"#2D3436",
          fontFamily:"'Nunito',sans-serif",lineHeight:1.5,textAlign:"center",
          whiteSpace:"pre-line",
        }}>{q.q}</div>
      </div>

      {/* Choices */}
      <div style={{display:"grid",gridTemplateColumns:q.choices.length===2?"1fr 1fr":"1fr 1fr",gap:10,marginBottom:14}}>
        {q.choices.map((c,i)=>{
          let bg="#fff", border="2px solid #E0E0E0", color="#2D3436";
          if (selected===c) {
            if (status==="correct"&&c===q.ans) { bg="#E8F5E9";border=`2px solid #66BB6A`;color="#2E7D32"; }
            else if (status==="wrong"&&c!==q.ans) { bg="#FFEBEE";border=`2px solid #EF9A9A`;color="#C62828"; }
          }
          if (status&&c===q.ans&&selected!==c) { bg="#E8F5E9";border="2px solid #66BB6A";color="#2E7D32"; }
          return (
            <button key={i} onClick={()=>pick(c)} style={{
              padding:"14px 10px", borderRadius:16,
              background:bg, border, color,
              fontSize:15, fontWeight:800,
              fontFamily:"'Nunito',sans-serif",
              cursor:status?"default":"pointer",
              transition:"transform 0.12s",
              boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
            }}
              onMouseEnter={e=>{ if(!status) e.currentTarget.style.transform="scale(1.03)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}>
              {c}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      {showHint&&status==="wrong"&&(
        <div style={{
          background:"#FFF9E6",border:"2px solid #FDCB6E",
          borderRadius:16,padding:"12px 14px",marginBottom:14,
          animation:"slideUp 0.3s ease",
        }}>
          <div style={{fontSize:12,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>
            💡 이렇게 생각해봐요!
          </div>
          <div style={{fontSize:13,color:"#636E72",fontFamily:"'Nunito',sans-serif",whiteSpace:"pre-line",lineHeight:1.6}}>
            {q.explain}
          </div>
        </div>
      )}

      {/* Correct message */}
      {status==="correct"&&(
        <div style={{
          background:"#E8F5E9",border:"2px solid #A5D6A7",
          borderRadius:16,padding:"12px 14px",marginBottom:14,
          display:"flex",alignItems:"center",gap:8,
          animation:"slideUp 0.3s ease",
        }}>
          <span style={{fontSize:22}}>🎉</span>
          <div>
            <div style={{fontSize:15,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div>
            <div style={{fontSize:12,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain.split("\n")[0]}</div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {status==="correct"&&(
        <button onClick={next} style={btnStyle(unit.color)}>
          {qIdx+1>=5?"결과 보기 🏆":"다음 문제 →"}
        </button>
      )}
      {status==="wrong"&&(
        <button onClick={retry} style={btnStyle("#EF9A9A","#C62828")}>
          다시 풀기 🔄
        </button>
      )}

      {/* XP bar */}
      <div style={{marginTop:16}}>
        <XPBar xp={xp} maxXp={50}/>
      </div>
    </div>
  );
}

/* ── Button style helper ─────────────────────────── */
function btnStyle(bg, textColor="white") {
  return {
    width:"100%",padding:"14px",borderRadius:18,border:"none",
    background:bg,color:textColor,
    fontSize:16,fontWeight:900,cursor:"pointer",
    fontFamily:"'Nunito',sans-serif",
    boxShadow:`0 6px 18px ${bg}55`,
    transition:"transform 0.12s",
    letterSpacing:0.2,
  };
}

/* ── Root ────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState("home"); // home | unit
  const [activeUnit, setActiveUnit] = useState(null);
  const [stars, setStars] = useState({});
  const totalStars = Object.values(stars).reduce((a,b)=>a+b,0);

  const handleStar = (uid, s) => {
    setStars(prev=>({ ...prev, [uid]: Math.max(prev[uid]||0, s) }));
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:20,boxSizing:"border-box",
      fontFamily:"'Nunito',sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>

      <div style={{
        background:"white",borderRadius:32,padding:"28px 22px",
        width:"100%",maxWidth:420,
        boxShadow:"0 20px 60px rgba(0,0,0,0.08)",
      }}>
        {/* Header strip */}
        <div style={{
          display:"flex",justifyContent:"space-between",alignItems:"center",
          marginBottom:screen==="home"?20:0,
          paddingBottom:screen==="home"?16:0,
          borderBottom:screen==="home"?"2px dashed #F0F0F0":"none",
        }}>
          <div style={{fontSize:13,fontWeight:800,color:"#B2BEC3"}}>2학년 1학기</div>
          <div style={{
            background:"#FFF9E6",border:"2px solid #FDCB6E",
            borderRadius:99,padding:"4px 14px",
            fontSize:13,fontWeight:900,color:"#FF9F43",
          }}>⭐ {totalStars}개</div>
        </div>

        {screen==="home" && (
          <UnitSelect stars={stars} onSelect={uid=>{ setActiveUnit(uid); setScreen("unit"); }}/>
        )}
        {screen==="unit" && activeUnit && (
          <QuizScreen unitId={activeUnit} onBack={()=>setScreen("home")} onStar={handleStar}/>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-9px)}30%{transform:translateX(9px)}
          45%{transform:translateX(-7px)}60%{transform:translateX(7px)}
          75%{transform:translateX(-4px)}90%{transform:translateX(4px)}
        }
        @keyframes slideUp {
          from{transform:translateY(14px);opacity:0}
          to{transform:translateY(0);opacity:1}
        }
        @keyframes popIn {
          0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}
          60%{transform:translate(-50%,-50%) scale(1.1)}
          100%{transform:translate(-50%,-50%) scale(1);opacity:1}
        }
        @keyframes fall {
          to{transform:translateY(110vh) rotate(720deg);opacity:0}
        }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
