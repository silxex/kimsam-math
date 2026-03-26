import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════
   구구단 마스터 — 단독 실행 가능 컴포넌트
   · 단 선택 (2~9단)
   · 암기 화면 (리듬/노래 스타일)
   · 단계별 난이도 퀴즈 (쉬움→보통→어려움)
   · 틀린 단만 재복습
══════════════════════════════════════════════════ */

const DAN_COLORS = {
  2:"#FF6B81", 3:"#FF9F43", 4:"#FDCB6E", 5:"#55EFC4",
  6:"#48DBFB", 7:"#A29BFE", 8:"#FD79A8", 9:"#6C5CE7",
};
const DAN_LIGHT = {
  2:"#FCE4EC", 3:"#FFF3E0", 4:"#FFFDE7", 5:"#E0F2F1",
  6:"#E0F7FA", 7:"#EDE7F6", 8:"#FCE4EC", 9:"#EDE7F6",
};
const DAN_EMOJI = {
  2:"🐣", 3:"🐸", 4:"🦊", 5:"⭐",
  6:"🐬", 7:"🦄", 8:"🔥", 9:"👑",
};

// 각 단의 구구단 배열
function makeDanList(dan) {
  return Array.from({length:9}, (_,i) => ({
    dan, b: i+1, ans: dan*(i+1)
  }));
}

// 노래/리듬 텍스트
const RHYTHM_LABELS = ["이이","이삼","이사","이오","이육","이칠","이팔","이구"];
const DAN_NAMES = {2:"이",3:"삼",4:"사",5:"오",6:"육",7:"칠",8:"팔",9:"구"};
const NUM_KO = {1:"일",2:"이",3:"삼",4:"사",5:"오",6:"육",7:"칠",8:"팔",9:"구",10:"십",12:"십이",14:"십사",15:"십오",16:"십육",18:"십팔",20:"이십",21:"이십일",24:"이십사",25:"이십오",27:"이십칠",28:"이십팔",30:"삼십",32:"삼십이",35:"삼십오",36:"삼십육",40:"사십",42:"사십이",45:"사십오",48:"사십팔",49:"사십구",54:"오십사",56:"오십육",63:"육십삼",64:"육십사",72:"칠십이",81:"팔십일"};
function numKo(n) { return NUM_KO[n] || String(n); }

/* ══════════════════════════════════════════════════
   Confetti
══════════════════════════════════════════════════ */
function Confetti() {
  const colors = ["#FF6B81","#FF9F43","#FDCB6E","#55EFC4","#48DBFB","#A29BFE"];
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>
      {Array.from({length:40},(_,i)=>(
        <div key={i} style={{
          position:"absolute", left:`${Math.random()*100}%`, top:"-16px",
          width:7+Math.random()*9, height:7+Math.random()*9,
          borderRadius:Math.random()>0.4?"50%":"3px",
          background:colors[i%6],
          animation:`fall ${1+Math.random()*1.6}s ${Math.random()*0.6}s linear forwards`,
        }}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   암기 화면 — 리듬 스타일
══════════════════════════════════════════════════ */
function MemoScreen({ dan, onDone }) {
  const list = makeDanList(dan);
  const color = DAN_COLORS[dan];
  const light = DAN_LIGHT[dan];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const timerRef = useRef(null);

  const startAuto = useCallback(() => {
    setPlaying(true);
    setActive(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setActive(prev => {
        if (prev >= 8) {
          clearInterval(timerRef.current);
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  return (
    <div style={{padding:"0 4px"}}>
      {/* 헤더 */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:10,
          background:light,border:`2.5px solid ${color}`,
          borderRadius:99,padding:"8px 24px",
          marginBottom:12,
        }}>
          <span style={{fontSize:28}}>{DAN_EMOJI[dan]}</span>
          <span style={{fontSize:24,fontWeight:900,color,fontFamily:"'Nunito',sans-serif"}}>
            {DAN_NAMES[dan]}단
          </span>
        </div>
        <div style={{fontSize:13,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>
          눌러서 외워보세요! 🎵
        </div>
      </div>

      {/* 자동재생 버튼 */}
      <button onClick={startAuto} disabled={playing} style={{
        width:"100%",marginBottom:16,padding:"11px",borderRadius:14,border:"none",
        background:playing?`${color}55`:color,color:"white",
        fontSize:14,fontWeight:900,cursor:playing?"default":"pointer",
        fontFamily:"'Nunito',sans-serif",
        boxShadow:playing?"none":`0 4px 14px ${color}55`,
        transition:"all 0.2s",
      }}>
        {playing?"🎵 자동 재생 중...":"▶ 자동으로 외우기 (리듬)"}
      </button>

      {/* 구구단 카드 리스트 */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
        {list.map((item,i)=>{
          const isActive = i <= active || showAll;
          const isCurrent = i === active && playing;
          return (
            <div key={i}
              onClick={() => { if(!playing) setActive(i); }}
              style={{
                display:"flex",alignItems:"center",
                background: isCurrent ? color : isActive ? light : "#F8F9FA",
                border: `2px solid ${isCurrent ? color : isActive ? color+"88" : "#E0E0E0"}`,
                borderRadius:14,padding:"10px 16px",
                cursor:"pointer",
                transform: isCurrent ? "scale(1.03)" : "scale(1)",
                transition:"all 0.3s ease",
                boxShadow: isCurrent ? `0 6px 20px ${color}44` : "none",
                animation: isCurrent ? "pulse 0.9s ease infinite" : "none",
              }}>
              {/* 수식 */}
              <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
                <span style={{
                  fontSize:16,fontWeight:900,
                  color: isCurrent ? "white" : color,
                  fontFamily:"'Nunito',sans-serif",
                  minWidth:80,
                }}>
                  {dan} × {item.b} =
                </span>
                <span style={{
                  fontSize:20,fontWeight:900,
                  color: isCurrent ? "white" : "#2D3436",
                  fontFamily:"'Nunito',sans-serif",
                }}>
                  {isActive ? item.ans : "?"}
                </span>
              </div>
              {/* 리듬 텍스트 */}
              <div style={{
                fontSize:12,fontWeight:700,
                color: isCurrent ? "rgba(255,255,255,0.85)" : "#B2BEC3",
                fontFamily:"'Nunito',sans-serif",
                fontStyle:"italic",
              }}>
                {DAN_NAMES[dan]}{NUM_KO[item.b]||String(item.b)} {numKo(item.ans)}
              </div>
            </div>
          );
        })}
      </div>

      {/* 전체 보기 토글 */}
      <button onClick={()=>setShowAll(v=>!v)} style={{
        width:"100%",padding:"10px",borderRadius:14,border:`2px solid ${color}`,
        background:"white",color,fontSize:13,fontWeight:800,
        cursor:"pointer",fontFamily:"'Nunito',sans-serif",marginBottom:10,
      }}>
        {showAll?"🙈 답 숨기기":"👀 전체 정답 보기"}
      </button>

      <button onClick={onDone} style={{
        width:"100%",padding:"13px",borderRadius:16,border:"none",
        background:`linear-gradient(135deg,${color},${color}cc)`,
        color:"white",fontSize:15,fontWeight:900,
        cursor:"pointer",fontFamily:"'Nunito',sans-serif",
        boxShadow:`0 6px 20px ${color}44`,
      }}>
        외웠어요! 퀴즈 풀기 →
      </button>

      <style>{`
        @keyframes pulse {
          0%,100%{transform:scale(1.03)} 50%{transform:scale(1.05)}
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   퀴즈 화면 — 3단계 난이도
══════════════════════════════════════════════════ */
const LEVELS = [
  { key:"easy",   label:"쉬움",   emoji:"🐣", desc:"순서대로",  color:"#55EFC4", q:9  },
  { key:"normal", label:"보통",   emoji:"🐥", desc:"섞어서",    color:"#FDCB6E", q:12 },
  { key:"hard",   label:"어려움", emoji:"🦅", desc:"역방향+혼합",color:"#FF6B81", q:15 },
];

function makeQuestions(dan, level) {
  const list = makeDanList(dan);
  let pool = [];

  if (level.key === "easy") {
    // 순서대로 9문제
    pool = [...list];
  } else if (level.key === "normal") {
    // 섞어서 12문제 (중복 허용)
    pool = [...list].sort(()=>Math.random()-0.5);
    while (pool.length < 12) pool.push(list[Math.floor(Math.random()*9)]);
    pool = pool.slice(0,12);
  } else {
    // 어려움: 역방향(□×dan=?) + 혼합
    const reverse = list.map(item=>({...item, reversed:true}));
    pool = [...list,...reverse].sort(()=>Math.random()-0.5).slice(0,15);
  }

  return pool.map(item => {
    const correct = item.ans;
    const color = DAN_COLORS[dan];
    // 오답 3개 생성 (중복 없이)
    const wrongs = new Set();
    while (wrongs.size < 3) {
      const w = correct + (Math.floor(Math.random()*6)-3) * dan;
      if (w !== correct && w > 0 && w <= 81) wrongs.add(w);
    }
    const choices = [correct, ...wrongs].sort(()=>Math.random()-0.5);

    if (item.reversed) {
      // □ × dan = ans → dan 맞추기
      const bCorrect = item.b;
      const bWrongs = new Set();
      while(bWrongs.size < 3) {
        const w = bCorrect + Math.floor(Math.random()*4)-2;
        if(w!==bCorrect && w>=1 && w<=9) bWrongs.add(w);
      }
      const bChoices = [bCorrect,...bWrongs].sort(()=>Math.random()-0.5);
      return {
        q:`□ × ${dan} = ${item.ans}\n□에 들어갈 수는?`,
        choices:bChoices.map(String), ans:String(bCorrect),
        explain:`${bCorrect} × ${dan} = ${item.ans}이에요.`
      };
    }

    return {
      q:`${item.reversed?"역":""}${dan} × ${item.b} = ?`,
      choices: choices.map(String), ans: String(correct),
      explain:`${dan} × ${item.b} = ${Array.from({length:item.b},()=>dan).join("+")} = ${correct}`
    };
  });
}

function QuizMode({ dan, onBack, onComplete }) {
  const color = DAN_COLORS[dan];
  const light = DAN_LIGHT[dan];
  const [levelIdx, setLevelIdx] = useState(null); // null=선택전
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongs, setWrongs] = useState([]);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);
  const [retryMode, setRetryMode] = useState(false);

  const startLevel = (idx) => {
    const lv = LEVELS[idx];
    setLevelIdx(idx);
    setQuestions(makeQuestions(dan, lv));
    setQIdx(0); setSelected(null); setStatus(null);
    setScore(0); setWrongs([]); setCombo(0); setDone(false);
  };

  const startRetry = () => {
    setRetryMode(true);
    setQuestions(wrongs.map(w=>w));
    setQIdx(0); setSelected(null); setStatus(null);
    setScore(0); setCombo(0); setDone(false);
  };

  const q = questions[qIdx];
  const total = questions.length;
  const level = LEVELS[levelIdx] || LEVELS[0];

  const pick = (choice) => {
    if (status) return;
    setSelected(choice);
    if (choice === q.ans) {
      setStatus("correct");
      setConfetti(true); setTimeout(()=>setConfetti(false),1600);
      setScore(s=>s+1);
      const nc=combo+1; setCombo(nc);
      if(nc>=3){setShowCombo(true);setTimeout(()=>setShowCombo(false),1400);}
    } else {
      setStatus("wrong");
      setShake(true); setTimeout(()=>setShake(false),600);
      setCombo(0);
      setWrongs(w=>[...w, q]);
    }
  };

  const next = () => {
    if (qIdx+1 >= total) {
      setDone(true);
      onComplete(dan, levelIdx, score+(status==="correct"?1:0), total);
    } else {
      setQIdx(i=>i+1);
      setSelected(null); setStatus(null);
    }
  };

  // 난이도 선택
  if (levelIdx === null) return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <span style={{fontSize:16,fontWeight:900,color,fontFamily:"'Nunito',sans-serif"}}>{DAN_EMOJI[dan]} {DAN_NAMES[dan]}단 퀴즈</span>
      </div>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:13,color:"#888",fontFamily:"'Nunito',sans-serif"}}>난이도를 선택해요!</div>
      </div>
      {LEVELS.map((lv,i)=>(
        <button key={lv.key} onClick={()=>startLevel(i)} style={{
          width:"100%",marginBottom:10,padding:"16px",
          background:lv.key==="easy"?"#E8F5E9":lv.key==="normal"?"#FFF9E6":"#FFEBEE",
          border:`2.5px solid ${lv.color}`,borderRadius:18,
          cursor:"pointer",textAlign:"left",
          display:"flex",alignItems:"center",gap:14,
          transition:"transform 0.15s",
          animation:`slideUp 0.4s ${i*0.1}s both`,
        }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <span style={{fontSize:32}}>{lv.emoji}</span>
          <div>
            <div style={{fontSize:16,fontWeight:900,color:lv.color,fontFamily:"'Nunito',sans-serif"}}>{lv.label}</div>
            <div style={{fontSize:12,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{lv.desc} · {lv.q}문제</div>
          </div>
        </button>
      ))}
    </div>
  );

  // 완료 화면
  if (done) {
    const fs = score+(status==="correct"?1:0);
    const pct = Math.round(fs/total*100);
    return (
      <div style={{textAlign:"center",padding:"16px 0"}}>
        {confetti&&<Confetti/>}
        <div style={{fontSize:64,marginBottom:10}}>{pct>=90?"🏆":pct>=70?"🥈":"💪"}</div>
        <div style={{fontSize:22,fontWeight:900,color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>
          {DAN_NAMES[dan]}단 {level.label} 완료!
        </div>
        <div style={{fontSize:15,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>
          {total}문제 중 {fs}개 정답 ({pct}%)
        </div>
        <div style={{fontSize:26,marginBottom:16}}>
          {Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(pct>=90?3:pct>=70?2:1)?1:0.2}}>⭐</span>)}
        </div>
        {wrongs.length>0&&!retryMode&&(
          <div style={{background:"#FFEBEE",border:"2px solid #FFCDD2",borderRadius:16,padding:"12px",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:"#E57373",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>
              틀린 문제 {wrongs.length}개를 다시 연습해요!
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginBottom:10}}>
              {[...new Set(wrongs.map(w=>w.q))].map((wq,i)=>(
                <span key={i} style={{background:"white",border:"1.5px solid #FFCDD2",borderRadius:8,padding:"3px 8px",fontSize:12,color:"#E57373",fontFamily:"'Nunito',sans-serif"}}>{wq.split("\n")[0]}</span>
              ))}
            </div>
            <button onClick={startRetry} style={{
              width:"100%",padding:"11px",borderRadius:14,border:"none",
              background:"#FF6B81",color:"white",fontSize:14,fontWeight:900,
              cursor:"pointer",fontFamily:"'Nunito',sans-serif",
            }}>틀린 것만 다시 풀기 🔄</button>
          </div>
        )}
        <div style={{display:"flex",gap:8}}>
          {levelIdx<2&&(
            <button onClick={()=>startLevel(levelIdx+1)} style={{
              flex:1,padding:"12px",borderRadius:14,border:"none",
              background:LEVELS[levelIdx+1].color,color:"white",fontSize:13,fontWeight:900,
              cursor:"pointer",fontFamily:"'Nunito',sans-serif",
            }}>다음 단계 {LEVELS[levelIdx+1].emoji}</button>
          )}
          <button onClick={onBack} style={{
            flex:1,padding:"12px",borderRadius:14,border:`2px solid ${color}`,
            background:"white",color,fontSize:13,fontWeight:900,
            cursor:"pointer",fontFamily:"'Nunito',sans-serif",
          }}>단 선택으로</button>
        </div>
      </div>
    );
  }

  const progress = (qIdx/total)*100;

  return (
    <div>
      {confetti&&<Confetti/>}
      {showCombo&&(
        <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",borderRadius:20,padding:"18px 32px",boxShadow:"0 16px 48px rgba(0,0,0,0.18)",textAlign:"center",zIndex:999,animation:"popIn 0.35s ease"}}>
          <div style={{fontSize:44}}>🔥</div>
          <div style={{fontSize:20,fontWeight:900,color,fontFamily:"'Nunito',sans-serif"}}>{combo}연속 정답!</div>
        </div>
      )}

      {/* 상단 */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:800,color,fontFamily:"'Nunito',sans-serif"}}>
              {DAN_EMOJI[dan]} {DAN_NAMES[dan]}단 {level.emoji}{level.label} · {qIdx+1}/{total}
            </span>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {combo>=3&&<span style={{background:color,color:"white",fontSize:11,fontWeight:800,padding:"2px 8px",borderRadius:99,fontFamily:"'Nunito',sans-serif"}}>🔥{combo}</span>}
              <span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>✅{score}</span>
            </div>
          </div>
          <div style={{height:9,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${color},${color}99)`,transition:"width 0.4s",borderRadius:99}}/>
          </div>
        </div>
      </div>

      {/* 문제 카드 */}
      <div style={{
        background:light,border:`2.5px solid ${color}88`,
        borderRadius:22,padding:"24px 16px",marginBottom:14,textAlign:"center",
        animation:shake?"shake 0.5s":"fadeSlide 0.3s ease",
      }}>
        <div style={{
          fontSize:28,fontWeight:900,color:"#2D3436",
          fontFamily:"'Nunito',sans-serif",lineHeight:1.5,whiteSpace:"pre-line",
          letterSpacing:1,
        }}>
          {q.q.replace("역","").replace(dan+" × ","").split(" = ").length>1
            ? <><span style={{color}}>{dan}</span>{" × "}<span style={{color:"#2D3436"}}>{q.q.split(" × ")[1].split(" = ")[0]}</span>{" = "}<span style={{color:"#B2BEC3"}}>?</span></>
            : q.q
          }
        </div>
        {/* 단 힌트 바 (쉬움 모드에서만) */}
        {level.key==="easy"&&(
          <div style={{marginTop:12,display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap"}}>
            {makeDanList(dan).slice(0,qIdx).map((item,i)=>(
              <span key={i} style={{fontSize:11,color:color,fontFamily:"'Nunito',sans-serif",opacity:0.6}}>
                {dan}×{item.b}={item.ans}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 선택지 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>
        {q.choices.map((c,i)=>{
          let bg="#fff",border="2px solid #E8E8E8",col="#2D3436";
          if(selected===c){
            if(status==="correct"){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}
            else{bg="#FFEBEE";border="2px solid #EF9A9A";col="#C62828";}
          }
          if(status&&c===q.ans&&selected!==c){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}
          return(
            <button key={i} onClick={()=>pick(c)} style={{
              padding:"16px 8px",borderRadius:16,background:bg,border,color:col,
              fontSize:22,fontWeight:900,fontFamily:"'Nunito',sans-serif",
              cursor:status?"default":"pointer",
              boxShadow:"0 2px 8px rgba(0,0,0,0.05)",transition:"transform 0.1s",
            }}
              onMouseEnter={e=>{if(!status)e.currentTarget.style.transform="scale(1.05)";}}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              {c}
            </button>
          );
        })}
      </div>

      {/* 피드백 */}
      {status==="wrong"&&(
        <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:14,padding:"10px 14px",marginBottom:10,animation:"slideUp 0.3s ease"}}>
          <div style={{fontSize:12,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:3}}>💡 정답은?</div>
          <div style={{fontSize:14,fontWeight:800,color:"#636E72",fontFamily:"'Nunito',sans-serif",whiteSpace:"pre-line"}}>{q.explain}</div>
        </div>
      )}
      {status==="correct"&&(
        <div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:14,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:8,animation:"slideUp 0.3s ease"}}>
          <span style={{fontSize:20}}>🎉</span>
          <span style={{fontSize:14,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답! {q.explain.split("=").pop().trim()}이 맞아요!</span>
        </div>
      )}
      {status&&<button onClick={next} style={{width:"100%",padding:"13px",borderRadius:16,border:"none",background:color,color:"white",fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 5px 16px ${color}55`}}>{qIdx+1>=total?"결과 보기 🏆":"다음 문제 →"}</button>}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   단 선택 홈 화면
══════════════════════════════════════════════════ */
function DanHome({ records, onSelect }) {
  return (
    <div>
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{fontSize:44,marginBottom:6}}>✖️</div>
        <h2 style={{margin:0,fontSize:22,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>구구단 마스터</h2>
        <p style={{margin:"4px 0 0",color:"#B2BEC3",fontSize:12,fontFamily:"'Nunito',sans-serif"}}>외우고 싶은 단을 골라요!</p>
      </div>

      {/* 단 그리드 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}}>
        {[2,3,4,5,6,7,8,9].map((dan,i)=>{
          const rec = records[dan]||{};
          const bestLevel = rec.bestLevel??-1;
          const stars = rec.stars||0;
          const color = DAN_COLORS[dan];
          const light = DAN_LIGHT[dan];
          return(
            <button key={dan} onClick={()=>onSelect(dan)} style={{
              background:light,border:`2.5px solid ${color}`,
              borderRadius:16,padding:"14px 8px",cursor:"pointer",textAlign:"center",
              transition:"transform 0.15s,box-shadow 0.15s",
              animation:`slideUp 0.35s ${i*0.05}s both`,
              boxShadow:"0 2px 10px rgba(0,0,0,0.06)",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.08)";e.currentTarget.style.boxShadow=`0 8px 24px ${color}44`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.06)";}}>
              <div style={{fontSize:22,marginBottom:2}}>{DAN_EMOJI[dan]}</div>
              <div style={{fontSize:18,fontWeight:900,color,fontFamily:"'Nunito',sans-serif"}}>{dan}단</div>
              <div style={{fontSize:11,color:color,fontFamily:"'Nunito',sans-serif",marginTop:1}}>
                {bestLevel>=0?LEVELS[bestLevel].label:"미도전"}
              </div>
              <div style={{fontSize:10,marginTop:3}}>
                {Array.from({length:3},(_,j)=><span key={j} style={{opacity:j<stars?1:0.2}}>⭐</span>)}
              </div>
            </button>
          );
        })}
      </div>

      {/* 전체 진행 요약 */}
      <div style={{background:"#F8F9FA",borderRadius:16,padding:"14px 16px"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>📊 전체 진행 상황</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[2,3,4,5,6,7,8,9].map(dan=>{
            const rec=records[dan]||{};
            const color=DAN_COLORS[dan];
            const pct=rec.bestPct||0;
            return(
              <div key={dan} style={{flex:"1 0 calc(25% - 6px)",minWidth:60}}>
                <div style={{fontSize:10,fontWeight:800,color,fontFamily:"'Nunito',sans-serif",marginBottom:2}}>{dan}단</div>
                <div style={{height:6,background:"#E0E0E0",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:99,transition:"width 0.5s"}}/>
                </div>
                <div style={{fontSize:9,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif",marginTop:1}}>{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   단별 메뉴 (암기 or 퀴즈 선택)
══════════════════════════════════════════════════ */
function DanMenu({ dan, onMemo, onQuiz, onBack }) {
  const color = DAN_COLORS[dan];
  const light = DAN_LIGHT[dan];
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{
          display:"flex",alignItems:"center",gap:8,
          background:light,border:`2px solid ${color}`,
          borderRadius:99,padding:"6px 18px",
        }}>
          <span style={{fontSize:22}}>{DAN_EMOJI[dan]}</span>
          <span style={{fontSize:18,fontWeight:900,color,fontFamily:"'Nunito',sans-serif"}}>{DAN_NAMES[dan]}단</span>
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <button onClick={onMemo} style={{
          padding:"20px 20px",borderRadius:20,border:`2.5px solid ${color}`,
          background:light,cursor:"pointer",textAlign:"left",
          transition:"transform 0.15s",animation:"slideUp 0.35s both",
        }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <div style={{fontSize:28,marginBottom:6}}>🎵</div>
          <div style={{fontSize:16,fontWeight:900,color,fontFamily:"'Nunito',sans-serif"}}>암기 모드</div>
          <div style={{fontSize:12,color:"#888",fontFamily:"'Nunito',sans-serif",marginTop:2}}>
            리듬감 있게 {DAN_NAMES[dan]}단을 외워요
          </div>
        </button>

        {LEVELS.map((lv,i)=>(
          <button key={lv.key} onClick={()=>onQuiz(i)} style={{
            padding:"16px 20px",borderRadius:20,border:`2.5px solid ${lv.color}`,
            background:lv.key==="easy"?"#F1FFF4":lv.key==="normal"?"#FFFDF0":"#FFF5F5",
            cursor:"pointer",textAlign:"left",
            transition:"transform 0.15s",animation:`slideUp 0.35s ${(i+1)*0.1}s both`,
            display:"flex",alignItems:"center",gap:14,
          }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <span style={{fontSize:28}}>{lv.emoji}</span>
            <div>
              <div style={{fontSize:15,fontWeight:900,color:lv.color,fontFamily:"'Nunito',sans-serif"}}>{lv.label} 퀴즈</div>
              <div style={{fontSize:12,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{lv.desc} · {lv.q}문제</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   메인 컴포넌트 (export)
══════════════════════════════════════════════════ */
export default function TimesTable() {
  const [screen, setScreen] = useState("home");  // home|danmenu|memo|quiz
  const [activeDan, setActiveDan] = useState(null);
  const [startLevel, setStartLevel] = useState(null);
  const [records, setRecords] = useState({});

  const handleComplete = (dan, levelIdx, score, total) => {
    const pct = Math.round(score/total*100);
    const stars = pct>=90?3:pct>=70?2:1;
    setRecords(prev => ({
      ...prev,
      [dan]: {
        bestLevel: Math.max(prev[dan]?.bestLevel??-1, levelIdx),
        bestPct:   Math.max(prev[dan]?.bestPct??0, pct),
        stars:     Math.max(prev[dan]?.stars??0, stars),
      }
    }));
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#FFF9F0 0%,#F0F4FF 100%)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:20,boxSizing:"border-box",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{
        background:"white",borderRadius:32,padding:"24px 20px",
        width:"100%",maxWidth:420,
        boxShadow:"0 20px 60px rgba(0,0,0,0.09)",
      }}>
        {/* 헤더 */}
        <div style={{
          display:"flex",justifyContent:"space-between",alignItems:"center",
          marginBottom:20,paddingBottom:14,borderBottom:"2px dashed #F0F0F0",
        }}>
          <div style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>
            구구단 마스터
          </div>
          <div style={{
            background:"#FFF9E6",border:"2px solid #FDCB6E",
            borderRadius:99,padding:"4px 14px",
            fontSize:13,fontWeight:900,color:"#FF9F43",
            fontFamily:"'Nunito',sans-serif",
          }}>
            ⭐ {Object.values(records).reduce((s,r)=>s+(r.stars||0),0)}
          </div>
        </div>

        {screen==="home" && (
          <DanHome records={records} onSelect={dan=>{setActiveDan(dan);setScreen("danmenu");}}/>
        )}
        {screen==="danmenu" && activeDan && (
          <DanMenu
            dan={activeDan}
            onBack={()=>setScreen("home")}
            onMemo={()=>setScreen("memo")}
            onQuiz={lvIdx=>{setStartLevel(lvIdx);setScreen("quiz");}}
          />
        )}
        {screen==="memo" && activeDan && (
          <MemoScreen
            dan={activeDan}
            onDone={()=>setScreen("danmenu")}
          />
        )}
        {screen==="quiz" && activeDan && (
          <QuizMode
            dan={activeDan}
            initialLevel={startLevel}
            onBack={()=>setScreen("danmenu")}
            onComplete={(dan,lvIdx,score,total)=>{
              handleComplete(dan,lvIdx,score,total);
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-9px)}30%{transform:translateX(9px)}45%{transform:translateX(-7px)}60%{transform:translateX(7px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{0%{transform:translate(-50%,-50%) scale(0.3);opacity:0}60%{transform:translate(-50%,-50%) scale(1.12)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        body{margin:0;font-family:'Nunito',sans-serif;}
      `}</style>
    </div>
  );
}
