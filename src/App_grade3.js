import React, { useState } from "react";

/* ══════════════════════════════════════════
   SVG 컴포넌트
══════════════════════════════════════════ */
function ShapeSVG3({ shape, size=90 }) {
  const s=size;
  if(shape==="직각삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="15,85 85,85 15,20" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="3.5" strokeLinejoin="round"/><rect x="15" y="72" width="13" height="13" fill="none" stroke="#4DABF7" strokeWidth="2"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#4DABF7">직각삼각형</text></svg>;
  if(shape==="이등변삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,10 85,85 15,85" fill="#FFD8A8" stroke="#FF9F43" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#FF9F43">이등변삼각형</text></svg>;
  if(shape==="정삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,8 92,82 8,82" fill="#B2F2BB" stroke="#51CF66" strokeWidth="3.5" strokeLinejoin="round"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#51CF66">정삼각형</text></svg>;
  if(shape==="원") return <svg width={s} height={s} viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#C5F6FA" stroke="#15AABF" strokeWidth="3.5"/><line x1="50" y1="50" x2="90" y2="50" stroke="#15AABF" strokeWidth="2" strokeDasharray="4"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#15AABF">원</text></svg>;
  if(shape==="직사각형") return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="8" y="25" width="84" height="55" fill="#E9BBFD" stroke="#BE4BDB" strokeWidth="3.5"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#BE4BDB">직사각형</text></svg>;
  if(shape==="정사각형") return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="#FFEC99" stroke="#FAB005" strokeWidth="3.5"/><text x="50" y="97" textAnchor="middle" fontSize="9" fill="#FAB005">정사각형</text></svg>;
  return null;
}

function Confetti() {
  const colors=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E"];
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>{Array.from({length:36},(_,i)=>(<div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-20px",width:8+Math.random()*8,height:8+Math.random()*8,borderRadius:Math.random()>0.5?"50%":"2px",background:colors[i%6],animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`}}/>))}</div>);
}
function btn(bg,col="white"){return{width:"100%",padding:"13px",borderRadius:16,border:"none",background:bg,color:col,fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 5px 16px ${bg}55`};}

/* ══════════════════════════════════════════
   문제 생성 — 중복 방지 핵심 함수
   각 함수는 서로 다른 type의 문제를 pool로 갖고,
   20문제를 만들 때 최대한 다양하게 섞음
══════════════════════════════════════════ */

// 풀에서 중복 없이 20개 뽑기
function makePool(generators) {
  const pool = [];
  let idx = 0;
  while(pool.length < 20) {
    pool.push(generators[idx % generators.length]());
    idx++;
  }
  return pool.sort(()=>Math.random()-0.5);
}

/* ── 3학년 1학기 ─────────────────────── */

// 1단원: 덧셈과 뺄셈 (세 자리 수)
const g3_1_1_gens = [
  ()=>{const a=Math.floor(Math.random()*400)+100,b=Math.floor(Math.random()*400)+100,ans=a+b;return{q:`${a} + ${b} = ?`,choices:[String(ans),String(ans+10),String(ans-1),String(ans+100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}+${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*400)+400,b=Math.floor(Math.random()*300)+100,ans=a-b;return{q:`${a} - ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-10),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}-${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*300)+200,b=Math.floor(Math.random()*200)+100,ans=a+b;return{q:`사과 ${a}개와 배 ${b}개를 합치면\n모두 몇 개인가요?`,choices:[String(ans),String(ans+10),String(ans-1),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}+${b}=${ans}개`};},
  ()=>{const a=Math.floor(Math.random()*400)+400,b=Math.floor(Math.random()*200)+100,ans=a-b;return{q:`${a}에서 ${b}를 빼면 얼마인가요?`,choices:[String(ans),String(ans+10),String(ans-10),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}-${b}=${ans}`};},
  ()=>{const ans=Math.floor(Math.random()*300)+200,b=Math.floor(Math.random()*200)+100,a=ans+b;return{q:`□ + ${b} = ${a}\n□에 들어갈 수는?`,choices:[String(ans),String(ans+10),String(ans-10),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}-${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*400)+400,ans=Math.floor(Math.random()*200)+100,b=a-ans;return{q:`${a} - □ = ${ans}\n□에 들어갈 수는?`,choices:[String(b),String(b+10),String(b-10),String(b+1)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${a}-${ans}=${b}`};},
  ()=>{const a=Math.floor(Math.random()*300)+100,b=Math.floor(Math.random()*300)+100,c=Math.floor(Math.random()*200)+50,ans=a+b-c;return{q:`${a} + ${b} - ${c} = ?`,choices:[String(ans),String(ans+10),String(ans-10),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}+${b}=${a+b}, ${a+b}-${c}=${ans}`};},
];

// 2단원: 평면도형
const g3_1_2_gens = [
  ()=>{const s=["직각삼각형","이등변삼각형","정삼각형"][Math.floor(Math.random()*3)];const others=["직각삼각형","이등변삼각형","정삼각형","직사각형","정사각형"].filter(x=>x!==s).sort(()=>Math.random()-0.5).slice(0,3);return{showShape:s,q:`이 도형의 이름은?`,choices:[s,...others].sort(()=>Math.random()-0.5),ans:s,explain:`이 도형은 ${s}이에요.`};},
  ()=>{const shapes=[{n:"직사각형",v:4,s:4},{n:"정사각형",v:4,s:4},{n:"직각삼각형",v:3,s:3},{n:"정삼각형",v:3,s:3}],sh=shapes[Math.floor(Math.random()*shapes.length)];return{showShape:sh.n,q:`이 도형의 꼭짓점은 몇 개인가요?`,choices:[String(sh.v),String(sh.v+1),String(sh.v-1),String(sh.v+2)].sort(()=>Math.random()-0.5),ans:String(sh.v),explain:`${sh.n}의 꼭짓점은 ${sh.v}개예요.`};},
  ()=>({q:`세 변의 길이가 모두 같은 삼각형은?`,choices:["정삼각형","이등변삼각형","직각삼각형","직사각형"].sort(()=>Math.random()-0.5),ans:"정삼각형",explain:`세 변이 모두 같으면 정삼각형이에요.`}),
  ()=>({q:`두 변의 길이가 같은 삼각형은?`,choices:["이등변삼각형","정삼각형","직각삼각형","직사각형"].sort(()=>Math.random()-0.5),ans:"이등변삼각형",explain:`두 변의 길이가 같으면 이등변삼각형이에요.`}),
  ()=>({q:`직각이 하나 있는 삼각형은?`,choices:["직각삼각형","정삼각형","이등변삼각형","평행사변형"].sort(()=>Math.random()-0.5),ans:"직각삼각형",explain:`직각(90°)이 하나 있으면 직각삼각형이에요.`}),
  ()=>{const side=Math.floor(Math.random()*6)+3;return{q:`정삼각형의 한 변이 ${side}cm이면\n세 변의 합은?`,choices:[String(side*3),String(side*2),String(side*4),String(side*3+1)].sort(()=>Math.random()-0.5),ans:String(side*3),explain:`정삼각형은 세 변이 같아요. ${side}×3=${side*3}cm`};},
  ()=>{const w=Math.floor(Math.random()*8)+3,h=Math.floor(Math.random()*6)+2;return{q:`직사각형의 가로 ${w}cm, 세로 ${h}cm일 때\n네 변의 합은?`,choices:[String((w+h)*2),String(w*h),String(w+h),String((w+h)*2+2)].sort(()=>Math.random()-0.5),ans:String((w+h)*2),explain:`(${w}+${h})×2=${(w+h)*2}cm`};},
  ()=>({q:`직사각형의 특징은?`,choices:["네 각이 모두 직각","세 변이 모두 같다","꼭짓점이 3개","변이 없다"].sort(()=>Math.random()-0.5),ans:"네 각이 모두 직각",explain:`직사각형은 네 각이 모두 90°예요.`}),
];

// 3단원: 나눗셈
const g3_1_3_gens = [
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+1,a=b*q;return{q:`${a} ÷ ${b} = ?`,choices:[String(q),String(q+1),String(q-1),String(q+2)].sort(()=>Math.random()-0.5),ans:String(q),explain:`${a}÷${b}=${q}`};},
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+1,a=b*q;return{q:`사탕 ${a}개를 ${b}명에게 똑같이 나누면\n한 명이 받는 수는?`,choices:[String(q),String(q+1),String(q-1),String(q+2)].sort(()=>Math.random()-0.5),ans:String(q),explain:`${a}÷${b}=${q}개`};},
  ()=>{const b=Math.floor(Math.random()*7)+2,q=Math.floor(Math.random()*9)+1,a=b*q;return{q:`${a}를 똑같이 ${q}묶음으로 나누면\n한 묶음은 몇 개?`,choices:[String(b),String(b+1),String(b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${a}÷${q}=${b}개`};},
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+1,a=b*q;return{q:`□ ÷ ${b} = ${q}\n□에 알맞은 수는?`,choices:[String(a),String(a+b),String(a-b),String(a+1)].sort(()=>Math.random()-0.5),ans:String(a),explain:`${q}×${b}=${a}이에요.`};},
  ()=>{const b=Math.floor(Math.random()*7)+2,a=b*(Math.floor(Math.random()*8)+2);return{q:`${a} ÷ □ = ${a/b}\n□에 알맞은 수는?`,choices:[String(b),String(b+1),String(b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${a}÷${a/b}=${b}이에요.`};},
  ()=>{const b=Math.floor(Math.random()*7)+2,q=Math.floor(Math.random()*8)+2,r=Math.floor(Math.random()*(b-1))+1,a=b*q+r;return{q:`${a} ÷ ${b} = □ ··· ${r}\n□에 알맞은 수는?`,choices:[String(q),String(q+1),String(q-1),String(q+2)].sort(()=>Math.random()-0.5),ans:String(q),explain:`${a}÷${b}=${q} 나머지 ${r}`};},
  ()=>{const b=Math.floor(Math.random()*6)+2,q=Math.floor(Math.random()*8)+2,a=b*q;return{q:`곱셈식 ${b}×${q}=${a}를\n나눗셈식으로 나타내면?`,choices:[`${a}÷${b}=${q}`,`${a}÷${q}=${b}`,`${b}÷${a}=${q}`,`${q}÷${b}=${a}`].sort(()=>Math.random()-0.5),ans:`${a}÷${b}=${q}`,explain:`${b}×${q}=${a} → ${a}÷${b}=${q}이에요.`};},
];

// 4단원: 곱셈
const g3_1_4_gens = [
  ()=>{const a=Math.floor(Math.random()*90)+10,b=Math.floor(Math.random()*9)+2,ans=a*b;return{q:`${a} × ${b} = ?`,choices:[String(ans),String(ans+b),String(ans-b),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*9)+2,b=Math.floor(Math.random()*9)+2,ans=a*b*10;return{q:`${a} × ${b} × 10 = ?`,choices:[String(ans),String(ans+10),String(a*b),String(ans*2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${a*b}, ×10=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*40)+10,b=Math.floor(Math.random()*9)+2,ans=a*b;return{q:`장미가 한 다발에 ${a}송이씩\n${b}다발이면 모두 몇 송이?`,choices:[String(ans),String(ans+a),String(ans-a),String(ans+b)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}송이`};},
  ()=>{const b=Math.floor(Math.random()*9)+2,ans=Math.floor(Math.random()*50)+10,a=b*ans;return{q:`□ × ${b} = ${a}\n□에 알맞은 수는?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+b)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}÷${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*90)+10,b=Math.floor(Math.random()*9)+2;return{q:`${a}×${b}에서 ${b}×10은\n${a}×${b}보다 얼마나 더 큰가요?`,choices:[String(a*(10-b)),String(a),String(a*b),String(10*b)].sort(()=>Math.random()-0.5),ans:String(a*(10-b)),explain:`${b}×10=${b*10}, ${a}×${b}=${a*b}, 차=${a*(10-b)}`};},
  ()=>{const h=Math.floor(Math.random()*9)+1,t=Math.floor(Math.random()*9)+1,o=Math.floor(Math.random()*9)+1,b=Math.floor(Math.random()*9)+2,ans=(h*100+t*10+o)*b;return{q:`(${h*100+t*10+o}) × ${b} = ?`,choices:[String(ans),String(ans+b*10),String(ans-b),String(ans+100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${h*100+t*10+o}×${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*9)+2,b=Math.floor(Math.random()*9)+2,c=Math.floor(Math.random()*9)+2;return{q:`${a} × ${b} + ${a} × ${c} = ?`,choices:[String(a*(b+c)),String(a*b+c),String(a+b+c),String(a*(b+c)+a)].sort(()=>Math.random()-0.5),ans:String(a*(b+c)),explain:`${a}×(${b}+${c})=${a}×${b+c}=${a*(b+c)}`};},
];

// 5단원: 길이와 시간
const g3_1_5_gens = [
  ()=>{const m=Math.floor(Math.random()*4)+1,cm=Math.floor(Math.random()*99)+1;return{q:`${m}m ${cm}cm = 몇 cm?`,choices:[String(m*100+cm),String(m*100+cm+10),String(m*100),String(m*100+cm+1)].sort(()=>Math.random()-0.5),ans:String(m*100+cm),explain:`${m}m=${m*100}cm, +${cm}cm=${m*100+cm}cm`};},
  ()=>{const cm=Math.floor(Math.random()*400)+105;const m=Math.floor(cm/100),r=cm%100;return{q:`${cm}cm = 몇 m 몇 cm?`,choices:[`${m}m ${r}cm`,`${m+1}m ${r}cm`,`${m}m ${r+10}cm`,`${m-1}m ${r}cm`].sort(()=>Math.random()-0.5),ans:`${m}m ${r}cm`,explain:`${cm}÷100=${m}···${r} → ${m}m ${r}cm`};},
  ()=>{const km=Math.floor(Math.random()*5)+1,m=Math.floor(Math.random()*900)+50;return{q:`${km}km ${m}m = 몇 m?`,choices:[String(km*1000+m),String(km*1000),String(km*100+m),String(km*1000+m+100)].sort(()=>Math.random()-0.5),ans:String(km*1000+m),explain:`${km}km=${km*1000}m, +${m}m=${km*1000+m}m`};},
  ()=>{const h=Math.floor(Math.random()*10)+8,m1=Math.floor(Math.random()*5)*10,add=Math.floor(Math.random()*4)*10+10,tot=m1+add,h2=tot>=60?h+1:h,m2=tot%60;return{q:`${h}시 ${m1}분에서 ${add}분 후는?`,choices:[`${h2}시 ${m2}분`,`${h2}시 ${m2+10>59?m2:m2+10}분`,`${h}시 ${m1+add}분`,`${h+1}시 ${m2}분`].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:`${h2}시 ${m2}분`,explain:`${m1}+${add}=${tot}분 → ${h2}시 ${m2}분`};},
  ()=>{const mins=[60,90,120,150,180],m=mins[Math.floor(Math.random()*mins.length)];return{q:`${m}분 = 몇 시간 몇 분?`,choices:[`${Math.floor(m/60)}시간 ${m%60}분`,`${Math.floor(m/60)+1}시간 ${m%60}분`,`0시간 ${m}분`,`${Math.floor(m/60)}시간 ${m%60+10}분`].sort(()=>Math.random()-0.5),ans:`${Math.floor(m/60)}시간 ${m%60}분`,explain:`60분=1시간, ${Math.floor(m/60)}시간 ${m%60}분`};},
  ()=>{const a=Math.floor(Math.random()*5)+1,b=Math.floor(Math.random()*900)+100,c=Math.floor(Math.random()*4)+1,d=Math.floor(Math.random()*900)+100,tot=(a+c)*1000+(b+d);const km=Math.floor(tot/1000),m=tot%1000;return{q:`${a}km ${b}m + ${c}km ${d}m = ?`,choices:[`${km}km ${m}m`,`${km+1}km ${m}m`,`${km}km ${m+100}m`,`${km-1}km ${m}m`].sort(()=>Math.random()-0.5),ans:`${km}km ${m}m`,explain:`km끼리, m끼리 더해요 → ${km}km ${m}m`};},
  ()=>{const days=["월","화","수","목","금","토","일"],d=Math.floor(Math.random()*7),add=Math.floor(Math.random()*6)+1,ans=days[(d+add)%7];return{q:`${days[d]}요일에서 ${add}일 후는?`,choices:[ans,days[(d+add+1)%7],days[(d+add-1+7)%7],days[(d+add+2)%7]].sort(()=>Math.random()-0.5),ans,explain:`${days[d]}에서 ${add}일 후는 ${ans}요일`};},
];

// 6단원: 분수와 소수
const g3_1_6_gens = [
  ()=>{const d=Math.floor(Math.random()*7)+2,n=Math.floor(Math.random()*(d-1))+1;return{q:`전체를 ${d}등분했을 때\n${n}칸이 색칠되면 분수로 나타내면?`,choices:[`${n}/${d}`,`${d}/${n}`,`${n+1}/${d}`,`${n}/${d+1}`].sort(()=>Math.random()-0.5),ans:`${n}/${d}`,explain:`${d}등분 중 ${n}칸 → ${n}/${d}`};},
  ()=>{const d=Math.floor(Math.random()*7)+2,a=Math.floor(Math.random()*(d-1))+1,b=Math.floor(Math.random()*(d-1))+1;const bigger=a>b?`${a}/${d}`:`${b}/${d}`;return{q:`${a}/${d}와 ${b}/${d} 중\n더 큰 분수는?`,choices:[`${a}/${d}`,`${b}/${d}`],ans:bigger,explain:`분모가 같을 때 분자가 클수록 커요. ${bigger}가 더 커요.`};},
  ()=>{const n=Math.floor(Math.random()*8)+2,a=1,b=Math.floor(Math.random()*(n-1))+2;const bigger=`1/${a}`;return{q:`1/${a}와 1/${b} 중\n더 큰 단위분수는?`,choices:[`1/${a}`,`1/${b}`],ans:`1/${a}`,explain:`단위분수는 분모가 작을수록 커요. 1/${a} > 1/${b}`};},
  ()=>{const n=(Math.floor(Math.random()*9)+1)/10;return{q:`0.${Math.round(n*10)}은 0.1이 몇 개인가요?`,choices:[String(Math.round(n*10)),String(Math.round(n*10)+1),String(Math.round(n*10)-1),String(Math.round(n*10)+2)].sort(()=>Math.random()-0.5),ans:String(Math.round(n*10)),explain:`0.${Math.round(n*10)} = 0.1이 ${Math.round(n*10)}개`};},
  ()=>{const a=(Math.floor(Math.random()*9)+1)/10,b=(Math.floor(Math.random()*9)+1)/10;const bigger=a>b?String(a):String(b);return{q:`${a}와 ${b} 중\n더 큰 소수는?`,choices:[String(a),String(b)],ans:bigger,explain:`소수 첫째 자리를 비교해요. ${bigger}이 더 커요.`};},
  ()=>{const n=Math.floor(Math.random()*8)+1,d=Math.floor(Math.random()*7)+2;return{q:`${n}/${d}에서 분모는 무엇인가요?`,choices:[String(d),String(n),String(d+1),String(n+1)].sort(()=>Math.random()-0.5),ans:String(d),explain:`분수에서 아래 수가 분모예요. 분모=${d}`};},
  ()=>{const w=Math.floor(Math.random()*5)+1,n=Math.floor(Math.random()*6)+1,d=Math.floor(Math.random()*4)+n+1;return{q:`${w}과 ${n}/${d}에서\n분자는 무엇인가요?`,choices:[String(n),String(d),String(w),String(n+1)].sort(()=>Math.random()-0.5),ans:String(n),explain:`대분수에서 분수 부분의 위 수가 분자예요. 분자=${n}`};},
];

/* ── 3학년 2학기 ─────────────────────── */

// 1단원: 곱셈 (두자리×두자리)
const g3_2_1_gens = [
  ()=>{const a=Math.floor(Math.random()*80)+10,b=Math.floor(Math.random()*80)+10,ans=a*b;return{q:`${a} × ${b} = ?`,choices:[String(ans),String(ans+a),String(ans-b),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*40)+10,b=Math.floor(Math.random()*40)+10,ans=a*b;return{q:`한 상자에 ${a}개씩 들어있는\n상자가 ${b}개이면 모두 몇 개?`,choices:[String(ans),String(ans+a),String(ans-b),String(ans+b)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}개`};},
  ()=>{const a=Math.floor(Math.random()*50)+20,b=Math.floor(Math.random()*50)+20;return{q:`${a}×${b}에서 십의 자리 계산:\n${a}×${Math.floor(b/10)*10} = ?`,choices:[String(a*Math.floor(b/10)*10),String(a*Math.floor(b/10)*10+a),String(a*b),String(a*Math.floor(b/10))].sort(()=>Math.random()-0.5),ans:String(a*Math.floor(b/10)*10),explain:`${a}×${Math.floor(b/10)*10}=${a*Math.floor(b/10)*10}`};},
  ()=>{const b=Math.floor(Math.random()*40)+10,ans=Math.floor(Math.random()*40)+10,a=b*ans;return{q:`□ × ${b} = ${a}\n□에 알맞은 수는?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}÷${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*50)+20,b=Math.floor(Math.random()*50)+20,ans=a*b;return{q:`${a}와 ${b}의 곱은?`,choices:[String(ans),String(ans+a),String(a+b),String(ans-10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*30)+15,ans=a*a;return{q:`${a}의 제곱(${a}×${a})은?`,choices:[String(ans),String(ans+a),String(ans-a),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${a}=${ans}`};},
];

// 2단원: 나눗셈 (나머지 있는)
const g3_2_2_gens = [
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+2,r=Math.floor(Math.random()*(b-1))+1,a=b*q+r;return{q:`${a} ÷ ${b} = ?`,choices:[`${q} ··· ${r}`,`${q+1} ··· ${r}`,`${q-1} ··· ${r}`,`${q} ··· ${r+1}`].sort(()=>Math.random()-0.5),ans:`${q} ··· ${r}`,explain:`${a}÷${b}=${q} 나머지 ${r}`};},
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+2,r=Math.floor(Math.random()*(b-1))+1,a=b*q+r;return{q:`연필 ${a}자루를 ${b}명에게 나누면\n한 명은 몇 자루, 나머지는?`,choices:[`${q}자루 ··· ${r}자루`,`${q+1}자루 ··· ${r}자루`,`${q}자루 ··· ${r+1}자루`,`${q-1}자루 ··· ${r}자루`].sort(()=>Math.random()-0.5),ans:`${q}자루 ··· ${r}자루`,explain:`${a}÷${b}=${q} 나머지 ${r}`};},
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+1,r=Math.floor(Math.random()*(b-1))+1,a=b*q+r;return{q:`${a}÷${b}에서 나머지는?`,choices:[String(r),String(r+1),String(r+b),String(b)].sort(()=>Math.random()-0.5),ans:String(r),explain:`${a}=${b}×${q}+${r}, 나머지=${r}`};},
  ()=>{const b=Math.floor(Math.random()*8)+2,q=Math.floor(Math.random()*9)+2;return{q:`나머지는 항상 나누는 수보다\n작아야 해요. ${b}로 나눌 때\n나머지가 될 수 없는 것은?`,choices:[String(b),String(b-1),String(Math.floor(b/2)),String(1)].sort(()=>Math.random()-0.5),ans:String(b),explain:`나머지는 항상 ${b}보다 작아야 해요.`};},
  ()=>{const b=Math.floor(Math.random()*8)+2,r=Math.floor(Math.random()*(b-1))+1,q=Math.floor(Math.random()*8)+2,a=b*q+r;return{q:`□ ÷ ${b} = ${q} ··· ${r}\n□에 알맞은 수는?`,choices:[String(a),String(a+1),String(a-1),String(b*q)].sort(()=>Math.random()-0.5),ans:String(a),explain:`${b}×${q}+${r}=${a}`};},
  ()=>{const b=Math.floor(Math.random()*7)+3,q=Math.floor(Math.random()*9)+2,a=b*q+Math.floor(b/2);const r=a%b;return{q:`${a} ÷ ${b}의 몫은?`,choices:[String(q),String(q+1),String(q-1),String(Math.floor(a/b)+1)].sort(()=>Math.random()-0.5),ans:String(Math.floor(a/b)),explain:`${a}÷${b}=${Math.floor(a/b)} 나머지 ${r}`};},
];

// 3단원: 분수
const g3_2_3_gens = [
  ()=>{const d=Math.floor(Math.random()*6)+2,n=Math.floor(Math.random()*(d-1))+1;const type=n<d?"진분수":n===d?"가분수":"대분수";return{q:`${n}/${d}는 어떤 분수인가요?`,choices:["진분수","가분수","대분수","단위분수"].sort(()=>Math.random()-0.5),ans:n<d?"진분수":"가분수",explain:`분자(${n})${n<d?"<":"≥"}분모(${d}) → ${n<d?"진분수":"가분수"}`};},
  ()=>{const d=Math.floor(Math.random()*5)+2,n=d+Math.floor(Math.random()*d)+1;const w=Math.floor(n/d),r=n%d;return{q:`가분수 ${n}/${d}를\n대분수로 나타내면?`,choices:[r===0?String(w):`${w}과 ${r}/${d}`,`${w+1}과 ${r}/${d}`,`${w}과 ${r+1}/${d}`,`${w-1}과 ${r}/${d}`].sort(()=>Math.random()-0.5),ans:r===0?String(w):`${w}과 ${r}/${d}`,explain:`${n}÷${d}=${w} 나머지 ${r} → ${w}과 ${r}/${d}`};},
  ()=>{const d=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*4)+1,r=Math.floor(Math.random()*(d-1))+1,n=w*d+r;return{q:`대분수 ${w}과 ${r}/${d}를\n가분수로 나타내면?`,choices:[`${n}/${d}`,`${n+1}/${d}`,`${n-1}/${d}`,`${w*d}/${d}`].sort(()=>Math.random()-0.5),ans:`${n}/${d}`,explain:`${w}×${d}+${r}=${n} → ${n}/${d}`};},
  ()=>{const d=Math.floor(Math.random()*6)+2,a=Math.floor(Math.random()*(d-1))+1,b=Math.floor(Math.random()*(d-1))+1;const ans=a>b?`${a}/${d}`:`${b}/${d}`;return{q:`${a}/${d}와 ${b}/${d} 중 더 큰 수는?`,choices:[`${a}/${d}`,`${b}/${d}`],ans,explain:`분모가 같을 때 분자가 크면 더 큰 분수`};},
  ()=>{const d=Math.floor(Math.random()*5)+3,n=d+Math.floor(Math.random()*(d*2))+1;return{q:`${n}/${d}는 자연수 □보다 크고\n□+1보다 작아요. □는?`,choices:[String(Math.floor(n/d)),String(Math.floor(n/d)+1),String(Math.floor(n/d)-1),String(d)].sort(()=>Math.random()-0.5),ans:String(Math.floor(n/d)),explain:`${n}÷${d}=${Math.floor(n/d)}···${n%d}, □=${Math.floor(n/d)}`};},
  ()=>{const d1=Math.floor(Math.random()*5)+2,n1=Math.floor(Math.random()*(d1-1))+1,d2=d1,n2=n1+Math.floor(Math.random()*3)+1;return{q:`${n1}/${d1}과 ${n2}/${d2} 중\n작은 분수는?`,choices:[`${n1}/${d1}`,`${n2}/${d2}`],ans:`${n1}/${d1}`,explain:`분모가 같으면 분자가 작을수록 작아요.`};},
];

// 4단원: 원
const g3_2_4_gens = [
  ()=>({showShape:"원",q:`이 도형의 이름은?`,choices:["원","삼각형","사각형","오각형"].sort(()=>Math.random()-0.5),ans:"원",explain:`둥근 모양의 도형이 원이에요.`}),
  ()=>{const r=Math.floor(Math.random()*8)+3;return{q:`원의 반지름이 ${r}cm이면\n지름은 몇 cm인가요?`,choices:[String(r*2),String(r),String(r*3),String(r*2+1)].sort(()=>Math.random()-0.5),ans:String(r*2),explain:`지름=반지름×2=${r}×2=${r*2}cm`};},
  ()=>{const d=Math.floor(Math.random()*8)+4;return{q:`원의 지름이 ${d*2}cm이면\n반지름은 몇 cm인가요?`,choices:[String(d),String(d*2),String(d+1),String(d-1)].sort(()=>Math.random()-0.5),ans:String(d),explain:`반지름=지름÷2=${d*2}÷2=${d}cm`};},
  ()=>({q:`원의 중심에서 원 위의 한 점까지의\n거리를 무엇이라고 하나요?`,choices:["반지름","지름","중심","둘레"].sort(()=>Math.random()-0.5),ans:"반지름",explain:`원의 중심에서 원 위까지의 거리가 반지름이에요.`}),
  ()=>({q:`원에서 중심을 지나는 가장 긴\n선분을 무엇이라고 하나요?`,choices:["지름","반지름","중심","호"].sort(()=>Math.random()-0.5),ans:"지름",explain:`원의 중심을 지나는 가장 긴 선분이 지름이에요.`}),
  ()=>{const r=Math.floor(Math.random()*6)+2;return{q:`반지름이 ${r}cm인 원 2개를\n이어 붙이면 전체 길이는?`,choices:[String(r*4),String(r*2),String(r*3),String(r*4+r)].sort(()=>Math.random()-0.5),ans:String(r*4),explain:`원 1개의 지름=${r*2}cm, 2개=${r*4}cm`};},
  ()=>({q:`원에 대한 설명으로 옳은 것은?`,choices:["반지름은 모두 같다","지름은 반지름과 같다","원에 꼭짓점이 있다","반지름이 지름보다 크다"].sort(()=>Math.random()-0.5),ans:"반지름은 모두 같다",explain:`한 원에서 반지름은 모두 같은 길이예요.`}),
];

// 5단원: 들이와 무게
const g3_2_5_gens = [
  ()=>{const l=Math.floor(Math.random()*5)+1,ml=Math.floor(Math.random()*900)+50;return{q:`${l}L ${ml}mL = 몇 mL?`,choices:[String(l*1000+ml),String(l*1000),String(l*100+ml),String(l*1000+ml+100)].sort(()=>Math.random()-0.5),ans:String(l*1000+ml),explain:`${l}L=${l*1000}mL, +${ml}mL=${l*1000+ml}mL`};},
  ()=>{const ml=Math.floor(Math.random()*4)*1000+Math.floor(Math.random()*900)+100;const l=Math.floor(ml/1000),r=ml%1000;return{q:`${ml}mL = 몇 L 몇 mL?`,choices:[`${l}L ${r}mL`,`${l+1}L ${r}mL`,`${l}L ${r+100}mL`,`${l-1}L ${r}mL`].sort(()=>Math.random()-0.5),ans:`${l}L ${r}mL`,explain:`${ml}÷1000=${l}···${r} → ${l}L ${r}mL`};},
  ()=>{const kg=Math.floor(Math.random()*5)+1,g=Math.floor(Math.random()*900)+50;return{q:`${kg}kg ${g}g = 몇 g?`,choices:[String(kg*1000+g),String(kg*1000),String(kg*100+g),String(kg*1000+g+100)].sort(()=>Math.random()-0.5),ans:String(kg*1000+g),explain:`${kg}kg=${kg*1000}g, +${g}g=${kg*1000+g}g`};},
  ()=>{const a=Math.floor(Math.random()*3)+1,b=Math.floor(Math.random()*900)+100,c=Math.floor(Math.random()*3)+1,d=Math.floor(Math.random()*900)+100;const tot=(a+c)*1000+(b+d);const l=Math.floor(tot/1000),r=tot%1000;return{q:`${a}L ${b}mL + ${c}L ${d}mL = ?`,choices:[`${l}L ${r}mL`,`${l+1}L ${r}mL`,`${l}L ${r+100}mL`,`${a+c}L ${b+d}mL`].sort(()=>Math.random()-0.5),ans:`${l}L ${r}mL`,explain:`L끼리, mL끼리 더해요 → ${l}L ${r}mL`};},
  ()=>({q:`1L는 몇 mL인가요?`,choices:["1000mL","100mL","10mL","10000mL"].sort(()=>Math.random()-0.5),ans:"1000mL",explain:`1L = 1000mL이에요.`}),
  ()=>({q:`1kg는 몇 g인가요?`,choices:["1000g","100g","10g","10000g"].sort(()=>Math.random()-0.5),ans:"1000g",explain:`1kg = 1000g이에요.`}),
  ()=>{const a=Math.floor(Math.random()*4)+2,b=Math.floor(Math.random()*800)+200,c=Math.floor(Math.random()*2)+1,d=Math.floor(Math.random()*500)+100;const difkg=a-c,difg=b-d<0?b-d+1000:b-d,borrowKg=b-d<0?1:0;const rkg=difkg-borrowKg,rg=difg;return{q:`${a}kg ${b}g - ${c}kg ${d}g = ?`,choices:[`${rkg}kg ${rg}g`,`${rkg+1}kg ${rg}g`,`${rkg}kg ${rg+100}g`,`${a-c}kg ${Math.abs(b-d)}g`].sort(()=>Math.random()-0.5),ans:`${rkg}kg ${rg}g`,explain:`kg끼리, g끼리 빼요 → ${rkg}kg ${rg}g`};},
];

// 6단원: 자료의 정리
const g3_2_6_gens = [
  ()=>{const items=["빨강","파랑","노랑","초록"],vals=items.map(()=>Math.floor(Math.random()*6)+2),data=items.map((l,i)=>({label:l,val:vals[i]}));const max=data.reduce((a,b)=>b.val>a.val?b:a),min=data.reduce((a,b)=>b.val<a.val?b:a);return{showBar:data,q:`좋아하는 색 조사 결과예요.\n가장 많은 색은?`,choices:[...items].sort(()=>Math.random()-0.5),ans:max.label,explain:`가장 많은 색은 ${max.label}(${max.val}명)`};},
  ()=>{const items=["사과","바나나","딸기","포도"],vals=items.map(()=>Math.floor(Math.random()*6)+2),data=items.map((l,i)=>({label:l,val:vals[i]}));const min=data.reduce((a,b)=>b.val<a.val?b:a);return{showBar:data,q:`좋아하는 과일 조사 결과예요.\n가장 적은 것은?`,choices:[...items].sort(()=>Math.random()-0.5),ans:min.label,explain:`가장 적은 것은 ${min.label}(${min.val}명)`};},
  ()=>{const items=["월","화","수","목","금"],vals=items.map(()=>Math.floor(Math.random()*5)+3),data=items.map((l,i)=>({label:l,val:vals[i]}));const tot=vals.reduce((a,b)=>a+b);return{showBar:data,q:`요일별 도서관 방문 학생 수예요.\n모두 합하면 몇 명?`,choices:[String(tot),String(tot+1),String(tot-1),String(tot+5)].sort(()=>Math.random()-0.5),ans:String(tot),explain:`${vals.join("+")}=${tot}명`};},
  ()=>{const items=["1반","2반","3반","4반"],vals=items.map(()=>Math.floor(Math.random()*5)+5),data=items.map((l,i)=>({label:l,val:vals[i]}));const tg=data[Math.floor(Math.random()*4)];return{showBar:data,q:`반별 청소 횟수 조사 결과예요.\n${tg.label}의 횟수는?`,choices:[String(tg.val),String(tg.val+1),String(tg.val-1),String(tg.val+2)].sort(()=>Math.random()-0.5),ans:String(tg.val),explain:`${tg.label}의 횟수는 ${tg.val}번이에요.`};},
  ()=>({q:`표와 그래프 중 변화를\n한눈에 보기 좋은 것은?`,choices:["그래프","표","둘 다 같다","숫자"].sort(()=>Math.random()-0.5),ans:"그래프",explain:`그래프는 한눈에 비교하기 좋아요.`}),
  ()=>({q:`자료를 정리할 때\n표를 만드는 이유는?`,choices:["자료를 한눈에 정리하기 위해","그림이 예쁘기 때문에","계산이 쉽기 때문에","색이 많기 때문에"].sort(()=>Math.random()-0.5),ans:"자료를 한눈에 정리하기 위해",explain:`표는 자료를 체계적으로 정리하여 한눈에 볼 수 있어요.`}),
  ()=>{const total=Math.floor(Math.random()*10)+15,a=Math.floor(Math.random()*5)+3,b=Math.floor(Math.random()*5)+3,c=total-a-b;return{q:`조사한 학생이 모두 ${total}명이에요.\n강아지 ${a}명, 고양이 ${b}명이면\n물고기는 몇 명?`,choices:[String(c),String(c+1),String(c-1),String(c+2)].sort(()=>Math.random()-0.5),ans:String(c),explain:`${total}-${a}-${b}=${c}명`};},
];

/* ══════════════════════════════════════════
   단원 데이터
══════════════════════════════════════════ */
function makeGen(gens){ return ()=>{ const pool=makePool(gens); let i=0; return pool[i++ % pool.length]; }; }

// 각 단원별로 문제 풀 생성 (20문제, 다양하게)
function makeQuestions(gens){ return Array.from({length:20},(_,i)=>gens[i%gens.length]()); }

const SDATA3={
  1:{title:"1학기",emoji:"🌸",bg:"linear-gradient(135deg,#FFF3E0,#FFF9E6)",border:"#FFD08A",units:[
    {id:1,title:"덧셈과 뺄셈",emoji:"➕",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gens:g3_1_1_gens},
    {id:2,title:"평면도형",   emoji:"🔷",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gens:g3_1_2_gens},
    {id:3,title:"나눗셈",     emoji:"➗",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gens:g3_1_3_gens},
    {id:4,title:"곱셈",       emoji:"✖️",color:"#A29BFE",light:"#EDE7F6",border:"#CE93D8",gens:g3_1_4_gens},
    {id:5,title:"길이와 시간",emoji:"📏",color:"#55EFC4",light:"#E0F2F1",border:"#80CBC4",gens:g3_1_5_gens},
    {id:6,title:"분수와 소수",emoji:"🍕",color:"#FDCB6E",light:"#FFFDE7",border:"#FFE082",gens:g3_1_6_gens},
  ]},
  2:{title:"2학기",emoji:"🍂",bg:"linear-gradient(135deg,#EDE7F6,#E8EAF6)",border:"#B39DDB",units:[
    {id:1,title:"곱셈",       emoji:"✖️",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gens:g3_2_1_gens},
    {id:2,title:"나눗셈",     emoji:"➗",color:"#00B894",light:"#E0F2F1",border:"#80CBC4",gens:g3_2_2_gens},
    {id:3,title:"분수",       emoji:"🍕",color:"#0984E3",light:"#E3F2FD",border:"#90CAF9",gens:g3_2_3_gens},
    {id:4,title:"원",         emoji:"⭕",color:"#E17055",light:"#FBE9E7",border:"#FFCCBC",gens:g3_2_4_gens},
    {id:5,title:"들이와 무게",emoji:"⚖️",color:"#6C5CE7",light:"#EDE7F6",border:"#CE93D8",gens:g3_2_5_gens},
    {id:6,title:"자료의 정리",emoji:"📊",color:"#00CEC9",light:"#E0F7FA",border:"#80DEEA",gens:g3_2_6_gens},
  ]},
};

function BarChartSVG({ data }) {
  const max=Math.max(...data.map(d=>d.val));
  const colors=["#FF9F43","#48DBFB","#FF6B81","#55EFC4","#A29BFE"];
  return(
    <svg width="260" height="130" viewBox="0 0 260 130">
      <line x1="32" y1="10" x2="32" y2="105" stroke="#ddd" strokeWidth="1"/>
      <line x1="32" y1="105" x2="250" y2="105" stroke="#ddd" strokeWidth="1"/>
      {data.map((d,i)=>{const bw=32,gap=10,x=40+i*(bw+gap),bh=Math.round((d.val/max)*85),y=105-bh;return(<g key={i}><rect x={x} y={y} width={bw} height={bh} rx="3" fill={colors[i%5]}/><text x={x+bw/2} y={120} textAnchor="middle" fontSize="8" fill="#555">{d.label}</text><text x={x+bw/2} y={y-3} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#333">{d.val}</text></g>);})}
    </svg>
  );
}

/* ══════════════════════════════════════════
   퀴즈 화면
══════════════════════════════════════════ */
function QuizScreen3({semester,unitId,onBack,onStar}){
  const unit=SDATA3[semester].units.find(u=>u.id===unitId);
  const [questions]=useState(()=>makeQuestions(unit.gens));
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

  const q=questions[qIdx],prog=(qIdx/20)*100;

  function pick(c){
    if(status)return;
    setSelected(c);
    if(c===q.ans){
      setStatus("correct");setConfetti(true);setTimeout(()=>setConfetti(false),1800);
      const nc=combo+1;setCombo(nc);setScore(s=>s+1);
      if(nc>=3){setShowCombo(true);setTimeout(()=>setShowCombo(false),1600);}
    }else{setStatus("wrong");setShake(true);setShowHint(true);setCombo(0);setTimeout(()=>setShake(false),600);}
  }
  function next(){
    if(qIdx+1>=20){const fs=score+(status==="correct"?1:0);onStar(`${semester}-${unitId}`,fs>=18?3:fs>=12?2:1);setDone(true);}
    else{setQIdx(i=>i+1);setSelected(null);setStatus(null);setShowHint(false);}
  }

  if(done){const fs=score;return(
    <div style={{textAlign:"center",padding:"20px 0"}}>
      {confetti&&<Confetti/>}
      <div style={{fontSize:72,marginBottom:12}}>{fs>=18?"🏆":fs>=12?"🥈":"🎯"}</div>
      <div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{unit.title} 완료!</div>
      <div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>20문제 중 {fs}개 정답</div>
      <div style={{fontSize:28,marginBottom:20}}>{Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(fs>=18?3:fs>=12?2:1)?1:0.25}}>⭐</span>)}</div>
      <button onClick={onBack} style={btn(unit.color)}>단원 목록으로</button>
    </div>
  );}

  return(
    <div>
      {confetti&&<Confetti/>}
      {showCombo&&(<div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",borderRadius:24,padding:"20px 36px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)",textAlign:"center",zIndex:999,animation:"popIn 0.4s ease"}}><div style={{fontSize:48}}>🔥</div><div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{combo}연속 정답!</div></div>)}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{unit.emoji} {unit.title} · {qIdx+1}/20</span>
            {combo>=3&&<span style={{background:unit.color,color:"white",fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:99}}>🔥{combo}연속</span>}
          </div>
          <div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${prog}%`,background:`linear-gradient(90deg,${unit.color},${unit.border})`,transition:"width 0.4s ease",borderRadius:99}}/></div>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>✅{score}</span>
      </div>
      <div style={{background:unit.light,border:`2px solid ${unit.border}`,borderRadius:24,padding:"16px 14px",marginBottom:12,animation:shake?"shake 0.5s":"none",textAlign:"center"}}>
        {q.showShape&&<div style={{display:"flex",justifyContent:"center",marginBottom:10}}><ShapeSVG3 shape={q.showShape} size={95}/></div>}
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
      {showHint&&status==="wrong"&&(<div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:14,padding:"10px 12px",marginBottom:10}}><div style={{fontSize:11,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:3}}>💡 이렇게 생각해봐요!</div><div style={{fontSize:12,color:"#636E72",fontFamily:"'Nunito',sans-serif",lineHeight:1.6}}>{q.explain}</div></div>)}
      {status==="correct"&&(<div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:14,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>🎉</span><div><div style={{fontSize:14,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div><div style={{fontSize:11,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain}</div></div></div>)}
      {status==="correct"&&<button onClick={next} style={btn(unit.color)}>{qIdx+1>=20?"결과 보기 🏆":"다음 문제 →"}</button>}
      {status==="wrong"&&<button onClick={()=>{setSelected(null);setStatus(null);setShowHint(false);}} style={btn("#EF9A9A","#C62828")}>다시 풀기 🔄</button>}
    </div>
  );
}

/* ══════════════════════════════════════════
   학기/단원 선택
══════════════════════════════════════════ */
function SemesterSelect3({sc,onSelect}){
  return(<div style={{textAlign:"center",padding:"8px 0"}}><div style={{fontSize:52,marginBottom:8}}>🎒</div><h1 style={{margin:0,fontSize:24,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>3학년 수학</h1><p style={{margin:"6px 0 24px",color:"#B2BEC3",fontSize:13,fontFamily:"'Nunito',sans-serif"}}>학기를 선택해서 공부해보세요!</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>{[1,2].map(sem=>{const sd=SDATA3[sem],s=sc[sem]||0;return(<button key={sem} onClick={()=>onSelect(sem)} style={{background:sd.bg,border:`3px solid ${sd.border}`,borderRadius:24,padding:"24px 16px",cursor:"pointer",transition:"transform 0.15s",boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><div style={{fontSize:40,marginBottom:6}}>{sd.emoji}</div><div style={{fontSize:16,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{sd.title}</div><div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif",marginBottom:10}}>6단원 · 각 20문제</div><div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginBottom:4}}>{Array.from({length:18},(_,j)=><span key={j} style={{fontSize:11,opacity:j<s?1:0.18}}>⭐</span>)}</div><div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{s}/18 ⭐</div></button>);})}</div></div>);
}

function UnitSelect3({semester,stars,onSelect,onBack}){
  const sd=SDATA3[semester];
  return(<div style={{padding:"0 4px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button><div><div style={{fontSize:11,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>3학년 수학</div><div style={{fontSize:18,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{sd.emoji} {sd.title}</div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{sd.units.map((u,i)=>(<button key={u.id} onClick={()=>onSelect(u.id)} style={{background:u.light,border:`2.5px solid ${u.border}`,borderRadius:20,padding:"14px 12px",cursor:"pointer",textAlign:"left",boxShadow:"0 3px 12px rgba(0,0,0,0.06)",animation:`slideUp 0.4s ${i*0.07}s both`,transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><div style={{fontSize:24,marginBottom:4}}>{u.emoji}</div><div style={{fontSize:12,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{u.id}단원</div><div style={{fontSize:11,fontWeight:700,color:u.color,fontFamily:"'Nunito',sans-serif"}}>{u.title}</div><div style={{marginTop:6,display:"flex",gap:1}}>{Array.from({length:3},(_,j)=><span key={j} style={{fontSize:12,opacity:j<(stars[`${semester}-${u.id}`]||0)?1:0.2}}>⭐</span>)}</div><div style={{marginTop:2,fontSize:10,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>20문제</div></button>))}</div></div>);
}

/* ══════════════════════════════════════════
   메인 (3학년)
══════════════════════════════════════════ */
export default function App3({ onBack }) {
  const [screen,setScreen]=useState("semester");
  const [activeSem,setActiveSem]=useState(null);
  const [activeUnit,setActiveUnit]=useState(null);
  const [stars,setStars]=useState({});

  const sc={
    1:SDATA3[1].units.reduce((s,u)=>s+(stars[`1-${u.id}`]||0),0),
    2:SDATA3[2].units.reduce((s,u)=>s+(stars[`2-${u.id}`]||0),0),
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:20,boxSizing:"border-box"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{background:"white",borderRadius:32,padding:"24px 20px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:"2px dashed #F0F0F0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#B2BEC3",padding:0}}>←</button>
            <span style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>초등 3학년</span>
          </div>
          <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:99,padding:"4px 14px",fontSize:13,fontWeight:900,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>⭐ {sc[1]+sc[2]}</div>
        </div>
        {screen==="semester"&&<SemesterSelect3 sc={sc} onSelect={sem=>{setActiveSem(sem);setScreen("units");}}/>}
        {screen==="units"&&activeSem&&<UnitSelect3 semester={activeSem} stars={stars} onSelect={uid=>{setActiveUnit(uid);setScreen("quiz");}} onBack={()=>setScreen("semester")}/>}
        {screen==="quiz"&&activeSem&&activeUnit&&<QuizScreen3 semester={activeSem} unitId={activeUnit} onBack={()=>setScreen("units")} onStar={(key,s)=>setStars(p=>({...p,[key]:Math.max(p[key]||0,s)}))}/>}
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
