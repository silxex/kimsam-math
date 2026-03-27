import React, { useState, useEffect, useRef } from "react";


/* ══════════════════════════════════════════
   중복 방지 문제 생성 헬퍼
══════════════════════════════════════════ */
function makeQPool(gens, count=20) {
  const result = [];
  for(let i=0; i<count; i++) {
    result.push(gens[i % gens.length]());
  }
  return result.sort(()=>Math.random()-0.5);
}

/* ══════════════════════════════════════════
   SVG 컴포넌트
══════════════════════════════════════════ */
function ShapeSVG({ shape, size=90 }) {
  const s=size;
  if(shape==="예각삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,10 90,85 10,85" fill="#FFD8A8" stroke="#FF9F43" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#FF9F43">예각삼각형</text></svg>;
  if(shape==="직각삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="15,85 85,85 15,20" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="3.5" strokeLinejoin="round"/><rect x="15" y="72" width="13" height="13" fill="none" stroke="#4DABF7" strokeWidth="2"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#4DABF7">직각삼각형</text></svg>;
  if(shape==="둔각삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="5,85 95,85 25,25" fill="#B2F2BB" stroke="#51CF66" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#51CF66">둔각삼각형</text></svg>;
  if(shape==="정사각형") return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="#E9BBFD" stroke="#BE4BDB" strokeWidth="3.5"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#BE4BDB">정사각형</text></svg>;
  if(shape==="직사각형") return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="8" y="28" width="84" height="52" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="3.5"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#4DABF7">직사각형</text></svg>;
  if(shape==="평행사변형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="20,80 80,80 65,20 5,20" fill="#FFEC99" stroke="#FAB005" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#FAB005">평행사변형</text></svg>;
  if(shape==="마름모") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,10 90,50 50,90 10,50" fill="#FFC9C9" stroke="#FA5252" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#FA5252">마름모</text></svg>;
  if(shape==="오각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,8 95,38 77,88 23,88 5,38" fill="#C5F6FA" stroke="#15AABF" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#15AABF">오각형</text></svg>;
  if(shape==="육각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,8 88,29 88,71 50,92 12,71 12,29" fill="#D3F9D8" stroke="#37B24D" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#37B24D">육각형</text></svg>;
  return null;
}

function AngleSVG({ angle, size=100 }) {
  const r=60, cx=size/2, cy=size*0.7;
  const rad=(angle)*Math.PI/180;
  const x2=cx+r, y2=cy;
  const x3=cx+r*Math.cos(-rad), y3=cy+r*Math.sin(-rad);
  const large=angle>180?1:0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#4DABF7" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={x3} y2={y3} stroke="#4DABF7" strokeWidth="2.5" strokeLinecap="round"/>
      <path d={`M ${cx+20} ${cy} A 20 20 0 ${large} 1 ${cx+20*Math.cos(-rad)} ${cy+20*Math.sin(-rad)}`} fill="none" stroke="#FF6B81" strokeWidth="2"/>
      <text x={cx+(angle<90?28:22)*Math.cos(-rad/2)} y={cy+(angle<90?28:22)*Math.sin(-rad/2)} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FF6B81">{angle}°</text>
      <circle cx={cx} cy={cy} r="3" fill="#2D3436"/>
    </svg>
  );
}

function BarChartSVG({ data }) {
  const max=Math.max(...data.map(d=>d.val));
  const colors=["#FF9F43","#48DBFB","#FF6B81","#55EFC4","#A29BFE"];
  return (
    <svg width="260" height="130" viewBox="0 0 260 130">
      <line x1="32" y1="10" x2="32" y2="105" stroke="#ddd" strokeWidth="1"/>
      <line x1="32" y1="105" x2="250" y2="105" stroke="#ddd" strokeWidth="1"/>
      {data.map((d,i)=>{const bw=32,gap=10,x=40+i*(bw+gap),bh=Math.round((d.val/max)*85),y=105-bh;return(<g key={i}><rect x={x} y={y} width={bw} height={bh} rx="3" fill={colors[i%5]}/><text x={x+bw/2} y={120} textAnchor="middle" fontSize="9" fill="#555">{d.label}</text><text x={x+bw/2} y={y-3} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#333">{d.val}</text></g>);})}
    </svg>
  );
}

function Confetti() {
  const colors=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E"];
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>{Array.from({length:36},(_,i)=>(<div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-20px",width:8+Math.random()*8,height:8+Math.random()*8,borderRadius:Math.random()>0.5?"50%":"2px",background:colors[i%6],animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`}}/>))}</div>);
}

function btnStyle(bg,col="white"){return{width:"100%",padding:"13px",borderRadius:16,border:"none",background:bg,color:col,fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 5px 16px ${bg}55`};}

/* ══════════════════════════════════════════
   4학년 1학기 문제 생성기
══════════════════════════════════════════ */

// 1단원: 큰 수
function g4_1_1(){
  const t=Math.floor(Math.random()*5);
  if(t===0){
    const units=["만","십만","백만","천만","억"],u=units[Math.floor(Math.random()*units.length)];
    const vals={"만":10000,"십만":100000,"백만":1000000,"천만":10000000,"억":100000000};
    const n=vals[u];
    return{q:`1${u}은 얼마인가요?`,choices:[String(n),String(n*10),String(n/10),String(n+1000)].sort(()=>Math.random()-0.5),ans:String(n),explain:`1${u} = ${n.toLocaleString()}이에요.`};
  }
  if(t===1){
    const a=Math.floor(Math.random()*9)+1,u=["만","십만","백만"][Math.floor(Math.random()*3)];
    const vals={"만":10000,"십만":100000,"백만":1000000};
    const ans=a*vals[u];
    return{q:`${a}${u}은 얼마인가요?`,choices:[String(ans),String(ans+vals[u]),String(ans-vals[u]),String(ans*10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}${u} = ${ans.toLocaleString()}이에요.`};
  }
  if(t===2){
    const a=Math.floor(Math.random()*9000)+1000,b=Math.floor(Math.random()*9000)+1000;
    const bigger=a>b?a:b;
    return{q:`더 큰 수는?\n${(a*10000).toLocaleString()} vs ${(b*10000).toLocaleString()}`,choices:[String(a*10000),String(b*10000)],ans:String(bigger*10000),explain:`${(bigger*10000).toLocaleString()}이 더 커요.`};
  }
  if(t===3){
    const n=Math.floor(Math.random()*900)+100;
    return{q:`${n}만은 얼마인가요?`,choices:[String(n*10000),String(n*1000),String(n*100000),String(n*10000+10000)].sort(()=>Math.random()-0.5),ans:String(n*10000),explain:`${n}만 = ${(n*10000).toLocaleString()}이에요.`};
  }
  const n=1234567;
  return{q:`1,234,567에서 십만의 자리 숫자는?`,choices:["2","1","3","4"].sort(()=>Math.random()-0.5),ans:"2",explain:`1,234,567 → 십만의 자리는 2예요.`};
}

// 2단원: 각도
// 4학년 1학기 2단원: 각도 — generator pool
const g4_1_2_gens = [
  ()=>{const a=[30,45,60,75,120,135,150][Math.floor(Math.random()*7)];const t=a<90?"예각":"둔각";return{showAngle:a,q:`이 각도는 몇 도인가요?`,choices:[String(a),String(a+15),String(a-15),String(a+30)].filter((v,i,arr)=>arr.indexOf(v)===i&&Number(v)>0).sort(()=>Math.random()-0.5),ans:String(a),explain:`${a}°는 ${t}이에요.`};},
  ()=>({q:`직각은 몇 도인가요?`,choices:["90°","45°","180°","60°"].sort(()=>Math.random()-0.5),ans:"90°",explain:`직각은 90°예요.`}),
  ()=>{const a=Math.floor(Math.random()*8)*10+10,b=Math.floor(Math.random()*8)*10+10,ans=a+b;return{q:`${a}° + ${b}° = ?`,choices:[`${ans}°`,`${ans+10}°`,`${ans-10}°`,`${ans+5}°`].sort(()=>Math.random()-0.5),ans:`${ans}°`,explain:`${a}°+${b}°=${ans}°`};},
  ()=>{const a=Math.floor(Math.random()*7)*10+40,b=Math.floor(Math.random()*3)*10+10,ans=a-b;return{q:`${a}° - ${b}° = ?`,choices:[`${ans}°`,`${ans+10}°`,`${ans-10}°`,`${ans+5}°`].sort(()=>Math.random()-0.5),ans:`${ans}°`,explain:`${a}°-${b}°=${ans}°`};},
  ()=>({q:`예각은 몇 도보다 작은가요?`,choices:["90°","180°","45°","360°"].sort(()=>Math.random()-0.5),ans:"90°",explain:`예각은 0°보다 크고 90°보다 작아요.`}),
  ()=>({q:`둔각은 어떤 각도인가요?`,choices:["90°보다 크고 180°보다 작다","90°보다 작다","180°보다 크다","90°와 같다"].sort(()=>Math.random()-0.5),ans:"90°보다 크고 180°보다 작다",explain:`둔각은 90°초과 180°미만이에요.`}),
  ()=>{const a=Math.floor(Math.random()*6)*10+10,b=180-a;return{q:`두 각의 합이 180°일 때
한 각이 ${a}°이면 다른 각은?`,choices:[`${b}°`,`${b+10}°`,`${b-10}°`,`${b+5}°`].sort(()=>Math.random()-0.5),ans:`${b}°`,explain:`180°-${a}°=${b}°`};},
  ()=>{const a=Math.floor(Math.random()*6)*10+10,b=90-a;if(b<=0)return g4_1_2_gens[6]();return{q:`두 각의 합이 90°일 때
한 각이 ${a}°이면 다른 각은?`,choices:[`${b}°`,`${b+10}°`,`${b-10}°`,`${b+5}°`].sort(()=>Math.random()-0.5),ans:`${b}°`,explain:`90°-${a}°=${b}°`};},
  ()=>{const a=Math.floor(Math.random()*6)*15+15;return{q:`${a}°는 어떤 각인가요?`,choices:[a<90?"예각":a===90?"직각":a<180?"둔각":"평각","예각","직각","둔각"].filter((v,i,arr)=>arr.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:a<90?"예각":a===90?"직각":a<180?"둔각":"평각",explain:`${a}°는 ${a<90?"예각(0°~90°미만)":a===90?"직각(90°)":a<180?"둔각(90°~180°미만)":"평각(180°)"}이에요.`};},
  ()=>{const a=Math.floor(Math.random()*35)*4+20,b=Math.floor(Math.random()*20)*4+20,c=360-a-b;return{q:`삼각형의 세 각도가 ${a}°, ${b}°, □°일 때
□는? (삼각형의 내각의 합=180°)`,choices:[`${180-a-b}°`,`${180-a-b+10}°`,`${180-a-b-10}°`,`${180-a-b+5}°`].sort(()=>Math.random()-0.5),ans:`${180-a-b}°`,explain:`180°-${a}°-${b}°=${180-a-b}°`};},
];
function g4_1_2(){ const qs=makeQPool(g4_1_2_gens,20); let i=0; return qs[i++%20]; }
// 단원별 pool을 만들어 사용
function make_g4_1_2_pool(){ return makeQPool(g4_1_2_gens,20); }

// 3단원: 곱셈과 나눗셈
function g4_1_3(){
  const t=Math.floor(Math.random()*5);
  if(t===0){
    const a=Math.floor(Math.random()*90)+10,b=Math.floor(Math.random()*9)+2,ans=a*b;
    return{q:`${a} × ${b} = ?`,choices:[String(ans),String(ans+b),String(ans-b),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} × ${b} = ${ans}`};
  }
  if(t===1){
    const b=Math.floor(Math.random()*9)+2,ans=Math.floor(Math.random()*90)+10,a=b*ans;
    return{q:`${a} ÷ ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+b)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} ÷ ${b} = ${ans}`};
  }
  if(t===2){
    const a=Math.floor(Math.random()*900)+100,b=Math.floor(Math.random()*9)+2,ans=a*b;
    return{q:`${a} × ${b} = ?`,choices:[String(ans),String(ans+b*10),String(ans-b*10),String(ans+100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} × ${b} = ${ans}`};
  }
  if(t===3){
    const b=Math.floor(Math.random()*8)+2,ans=Math.floor(Math.random()*80)+10,a=b*ans,r=Math.floor(Math.random()*(b-1))+1;
    return{q:`${a+r} ÷ ${b} = □ ··· ${r}\n□에 알맞은 수는?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a+r} ÷ ${b} = ${ans} ··· ${r}`};
  }
  const a=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*8)+2,ans=a*b*10;
  return{q:`${a} × ${b} × 10 = ?`,choices:[String(ans),String(ans+a*10),String(ans-b*10),String(ans*2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} × ${b} = ${a*b}, × 10 = ${ans}`};
}

// 4단원: 평면도형의 이동
function g4_1_4(){
  const t=Math.floor(Math.random()*4);
  if(t===0){
    return{q:`도형을 오른쪽으로 뒤집으면\n어떻게 되나요?`,choices:["좌우가 바뀐다","상하가 바뀐다","180° 돌아간다","그대로다"].sort(()=>Math.random()-0.5),ans:"좌우가 바뀐다",explain:`오른쪽(좌우)으로 뒤집으면 좌우가 바뀌어요.`};
  }
  if(t===1){
    return{q:`도형을 아래로 뒤집으면\n어떻게 되나요?`,choices:["상하가 바뀐다","좌우가 바뀐다","그대로다","360° 돌아간다"].sort(()=>Math.random()-0.5),ans:"상하가 바뀐다",explain:`위아래(상하)로 뒤집으면 상하가 바뀌어요.`};
  }
  if(t===2){
    const deg=[90,180,270][Math.floor(Math.random()*3)];
    return{q:`도형을 시계 방향으로 ${deg}° 돌리면\n몇 번 90° 돌린 것과 같나요?`,choices:[String(deg/90)+"번",String(deg/90+1)+"번",String(deg/90-1)+"번","4번"].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:String(deg/90)+"번",explain:`${deg}° ÷ 90° = ${deg/90}번이에요.`};
  }
  return{q:`도형을 같은 방향으로 4번 밀면\n처음 위치에서 어떻게 되나요?`,choices:["처음보다 4칸 이동","처음으로 돌아온다","뒤집힌다","180° 돌아간다"].sort(()=>Math.random()-0.5),ans:"처음보다 4칸 이동",explain:`밀기는 방향과 칸 수만큼 이동해요.`};
}

// 5단원: 막대그래프
function g4_1_5(){
  const items=["강아지","고양이","토끼","햄스터"];
  const vals=items.map(()=>Math.floor(Math.random()*8)+3);
  const data=items.map((label,i)=>({label,val:vals[i]}));
  const t=Math.floor(Math.random()*4);
  const maxI=data.reduce((a,b)=>b.val>a.val?b:a),minI=data.reduce((a,b)=>b.val<a.val?b:a);
  const total=vals.reduce((a,b)=>a+b);
  if(t===0)return{showBar:data,q:`좋아하는 동물 조사 결과예요.\n가장 많은 학생이 고른 것은?`,choices:[...items].sort(()=>Math.random()-0.5),ans:maxI.label,explain:`가장 많은 것은 ${maxI.label}(${maxI.val}명)이에요.`};
  if(t===1)return{showBar:data,q:`좋아하는 동물 조사 결과예요.\n가장 적은 학생이 고른 것은?`,choices:[...items].sort(()=>Math.random()-0.5),ans:minI.label,explain:`가장 적은 것은 ${minI.label}(${minI.val}명)이에요.`};
  if(t===2){const tg=data[Math.floor(Math.random()*4)];return{showBar:data,q:`${tg.label}을 고른 학생은 몇 명인가요?`,choices:[String(tg.val),String(tg.val+1),String(tg.val-1),String(tg.val+2)].sort(()=>Math.random()-0.5),ans:String(tg.val),explain:`${tg.label}은 ${tg.val}명이에요.`};}
  return{showBar:data,q:`조사에 참여한 학생은 모두 몇 명인가요?`,choices:[String(total),String(total+1),String(total-1),String(total+2)].sort(()=>Math.random()-0.5),ans:String(total),explain:`${vals.join("+")} = ${total}명이에요.`};
}

// 6단원: 규칙 찾기 (4학년 수준)
function g4_1_6(){
  const t=Math.floor(Math.random()*4);
  if(t===0){
    const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*5)+2;
    const seq=[a,a+b,a+b*2,0,a+b*4],ans=a+b*3;
    return{q:`규칙을 찾아 빈칸에 알맞은 수를 쓰세요.\n${seq[0]}, ${seq[1]}, ${seq[2]}, □, ${seq[4]}`,choices:[String(ans),String(ans+b),String(ans-b),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${b}씩 커지는 규칙이에요. ${seq[2]}+${b}=${ans}`};
  }
  if(t===1){
    const dan=Math.floor(Math.random()*7)+2,b=Math.floor(Math.random()*8)+1;
    return{q:`곱셈표에서 규칙을 찾아요.\n${dan}×${b} = ?`,choices:[String(dan*b),String(dan*b+dan),String(dan*b-dan),String(dan*(b+2))].sort(()=>Math.random()-0.5),ans:String(dan*b),explain:`${dan}×${b}=${dan*b}이에요.`};
  }
  if(t===2){
    const start=Math.floor(Math.random()*50)+10,step=Math.floor(Math.random()*5)+2;
    return{q:`${start}, ${start+step}, ${start+step*2}, ${start+step*3}, □\n다음에 올 수는?`,choices:[String(start+step*4),String(start+step*4+step),String(start+step*3),String(start+step*4-1)].sort(()=>Math.random()-0.5),ans:String(start+step*4),explain:`${step}씩 커지는 규칙이에요. ${start+step*3}+${step}=${start+step*4}`};
  }
  const a=Math.floor(Math.random()*5)+2,seq=[a,a*2,a*4,a*8,0],ans=a*16;
  return{q:`규칙을 찾아 빈칸에 알맞은 수는?\n${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, □`,choices:[String(ans),String(ans-a*4),String(ans+a*4),String(ans/2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`2배씩 커지는 규칙이에요. ${a*8}×2=${ans}`};
}

/* ══════════════════════════════════════════
   4학년 2학기 문제 생성기
══════════════════════════════════════════ */

// 1단원: 분수의 덧셈과 뺄셈
function g4_2_1(){
  const t=Math.floor(Math.random()*5);
  if(t===0){
    const d=Math.floor(Math.random()*7)+3,a=Math.floor(Math.random()*(d-2))+1,b=Math.floor(Math.random()*(d-1-a))+1;
    const ans=a+b;
    return{q:`${a}/${d} + ${b}/${d} = ?`,choices:[`${ans}/${d}`,`${ans+1}/${d}`,`${ans-1}/${d}`,`${a+b+1}/${d+1}`].sort(()=>Math.random()-0.5),ans:`${ans}/${d}`,explain:`분모가 같을 때: 분자끼리 더해요. ${a}+${b}=${ans} → ${ans}/${d}`};
  }
  if(t===1){
    const d=Math.floor(Math.random()*6)+3,a=Math.floor(Math.random()*(d-2))+2,b=Math.floor(Math.random()*(a-1))+1;
    const ans=a-b;
    return{q:`${a}/${d} - ${b}/${d} = ?`,choices:[`${ans}/${d}`,`${ans+1}/${d}`,`${ans-1}/${d}`,`${Math.abs(a-b+1)}/${d}`].sort(()=>Math.random()-0.5),ans:`${ans}/${d}`,explain:`분모가 같을 때: 분자끼리 빼요. ${a}-${b}=${ans} → ${ans}/${d}`};
  }
  if(t===2){
    const d=Math.floor(Math.random()*6)+3,a=Math.floor(Math.random()*(d-1))+1;
    const ans_n=d-a;
    return{q:`1 - ${a}/${d} = ?`,choices:[`${ans_n}/${d}`,`${ans_n+1}/${d}`,`${ans_n-1}/${d}`,`${a}/${d}`].sort(()=>Math.random()-0.5),ans:`${ans_n}/${d}`,explain:`1 = ${d}/${d}이에요. ${d}/${d} - ${a}/${d} = ${ans_n}/${d}`};
  }
  if(t===3){
    const d=Math.floor(Math.random()*5)+3,n1=Math.floor(Math.random()*3)+1,f1=Math.floor(Math.random()*(d-1))+1,n2=Math.floor(Math.random()*3)+1,f2=Math.floor(Math.random()*(d-1))+1;
    const ans_n=f1+f2,carry=ans_n>=d?1:0,ans_f=ans_n%d,ans_whole=n1+n2+carry;
    const ans=ans_f===0?String(ans_whole):`${ans_whole}과 ${ans_f}/${d}`;
    return{q:`${n1}과 ${f1}/${d} + ${n2}과 ${f2}/${d} = ?`,choices:[ans,`${ans_whole-1}과 ${ans_f}/${d}`,`${ans_whole+1}과 ${ans_f}/${d}`,`${ans_whole}과 ${ans_f+1}/${d}`].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans,explain:`자연수끼리, 분수끼리 더해요. = ${ans}`};
  }
  const d=Math.floor(Math.random()*5)+3,n1=Math.floor(Math.random()*3)+2,f1=Math.floor(Math.random()*(d-1))+1,n2=1,f2=Math.floor(Math.random()*f1)+1;
  const borrow=f1<f2?1:0,ans_f=borrow?(f1+d-f2):(f1-f2),ans_whole=n1-n2-borrow;
  const ans=ans_f===0?String(ans_whole):`${ans_whole}과 ${ans_f}/${d}`;
  return{q:`${n1}과 ${f1}/${d} - ${n2}과 ${f2}/${d} = ?`,choices:[ans,`${ans_whole-1}과 ${ans_f}/${d}`,`${ans_whole+1}과 ${ans_f}/${d}`,`${ans_whole}과 ${ans_f+1}/${d}`].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans,explain:`자연수끼리, 분수끼리 빼요. = ${ans}`};
}

// 2단원: 삼각형
function g4_2_2(){
  const t=Math.floor(Math.random()*5);
  const shapes=["예각삼각형","직각삼각형","둔각삼각형"];
  if(t===0){
    const s=shapes[Math.floor(Math.random()*3)];
    const desc={"예각삼각형":"세 각이 모두 예각","직각삼각형":"직각이 한 개","둔각삼각형":"둔각이 한 개"};
    return{showShape:s,q:`이 삼각형의 이름은?`,choices:[...shapes].sort(()=>Math.random()-0.5),ans:s,explain:`${s}: ${desc[s]}인 삼각형이에요.`};
  }
  if(t===1){
    return{q:`세 각이 모두 예각인 삼각형의 이름은?`,choices:["예각삼각형","직각삼각형","둔각삼각형","이등변삼각형"].sort(()=>Math.random()-0.5),ans:"예각삼각형",explain:`세 각이 모두 예각(90°보다 작음)이면 예각삼각형이에요.`};
  }
  if(t===2){
    return{q:`직각이 하나 있는 삼각형의 이름은?`,choices:["직각삼각형","예각삼각형","둔각삼각형","정삼각형"].sort(()=>Math.random()-0.5),ans:"직각삼각형",explain:`직각(90°)이 한 개 있으면 직각삼각형이에요.`};
  }
  if(t===3){
    const a=Math.floor(Math.random()*40)+20,b=Math.floor(Math.random()*40)+20,c=180-a-b;
    if(c<=0||c>=180)return g4_2_2();
    const type=Math.max(a,b,c)<90?"예각삼각형":Math.max(a,b,c)===90?"직각삼각형":"둔각삼각형";
    return{q:`세 각이 ${a}°, ${b}°, ${c}°인 삼각형은?`,choices:["예각삼각형","직각삼각형","둔각삼각형"].sort(()=>Math.random()-0.5),ans:type,explain:`가장 큰 각이 ${Math.max(a,b,c)}°이므로 ${type}이에요.`};
  }
  const a=Math.floor(Math.random()*60)+10,b=Math.floor(Math.random()*60)+10,ans=180-a-b;
  if(ans<=0||ans>=180)return g4_2_2();
  return{q:`삼각형의 세 각의 합은 180°예요.\n${a}°, ${b}°, □°일 때 □는?`,choices:[String(ans)+"°",String(ans+10)+"°",String(ans-10)+"°",String(ans+5)+"°"].sort(()=>Math.random()-0.5),ans:String(ans)+"°",explain:`180° - ${a}° - ${b}° = ${ans}°`};
}

// 3단원: 소수의 덧셈과 뺄셈
function g4_2_3(){
  const t=Math.floor(Math.random()*4);
  if(t===0){
    const a=(Math.floor(Math.random()*90)+10)/10,b=(Math.floor(Math.random()*90)+10)/10;
    const ans=Math.round((a+b)*10)/10;
    return{q:`${a} + ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.1)*10)/10),String(Math.round((ans-0.1)*10)/10),String(Math.round((ans+1)*10)/10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} + ${b} = ${ans}`};
  }
  if(t===1){
    const b=(Math.floor(Math.random()*50)+10)/10,a=Math.round((b+Math.floor(Math.random()*50)/10+0.1)*10)/10;
    const ans=Math.round((a-b)*10)/10;
    return{q:`${a} - ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.1)*10)/10),String(Math.round((ans-0.1)*10)/10),String(Math.round((ans+0.2)*10)/10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} - ${b} = ${ans}`};
  }
  if(t===2){
    const a=(Math.floor(Math.random()*900)+100)/100,b=(Math.floor(Math.random()*900)+100)/100;
    const ans=Math.round((a+b)*100)/100;
    return{q:`${a} + ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.01)*100)/100),String(Math.round((ans-0.01)*100)/100),String(Math.round((ans+0.1)*100)/100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a} + ${b} = ${ans}`};
  }
  const a=(Math.floor(Math.random()*9)+1)/10;
  const places={"0.1":"10분의 1","0.01":"100분의 1","0.001":"1000분의 1"};
  return{q:`0.1은 0.01의 몇 배인가요?`,choices:["10배","100배","1배","0.1배"].sort(()=>Math.random()-0.5),ans:"10배",explain:`0.1 ÷ 0.01 = 10배예요.`};
}

// 4단원: 사각형
function g4_2_4(){
  const t=Math.floor(Math.random()*5);
  const shapes4=["정사각형","직사각형","평행사변형","마름모"];
  if(t===0){
    const s=shapes4[Math.floor(Math.random()*shapes4.length)];
    return{showShape:s,q:`이 사각형의 이름은?`,choices:[...shapes4].sort(()=>Math.random()-0.5),ans:s,explain:`${s}이에요.`};
  }
  if(t===1){
    return{q:`네 변의 길이가 모두 같고\n네 각이 모두 직각인 사각형은?`,choices:["정사각형","직사각형","평행사변형","마름모"].sort(()=>Math.random()-0.5),ans:"정사각형",explain:`네 변이 같고 네 각이 직각이면 정사각형이에요.`};
  }
  if(t===2){
    return{q:`마주 보는 두 쌍의 변이\n서로 평행한 사각형은?`,choices:["평행사변형","사다리꼴","직사각형","삼각형"].sort(()=>Math.random()-0.5),ans:"평행사변형",explain:`마주 보는 두 쌍의 변이 평행하면 평행사변형이에요.`};
  }
  if(t===3){
    const side=Math.floor(Math.random()*8)+3;
    return{q:`마름모의 한 변이 ${side}cm이면\n네 변의 합은 몇 cm인가요?`,choices:[String(side*4),String(side*2),String(side*3),String(side*4+side)].sort(()=>Math.random()-0.5),ans:String(side*4),explain:`마름모는 네 변이 모두 같아요. ${side}×4=${side*4}cm`};
  }
  const w=Math.floor(Math.random()*8)+3,h=Math.floor(Math.random()*8)+3;
  return{q:`직사각형의 가로 ${w}cm, 세로 ${h}cm일 때\n네 변의 합은 몇 cm인가요?`,choices:[String((w+h)*2),String(w*h),String(w+h),String((w+h)*2+2)].sort(()=>Math.random()-0.5),ans:String((w+h)*2),explain:`(가로+세로)×2 = (${w}+${h})×2 = ${(w+h)*2}cm`};
}

// 5단원: 꺾은선그래프
function g4_2_5(){
  const months=["1월","2월","3월","4월","5월"];
  const vals=months.map((_,i)=>Math.floor(Math.random()*10)+i*2+5);
  const t=Math.floor(Math.random()*4);
  const maxM=months[vals.indexOf(Math.max(...vals))],minM=months[vals.indexOf(Math.min(...vals))];
  if(t===0)return{q:`꺾은선그래프는 어떤 상황에 사용하기 좋나요?`,choices:["시간에 따른 변화","항목별 비교","개수 세기","분류하기"].sort(()=>Math.random()-0.5),ans:"시간에 따른 변화",explain:`꺾은선그래프는 시간의 흐름에 따른 변화를 나타낼 때 좋아요.`};
  if(t===1){
    const i=Math.floor(Math.random()*4),diff=Math.abs(vals[i+1]-vals[i]);
    const change=vals[i+1]>vals[i]?"증가":"감소";
    return{q:`${months[i]}에서 ${months[i+1]}으로 가면서\n값이 어떻게 변했나요?`,choices:["증가","감소","변화없음","알 수 없다"].sort(()=>Math.random()-0.5),ans:change,explain:`${vals[i]}에서 ${vals[i+1]}으로 ${change}했어요.`};
  }
  if(t===2){
    const tg=months[Math.floor(Math.random()*5)];
    const val=vals[months.indexOf(tg)];
    return{q:`꺾은선그래프에서 ${tg}의 값은\n몇인가요?\n(${months.map((m,i)=>m+":"+vals[i]).join(", ")})`,choices:[String(val),String(val+2),String(val-2),String(val+1)].sort(()=>Math.random()-0.5),ans:String(val),explain:`${tg}의 값은 ${val}이에요.`};
  }
  return{q:`꺾은선그래프에서 선이 가장 가파르게\n올라갈 때 의미하는 것은?`,choices:["가장 빠르게 증가","가장 빠르게 감소","변화없음","가장 큰 값"].sort(()=>Math.random()-0.5),ans:"가장 빠르게 증가",explain:`선이 가파를수록 변화가 크다는 뜻이에요.`};
}

// 6단원: 다각형
function g4_2_6(){
  const t=Math.floor(Math.random()*5);
  const polys=["오각형","육각형","칠각형","팔각형"];
  const sides={오각형:5,육각형:6,칠각형:7,팔각형:8};
  if(t===0){
    const p=polys[Math.floor(Math.random()*polys.length)];
    return{showShape:p,q:`이 다각형의 이름은?`,choices:[...polys].sort(()=>Math.random()-0.5),ans:p,explain:`변이 ${sides[p]}개이면 ${p}이에요.`};
  }
  if(t===1){
    const p=polys[Math.floor(Math.random()*polys.length)],n=sides[p];
    return{q:`${p}의 변은 몇 개인가요?`,choices:[String(n),String(n-1),String(n+1),String(n+2)].sort(()=>Math.random()-0.5),ans:String(n),explain:`${p}은 변이 ${n}개예요.`};
  }
  if(t===2){
    return{q:`정다각형이란 무엇인가요?`,choices:["변의 길이와 각의 크기가 모두 같은 다각형","변이 4개인 다각형","각도가 90°인 다각형","변이 가장 많은 다각형"].sort(()=>Math.random()-0.5),ans:"변의 길이와 각의 크기가 모두 같은 다각형",explain:`정다각형은 모든 변의 길이와 모든 각의 크기가 같아요.`};
  }
  if(t===3){
    const n=Math.floor(Math.random()*5)+5;
    const diag=n*(n-3)/2;
    return{q:`꼭짓점이 ${n}개인 다각형의\n대각선 개수는?`,choices:[String(diag),String(diag+1),String(diag-1),String(diag+n)].sort(()=>Math.random()-0.5),ans:String(diag),explain:`대각선 수 = n×(n-3)÷2 = ${n}×${n-3}÷2 = ${diag}개`};
  }
  const p=polys[Math.floor(Math.random()*2)],n=sides[p],side=Math.floor(Math.random()*5)+3;
  return{q:`정${p}의 한 변이 ${side}cm이면\n모든 변의 합은 몇 cm인가요?`,choices:[String(n*side),String(n*side+side),String(n*side-side),String((n-1)*side)].sort(()=>Math.random()-0.5),ans:String(n*side),explain:`정${p}은 변 ${n}개 모두 같아요. ${side}×${n}=${n*side}cm`};
}

/* ══════════════════════════════════════════
   단원 데이터
══════════════════════════════════════════ */
const SDATA4={
  1:{title:"1학기",emoji:"🌸",bg:"linear-gradient(135deg,#FFF3E0,#FFF9E6)",border:"#FFD08A",units:[
    {id:1,title:"큰 수",          emoji:"🔢",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gen:g4_1_1},
    {id:2,title:"각도",           emoji:"📐",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gen:g4_1_2},
    {id:3,title:"곱셈과 나눗셈",  emoji:"✖️",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gen:g4_1_3},
    {id:4,title:"평면도형의 이동",emoji:"🔄",color:"#A29BFE",light:"#EDE7F6",border:"#CE93D8",gen:g4_1_4},
    {id:5,title:"막대그래프",     emoji:"📊",color:"#55EFC4",light:"#E0F2F1",border:"#80CBC4",gen:g4_1_5},
    {id:6,title:"규칙 찾기",      emoji:"🔍",color:"#FDCB6E",light:"#FFFDE7",border:"#FFE082",gen:g4_1_6},
  ]},
  2:{title:"2학기",emoji:"🍂",bg:"linear-gradient(135deg,#EDE7F6,#E8EAF6)",border:"#B39DDB",units:[
    {id:1,title:"분수의 덧셈과 뺄셈",emoji:"🍕",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gen:g4_2_1},
    {id:2,title:"삼각형",          emoji:"🔺",color:"#00B894",light:"#E0F2F1",border:"#80CBC4",gen:g4_2_2},
    {id:3,title:"소수의 덧셈과 뺄셈",emoji:"🔣",color:"#0984E3",light:"#E3F2FD",border:"#90CAF9",gen:g4_2_3},
    {id:4,title:"사각형",          emoji:"🟦",color:"#E17055",light:"#FBE9E7",border:"#FFCCBC",gen:g4_2_4},
    {id:5,title:"꺾은선그래프",    emoji:"📈",color:"#6C5CE7",light:"#EDE7F6",border:"#CE93D8",gen:g4_2_5},
    {id:6,title:"다각형",          emoji:"⬡",color:"#00CEC9",light:"#E0F7FA",border:"#80DEEA",gen:g4_2_6},
  ]},
};
const TQ4=20;

/* ══════════════════════════════════════════
   일반 퀴즈 화면
══════════════════════════════════════════ */
function QuizScreen4({semester,unitId,onBack,onStar}){
  const unit=SDATA4[semester].units.find(u=>u.id===unitId);
  const [questions]=useState(()=>Array.from({length:TQ4},()=>unit.gen()));
  const [qIdx,setQIdx]=useState(0);
  const [selected,setSelected]=useState(null);
  const [status,setStatus]=useState(null);
  const [showHint,setShowHint]=useState(false);
  const [shake,setShake]=useState(false);
  const [combo,setCombo]=useState(0);
  const [showCombo,setShowCombo]=useState(false);
  const [confetti,setConfetti]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);

  const q=questions[qIdx],prog=(qIdx/TQ4)*100;

  function pick(c){
    if(status)return;
    setSelected(c);
    if(c===q.ans){
      setStatus("correct");setConfetti(true);setTimeout(()=>setConfetti(false),1800);
      const nc=combo+1;setCombo(nc);setScore(s=>s+1);
      if(nc>=3){setShowCombo(true);setTimeout(()=>setShowCombo(false),1600);}
    }else{
      setStatus("wrong");setShake(true);setShowHint(true);setCombo(0);
      setTimeout(()=>setShake(false),600);
    }
  }

  function next(){
    if(qIdx+1>=TQ4){const fs=score+(status==="correct"?1:0);onStar(`${semester}-${unitId}`,fs>=18?3:fs>=12?2:1);setDone(true);}
    else{setQIdx(i=>i+1);setSelected(null);setStatus(null);setShowHint(false);}
  }

  if(done){
    const fs=score;
    return(
      <div style={{textAlign:"center",padding:"20px 0"}}>
        {confetti&&<Confetti/>}
        <div style={{fontSize:72,marginBottom:12}}>{fs>=18?"🏆":fs>=12?"🥈":"🎯"}</div>
        <div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{unit.title} 완료!</div>
        <div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>20문제 중 {fs}개 정답</div>
        <div style={{fontSize:28,marginBottom:20}}>{Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(fs>=18?3:fs>=12?2:1)?1:0.25}}>⭐</span>)}</div>
        <button onClick={onBack} style={btnStyle(unit.color)}>단원 목록으로</button>
      </div>
    );
  }

  return(
    <div>
      {confetti&&<Confetti/>}
      {showCombo&&(<div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",borderRadius:24,padding:"20px 36px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)",textAlign:"center",zIndex:999,animation:"popIn 0.4s ease"}}><div style={{fontSize:48}}>🔥</div><div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{combo}연속 정답!</div></div>)}

      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{unit.emoji} {unit.title} · {qIdx+1}/{TQ4}</span>
            {combo>=3&&<span style={{background:unit.color,color:"white",fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:99}}>🔥{combo}연속</span>}
          </div>
          <div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${prog}%`,background:`linear-gradient(90deg,${unit.color},${unit.border})`,transition:"width 0.4s ease",borderRadius:99}}/>
          </div>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>✅{score}</span>
      </div>

      <div style={{background:unit.light,border:`2px solid ${unit.border}`,borderRadius:24,padding:"16px 14px",marginBottom:12,animation:shake?"shake 0.5s":"none",textAlign:"center"}}>
        {q.showShape&&<div style={{display:"flex",justifyContent:"center",marginBottom:10}}><ShapeSVG shape={q.showShape} size={100}/></div>}
        {q.showAngle&&<div style={{display:"flex",justifyContent:"center",marginBottom:10}}><AngleSVG angle={q.showAngle} size={110}/></div>}
        {q.showBar&&<div style={{display:"flex",justifyContent:"center",marginBottom:10,overflowX:"auto"}}><BarChartSVG data={q.showBar}/></div>}
        <div style={{fontSize:15,fontWeight:800,color:"#2D3436",fontFamily:"'Nunito',sans-serif",lineHeight:1.7,whiteSpace:"pre-line"}}>{q.q}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:q.choices.length===2?"1fr 1fr":"1fr 1fr",gap:8,marginBottom:10}}>
        {q.choices.map((c,i)=>{
          let bg="#fff",border="2px solid #E0E0E0",col="#2D3436";
          if(selected===c){if(status==="correct"){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}else{bg="#FFEBEE";border="2px solid #EF9A9A";col="#C62828";}}
          if(status&&c===q.ans&&selected!==c){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}
          return(<button key={i} onClick={()=>pick(c)} style={{padding:"12px 6px",borderRadius:14,background:bg,border,color:col,fontSize:13,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:status?"default":"pointer",transition:"transform 0.12s"}} onMouseEnter={e=>{if(!status)e.currentTarget.style.transform="scale(1.03)";}} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{c}</button>);
        })}
      </div>

      {showHint&&status==="wrong"&&(
        <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:14,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:11,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:3}}>💡 이렇게 생각해봐요!</div>
          <div style={{fontSize:12,color:"#636E72",fontFamily:"'Nunito',sans-serif",lineHeight:1.6}}>{q.explain}</div>
        </div>
      )}
      {status==="correct"&&(
        <div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:14,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>🎉</span>
          <div>
            <div style={{fontSize:14,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div>
            <div style={{fontSize:11,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain}</div>
          </div>
        </div>
      )}
      {status==="correct"&&<button onClick={next} style={btnStyle(unit.color)}>{qIdx+1>=TQ4?"결과 보기 🏆":"다음 문제 →"}</button>}
      {status==="wrong"&&<button onClick={()=>{setSelected(null);setStatus(null);setShowHint(false);}} style={btnStyle("#EF9A9A","#C62828")}>다시 풀기 🔄</button>}
    </div>
  );
}

/* ══════════════════════════════════════════
   학기 / 단원 선택
══════════════════════════════════════════ */
function SemesterSelect4({sc,onSelect}){
  return(
    <div style={{textAlign:"center",padding:"8px 0"}}>
      <div style={{fontSize:52,marginBottom:8}}>🎒</div>
      <h1 style={{margin:0,fontSize:24,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>4학년 수학</h1>
      <p style={{margin:"6px 0 24px",color:"#B2BEC3",fontSize:13,fontFamily:"'Nunito',sans-serif"}}>학기를 선택해서 공부해보세요!</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {[1,2].map(sem=>{
          const sd=SDATA4[sem],s=sc[sem]||0;
          return(
            <button key={sem} onClick={()=>onSelect(sem)} style={{background:sd.bg,border:`3px solid ${sd.border}`,borderRadius:24,padding:"24px 16px",cursor:"pointer",transition:"transform 0.15s",boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              <div style={{fontSize:40,marginBottom:6}}>{sd.emoji}</div>
              <div style={{fontSize:16,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{sd.title}</div>
              <div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif",marginBottom:10}}>6단원 · 각 20문제</div>
              <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginBottom:4}}>
                {Array.from({length:18},(_,j)=><span key={j} style={{fontSize:11,opacity:j<s?1:0.18}}>⭐</span>)}
              </div>
              <div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{s}/18 ⭐</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UnitSelect4({semester,stars,onSelect,onBack}){
  const sd=SDATA4[semester];
  return(
    <div style={{padding:"0 4px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div>
          <div style={{fontSize:11,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>4학년 수학</div>
          <div style={{fontSize:18,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{sd.emoji} {sd.title}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {sd.units.map((u,i)=>(
          <button key={u.id} onClick={()=>onSelect(u.id)}
            style={{background:u.light,border:`2.5px solid ${u.border}`,borderRadius:20,padding:"14px 12px",cursor:"pointer",textAlign:"left",boxShadow:"0 3px 12px rgba(0,0,0,0.06)",animation:`slideUp 0.4s ${i*0.07}s both`,transition:"transform 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <div style={{fontSize:24,marginBottom:4}}>{u.emoji}</div>
            <div style={{fontSize:12,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{u.id}단원</div>
            <div style={{fontSize:11,fontWeight:700,color:u.color,fontFamily:"'Nunito',sans-serif"}}>{u.title}</div>
            <div style={{marginTop:6,display:"flex",gap:1}}>
              {Array.from({length:3},(_,j)=><span key={j} style={{fontSize:12,opacity:j<(stars[`${semester}-${u.id}`]||0)?1:0.2}}>⭐</span>)}
            </div>
            <div style={{marginTop:2,fontSize:10,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>20문제</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   메인 App (4학년)
══════════════════════════════════════════ */
export default function App4({ onBack }) {
  const [screen,setScreen]=useState("semester");
  const [activeSem,setActiveSem]=useState(null);
  const [activeUnit,setActiveUnit]=useState(null);
  const [stars,setStars]=useState({});

  const sc={
    1:SDATA4[1].units.reduce((s,u)=>s+(stars[`1-${u.id}`]||0),0),
    2:SDATA4[2].units.reduce((s,u)=>s+(stars[`2-${u.id}`]||0),0),
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:20,boxSizing:"border-box"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{background:"white",borderRadius:32,padding:"24px 20px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:"2px dashed #F0F0F0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>{onBack&&<button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#B2BEC3",padding:0}}>←</button>}<div style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>초등 4학년</div></div>
          <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:99,padding:"4px 14px",fontSize:13,fontWeight:900,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>⭐ {sc[1]+sc[2]}</div>
        </div>

        {screen==="semester"&&<SemesterSelect4 sc={sc} onSelect={sem=>{setActiveSem(sem);setScreen("units");}}/>}
        {screen==="units"&&activeSem&&<UnitSelect4 semester={activeSem} stars={stars} onSelect={uid=>{setActiveUnit(uid);setScreen("quiz");}} onBack={()=>setScreen("semester")}/>}
        {screen==="quiz"&&activeSem&&activeUnit&&<QuizScreen4 semester={activeSem} unitId={activeUnit} onBack={()=>setScreen("units")} onStar={(key,s)=>setStars(p=>({...p,[key]:Math.max(p[key]||0,s)}))}/>}
      </div>

      <style>{`
        @keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}30%{transform:translateX(8px)}45%{transform:translateX(-6px)}60%{transform:translateX(6px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}60%{transform:translate(-50%,-50%) scale(1.1)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        body{margin:0;font-family:'Nunito',sans-serif;}
      `}</style>
    </div>
  );
}
