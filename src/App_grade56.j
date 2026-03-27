import React, { useState } from "react";

function Confetti() {
  const c=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E"];
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>{Array.from({length:30},(_,i)=>(<div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-16px",width:7+Math.random()*9,height:7+Math.random()*9,borderRadius:Math.random()>0.5?"50%":"2px",background:c[i%6],animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`}}/>))}</div>);
}
function btn(bg,col="white"){return{width:"100%",padding:"13px",borderRadius:16,border:"none",background:bg,color:col,fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 5px 16px ${bg}55`};}
function makeQ(gens,n=20){return Array.from({length:n},(_,i)=>gens[i%gens.length]()).sort(()=>Math.random()-0.5);}
function gcd(a,b){return b===0?a:gcd(b,a%b);}
function simplify(n,d){const g=gcd(Math.abs(n),Math.abs(d));return[n/g,d/g];}

/* ════════════════════════════════════════
   5학년 1학기
════════════════════════════════════════ */
// 1단원: 자연수의 혼합 계산
const g5_1_1=[
  ()=>{const a=Math.floor(Math.random()*20)+5,b=Math.floor(Math.random()*10)+2,c=Math.floor(Math.random()*10)+1,ans=a+b*c;return{q:`${a} + ${b} × ${c} = ?\n(곱셈 먼저 계산)`,choices:[String(ans),String((a+b)*c),String(ans+b),String(ans-c)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${b}×${c}=${b*c} 먼저, +${a}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*30)+10,b=Math.floor(Math.random()*5)+2,c=Math.floor(Math.random()*5)+1,ans=a-b*c;if(ans<0)return g5_1_1[1]();return{q:`${a} - ${b} × ${c} = ?`,choices:[String(ans),String((a-b)*c),String(ans+c),String(ans-b)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${b}×${c}=${b*c} 먼저, ${a}-${b*c}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*10)+2,b=Math.floor(Math.random()*10)+2,c=Math.floor(Math.random()*5)+2,ans=(a+b)*c;return{q:`(${a} + ${b}) × ${c} = ?`,choices:[String(ans),String(a+b*c),String(ans+c),String(ans-a)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`괄호 먼저: ${a}+${b}=${a+b}, ×${c}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*40)+20,c=Math.floor(Math.random()*5)+2,ans=b/a+c;if(b%a!==0)return g5_1_1[3]();return{q:`${b} ÷ ${a} + ${c} = ?`,choices:[String(ans),String(b/(a+c)),String(ans+a),String(ans-c)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${b}÷${a}=${b/a} 먼저, +${c}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*10)+5,b=Math.floor(Math.random()*5)+2,c=Math.floor(Math.random()*5)+1;const ans=a*b-a*c;return{q:`${a} × ${b} - ${a} × ${c} = ?`,choices:[String(ans),String(a*(b+c)),String(ans+a),String(ans-a)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${a*b}, ${a}×${c}=${a*c}, ${a*b}-${a*c}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*5)+2,c=Math.floor(Math.random()*3)+1,ans=a*b+c;return{q:`${a} × ${b} + ${c} = ?`,choices:[String(ans),String(a*(b+c)),String(ans+b),String(ans-c)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${a*b}, +${c}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*8)+3,b=Math.floor(Math.random()*8)+3,c=Math.floor(Math.random()*5)+1,ans=(a-b<0?b-a:a-b)*c;const q=a>=b?`(${a} - ${b}) × ${c}`:`(${b} - ${a}) × ${c}`;const r=a>=b?a-b:b-a;return{q:`${q} = ?`,choices:[String(r*c),String(r+c),String(r*c+c),String(r*c-c)].sort(()=>Math.random()-0.5),ans:String(r*c),explain:`괄호 먼저: ${r}, ×${c}=${r*c}`};},
];
// 2단원: 약수와 배수
const g5_1_2=[
  ()=>{const n=Math.floor(Math.random()*8)+2,k=Math.floor(Math.random()*4)+2;return{q:`${n*k}의 약수 중 ${n}의 배수가 아닌 것은?`,choices:[String(n),String(n*k),String(k),String(n+k)].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:String(k%n!==0?k:n+k),explain:`약수: ${n*k}을 나누어 떨어지게 하는 수`};},
  ()=>{const n=Math.floor(Math.random()*6)+2;return{q:`${n}의 배수 중 가장 작은 수 3개는?`,choices:[`${n}, ${n*2}, ${n*3}`,`${n+1}, ${n*2}, ${n*3}`,`${n}, ${n+1}, ${n+2}`,`${n*2}, ${n*3}, ${n*4}`].sort(()=>Math.random()-0.5),ans:`${n}, ${n*2}, ${n*3}`,explain:`${n}의 배수: ${n}, ${n*2}, ${n*3}, ...`};},
  ()=>{const n=Math.floor(Math.random()*8)+2;return{q:`${n}의 약수의 개수는?`,choices:[String([...Array(n+1).keys()].filter(i=>i>0&&n%i===0).length),String([...Array(n+1).keys()].filter(i=>i>0&&n%i===0).length+1),String([...Array(n+1).keys()].filter(i=>i>0&&n%i===0).length-1),String(n)].sort(()=>Math.random()-0.5),ans:String([...Array(n+1).keys()].filter(i=>i>0&&n%i===0).length),explain:`${n}의 약수: ${[...Array(n+1).keys()].filter(i=>i>0&&n%i===0).join(", ")}`};},
  ()=>{const a=Math.floor(Math.random()*6)+2,b=Math.floor(Math.random()*6)+2;const g=gcd(a,b);return{q:`${a}와 ${b}의 최대공약수는?`,choices:[String(g),String(g+1),String(a*b),String(Math.max(a,b))].sort(()=>Math.random()-0.5),ans:String(g),explain:`${a}와 ${b}의 최대공약수는 ${g}이에요.`};},
  ()=>{const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*5)+2;const l=a*b/gcd(a,b);return{q:`${a}와 ${b}의 최소공배수는?`,choices:[String(l),String(l*2),String(a+b),String(a*b)].filter((v,i,arr)=>arr.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:String(l),explain:`${a}와 ${b}의 최소공배수는 ${l}이에요.`};},
  ()=>{const n=Math.floor(Math.random()*10)+4;const divs=[...Array(n+1).keys()].filter(i=>i>0&&n%i===0);return{q:`${n}의 약수 중 가장 큰 수는?`,choices:[String(n),String(Math.floor(n/2)),String(n-1),String(n+1)].sort(()=>Math.random()-0.5),ans:String(n),explain:`모든 수는 자기 자신이 약수예요. ${n}의 가장 큰 약수=${n}`};},
];
// 3단원: 규칙과 대응
const g5_1_3=[
  ()=>{const a=Math.floor(Math.random()*4)+2,b=Math.floor(Math.random()*5)+1;return{q:`x가 ${a}일 때, y=x+${b}이면\ny의 값은?`,choices:[String(a+b),String(a+b+1),String(a+b-1),String(a*b)].sort(()=>Math.random()-0.5),ans:String(a+b),explain:`y=${a}+${b}=${a+b}`};},
  ()=>{const m=Math.floor(Math.random()*4)+2;return{q:`삼각형의 수(x)와 변의 수(y)의 관계:\ny = x × ?`,choices:[String(m===2?3:m),String(m===2?3:m-1),"3","4"].sort(()=>Math.random()-0.5),ans:"3",explain:`삼각형 1개→변 3개, x개→변 x×3개. y=x×3`};},
  ()=>{const a=Math.floor(Math.random()*3)+2,x=Math.floor(Math.random()*5)+1;return{q:`y = ${a} × x 에서\nx가 ${x}이면 y는?`,choices:[String(a*x),String(a*x+a),String(a+x),String(a*x-a)].sort(()=>Math.random()-0.5),ans:String(a*x),explain:`y=${a}×${x}=${a*x}`};},
  ()=>{const a=Math.floor(Math.random()*4)+2,y=Math.floor(Math.random()*5)+1;return{q:`y = x + ${a} 에서\ny가 ${y+a}이면 x는?`,choices:[String(y),String(y+1),String(y-1),String(y+a)].sort(()=>Math.random()-0.5),ans:String(y),explain:`x=${y+a}-${a}=${y}`};},
];
// 4단원: 약분과 통분
const g5_1_4=[
  ()=>{const d=Math.floor(Math.random()*5)+4,n=Math.floor(Math.random()*(d-1))+1,g=gcd(n,d),rn=n/g,rd=d/g;return{q:`${n}/${d}를 기약분수로 나타내면?`,choices:[`${rn}/${rd}`,`${n}/${d}`,`${rn+1}/${rd}`,`${rn}/${rd+1}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`${n}과 ${d}의 공약수 ${g}로 나눠요. ${n/g}/${d/g}`};},
  ()=>{const d1=Math.floor(Math.random()*4)+2,d2=d1*(Math.floor(Math.random()*3)+2),n1=Math.floor(Math.random()*(d1-1))+1;return{q:`${n1}/${d1}와 크기가 같은 분수는?`,choices:[`${n1*2}/${d1*2}`,`${n1+1}/${d1+1}`,`${n1}/${d1+1}`,`${n1*2+1}/${d1*2}`].sort(()=>Math.random()-0.5),ans:`${n1*2}/${d1*2}`,explain:`분자분모에 같은 수를 곱해요. ${n1}×2/${d1}×2=${n1*2}/${d1*2}`};},
  ()=>{const d1=Math.floor(Math.random()*4)+2,d2=Math.floor(Math.random()*4)+2;const l=d1*d2/gcd(d1,d2);return{q:`${d1}과 ${d2}의 최소공배수는?\n(통분할 때 사용)`,choices:[String(l),String(l+d1),String(d1*d2),String(l-d2)].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans:String(l),explain:`${d1}과 ${d2}의 최소공배수=${l}`};},
  ()=>{const d1=Math.floor(Math.random()*4)+2,d2=Math.floor(Math.random()*4)+2,l=d1*d2/gcd(d1,d2),n1=Math.floor(Math.random()*(d1-1))+1,n2=Math.floor(Math.random()*(d2-1))+1;const bigger=n1/d1>=n2/d2?`${n1}/${d1}`:`${n2}/${d2}`;return{q:`${n1}/${d1}와 ${n2}/${d2} 중 더 큰 분수는?\n(통분해서 비교)`,choices:[`${n1}/${d1}`,`${n2}/${d2}`],ans:bigger,explain:`통분 후 비교: ${bigger}이 더 커요.`};},
  ()=>{const d=Math.floor(Math.random()*6)+4,k=Math.floor(Math.random()*4)+2,n=Math.floor(Math.random()*(d-1))+1;return{q:`${n*k}/${d*k}를 약분하면?`,choices:[`${n}/${d}`,`${n*k}/${d*k}`,`${n+1}/${d}`,`${n}/${d+1}`].sort(()=>Math.random()-0.5),ans:`${n}/${d}`,explain:`분자분모를 ${k}로 나눠요. ${n*k}/${d*k}=${n}/${d}`};},
];
// 5단원: 분수의 덧셈과 뺄셈
const g5_1_5=[
  ()=>{const d1=Math.floor(Math.random()*4)+2,d2=Math.floor(Math.random()*4)+2,l=d1*d2/gcd(d1,d2),n1=Math.floor(Math.random()*(d1-1))+1,n2=Math.floor(Math.random()*(d2-1))+1;const rn=n1*(l/d1)+n2*(l/d2),rd=l;const [sn,sd]=simplify(rn,rd);return{q:`${n1}/${d1} + ${n2}/${d2} = ?`,choices:[`${sn}/${sd}`,`${n1+n2}/${d1+d2}`,`${sn+1}/${sd}`,`${sn}/${sd+1}`].sort(()=>Math.random()-0.5),ans:`${sn}/${sd}`,explain:`통분: ${n1*(l/d1)}/${l}+${n2*(l/d2)}/${l}=${rn}/${l}=${sn}/${sd}`};},
  ()=>{const d1=Math.floor(Math.random()*4)+2,d2=Math.floor(Math.random()*4)+2,l=d1*d2/gcd(d1,d2);const n2=Math.floor(Math.random()*(d2-1))+1,n1=Math.floor(Math.random()*d1)+d2;const rn=n1*(l/d1)-n2*(l/d2),rd=l;if(rn<0)return g5_1_5[1]();const [sn,sd]=simplify(rn,rd);return{q:`${n1}/${d1} - ${n2}/${d2} = ?`,choices:[`${sn}/${sd}`,`${n1-n2}/${d1-d2<1?1:d1-d2}`,`${sn+1}/${sd}`,`${sn}/${sd+1}`].sort(()=>Math.random()-0.5),ans:`${sn}/${sd}`,explain:`통분 후 계산=${sn}/${sd}`};},
  ()=>{const d=Math.floor(Math.random()*5)+3,n1=Math.floor(Math.random()*(d-1))+1,n2=Math.floor(Math.random()*(d-1-n1))+1;if(n2<0)return g5_1_5[2]();return{q:`${n1}/${d} + ${n2}/${d} = ?`,choices:[`${n1+n2}/${d}`,`${n1+n2}/${d*2}`,`${n1+n2+1}/${d}`,`${n1}/${d}`].sort(()=>Math.random()-0.5),ans:`${n1+n2}/${d}`,explain:`분모가 같으면 분자끼리 더해요. ${n1+n2}/${d}`};},
  ()=>{const w1=Math.floor(Math.random()*3)+1,w2=Math.floor(Math.random()*3)+1,d=Math.floor(Math.random()*5)+3,n1=Math.floor(Math.random()*(d-1))+1,n2=Math.floor(Math.random()*(d-1))+1;const tot=(n1+n2)>=d?w1+w2+1:w1+w2,fn=(n1+n2)%d;const ans=fn===0?String(tot):`${tot}과 ${fn}/${d}`;return{q:`${w1}과 ${n1}/${d} + ${w2}과 ${n2}/${d} = ?`,choices:[ans,`${tot+1}과 ${fn}/${d}`,`${tot}과 ${fn+1}/${d}`,`${tot-1}과 ${fn}/${d}`].filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5),ans,explain:`자연수끼리, 분수끼리 더해요 → ${ans}`};},
];
// 6단원: 다각형의 넓이
const g5_1_6=[
  ()=>{const b=Math.floor(Math.random()*8)+3,h=Math.floor(Math.random()*8)+3,ans=b*h;return{q:`가로 ${b}cm, 세로 ${h}cm인\n직사각형의 넓이는?`,choices:[`${ans}cm²`,`${ans+h}cm²`,`${(b+h)*2}cm²`,`${ans-b}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`직사각형 넓이=가로×세로=${b}×${h}=${ans}cm²`};},
  ()=>{const s=Math.floor(Math.random()*8)+3,ans=s*s;return{q:`한 변이 ${s}cm인 정사각형의 넓이는?`,choices:[`${ans}cm²`,`${s*4}cm²`,`${ans+s}cm²`,`${ans-s}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`정사각형 넓이=변×변=${s}×${s}=${ans}cm²`};},
  ()=>{const b=Math.floor(Math.random()*8)+4,h=Math.floor(Math.random()*8)+4,ans=b*h/2;return{q:`밑변 ${b}cm, 높이 ${h}cm인\n삼각형의 넓이는?`,choices:[`${ans}cm²`,`${b*h}cm²`,`${(b+h)}cm²`,`${ans+b}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`삼각형 넓이=밑변×높이÷2=${b}×${h}÷2=${ans}cm²`};},
  ()=>{const b=Math.floor(Math.random()*8)+4,h=Math.floor(Math.random()*6)+3,ans=b*h/2;return{q:`밑변 ${b}cm, 높이 ${h}cm인\n평행사변형의 넓이는?`,choices:[`${b*h}cm²`,`${ans}cm²`,`${(b+h)*2}cm²`,`${b*h+h}cm²`].sort(()=>Math.random()-0.5),ans:`${b*h}cm²`,explain:`평행사변형 넓이=밑변×높이=${b}×${h}=${b*h}cm²`};},
  ()=>{const a=Math.floor(Math.random()*6)+3,b=Math.floor(Math.random()*6)+3,h=Math.floor(Math.random()*6)+3,ans=(a+b)*h/2;return{q:`윗변 ${a}cm, 아랫변 ${b}cm, 높이 ${h}cm인\n사다리꼴의 넓이는?`,choices:[`${ans}cm²`,`${(a+b)*h}cm²`,`${a*b*h}cm²`,`${ans+h}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`사다리꼴 넓이=(윗변+아랫변)×높이÷2=(${a}+${b})×${h}÷2=${ans}cm²`};},
  ()=>{const d1=Math.floor(Math.random()*8)+4,d2=Math.floor(Math.random()*8)+4,ans=d1*d2/2;return{q:`대각선이 ${d1}cm, ${d2}cm인\n마름모의 넓이는?`,choices:[`${ans}cm²`,`${d1*d2}cm²`,`${(d1+d2)*2}cm²`,`${ans+d1}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`마름모 넓이=대각선×대각선÷2=${d1}×${d2}÷2=${ans}cm²`};},
];

/* ── 5학년 2학기 ── */
// 1단원: 수의 범위와 어림하기
const g5_2_1=[
  ()=>{const n=Math.floor(Math.random()*50)+20;const r=Math.round(n/10)*10;return{q:`${n}을 십의 자리에서 반올림하면?`,choices:[String(r),String(r+10),String(r-10),String(n)].sort(()=>Math.random()-0.5),ans:String(r),explain:`${n}의 일의 자리가 ${n%10}이므로 ${n%10>=5?"올림":"버림"} → ${r}`};},
  ()=>{const n=Math.floor(Math.random()*500)+200;const r=Math.floor(n/100)*100;return{q:`${n}을 백의 자리에서 버림하면?`,choices:[String(r),String(r+100),String(r-100),String(n)].sort(()=>Math.random()-0.5),ans:String(r),explain:`${n}에서 백의 자리 미만 버림 → ${r}`};},
  ()=>{const n=Math.floor(Math.random()*500)+200;const r=(Math.floor(n/100)+1)*100;return{q:`${n}을 백의 자리에서 올림하면?`,choices:[String(r),String(r-100),String(r+100),String(n)].sort(()=>Math.random()-0.5),ans:String(r),explain:`${n}에서 백의 자리 미만 올림 → ${r}`};},
  ()=>{const a=Math.floor(Math.random()*30)+10,b=Math.floor(Math.random()*30)+10;return{q:`${a} 이상 ${b} 이하인 수의 범위는?\n(${a}와 ${b}를 포함하는가?)`,choices:["${a}와 ${b} 모두 포함","${a}만 포함","${b}만 포함","둘 다 포함 안 함"].map(s=>s.replace("${a}",String(a)).replace("${b}",String(b))).sort(()=>Math.random()-0.5),ans:`${a}와 ${b} 모두 포함`,explain:`이상은 그 수 포함(≥), 이하도 포함(≤)이에요.`};},
  ()=>{const n=Math.floor(Math.random()*90)+10;return{q:`${n}은 십의 자리에서 반올림하면\n어느 수에 가깝나요?`,choices:[String(Math.round(n/10)*10),String(Math.round(n/10)*10+10),String(Math.round(n/10)*10-10),String(n)].sort(()=>Math.random()-0.5),ans:String(Math.round(n/10)*10),explain:`${n} → 반올림 → ${Math.round(n/10)*10}`};},
  ()=>{const n=Math.floor(Math.random()*90)+10;return{q:`"${n} 초과"에서 ${n}은 포함되나요?`,choices:["포함되지 않는다","포함된다","경우에 따라 다르다","항상 포함된다"].sort(()=>Math.random()-0.5),ans:"포함되지 않는다",explain:`초과(>)는 그 수를 포함하지 않아요.`};},
];
// 2단원: 분수의 곱셈
const g5_2_2=[
  ()=>{const n=Math.floor(Math.random()*5)+1,d=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*5)+2;const [rn,rd]=simplify(n*w,d);return{q:`${n}/${d} × ${w} = ?`,choices:[`${rn}/${rd}`,`${n}/${d*w}`,`${rn+1}/${rd}`,`${rn}/${rd+1}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`${n}×${w}/${d}=${n*w}/${d}=${rn}/${rd}`};},
  ()=>{const n1=Math.floor(Math.random()*4)+1,d1=Math.floor(Math.random()*4)+2,n2=Math.floor(Math.random()*4)+1,d2=Math.floor(Math.random()*4)+2;const [rn,rd]=simplify(n1*n2,d1*d2);return{q:`${n1}/${d1} × ${n2}/${d2} = ?`,choices:[`${rn}/${rd}`,`${n1+n2}/${d1+d2}`,`${rn+1}/${rd}`,`${n1*n2}/${d1+d2}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`분자끼리, 분모끼리 곱해요. ${n1*n2}/${d1*d2}=${rn}/${rd}`};},
  ()=>{const w=Math.floor(Math.random()*4)+1,n=Math.floor(Math.random()*4)+1,d=Math.floor(Math.random()*4)+2;const total=w*d+n;const [rn,rd]=simplify(total*2,d);return{q:`${w}과 ${n}/${d} × 2 = ?`,choices:[`${rn}/${rd}`,`${w*2}과 ${n}/${d}`,`${rn+1}/${rd}`,`${w}과 ${n*2}/${d}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`대분수를 가분수로: ${total}/${d}×2=${total*2}/${d}=${rn}/${rd}`};},
  ()=>{const n=Math.floor(Math.random()*5)+1,d=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*5)+2;const [rn,rd]=simplify(n,d*w);return{q:`${n}/${d} ÷ ${w} = ?`,choices:[`${rn}/${rd}`,`${n*w}/${d}`,`${n}/${d+w}`,`${rn+1}/${rd}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`분수÷자연수=분자/분모×자연수. ${n}/${d*w}=${rn}/${rd}`};},
];
// 3단원: 합동과 대칭
const g5_2_3=[
  ()=>({q:`합동인 두 도형의 특징은?`,choices:["모양과 크기가 모두 같다","모양만 같다","크기만 같다","색깔이 같다"].sort(()=>Math.random()-0.5),ans:"모양과 크기가 모두 같다",explain:`합동: 완전히 겹쳐지는 두 도형이에요.`}),
  ()=>({q:`선대칭 도형에서 대칭축을 기준으로\n접었을 때 완전히 겹치는가?`,choices:["완전히 겹친다","일부만 겹친다","겹치지 않는다","뒤집어야 겹친다"].sort(()=>Math.random()-0.5),ans:"완전히 겹친다",explain:`선대칭 도형은 대칭축으로 접으면 완전히 겹쳐요.`}),
  ()=>({q:`점대칭 도형에서 대칭의 중심을 기준으로\n180° 돌리면?`,choices:["완전히 겹친다","일부만 겹친다","겹치지 않는다","뒤집어야 한다"].sort(()=>Math.random()-0.5),ans:"완전히 겹친다",explain:`점대칭: 대칭의 중심으로 180° 돌리면 겹쳐요.`}),
  ()=>({q:`선대칭 도형이 아닌 것은?`,choices:["일반 삼각형","정삼각형","정사각형","원"].sort(()=>Math.random()-0.5),ans:"일반 삼각형",explain:`일반 삼각형은 대칭축이 없는 경우가 많아요.`}),
  ()=>{const n=Math.floor(Math.random()*6)+3;return{q:`정${n}각형의 대칭축은 몇 개인가요?`,choices:[String(n),String(n-1),String(n+1),String(n*2)].sort(()=>Math.random()-0.5),ans:String(n),explain:`정${n}각형의 대칭축은 ${n}개예요.`};},
  ()=>({q:`합동인 두 삼각형에서\n대응하는 변의 길이는?`,choices:["같다","다르다","비례한다","알 수 없다"].sort(()=>Math.random()-0.5),ans:"같다",explain:`합동인 도형의 대응하는 변의 길이는 같아요.`}),
];
// 4단원: 소수의 곱셈
const g5_2_4=[
  ()=>{const a=(Math.floor(Math.random()*9)+1)/10,b=Math.floor(Math.random()*9)+2,ans=Math.round(a*b*10)/10;return{q:`${a} × ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.1)*10)/10),String(Math.round((ans-0.1)*10)/10),String(Math.round((ans+0.2)*10)/10)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}`};},
  ()=>{const a=(Math.floor(Math.random()*90)+10)/100,b=Math.floor(Math.random()*9)+2,ans=Math.round(a*b*100)/100;return{q:`${a} × ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.01)*100)/100),String(Math.round((ans-0.01)*100)/100),String(Math.round((ans+0.1)*100)/100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}`};},
  ()=>{const a=(Math.floor(Math.random()*9)+1)/10,b=(Math.floor(Math.random()*9)+1)/10,ans=Math.round(a*b*100)/100;return{q:`${a} × ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.01)*100)/100),String(a+b),String(Math.round((ans+0.1)*100)/100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}×${b}=${ans}`};},
  ()=>{const a=Math.floor(Math.random()*5)+2,b=(Math.floor(Math.random()*9)+1)/10,ans=Math.round(a*b*10)/10;return{q:`${a} × ${b}는 어림하면?`,choices:[String(Math.round(ans)),String(Math.round(ans)+1),String(Math.round(ans)-1),String(a*Math.round(b*10))].sort(()=>Math.random()-0.5),ans:String(Math.round(ans)),explain:`${a}×${b}≈${Math.round(ans)}`};},
];
// 5단원: 직육면체
const g5_2_5=[
  ()=>({q:`직육면체의 면의 수는?`,choices:["6개","4개","8개","12개"].sort(()=>Math.random()-0.5),ans:"6개",explain:`직육면체의 면은 6개예요.`}),
  ()=>({q:`직육면체의 꼭짓점의 수는?`,choices:["8개","6개","4개","12개"].sort(()=>Math.random()-0.5),ans:"8개",explain:`직육면체의 꼭짓점은 8개예요.`}),
  ()=>({q:`직육면체의 모서리의 수는?`,choices:["12개","8개","6개","10개"].sort(()=>Math.random()-0.5),ans:"12개",explain:`직육면체의 모서리는 12개예요.`}),
  ()=>{const l=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*5)+2,h=Math.floor(Math.random()*5)+2;const ans=2*(l*w+w*h+l*h);return{q:`가로 ${l}cm, 세로 ${w}cm, 높이 ${h}cm인\n직육면체의 겉넓이는?`,choices:[`${ans}cm²`,`${l*w*h}cm²`,`${ans+l*w}cm²`,`${ans-w*h}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`겉넓이=2×(${l*w}+${w*h}+${l*h})=${ans}cm²`};},
  ()=>({q:`정육면체는 직육면체인가요?`,choices:["예, 직육면체의 특수한 경우","아니오, 다른 도형","경우에 따라 다르다","알 수 없다"].sort(()=>Math.random()-0.5),ans:"예, 직육면체의 특수한 경우",explain:`정육면체는 모든 면이 정사각형인 특수한 직육면체예요.`}),
  ()=>{const s=Math.floor(Math.random()*5)+2;const ans=6*s*s;return{q:`한 모서리가 ${s}cm인 정육면체의\n겉넓이는?`,choices:[`${ans}cm²`,`${s*s*s}cm²`,`${ans+s*s}cm²`,`${ans-s*s}cm²`].sort(()=>Math.random()-0.5),ans:`${ans}cm²`,explain:`정육면체 겉넓이=6×한 면의 넓이=6×${s*s}=${ans}cm²`};},
];
// 6단원: 평균과 가능성
const g5_2_6=[
  ()=>{const vals=Array.from({length:4},()=>Math.floor(Math.random()*8)+3);const avg=vals.reduce((a,b)=>a+b)/vals.length;return{q:`${vals.join(", ")}의 평균은?`,choices:[String(avg),String(avg+1),String(avg-1),String(avg+0.5)].sort(()=>Math.random()-0.5),ans:String(avg),explain:`(${vals.join("+")})÷${vals.length}=${vals.reduce((a,b)=>a+b)}÷${vals.length}=${avg}`};},
  ()=>({q:`동전을 던질 때 앞면이 나올\n가능성은?`,choices:["반반이다","확실하다","불가능하다","거의 확실하다"].sort(()=>Math.random()-0.5),ans:"반반이다",explain:`동전은 앞면과 뒷면이 반반의 확률이에요.`}),
  ()=>({q:`해가 동쪽에서 뜰 가능성은?`,choices:["확실하다","반반이다","불가능하다","거의 불가능하다"].sort(()=>Math.random()-0.5),ans:"확실하다",explain:`해는 항상 동쪽에서 뜨므로 확실해요.`}),
  ()=>{const vals=Array.from({length:5},()=>Math.floor(Math.random()*10)+5);const avg=vals.reduce((a,b)=>a+b)/vals.length;const newVal=Math.floor(Math.random()*10)+5;const newAvg=(vals.reduce((a,b)=>a+b)+newVal)/(vals.length+1);return{q:`${vals.join(", ")}의 평균이 ${avg}일 때\n${newVal}을 추가하면 평균은 어떻게 되나요?`,choices:[newAvg>avg?"증가한다":"감소한다","변하지 않는다","2배가 된다","반으로 줄어든다"].sort(()=>Math.random()-0.5),ans:newAvg>avg?"증가한다":"감소한다",explain:`${newVal}${newVal>avg?">":" <"}${avg}(평균)이므로 평균이 ${newAvg>avg?"증가":"감소"}해요.`};},
  ()=>{const avg=Math.floor(Math.random()*8)+5,n=4,total=avg*n,vals=Array.from({length:n-1},()=>Math.floor(Math.random()*8)+3);const last=total-vals.reduce((a,b)=>a+b);return{q:`${n}개의 수의 평균이 ${avg}이고\n3개의 수가 ${vals.join(", ")}일 때\n나머지 하나는?`,choices:[String(last),String(last+1),String(last-1),String(last+avg)].sort(()=>Math.random()-0.5),ans:String(last),explain:`합계=${avg}×${n}=${total}, 나머지=${total}-${vals.reduce((a,b)=>a+b)}=${last}`};},
];

/* ════════════════════════════════════════
   6학년 1학기
════════════════════════════════════════ */
// 1단원: 분수의 나눗셈
const g6_1_1=[
  ()=>{const n=Math.floor(Math.random()*5)+1,d=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*4)+2;const [rn,rd]=simplify(n,d*w);return{q:`${n}/${d} ÷ ${w} = ?`,choices:[`${rn}/${rd}`,`${n*w}/${d}`,`${n}/${d+w}`,`${rn+1}/${rd}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`분수÷자연수: 분모에 곱해요. ${n}/${d*w}=${rn}/${rd}`};},
  ()=>{const n1=Math.floor(Math.random()*4)+1,d1=Math.floor(Math.random()*4)+2,n2=Math.floor(Math.random()*4)+1,d2=Math.floor(Math.random()*4)+2;const [rn,rd]=simplify(n1*d2,d1*n2);return{q:`${n1}/${d1} ÷ ${n2}/${d2} = ?`,choices:[`${rn}/${rd}`,`${n1*n2}/${d1*d2}`,`${rn+1}/${rd}`,`${n1}/${n2}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`분수÷분수: 역수를 곱해요. ${n1}/${d1}×${d2}/${n2}=${rn}/${rd}`};},
  ()=>{const w=Math.floor(Math.random()*4)+1,n=Math.floor(Math.random()*4)+1,d=Math.floor(Math.random()*4)+2,div=Math.floor(Math.random()*4)+2;const total=w*d+n;const [rn,rd]=simplify(total,d*div);return{q:`${w}과 ${n}/${d} ÷ ${div} = ?`,choices:[`${rn}/${rd}`,`${w}과 ${n}/${d*div}`,`${w/div}과 ${n}/${d}`,`${rn+1}/${rd}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`대분수→가분수: ${total}/${d}÷${div}=${total}/${d*div}=${rn}/${rd}`};},
  ()=>{const n=Math.floor(Math.random()*6)+2,d=Math.floor(Math.random()*4)+2;const [rn,rd]=simplify(n,d);return{q:`자연수 ${n}을 ${d}로 나누면?`,choices:[`${rn}/${rd}`,`${n*d}`,`${n}/${d+1}`,`${rn+1}/${rd}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`${n}÷${d}=${n}/${d}=${rn}/${rd}`};},
];
// 2단원: 각기둥과 각뿔
const g6_1_2=[
  ()=>({q:`삼각기둥의 면의 수는?`,choices:["5개","6개","4개","8개"].sort(()=>Math.random()-0.5),ans:"5개",explain:`삼각기둥: 삼각형 2개+직사각형 3개=5면`}),
  ()=>({q:`사각기둥(직육면체)의 꼭짓점의 수는?`,choices:["8개","6개","4개","12개"].sort(()=>Math.random()-0.5),ans:"8개",explain:`사각기둥의 꼭짓점은 8개예요.`}),
  ()=>{const n=Math.floor(Math.random()*3)+3;return{q:`${n}각기둥의 모서리 수는?`,choices:[String(n*3),String(n*2),String(n*4),String(n*3+1)].sort(()=>Math.random()-0.5),ans:String(n*3),explain:`n각기둥의 모서리=n×3=${n}×3=${n*3}개`};},
  ()=>{const n=Math.floor(Math.random()*3)+3;return{q:`${n}각뿔의 꼭짓점 수는?`,choices:[String(n+1),String(n),String(n+2),String(n*2)].sort(()=>Math.random()-0.5),ans:String(n+1),explain:`n각뿔의 꼭짓점=n+1=${n+1}개`};},
  ()=>({q:`각뿔에서 모든 옆면의 모양은?`,choices:["삼각형","직사각형","정사각형","원"].sort(()=>Math.random()-0.5),ans:"삼각형",explain:`각뿔의 옆면은 모두 삼각형이에요.`}),
  ()=>({q:`각기둥에서 두 밑면의 관계는?`,choices:["서로 평행하고 합동","서로 수직","크기가 다르다","모양이 다르다"].sort(()=>Math.random()-0.5),ans:"서로 평행하고 합동",explain:`각기둥의 두 밑면은 평행하고 합동이에요.`}),
];
// 3단원: 소수의 나눗셈
const g6_1_3=[
  ()=>{const a=(Math.floor(Math.random()*50)+10)/10,b=Math.floor(Math.random()*4)+2,ans=Math.round(a/b*100)/100;return{q:`${a} ÷ ${b} = ?`,choices:[String(ans),String(Math.round((ans+0.1)*100)/100),String(Math.round((ans-0.1)*100)/100),String(Math.round((ans+0.01)*100)/100)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}÷${b}=${ans}`};},
  ()=>{const a=(Math.floor(Math.random()*90)+10)/10,b=(Math.floor(Math.random()*9)+1)/10,ans=Math.round(a/b);return{q:`${a} ÷ ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}÷${b}≈${ans}`};},
  ()=>{const b=Math.floor(Math.random()*4)+2,ans=Math.floor(Math.random()*10)+2,a=Math.round(ans*b*10)/10;return{q:`□ ÷ ${b} = ${ans}\n□에 알맞은 수는?`,choices:[String(a),String(Math.round((a+0.1)*10)/10),String(Math.round((a-b)*10)/10),String(a*2)].sort(()=>Math.random()-0.5),ans:String(a),explain:`${ans}×${b}=${a}`};},
];
// 4단원: 비와 비율
const g6_1_4=[
  ()=>{const a=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*8)+2;return{q:`${a}:${b}를 비율로 나타내면?`,choices:[`${a}/${b}`,`${b}/${a}`,`${a+b}/${b}`,`${a}/${a+b}`].sort(()=>Math.random()-0.5),ans:`${a}/${b}`,explain:`a:b의 비율=a/b=${a}/${b}이에요.`};},
  ()=>{const n=Math.floor(Math.random()*8)+1,d=Math.floor(Math.random()*8)+2,pct=Math.round(n/d*100);return{q:`${n}/${d}를 백분율로 나타내면?`,choices:[`${pct}%`,`${pct+1}%`,`${pct-1}%`,`${pct+5}%`].sort(()=>Math.random()-0.5),ans:`${pct}%`,explain:`${n}/${d}×100=${pct}%`};},
  ()=>{const pct=Math.floor(Math.random()*8)*10+10,total=Math.floor(Math.random()*5)*100+200;const part=total*pct/100;return{q:`${total}의 ${pct}%는?`,choices:[String(part),String(part+10),String(part-10),String(part*2)].sort(()=>Math.random()-0.5),ans:String(part),explain:`${total}×${pct}/100=${part}`};},
  ()=>{const a=Math.floor(Math.random()*6)+2,b=Math.floor(Math.random()*6)+2,k=Math.floor(Math.random()*3)+2;return{q:`${a}:${b}와 같은 비율은?`,choices:[`${a*k}:${b*k}`,`${a+k}:${b+k}`,`${a*k}:${b+k}`,`${a}:${b+k}`].sort(()=>Math.random()-0.5),ans:`${a*k}:${b*k}`,explain:`비의 전항과 후항에 같은 수를 곱해요. ${a*k}:${b*k}`};},
];
// 5단원: 여러 가지 그래프
const g6_1_5=[
  ()=>({q:`띠그래프에서 전체에 대한\n각 부분의 비율을 나타내기 좋은 것은?`,choices:["띠그래프","꺾은선그래프","막대그래프","표"].sort(()=>Math.random()-0.5),ans:"띠그래프",explain:`띠그래프는 전체에 대한 비율을 나타내요.`}),
  ()=>({q:`원그래프의 특징은?`,choices:["전체에 대한 각 부분의 비율을 나타낸다","시간에 따른 변화를 나타낸다","개수를 비교한다","자료를 정리한다"].sort(()=>Math.random()-0.5),ans:"전체에 대한 각 부분의 비율을 나타낸다",explain:`원그래프는 비율을 나타내기 좋아요.`}),
  ()=>{const pct=Math.floor(Math.random()*5)*10+20,total=1000;const part=total*pct/100;return{q:`원그래프에서 어떤 항목이 ${pct}%이고\n전체가 ${total}명이면, 그 항목은 몇 명?`,choices:[String(part),String(part+total*0.1),String(pct),String(part-total*0.1)].sort(()=>Math.random()-0.5),ans:String(part),explain:`${total}×${pct}%=${total}×${pct}/100=${part}명`};},
  ()=>({q:`꺾은선그래프는 무엇을 나타내기 좋나요?`,choices:["시간에 따른 변화","비율","개수 비교","전체와 부분"].sort(()=>Math.random()-0.5),ans:"시간에 따른 변화",explain:`꺾은선그래프는 시간에 따른 변화를 잘 나타내요.`}),
];
// 6단원: 직육면체의 부피와 겉넓이
const g6_1_6=[
  ()=>{const l=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*5)+2,h=Math.floor(Math.random()*5)+2;const v=l*w*h;return{q:`가로 ${l}cm, 세로 ${w}cm, 높이 ${h}cm인\n직육면체의 부피는?`,choices:[`${v}cm³`,`${2*(l*w+w*h+l*h)}cm²`,`${v+l*w}cm³`,`${v-w*h}cm³`].sort(()=>Math.random()-0.5),ans:`${v}cm³`,explain:`부피=가로×세로×높이=${l}×${w}×${h}=${v}cm³`};},
  ()=>{const s=Math.floor(Math.random()*5)+2;const v=s*s*s;return{q:`한 모서리가 ${s}cm인 정육면체의\n부피는?`,choices:[`${v}cm³`,`${6*s*s}cm²`,`${v+s}cm³`,`${v-s*s}cm³`].sort(()=>Math.random()-0.5),ans:`${v}cm³`,explain:`정육면체 부피=한 모서리³=${s}³=${v}cm³`};},
  ()=>({q:`1m³ = 몇 cm³인가요?`,choices:["1,000,000cm³","1,000cm³","100cm³","10,000cm³"].sort(()=>Math.random()-0.5),ans:"1,000,000cm³",explain:`1m=100cm, 1m³=100³=1,000,000cm³이에요.`}),
  ()=>{const l=Math.floor(Math.random()*5)+2,w=Math.floor(Math.random()*5)+2,h=Math.floor(Math.random()*5)+2;const sa=2*(l*w+w*h+l*h);return{q:`가로 ${l}cm, 세로 ${w}cm, 높이 ${h}cm인\n직육면체의 겉넓이는?`,choices:[`${sa}cm²`,`${l*w*h}cm³`,`${sa+l*w}cm²`,`${sa-w*h}cm²`].sort(()=>Math.random()-0.5),ans:`${sa}cm²`,explain:`겉넓이=2×(${l*w}+${w*h}+${l*h})=${sa}cm²`};},
];

/* ════════════════════════════════════════
   6학년 2학기
════════════════════════════════════════ */
// 1단원: 분수의 나눗셈(분수÷분수)
const g6_2_1=[
  ()=>{const n1=Math.floor(Math.random()*4)+1,d1=Math.floor(Math.random()*4)+2,n2=Math.floor(Math.random()*4)+1,d2=Math.floor(Math.random()*4)+2;const [rn,rd]=simplify(n1*d2,d1*n2);return{q:`${n1}/${d1} ÷ ${n2}/${d2} = ?`,choices:[`${rn}/${rd}`,`${n1*n2}/${d1*d2}`,`${n1}/${d1+d2}`,`${rn+1}/${rd}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`역수 곱하기: ${n1}/${d1}×${d2}/${n2}=${rn}/${rd}`};},
  ()=>{const w=Math.floor(Math.random()*4)+2,n=Math.floor(Math.random()*4)+1,d=Math.floor(Math.random()*4)+2,n2=Math.floor(Math.random()*3)+1,d2=Math.floor(Math.random()*3)+2;const total=w*d+n;const [rn,rd]=simplify(total*d2,d*n2);return{q:`${w}과 ${n}/${d} ÷ ${n2}/${d2} = ?`,choices:[`${rn}/${rd}`,`${w}과 ${n*d2}/${d*n2}`,`${rn+1}/${rd}`,`${rn-1}/${rd}`].sort(()=>Math.random()-0.5),ans:`${rn}/${rd}`,explain:`대분수→가분수: ${total}/${d}÷${n2}/${d2}=${rn}/${rd}`};},
];
// 2단원: 소수의 나눗셈(소수÷소수)
const g6_2_2=[
  ()=>{const b=(Math.floor(Math.random()*9)+1)/10,ans=Math.floor(Math.random()*9)+2,a=Math.round(ans*b*10)/10;return{q:`${a} ÷ ${b} = ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}÷${b}=${ans}`};},
  ()=>{const a=(Math.floor(Math.random()*90)+10)/100,b=(Math.floor(Math.random()*9)+1)/100,ans=Math.round(a/b);return{q:`${a} ÷ ${b} ≈ ?`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+5)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`${a}÷${b}≈${ans}`};},
];
// 3단원: 비례식과 비례배분
const g6_2_3=[
  ()=>{const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*5)+2,k=Math.floor(Math.random()*5)+2;return{q:`${a}:${b} = ${a*k}:□\n□에 알맞은 수는?`,choices:[String(b*k),String(b*k+k),String(b+k),String(b*k-k)].sort(()=>Math.random()-0.5),ans:String(b*k),explain:`비의 성질: ${a}:${b}=${a*k}:${b*k}`};},
  ()=>{const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*5)+2,total=Math.floor(Math.random()*10)*( a+b)+a+b;const partA=total*a/(a+b);return{q:`${total}을 ${a}:${b}로 비례배분할 때\n${a}에 해당하는 양은?`,choices:[String(partA),String(total-partA),String(total*b/(a+b)),String(partA+a)].sort(()=>Math.random()-0.5),ans:String(partA),explain:`${total}×${a}/(${a}+${b})=${partA}`};},
  ()=>{const a=Math.floor(Math.random()*5)+1,b=Math.floor(Math.random()*5)+1,c=Math.floor(Math.random()*5)+1,d=Math.floor(Math.random()*5)+1;const isTrue=a*d===b*c;return{q:`${a}:${b} = ${c}:${d} 이 비례식이 맞나요?`,choices:[isTrue?"맞다":"틀리다",isTrue?"틀리다":"맞다"],ans:isTrue?"맞다":"틀리다",explain:`외항의 곱: ${a}×${d}=${a*d}, 내항의 곱: ${b}×${c}=${b*c} ${isTrue?"→ 같으므로 맞다":"→ 다르므로 틀리다"}`};},
  ()=>{const a=Math.floor(Math.random()*5)+2,b=Math.floor(Math.random()*5)+2,k=Math.floor(Math.random()*5)+2,x=a*k;return{q:`□:${b} = ${x}:${b*k}\n□에 알맞은 수는?`,choices:[String(a),String(a+1),String(a-1),String(x)].sort(()=>Math.random()-0.5),ans:String(a),explain:`□=${b}×${x}/${b*k}=${a}`};},
];
// 4단원: 원의 넓이
const g6_2_4=[
  ()=>{const r=Math.floor(Math.random()*7)+2,pi=3.14,area=Math.round(r*r*pi*100)/100;return{q:`반지름이 ${r}cm인 원의 넓이는?\n(π=3.14)`,choices:[`${area}cm²`,`${Math.round(2*r*pi*100)/100}cm`,`${Math.round(r*pi*100)/100}cm²`,`${area*2}cm²`].sort(()=>Math.random()-0.5),ans:`${area}cm²`,explain:`원의 넓이=반지름²×π=${r}²×3.14=${area}cm²`};},
  ()=>{const r=Math.floor(Math.random()*7)+2,pi=3.14,cir=Math.round(2*r*pi*100)/100;return{q:`반지름이 ${r}cm인 원의 둘레는?\n(π=3.14)`,choices:[`${cir}cm`,`${Math.round(r*r*pi*100)/100}cm²`,`${Math.round(r*pi*100)/100}cm`,`${cir*2}cm`].sort(()=>Math.random()-0.5),ans:`${cir}cm`,explain:`원의 둘레=지름×π=2×${r}×3.14=${cir}cm`};},
  ()=>({q:`원주율(π)은 얼마인가요?\n(어림값)`,choices:["약 3.14","약 2.14","약 4.14","약 1.14"].sort(()=>Math.random()-0.5),ans:"약 3.14",explain:`원주율 π≈3.14이에요.`}),
  ()=>{const d=Math.floor(Math.random()*6)+4,pi=3.14,area=Math.round((d/2)*(d/2)*pi*100)/100;return{q:`지름이 ${d}cm인 원의 넓이는?\n(π=3.14)`,choices:[`${area}cm²`,`${Math.round(d*d*pi*100)/100}cm²`,`${Math.round(d*pi*100)/100}cm`,`${area+d}cm²`].sort(()=>Math.random()-0.5),ans:`${area}cm²`,explain:`반지름=${d/2}cm, 넓이=${d/2}²×3.14=${area}cm²`};},
];
// 5단원: 원기둥·원뿔·구
const g6_2_5=[
  ()=>({q:`원기둥의 두 밑면의 모양은?`,choices:["원","삼각형","사각형","오각형"].sort(()=>Math.random()-0.5),ans:"원",explain:`원기둥의 밑면은 원이에요.`}),
  ()=>({q:`원뿔의 꼭짓점 수는?`,choices:["1개","2개","없다","3개"].sort(()=>Math.random()-0.5),ans:"1개",explain:`원뿔의 꼭짓점은 1개예요.`}),
  ()=>({q:`구의 특징은?`,choices:["어느 방향에서나 둥글다","평평한 면이 있다","꼭짓점이 있다","모서리가 있다"].sort(()=>Math.random()-0.5),ans:"어느 방향에서나 둥글다",explain:`구는 어느 방향에서나 원으로 보여요.`}),
  ()=>{const r=Math.floor(Math.random()*5)+2,h=Math.floor(Math.random()*8)+4,pi=3.14;const v=Math.round(r*r*pi*h*100)/100;return{q:`밑면 반지름 ${r}cm, 높이 ${h}cm인\n원기둥의 부피는? (π=3.14)`,choices:[`${v}cm³`,`${Math.round(2*r*pi*h*100)/100}cm²`,`${v+r*r}cm³`,`${Math.round(r*r*pi*100)/100}cm²`].sort(()=>Math.random()-0.5),ans:`${v}cm³`,explain:`원기둥 부피=밑면넓이×높이=${r}²×3.14×${h}=${v}cm³`};},
  ()=>({q:`원기둥의 전개도에서 옆면의 모양은?`,choices:["직사각형","원","삼각형","사다리꼴"].sort(()=>Math.random()-0.5),ans:"직사각형",explain:`원기둥을 펼치면 옆면이 직사각형이 돼요.`}),
];
// 6단원: 자료의 정리 (중복)
const g6_2_6=[
  ()=>({q:`평균을 구하는 공식은?`,choices:["(모든 값의 합)÷(값의 개수)","(최댓값+최솟값)÷2","(가장 많은 값)","(중간값)"].sort(()=>Math.random()-0.5),ans:"(모든 값의 합)÷(값의 개수)",explain:`평균=(모든 값의 합)÷(값의 개수)이에요.`}),
  ()=>{const vals=[3,5,7,4,6];const avg=vals.reduce((a,b)=>a+b)/vals.length;return{q:`${vals.join(", ")}의 평균은?`,choices:[String(avg),String(avg+1),String(avg-1),String(avg+0.5)].sort(()=>Math.random()-0.5),ans:String(avg),explain:`합=${vals.reduce((a,b)=>a+b)}, 평균=${avg}`};},
  ()=>({q:`중앙값(중위수)이란?`,choices:["자료를 크기 순으로 나열할 때 중간 값","가장 많이 나타나는 값","모든 값의 평균","최대값과 최솟값의 평균"].sort(()=>Math.random()-0.5),ans:"자료를 크기 순으로 나열할 때 중간 값",explain:`중앙값: 크기 순 나열 시 중간에 오는 값이에요.`}),
  ()=>{const vals=[2,4,6,4,3,4,5];const mode=4;return{q:`${vals.join(", ")}에서 최빈값은?`,choices:["4","3","5","6"].sort(()=>Math.random()-0.5),ans:"4",explain:`가장 많이 나타나는 값(3번)=4이에요.`};},
];

/* ════════════════════════════════════════
   단원 데이터
════════════════════════════════════════ */
const SDATA5={
  1:{title:"1학기",emoji:"🌸",bg:"linear-gradient(135deg,#FFF3E0,#FFF9E6)",border:"#FFD08A",units:[
    {id:1,title:"자연수의 혼합 계산",emoji:"🔢",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gens:g5_1_1},
    {id:2,title:"약수와 배수",      emoji:"🔗",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gens:g5_1_2},
    {id:3,title:"규칙과 대응",      emoji:"🔄",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gens:g5_1_3},
    {id:4,title:"약분과 통분",      emoji:"🍕",color:"#A29BFE",light:"#EDE7F6",border:"#CE93D8",gens:g5_1_4},
    {id:5,title:"분수의 덧셈과 뺄셈",emoji:"➕",color:"#55EFC4",light:"#E0F2F1",border:"#80CBC4",gens:g5_1_5},
    {id:6,title:"다각형의 넓이",    emoji:"📐",color:"#FDCB6E",light:"#FFFDE7",border:"#FFE082",gens:g5_1_6},
  ]},
  2:{title:"2학기",emoji:"🍂",bg:"linear-gradient(135deg,#EDE7F6,#E8EAF6)",border:"#B39DDB",units:[
    {id:1,title:"수의 범위와 어림하기",emoji:"🔢",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gens:g5_2_1},
    {id:2,title:"분수의 곱셈",       emoji:"✖️",color:"#00B894",light:"#E0F2F1",border:"#80CBC4",gens:g5_2_2},
    {id:3,title:"합동과 대칭",       emoji:"🔷",color:"#0984E3",light:"#E3F2FD",border:"#90CAF9",gens:g5_2_3},
    {id:4,title:"소수의 곱셈",       emoji:"🔣",color:"#E17055",light:"#FBE9E7",border:"#FFCCBC",gens:g5_2_4},
    {id:5,title:"직육면체",          emoji:"📦",color:"#6C5CE7",light:"#EDE7F6",border:"#CE93D8",gens:g5_2_5},
    {id:6,title:"평균과 가능성",     emoji:"📊",color:"#00CEC9",light:"#E0F7FA",border:"#80DEEA",gens:g5_2_6},
  ]},
};
const SDATA6={
  1:{title:"1학기",emoji:"🌸",bg:"linear-gradient(135deg,#FFF3E0,#FFF9E6)",border:"#FFD08A",units:[
    {id:1,title:"분수의 나눗셈",        emoji:"➗",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gens:g6_1_1},
    {id:2,title:"각기둥과 각뿔",        emoji:"🔺",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gens:g6_1_2},
    {id:3,title:"소수의 나눗셈",        emoji:"🔣",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gens:g6_1_3},
    {id:4,title:"비와 비율",            emoji:"📊",color:"#A29BFE",light:"#EDE7F6",border:"#CE93D8",gens:g6_1_4},
    {id:5,title:"여러 가지 그래프",     emoji:"📈",color:"#55EFC4",light:"#E0F2F1",border:"#80CBC4",gens:g6_1_5},
    {id:6,title:"직육면체의 부피와 겉넓이",emoji:"📦",color:"#FDCB6E",light:"#FFFDE7",border:"#FFE082",gens:g6_1_6},
  ]},
  2:{title:"2학기",emoji:"🍂",bg:"linear-gradient(135deg,#EDE7F6,#E8EAF6)",border:"#B39DDB",units:[
    {id:1,title:"분수의 나눗셈",     emoji:"➗",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gens:g6_2_1},
    {id:2,title:"소수의 나눗셈",     emoji:"🔣",color:"#00B894",light:"#E0F2F1",border:"#80CBC4",gens:g6_2_2},
    {id:3,title:"비례식과 비례배분", emoji:"⚖️",color:"#0984E3",light:"#E3F2FD",border:"#90CAF9",gens:g6_2_3},
    {id:4,title:"원의 넓이",         emoji:"⭕",color:"#E17055",light:"#FBE9E7",border:"#FFCCBC",gens:g6_2_4},
    {id:5,title:"원기둥·원뿔·구",   emoji:"🔵",color:"#6C5CE7",light:"#EDE7F6",border:"#CE93D8",gens:g6_2_5},
    {id:6,title:"자료의 정리",       emoji:"📋",color:"#00CEC9",light:"#E0F7FA",border:"#80DEEA",gens:g6_2_6},
  ]},
};

/* ── 공통 퀴즈/선택 화면 ── */
function QuizScreen56({sdata,semester,unitId,onBack,onStar,grade}){
  const unit=sdata[semester].units.find(u=>u.id===unitId);
  const [questions]=useState(()=>makeQ(unit.gens));
  const [qIdx,setQIdx]=useState(0);const[sel,setSel]=useState(null);const[status,setStatus]=useState(null);const[hint,setHint]=useState(false);const[shake,setShake]=useState(false);const[combo,setCombo]=useState(0);const[showCombo,setShowCombo]=useState(false);const[conf,setConf]=useState(false);const[score,setScore]=useState(0);const[done,setDone]=useState(false);
  const q=questions[qIdx],prog=(qIdx/20)*100;
  function pick(c){if(status)return;setSel(c);if(c===q.ans){setStatus("correct");setConf(true);setTimeout(()=>setConf(false),1800);const nc=combo+1;setCombo(nc);setScore(s=>s+1);if(nc>=3){setShowCombo(true);setTimeout(()=>setShowCombo(false),1600);}}else{setStatus("wrong");setShake(true);setHint(true);setCombo(0);setTimeout(()=>setShake(false),600);}}
  function next(){if(qIdx+1>=20){const fs=score+(status==="correct"?1:0);onStar(`${semester}-${unitId}`,fs>=18?3:fs>=12?2:1);setDone(true);}else{setQIdx(i=>i+1);setSel(null);setStatus(null);setHint(false);}}
  if(done){const fs=score;return(<div style={{textAlign:"center",padding:"20px 0"}}>{conf&&<Confetti/>}<div style={{fontSize:72,marginBottom:12}}>{fs>=18?"🏆":fs>=12?"🥈":"🎯"}</div><div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{unit.title} 완료!</div><div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>20문제 중 {fs}개 정답</div><div style={{fontSize:28,marginBottom:20}}>{Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(fs>=18?3:fs>=12?2:1)?1:0.25}}>⭐</span>)}</div><button onClick={onBack} style={btn(unit.color)}>단원 목록으로</button></div>);}
  return(<div>{conf&&<Confetti/>}{showCombo&&(<div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",borderRadius:24,padding:"20px 36px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)",textAlign:"center",zIndex:999,animation:"popIn 0.4s ease"}}><div style={{fontSize:48}}>🔥</div><div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{combo}연속 정답!</div></div>)}<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{unit.emoji} {unit.title} · {qIdx+1}/20</span>{combo>=3&&<span style={{background:unit.color,color:"white",fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:99}}>🔥{combo}연속</span>}</div><div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${prog}%`,background:`linear-gradient(90deg,${unit.color},${unit.border})`,transition:"width 0.4s ease",borderRadius:99}}/></div></div><span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>✅{score}</span></div><div style={{background:unit.light,border:`2px solid ${unit.border}`,borderRadius:24,padding:"16px 14px",marginBottom:12,animation:shake?"shake 0.5s":"none",textAlign:"center"}}><div style={{fontSize:15,fontWeight:800,color:"#2D3436",fontFamily:"'Nunito',sans-serif",lineHeight:1.7,whiteSpace:"pre-line"}}>{q.q}</div></div><div style={{display:"grid",gridTemplateColumns:q.choices.length===2?"1fr 1fr":"1fr 1fr",gap:8,marginBottom:10}}>{q.choices.map((c,i)=>{let bg="#fff",border="2px solid #E0E0E0",col="#2D3436";if(sel===c){if(status==="correct"){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}else{bg="#FFEBEE";border="2px solid #EF9A9A";col="#C62828";}}if(status&&c===q.ans&&sel!==c){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}return(<button key={i} onClick={()=>pick(c)} style={{padding:"12px 6px",borderRadius:14,background:bg,border,color:col,fontSize:13,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:status?"default":"pointer",transition:"transform 0.12s"}} onMouseEnter={e=>{if(!status)e.currentTarget.style.transform="scale(1.03)";}} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{c}</button>);})}</div>{hint&&status==="wrong"&&(<div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:14,padding:"10px 12px",marginBottom:10}}><div style={{fontSize:11,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:3}}>💡 이렇게 생각해봐요!</div><div style={{fontSize:12,color:"#636E72",fontFamily:"'Nunito',sans-serif",lineHeight:1.6}}>{q.explain}</div></div>)}{status==="correct"&&(<div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:14,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>🎉</span><div><div style={{fontSize:14,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div><div style={{fontSize:11,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain}</div></div></div>)}{status==="correct"&&<button onClick={next} style={btn(unit.color)}>{qIdx+1>=20?"결과 보기 🏆":"다음 문제 →"}</button>}{status==="wrong"&&<button onClick={()=>{setSel(null);setStatus(null);setHint(false);}} style={btn("#EF9A9A","#C62828")}>다시 풀기 🔄</button>}</div>);}

function SemSelect({sdata,sc,onSelect,grade}){return(<div style={{textAlign:"center",padding:"8px 0"}}><div style={{fontSize:52,marginBottom:8}}>🎒</div><h1 style={{margin:0,fontSize:24,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{grade}학년 수학</h1><p style={{margin:"6px 0 24px",color:"#B2BEC3",fontSize:13,fontFamily:"'Nunito',sans-serif"}}>학기를 선택해서 공부해보세요!</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>{[1,2].map(sem=>{const sd=sdata[sem],s=sc[sem]||0;return(<button key={sem} onClick={()=>onSelect(sem)} style={{background:sd.bg,border:`3px solid ${sd.border}`,borderRadius:24,padding:"24px 16px",cursor:"pointer",transition:"transform 0.15s",boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><div style={{fontSize:40,marginBottom:6}}>{sd.emoji}</div><div style={{fontSize:16,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{sd.title}</div><div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif",marginBottom:10}}>6단원 · 각 20문제</div><div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginBottom:4}}>{Array.from({length:18},(_,j)=><span key={j} style={{fontSize:11,opacity:j<s?1:0.18}}>⭐</span>)}</div><div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{s}/18 ⭐</div></button>);})}</div></div>);}

function UnitSel({sdata,semester,stars,onSelect,onBack,grade}){const sd=sdata[semester];return(<div style={{padding:"0 4px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button><div><div style={{fontSize:11,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>{grade}학년 수학</div><div style={{fontSize:18,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{sd.emoji} {sd.title}</div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{sd.units.map((u,i)=>(<button key={u.id} onClick={()=>onSelect(u.id)} style={{background:u.light,border:`2.5px solid ${u.border}`,borderRadius:20,padding:"12px 10px",cursor:"pointer",textAlign:"left",boxShadow:"0 3px 12px rgba(0,0,0,0.06)",animation:`slideUp 0.4s ${i*0.07}s both`,transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><div style={{fontSize:22,marginBottom:3}}>{u.emoji}</div><div style={{fontSize:11,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{u.id}단원</div><div style={{fontSize:10,fontWeight:700,color:u.color,fontFamily:"'Nunito',sans-serif"}}>{u.title}</div><div style={{marginTop:4,display:"flex",gap:1}}>{Array.from({length:3},(_,j)=><span key={j} style={{fontSize:11,opacity:j<(stars[`${semester}-${u.id}`]||0)?1:0.2}}>⭐</span>)}</div></button>))}</div></div>);}

function GradeApp({grade,sdata,onBack}){
  const [screen,setScreen]=useState("semester");const [sem,setSem]=useState(null);const [uid,setUid]=useState(null);const [stars,setStars]=useState({});
  const sc={1:sdata[1].units.reduce((s,u)=>s+(stars[`1-${u.id}`]||0),0),2:sdata[2].units.reduce((s,u)=>s+(stars[`2-${u.id}`]||0),0)};
  return(<div style={{minHeight:"100vh",background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:20,boxSizing:"border-box"}}><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/><div style={{background:"white",borderRadius:32,padding:"24px 20px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.08)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:"2px dashed #F0F0F0"}}><div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#B2BEC3",padding:0}}>←</button><span style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>초등 {grade}학년</span></div><div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:99,padding:"4px 14px",fontSize:13,fontWeight:900,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>⭐ {sc[1]+sc[2]}</div></div>{screen==="semester"&&<SemSelect sdata={sdata} sc={sc} onSelect={s=>{setSem(s);setScreen("units");}} grade={grade}/>}{screen==="units"&&sem&&<UnitSel sdata={sdata} semester={sem} stars={stars} onSelect={id=>{setUid(id);setScreen("quiz");}} onBack={()=>setScreen("semester")} grade={grade}/>}{screen==="quiz"&&sem&&uid&&<QuizScreen56 sdata={sdata} semester={sem} unitId={uid} onBack={()=>setScreen("units")} onStar={(k,s)=>setStars(p=>({...p,[k]:Math.max(p[k]||0,s)}))} grade={grade}/>}</div><style>{`@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}@keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}30%{transform:translateX(8px)}45%{transform:translateX(-6px)}60%{transform:translateX(6px)}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes popIn{0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}60%{transform:translate(-50%,-50%) scale(1.1)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}body{margin:0;font-family:'Nunito',sans-serif;}`}</style></div>);}

export function App5({onBack}){return <GradeApp grade={5} sdata={SDATA5} onBack={onBack}/>;}
export function App6({onBack}){return <GradeApp grade={6} sdata={SDATA6} onBack={onBack}/>;}
