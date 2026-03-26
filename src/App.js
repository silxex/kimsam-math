import React, { useState } from "react";

/* ══════════════════════════════════════════════════
   도형 SVG
══════════════════════════════════════════════════ */
function ShapeSVG({ shape, size = 80 }) {
  const s = size;
  if (shape === "삼각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,8 95,92 5,92" fill="#FFD8A8" stroke="#FF9F43" strokeWidth="4" strokeLinejoin="round"/></svg>;
  if (shape === "사각형") return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="6" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="4"/></svg>;
  if (shape === "원")     return <svg width={s} height={s} viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#B2F2BB" stroke="#51CF66" strokeWidth="4"/></svg>;
  if (shape === "오각형") return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,5 97,36 79,91 21,91 3,36" fill="#E9BBFD" stroke="#BE4BDB" strokeWidth="4" strokeLinejoin="round"/></svg>;
  if (shape === "직사각형") return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="5" y="22" width="90" height="56" rx="5" fill="#A5D8FF" stroke="#4DABF7" strokeWidth="4"/></svg>;
  return null;
}

/* ══════════════════════════════════════════════════
   시계 SVG
══════════════════════════════════════════════════ */
function ClockSVG({ hour, minute, size = 100 }) {
  const cx = 50, cy = 50;
  const minAngle = (minute / 60) * 360 - 90;
  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30 - 90;
  const toXY = (angle, len) => ({
    x: cx + len * Math.cos((angle * Math.PI) / 180),
    y: cy + len * Math.sin((angle * Math.PI) / 180),
  });
  const minPt = toXY(minAngle, 34);
  const hourPt = toXY(hourAngle, 24);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r="44" fill="white" stroke="#A29BFE" strokeWidth="4"/>
      {[12,1,2,3,4,5,6,7,8,9,10,11].map((n,i)=>{
        const a=(i/12)*360-90,p=toXY(a,36);
        return <text key={n} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="bold" fill="#555">{n}</text>;
      })}
      <line x1={cx} y1={cy} x2={hourPt.x} y2={hourPt.y} stroke="#2D3436" strokeWidth="4" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={minPt.x} y2={minPt.y} stroke="#FF6B81" strokeWidth="3" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="3" fill="#2D3436"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   막대 그래프 SVG
══════════════════════════════════════════════════ */
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.val));
  const colors = ["#FF9F43","#48DBFB","#FF6B81","#55EFC4"];
  return (
    <svg width="240" height="120" viewBox="0 0 240 120">
      <line x1="30" y1="10" x2="30" y2="100" stroke="#ddd" strokeWidth="1"/>
      <line x1="30" y1="100" x2="230" y2="100" stroke="#ddd" strokeWidth="1"/>
      {data.map((d,i) => {
        const bw=36, gap=12, x=40+i*(bw+gap), bh=(d.val/max)*80, y=100-bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="4" fill={colors[i%4]}/>
            <text x={x+bw/2} y={115} textAnchor="middle" fontSize="9" fill="#555">{d.label}</text>
            <text x={x+bw/2} y={y-3} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#333">{d.val}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   1학기 문제 생성기 6개
══════════════════════════════════════════════════ */
function gen1_1() {
  const type = Math.floor(Math.random()*5);
  if (type===0) { const n=Math.floor(Math.random()*900)+100,h=Math.floor(n/100),t=Math.floor((n%100)/10),o=n%10,pl=["백","십","일"][Math.floor(Math.random()*3)],ans=pl==="백"?h:pl==="십"?t:o; return {q:`${n}에서 ${pl}의 자리 숫자는?`,choices:[String(ans),String((ans+1)%10),String((ans+2)%10),String((ans+3)%10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${n}=${h}백+${t}십+${o} → ${pl}자리는 ${ans}`}; }
  if (type===1) { const h=Math.floor(Math.random()*8)+1,t=Math.floor(Math.random()*9)+1,o=Math.floor(Math.random()*9)+1,n=h*100+t*10+o; return {q:`${h}백 ${t}십 ${o}은 얼마인가요?`,choices:[String(n),String(n+10),String(n-1),String(n+100)].sort(()=>Math.random()-0.5),ans:String(n),explain:`${h}백(${h*100})+${t}십(${t*10})+${o}=${n}`}; }
  if (type===2) { const a=Math.floor(Math.random()*899)+100,b=Math.floor(Math.random()*899)+100,bigger=a>b?a:b; return {q:`더 큰 수는?`,choices:[String(a),String(b)],ans:String(bigger),explain:`${a}와 ${b} 중 ${bigger}이 더 커요.`}; }
  if (type===3) { const s=Math.floor(Math.random()*50)*10+100,st=[10,100][Math.floor(Math.random()*2)],ans=s+st*3; return {q:`규칙에 맞게 빈칸은?\n${s}→${s+st}→${s+st*2}→?→${s+st*4}`,choices:[String(ans),String(ans+st),String(ans-st),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${st}씩 커지는 규칙. ${s+st*2}+${st}=${ans}`}; }
  const n=Math.floor(Math.random()*900)+100,h=Math.floor(n/100),t=Math.floor((n%100)/10),o=n%10; return {q:`${n}=□백+${t}십+${o}일 때, □는?`,choices:[String(h),String(h+1),String(h-1),String(t)].sort(()=>Math.random()-0.5),ans:String(h),explain:`${n}의 백자리는 ${h}이에요.`};
}

const SHAPES=[{name:"삼각형",sides:3,vertices:3,desc:"꼭짓점 3개, 변 3개인 도형"},{name:"사각형",sides:4,vertices:4,desc:"꼭짓점 4개, 변 4개인 도형"},{name:"원",sides:0,vertices:0,desc:"둥글고 꼭짓점이 없는 도형"},{name:"오각형",sides:5,vertices:5,desc:"꼭짓점 5개, 변 5개인 도형"},{name:"직사각형",sides:4,vertices:4,desc:"네 각이 모두 직각인 사각형"}];
function gen1_2() {
  const type=Math.floor(Math.random()*4),s=SHAPES[Math.floor(Math.random()*SHAPES.length)];
  if (type===0) { const ot=SHAPES.filter(x=>x.name!==s.name).sort(()=>Math.random()-0.5).slice(0,3); return {showShape:s.name,q:`이 도형의 이름은?`,choices:[s.name,...ot.map(x=>x.name)].sort(()=>Math.random()-0.5),ans:s.name,explain:`${s.desc}이에요.`}; }
  if (type===1) { const f=SHAPES.filter(x=>x.sides>0),sh=f[Math.floor(Math.random()*f.length)]; return {showShape:sh.name,q:`이 도형의 변은 몇 개?`,choices:[String(sh.sides),String(sh.sides-1),String(sh.sides+1),String(sh.sides+2)].sort(()=>Math.random()-0.5),ans:String(sh.sides),explain:`${sh.name}의 변은 ${sh.sides}개예요.`}; }
  if (type===2) { const f=SHAPES.filter(x=>x.vertices>0),sh=f[Math.floor(Math.random()*f.length)]; return {showShape:sh.name,q:`이 도형의 꼭짓점은 몇 개?`,choices:[String(sh.vertices),String(sh.vertices+1),String(sh.vertices-1),String(sh.vertices+2)].sort(()=>Math.random()-0.5),ans:String(sh.vertices),explain:`${sh.name}의 꼭짓점은 ${sh.vertices}개예요.`}; }
  const sh=SHAPES[Math.floor(Math.random()*SHAPES.length)],ot=SHAPES.filter(x=>x.name!==sh.name).sort(()=>Math.random()-0.5).slice(0,3); return {q:`"${sh.desc}" — 어떤 도형일까요?`,choices:[sh.name,...ot.map(x=>x.name)].sort(()=>Math.random()-0.5),ans:sh.name,explain:`${sh.name}은 ${sh.desc}이에요.`};
}

function gen1_3() {
  const type=Math.floor(Math.random()*5);
  if (type===0) { const a=Math.floor(Math.random()*40)+10,b=Math.floor(Math.random()*9)+1,ans=a+b; return {q:`${a} + ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}+${b}=${ans}`}; }
  if (type===1) { const a=Math.floor(Math.random()*49)+10,b=Math.floor(Math.random()*40)+10,ans=a+b; return {q:`${a} + ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`십자리끼리, 일자리끼리 더하면 ${ans}이에요.`}; }
  if (type===2) { const a=Math.floor(Math.random()*80)+20,b=Math.floor(Math.random()*9)+1,ans=a-b; return {q:`${a} - ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}-${b}=${ans}`}; }
  if (type===3) { const a=Math.floor(Math.random()*40)+10,b=Math.floor(Math.random()*20)+5,ans=a+b; return {q:`${a} + □ = ${ans}\n□는?`,choices:[String(b),String(b+1),String(b-1),String(b+10)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${ans}-${a}=${b}이에요.`}; }
  const ans=Math.floor(Math.random()*40)+10,b=Math.floor(Math.random()*10)+1,a=ans+b; return {q:`${a} - □ = ${ans}\n□는?`,choices:[String(b),String(b+1),String(b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${a}-${ans}=${b}이에요.`};
}

function gen1_4() {
  const type=Math.floor(Math.random()*4),cm=Math.floor(Math.random()*15)+2;
  if (type===0) return {q:`자로 재었더니 0에서 ${cm}까지예요. 길이는?`,choices:[String(cm),String(cm+1),String(cm-1),String(cm+2)].sort(()=>Math.random()-0.5),ans:String(cm),explain:`0부터 ${cm}까지이므로 ${cm} cm예요.`};
  if (type===1) { const a=Math.floor(Math.random()*10)+5,b=a-Math.floor(Math.random()*4)-1; return {q:`연필 ${a}cm, 색연필 ${b}cm\n두 길이의 합은?`,choices:[String(a+b),String(a+b+1),String(a+b-1),String(a+b+2)].sort(()=>Math.random()-0.5),ans:String(a+b),explain:`${a}+${b}=${a+b} cm`}; }
  if (type===2) { const a=Math.floor(Math.random()*10)+5,b=Math.floor(Math.random()*(a-1))+1; return {q:`리본 ${a}cm에서 ${b}cm 잘랐어요.\n남은 길이는?`,choices:[String(a-b),String(a-b+1),String(a-b-1),String(a-b+2)].sort(()=>Math.random()-0.5),ans:String(a-b),explain:`${a}-${b}=${a-b} cm`}; }
  const a=Math.floor(Math.random()*12)+3,b=Math.floor(Math.random()*12)+3,longer=a>=b?"막대 A":"막대 B"; return {q:`막대 A: ${a}cm, 막대 B: ${b}cm\n더 긴 것은?`,choices:["막대 A","막대 B"],ans:longer,explain:`${a}cm ${a>=b?">":"<"} ${b}cm → ${longer}이 길어요.`};
}

function gen1_5() {
  const sets=[{label:"과일",items:["🍎","🍌","🍊","🍎","🍌","🍎","🍊","🍎"],groups:{"🍎":4,"🍌":2,"🍊":2}},{label:"동물",items:["🐶","🐱","🐶","🐰","🐱","🐶","🐰","🐱"],groups:{"🐶":3,"🐱":3,"🐰":2}},{label:"탈것",items:["🚗","🚌","🚗","✈️","🚌","🚗","✈️","🚗"],groups:{"🚗":4,"🚌":2,"✈️":2}}];
  const cat=sets[Math.floor(Math.random()*sets.length)],entries=Object.entries(cat.groups),type=Math.floor(Math.random()*3);
  if (type===0) { const [k,v]=entries.reduce((a,b)=>b[1]>a[1]?b:a); return {q:`${cat.label}을 분류할 때, 가장 많은 것은?`,items:cat.items,choices:entries.map(e=>`${e[0]} (${e[1]}개)`).sort(()=>Math.random()-0.5),ans:`${k} (${v}개)`,explain:`가장 많은 것은 ${k}으로 ${v}개예요.`}; }
  if (type===1) { const [k,v]=entries.reduce((a,b)=>b[1]<a[1]?b:a); return {q:`${cat.label}을 분류할 때, 가장 적은 것은?`,items:cat.items,choices:entries.map(e=>`${e[0]} (${e[1]}개)`).sort(()=>Math.random()-0.5),ans:`${k} (${v}개)`,explain:`가장 적은 것은 ${k}으로 ${v}개예요.`}; }
  const t=entries[Math.floor(Math.random()*entries.length)]; return {q:`${cat.label}을 분류할 때 ${t[0]}은 몇 개인가요?`,items:cat.items,choices:[String(t[1]),String(t[1]+1),String(t[1]-1),String(t[1]+2)].sort(()=>Math.random()-0.5),ans:String(t[1]),explain:`${t[0]}은 ${t[1]}개예요.`};
}

function gen1_6() {
  const type=Math.floor(Math.random()*5),a=Math.floor(Math.random()*7)+2,b=Math.floor(Math.random()*7)+2;
  if (type===0) return {q:`${a}씩 ${b}묶음이면 모두 몇 개?`,choices:[String(a*b),String(a*b+a),String(a*(b-1)),String(a*b+1)].sort(()=>Math.random()-0.5),ans:String(a*b),explain:`${a}×${b}=${a*b}개`};
  if (type===1) return {q:`${a}+${a}+${a}를 곱셈식으로 나타내면?`,choices:[`${a}×3`,`${a}×2`,`3×${a+1}`,`${a+1}×3`].sort(()=>Math.random()-0.5),ans:`${a}×3`,explain:`같은 수를 3번 더하면 ${a}×3=${a*3}`};
  if (type===2) return {q:`${a}×${b}의 값은?`,choices:[String(a*b),String(a*b+a),String(a*b-a),String(a*b+b)].sort(()=>Math.random()-0.5),ans:String(a*b),explain:`${a}×${b}=${a*b}`};
  if (type===3) { const ans=a*b; return {q:`□×${b}=${ans}\n□는?`,choices:[String(a),String(a+1),String(a-1),String(b)].sort(()=>Math.random()-0.5),ans:String(a),explain:`${ans}÷${b}=${a}이에요.`}; }
  return {q:`사과 한 봉지에 ${a}개씩, ${b}봉지면?`,choices:[String(a*b),String(a*b+a),String(a*(b+1)),String(a*b-1)].sort(()=>Math.random()-0.5),ans:String(a*b),explain:`${a}×${b}=${a*b}개`};
}

/* ══════════════════════════════════════════════════
   2학기 문제 생성기 6개
══════════════════════════════════════════════════ */
function gen2_1() {
  const type=Math.floor(Math.random()*5);
  if (type===0) { const n=Math.floor(Math.random()*9000)+1000,th=Math.floor(n/1000),h=Math.floor((n%1000)/100),t=Math.floor((n%100)/10),o=n%10,pl=["천","백","십","일"][Math.floor(Math.random()*4)],ans=pl==="천"?th:pl==="백"?h:pl==="십"?t:o; return {q:`${n}에서 ${pl}의 자리 숫자는?`,choices:[String(ans),String((ans+1)%10),String((ans+2)%10),String((ans+3)%10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${n}=${th}천+${h}백+${t}십+${o} → ${pl}자리는 ${ans}`}; }
  if (type===1) { const th=Math.floor(Math.random()*8)+1,h=Math.floor(Math.random()*9)+1,t=Math.floor(Math.random()*9)+1,o=Math.floor(Math.random()*9)+1,n=th*1000+h*100+t*10+o; return {q:`${th}천 ${h}백 ${t}십 ${o}은 얼마?`,choices:[String(n),String(n+100),String(n-1),String(n+1000)].sort(()=>Math.random()-0.5),ans:String(n),explain:`${th}천+${h}백+${t}십+${o}=${n}`}; }
  if (type===2) { const a=Math.floor(Math.random()*8999)+1000,b=Math.floor(Math.random()*8999)+1000,bigger=a>b?a:b; return {q:`더 큰 수는?`,choices:[String(a),String(b)],ans:String(bigger),explain:`${a}과 ${b} 중 ${bigger}이 더 커요.`}; }
  if (type===3) { const s=Math.floor(Math.random()*8)*1000+1000,st=[100,1000][Math.floor(Math.random()*2)],ans=s+st*3; return {q:`규칙에 맞게 빈칸은?\n${s}→${s+st}→${s+st*2}→?→${s+st*4}`,choices:[String(ans),String(ans+st),String(ans-st),String(ans+100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${st}씩 커지는 규칙. ${s+st*2}+${st}=${ans}`}; }
  const n=Math.floor(Math.random()*9000)+1000,th=Math.floor(n/1000),h=Math.floor((n%1000)/100),t=Math.floor((n%100)/10),o=n%10; return {q:`${n}=□천+${h}백+${t}십+${o}일 때, □는?`,choices:[String(th),String(th+1),String(th-1),String(h)].sort(()=>Math.random()-0.5),ans:String(th),explain:`${n}의 천자리는 ${th}이에요.`};
}

function gen2_2() {
  const dan=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*9)+1,ans=dan*b,type=Math.floor(Math.random()*4);
  if (type===0) return {q:`${dan} × ${b} = ?`,choices:[String(ans),String(ans+dan),String(ans-dan),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${dan}단: ${dan}×${b}=${ans}`};
  if (type===1) return {q:`${dan}의 단에서 ${dan}×${b}는?`,choices:[String(ans),String(ans+dan),String(ans-dan),String(ans+2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${dan}×${b}=${Array.from({length:b},()=>dan).join("+")}=${ans}`};
  if (type===2) { const c=Math.floor(Math.random()*9)+1,ans2=dan*c; return {q:`□×${c}=${ans2}\n□는?`,choices:[String(dan),String(dan+1),String(dan-1),String(c)].sort(()=>Math.random()-0.5),ans:String(dan),explain:`${ans2}÷${c}=${dan}이에요.`}; }
  return {q:`${dan}단에서 곱이 ${ans}인 곱셈식은?`,choices:[`${dan}×${b}`,`${dan}×${b+1>9?b:b+1}`,`${dan}×${b-1<1?b:b-1}`,`${dan+1}×${b}`].sort(()=>Math.random()-0.5),ans:`${dan}×${b}`,explain:`${dan}×${b}=${ans}이에요.`};
}

function gen2_3() {
  const type=Math.floor(Math.random()*4);
  if (type===0) { const m=Math.floor(Math.random()*5)+1,cm=Math.floor(Math.random()*99)+1; return {q:`${m}m ${cm}cm는 몇 cm인가요?`,choices:[String(m*100+cm),String(m*100+cm+10),String(m*100+cm-1),String((m+1)*100+cm)].sort(()=>Math.random()-0.5),ans:String(m*100+cm),explain:`${m}m=${m*100}cm, ${m*100}+${cm}=${m*100+cm}cm`}; }
  if (type===1) { const cm=Math.floor(Math.random()*400)+101,m=Math.floor(cm/100),r=cm%100; return {q:`${cm}cm는 몇 m 몇 cm인가요?`,choices:[`${m}m ${r}cm`,`${m+1}m ${r}cm`,`${m}m ${r+10}cm`,`${m-1}m ${r}cm`].sort(()=>Math.random()-0.5),ans:`${m}m ${r}cm`,explain:`${cm}÷100=${m}···${r} → ${m}m ${r}cm`}; }
  if (type===2) { const a1=Math.floor(Math.random()*3)+1,a2=Math.floor(Math.random()*50)+10,b1=Math.floor(Math.random()*3)+1,b2=Math.floor(Math.random()*50)+10,total=a2+b2,rm=total>=100?a1+b1+1:a1+b1,rc=total%100; return {q:`${a1}m ${a2}cm + ${b1}m ${b2}cm = ?`,choices:[`${rm}m ${rc}cm`,`${rm+1}m ${rc}cm`,`${rm}m ${rc+10}cm`,`${rm-1}m ${rc}cm`].sort(()=>Math.random()-0.5),ans:`${rm}m ${rc}cm`,explain:`m끼리, cm끼리 더해요 → ${rm}m ${rc}cm`}; }
  const a1=Math.floor(Math.random()*4)+2,a2=Math.floor(Math.random()*80)+20,b1=1,b2=Math.floor(Math.random()*a2); const rm=a2>=b2?a1-b1:a1-b1-1,rc=(a2-b2+100)%100; return {q:`${a1}m ${a2}cm - ${b1}m ${b2}cm = ?`,choices:[`${rm}m ${rc}cm`,`${rm+1}m ${rc}cm`,`${rm}m ${rc+1}cm`,`${rm}m ${rc>0?rc-1:rc}cm`].sort(()=>Math.random()-0.5),ans:`${rm}m ${rc}cm`,explain:`m끼리, cm끼리 빼요 → ${rm}m ${rc}cm`};
}

function gen2_4() {
  const type=Math.floor(Math.random()*4);
  if (type===0) { const h=Math.floor(Math.random()*11)+1,m=Math.floor(Math.random()*11)*5; return {showClock:{h,m},q:`시계가 나타내는 시각은?`,choices:[`${h}시 ${m}분`,`${h===12?1:h+1}시 ${m}분`,`${h}시 ${m+5<=55?m+5:m}분`,`${h>1?h-1:12}시 ${m}분`].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:`${h}시 ${m}분`,explain:`짧은 바늘→${h}, 긴 바늘→${m===0?"12":m/5} → ${h}시 ${m}분`}; }
  if (type===1) { const h1=Math.floor(Math.random()*10)+1,m1=Math.floor(Math.random()*5)*10,addM=Math.floor(Math.random()*4)*10+10,total=m1+addM,h2=total>=60?h1+1:h1,m2=total%60; return {q:`${h1}시 ${m1}분에서 ${addM}분 후는?`,choices:[`${h2}시 ${m2}분`,`${h2}시 ${m2+10<=50?m2+10:m2}분`,`${h1}시 ${m1+addM}분`,`${total>=60?h2+1:h2}시 ${m2}분`].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:`${h2}시 ${m2}분`,explain:`${m1}+${addM}=${total}분 → ${total>=60?"1시간 넘으므로 ":""}${h2}시 ${m2}분`}; }
  if (type===2) { const mins=[30,60,90,120],m=mins[Math.floor(Math.random()*mins.length)]; return {q:`${m}분은 몇 시간 몇 분인가요?`,choices:[`${Math.floor(m/60)}시간 ${m%60}분`,`${Math.floor(m/60)+1}시간 ${m%60}분`,`${Math.floor(m/60)}시간 ${m%60+10}분`,`0시간 ${m}분`].sort(()=>Math.random()-0.5),ans:`${Math.floor(m/60)}시간 ${m%60}분`,explain:`60분=1시간. ${m}÷60=${Math.floor(m/60)}시간 ${m%60}분`}; }
  const days=["월","화","수","목","금","토","일"],d=Math.floor(Math.random()*5),add=Math.floor(Math.random()*5)+1,ans=days[(d+add)%7]; return {q:`${days[d]}요일에서 ${add}일 후는?`,choices:[ans,days[(d+add+1)%7],days[(d+add-1+7)%7],days[(d+add+2)%7]].sort(()=>Math.random()-0.5),ans,explain:`${days[d]}요일에서 ${add}일 후는 ${ans}요일이에요.`};
}

function gen2_5() {
  const subjects=["수학","국어","체육","미술"],vals=subjects.map(()=>Math.floor(Math.random()*5)+2),data=subjects.map((s,i)=>({label:s,val:vals[i]})),type=Math.floor(Math.random()*4);
  const maxS=data.reduce((a,b)=>b.val>a.val?b:a),minS=data.reduce((a,b)=>b.val<a.val?b:a),total=vals.reduce((a,b)=>a+b);
  if (type===0) return {showChart:data,q:`좋아하는 과목 조사 결과예요.\n가장 많은 학생이 좋아하는 과목은?`,choices:[...subjects].sort(()=>Math.random()-0.5),ans:maxS.label,explain:`가장 많은 것은 ${maxS.label}(${maxS.val}명)이에요.`};
  if (type===1) return {showChart:data,q:`좋아하는 과목 조사 결과예요.\n가장 적은 학생이 좋아하는 과목은?`,choices:[...subjects].sort(()=>Math.random()-0.5),ans:minS.label,explain:`가장 적은 것은 ${minS.label}(${minS.val}명)이에요.`};
  if (type===2) { const t=data[Math.floor(Math.random()*data.length)]; return {showChart:data,q:`${t.label}을 좋아하는 학생은 몇 명인가요?`,choices:[String(t.val),String(t.val+1),String(t.val-1),String(t.val+2)].sort(()=>Math.random()-0.5),ans:String(t.val),explain:`그래프에서 ${t.label}은 ${t.val}명이에요.`}; }
  return {showChart:data,q:`조사에 참여한 학생은 모두 몇 명인가요?`,choices:[String(total),String(total+1),String(total-1),String(total+2)].sort(()=>Math.random()-0.5),ans:String(total),explain:`${vals.join("+")}=${total}명이에요.`};
}

function gen2_6() {
  const type=Math.floor(Math.random()*4);
  if (type===0) { const s=Math.floor(Math.random()*4)*2+2,st=2,ans=s+st*3; return {q:`규칙에 맞게 빈칸은?\n${s}, ${s+st}, ${s+st*2}, □, ${s+st*4}`,choices:[String(ans),String(ans+2),String(ans-2),String(ans+st*2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${st}씩 커지는 규칙. ${s+st*2}+${st}=${ans}`}; }
  if (type===1) { const base=Math.floor(Math.random()*3)+2,seq=Array.from({length:5},(_,i)=>base*(i+1)),ans=seq[3]; return {q:`규칙에 맞게 빈칸은?\n${seq[0]}, ${seq[1]}, ${seq[2]}, □, ${seq[4]}`,choices:[String(ans),String(ans+base),String(ans-base),String(ans+1)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${base}씩 커지는 규칙. ${seq[2]}+${base}=${ans}`}; }
  if (type===2) { const pats=[["🔴","🔵"],["🟡","🔴","🔵"],["🌟","🔺"]],pat=pats[Math.floor(Math.random()*pats.length)],len=Math.floor(Math.random()*3)+5,seq=Array.from({length:len},(_,i)=>pat[i%pat.length]),ans=seq[len-1]; return {q:`규칙에 맞게 ?에 올 것은?\n${seq.slice(0,-1).join(" ")} ?`,choices:[...new Set([ans,...pat])].sort(()=>Math.random()-0.5).slice(0,Math.min(4,pat.length+2)),ans,explain:`${pat.join(",")} 패턴이 반복돼요. ?=${ans}`}; }
  const n=Math.floor(Math.random()*4)+2,rows=Math.floor(Math.random()*5)+2,cols=Math.floor(Math.random()*5)+2; return {q:`${n}씩 커지는 수의 배열에서\n${rows}행 ${cols}열의 값은?`,choices:[String(n*rows*cols),String(n*rows*cols+n),String(n*rows*cols-n),String(n*rows*cols+1)].sort(()=>Math.random()-0.5),ans:String(n*rows*cols),explain:`${n}씩 커지는 규칙 → ${rows}×${cols}×${n}=${n*rows*cols}`};
}

/* ══════════════════════════════════════════════════
   단원 데이터
══════════════════════════════════════════════════ */
const SEMESTER_DATA = {
  1: {
    title:"1학기", emoji:"🌸", bg:"linear-gradient(135deg,#FFF3E0,#FFF9E6)", border:"#FFD08A",
    units:[
      {id:1,title:"세 자리 수",    emoji:"🔢",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gen:gen1_1},
      {id:2,title:"여러 가지 도형",emoji:"🔷",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gen:gen1_2},
      {id:3,title:"덧셈과 뺄셈",  emoji:"➕",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gen:gen1_3},
      {id:4,title:"길이 재기",    emoji:"📏",color:"#A29BFE",light:"#EDE7F6",border:"#CE93D8",gen:gen1_4},
      {id:5,title:"분류하기",     emoji:"🗂️",color:"#55EFC4",light:"#E0F2F1",border:"#80CBC4",gen:gen1_5},
      {id:6,title:"곱셈",         emoji:"✖️",color:"#FDCB6E",light:"#FFFDE7",border:"#FFE082",gen:gen1_6},
    ]
  },
  2: {
    title:"2학기", emoji:"🍂", bg:"linear-gradient(135deg,#EDE7F6,#E8EAF6)", border:"#B39DDB",
    units:[
      {id:1,title:"네 자리 수",   emoji:"🔢",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gen:gen2_1},
      {id:2,title:"곱셈구구",     emoji:"✖️",color:"#00B894",light:"#E0F2F1",border:"#80CBC4",gen:gen2_2},
      {id:3,title:"길이 재기",   emoji:"📏",color:"#0984E3",light:"#E3F2FD",border:"#90CAF9",gen:gen2_3},
      {id:4,title:"시각과 시간", emoji:"🕐",color:"#E17055",light:"#FBE9E7",border:"#FFCCBC",gen:gen2_4},
      {id:5,title:"표와 그래프", emoji:"📊",color:"#6C5CE7",light:"#EDE7F6",border:"#CE93D8",gen:gen2_5},
      {id:6,title:"규칙 찾기",   emoji:"🔍",color:"#00CEC9",light:"#E0F7FA",border:"#80DEEA",gen:gen2_6},
    ]
  }
};

const TOTAL_Q = 20;

/* ══════════════════════════════════════════════════
   Confetti
══════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════
   학기 선택 화면
══════════════════════════════════════════════════ */
function SemesterSelect({ starCounts, onSelect }) {
  return (
    <div style={{textAlign:"center",padding:"8px 0"}}>
      <div style={{fontSize:52,marginBottom:8}}>🎒</div>
      <h1 style={{margin:0,fontSize:24,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>2학년 수학</h1>
      <p style={{margin:"6px 0 24px",color:"#B2BEC3",fontSize:13,fontFamily:"'Nunito',sans-serif"}}>학기를 선택해서 공부해보세요!</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {[1,2].map(sem => {
          const sd=SEMESTER_DATA[sem];
          const sc=starCounts[sem]||0;
          return (
            <button key={sem} onClick={()=>onSelect(sem)} style={{background:sd.bg,border:`3px solid ${sd.border}`,borderRadius:24,padding:"24px 16px",cursor:"pointer",transition:"transform 0.15s, box-shadow 0.15s",boxShadow:`0 8px 24px rgba(0,0,0,0.08)`,animation:`slideUp 0.4s ${(sem-1)*0.1}s both`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.14)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.08)";}}>
              <div style={{fontSize:40,marginBottom:6}}>{sd.emoji}</div>
              <div style={{fontSize:16,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{sd.title}</div>
              <div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif",marginBottom:10}}>6단원 · 각 20문제</div>
              <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginBottom:4}}>
                {Array.from({length:18},(_,j)=><span key={j} style={{fontSize:11,opacity:j<sc?1:0.18}}>⭐</span>)}
              </div>
              <div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{sc}/18 ⭐</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   단원 선택 화면
══════════════════════════════════════════════════ */
function UnitSelect({ semester, stars, onSelect, onBack }) {
  const sd=SEMESTER_DATA[semester];
  return (
    <div style={{padding:"0 4px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div>
          <div style={{fontSize:11,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>2학년 수학</div>
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

/* ══════════════════════════════════════════════════
   퀴즈 화면
══════════════════════════════════════════════════ */
function QuizScreen({ semester, unitId, onBack, onStar }) {
  const unit=SEMESTER_DATA[semester].units.find(u=>u.id===unitId);
  const [questions]=useState(()=>Array.from({length:TOTAL_Q},()=>unit.gen()));
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

  const q=questions[qIdx];
  const progress=(qIdx/TOTAL_Q)*100;

  const pick=(choice)=>{
    if(status)return;
    setSelected(choice);
    if(choice===q.ans){
      setStatus("correct");setConfetti(true);setTimeout(()=>setConfetti(false),1800);
      const nc=combo+1;setCombo(nc);setScore(s=>s+1);
      if(nc>=3){setShowCombo(true);setTimeout(()=>setShowCombo(false),1600);}
    } else {
      setStatus("wrong");setShake(true);setShowHint(true);setCombo(0);
      setTimeout(()=>setShake(false),600);
    }
  };

  const next=()=>{
    if(qIdx+1>=TOTAL_Q){
      const fs=score+(status==="correct"?1:0);
      onStar(`${semester}-${unitId}`,fs>=18?3:fs>=12?2:1);
      setDone(true);
    } else {
      setQIdx(i=>i+1);setSelected(null);setStatus(null);setShowHint(false);
    }
  };

  if(done){
    const fs=score;
    return(
      <div style={{textAlign:"center",padding:"20px 0"}}>
        {confetti&&<Confetti/>}
        <div style={{fontSize:72,marginBottom:12}}>{fs>=18?"🏆":fs>=12?"🥈":"🎯"}</div>
        <div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{unit.title} 완료!</div>
        <div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>20문제 중 {fs}개 정답</div>
        <div style={{fontSize:28,marginBottom:8}}>{Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(fs>=18?3:fs>=12?2:1)?1:0.25}}>⭐</span>)}</div>
        <div style={{fontSize:13,color:"#B2BEC3",marginBottom:24,fontFamily:"'Nunito',sans-serif"}}>{fs>=18?"완벽해요! 최고예요 🎊":fs>=12?"잘 했어요! 💪":"조금 더 연습해봐요! 🌟"}</div>
        <button onClick={onBack} style={btnStyle(unit.color)}>단원 목록으로</button>
      </div>
    );
  }

  return(
    <div>
      {confetti&&<Confetti/>}
      {showCombo&&(
        <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",borderRadius:24,padding:"20px 36px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)",textAlign:"center",zIndex:999,animation:"popIn 0.4s ease"}}>
          <div style={{fontSize:48}}>🔥</div>
          <div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{combo}연속 정답!</div>
        </div>
      )}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{unit.emoji} {unit.title} · {qIdx+1}/{TOTAL_Q}</span>
            {combo>=3&&<span style={{background:unit.color,color:"white",fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:99,fontFamily:"'Nunito',sans-serif"}}>🔥{combo}연속</span>}
          </div>
          <div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${unit.color},${unit.border})`,transition:"width 0.4s ease",borderRadius:99}}/>
          </div>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>✅{score}</span>
      </div>

      <div style={{background:unit.light,border:`2px solid ${unit.border}`,borderRadius:24,padding:"16px 14px",marginBottom:12,animation:shake?"shake 0.5s":"none",textAlign:"center"}}>
        {q.showShape&&<div style={{display:"flex",justifyContent:"center",marginBottom:10}}><ShapeSVG shape={q.showShape} size={88}/></div>}
        {q.showClock&&<div style={{display:"flex",justifyContent:"center",marginBottom:10}}><ClockSVG hour={q.showClock.h} minute={q.showClock.m} size={106}/></div>}
        {q.showChart&&<div style={{display:"flex",justifyContent:"center",marginBottom:10,overflowX:"auto"}}><BarChart data={q.showChart}/></div>}
        {q.items&&<div style={{fontSize:22,marginBottom:8,letterSpacing:4,lineHeight:1.8}}>{q.items.join(" ")}</div>}
        <div style={{fontSize:15,fontWeight:800,color:"#2D3436",fontFamily:"'Nunito',sans-serif",lineHeight:1.6,whiteSpace:"pre-line"}}>{q.q}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:q.choices.length===2?"1fr 1fr":"1fr 1fr",gap:8,marginBottom:10}}>
        {q.choices.map((c,i)=>{
          let bg="#fff",border="2px solid #E0E0E0",color="#2D3436";
          if(selected===c){if(status==="correct"){bg="#E8F5E9";border="2px solid #66BB6A";color="#2E7D32";}else{bg="#FFEBEE";border="2px solid #EF9A9A";color="#C62828";}}
          if(status&&c===q.ans&&selected!==c){bg="#E8F5E9";border="2px solid #66BB6A";color="#2E7D32";}
          return(<button key={i} onClick={()=>pick(c)} style={{padding:"12px 6px",borderRadius:14,background:bg,border,color,fontSize:13,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:status?"default":"pointer",boxShadow:"0 2px 6px rgba(0,0,0,0.04)",transition:"transform 0.12s"}} onMouseEnter={e=>{if(!status)e.currentTarget.style.transform="scale(1.03)";}} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{c}</button>);
        })}
      </div>

      {showHint&&status==="wrong"&&(
        <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:14,padding:"10px 12px",marginBottom:10,animation:"slideUp 0.3s ease"}}>
          <div style={{fontSize:11,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:3}}>💡 이렇게 생각해봐요!</div>
          <div style={{fontSize:12,color:"#636E72",fontFamily:"'Nunito',sans-serif",whiteSpace:"pre-line",lineHeight:1.6}}>{q.explain}</div>
        </div>
      )}
      {status==="correct"&&(
        <div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:14,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8,animation:"slideUp 0.3s ease"}}>
          <span style={{fontSize:20}}>🎉</span>
          <div>
            <div style={{fontSize:14,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div>
            <div style={{fontSize:11,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain.split("\n")[0]}</div>
          </div>
        </div>
      )}
      {status==="correct"&&<button onClick={next} style={btnStyle(unit.color)}>{qIdx+1>=TOTAL_Q?"결과 보기 🏆":"다음 문제 →"}</button>}
      {status==="wrong"&&<button onClick={()=>{setSelected(null);setStatus(null);setShowHint(false);}} style={btnStyle("#EF9A9A","#C62828")}>다시 풀기 🔄</button>}
    </div>
  );
}

function btnStyle(bg,color="white"){return{width:"100%",padding:"13px",borderRadius:16,border:"none",background:bg,color,fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 5px 16px ${bg}55`,transition:"transform 0.12s"};}

/* ══════════════════════════════════════════════════
   메인 App
══════════════════════════════════════════════════ */
export default function App() {
  const [screen,setScreen]=useState("semester");
  const [activeSem,setActiveSem]=useState(null);
  const [activeUnit,setActiveUnit]=useState(null);
  const [stars,setStars]=useState({});

  const starCounts={
    1:SEMESTER_DATA[1].units.reduce((s,u)=>s+(stars[`1-${u.id}`]||0),0),
    2:SEMESTER_DATA[2].units.reduce((s,u)=>s+(stars[`2-${u.id}`]||0),0),
  };
  const grandTotal=starCounts[1]+starCounts[2];

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:20,boxSizing:"border-box"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{background:"white",borderRadius:32,padding:"24px 20px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:"2px dashed #F0F0F0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {screen!=="semester"&&<button onClick={()=>screen==="quiz"?setScreen("units"):setScreen("semester")} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#B2BEC3",padding:"0 4px 0 0"}}>←</button>}
            <span style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>
              {screen==="semester"?"초등 2학년":screen==="units"&&activeSem?`${SEMESTER_DATA[activeSem].title} 단원`:"퀴즈"}
            </span>
          </div>
          <div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:99,padding:"4px 14px",fontSize:13,fontWeight:900,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>⭐ {grandTotal}</div>
        </div>

        {screen==="semester"&&<SemesterSelect starCounts={starCounts} onSelect={sem=>{setActiveSem(sem);setScreen("units");}}/>}
        {screen==="units"&&activeSem&&<UnitSelect semester={activeSem} stars={stars} onSelect={uid=>{setActiveUnit(uid);setScreen("quiz");}} onBack={()=>setScreen("semester")}/>}
        {screen==="quiz"&&activeSem&&activeUnit&&<QuizScreen semester={activeSem} unitId={activeUnit} onBack={()=>setScreen("units")} onStar={(key,s)=>setStars(p=>({...p,[key]:Math.max(p[key]||0,s)}))}/>}
      </div>
      <style>{`
        @keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-9px)}30%{transform:translateX(9px)}45%{transform:translateX(-7px)}60%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}60%{transform:translate(-50%,-50%) scale(1.1)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        body{margin:0;font-family:'Nunito',sans-serif;}
      `}</style>
    </div>
  );
}
