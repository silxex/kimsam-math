import React, { useState } from "react";

function Confetti() {
  const c=["#FF9F43","#48DBFB","#FF6B81","#A29BFE","#55EFC4","#FDCB6E"];
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9998,overflow:"hidden"}}>{Array.from({length:30},(_,i)=>(<div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-16px",width:7+Math.random()*9,height:7+Math.random()*9,borderRadius:Math.random()>0.5?"50%":"2px",background:c[i%6],animation:`fall ${1.2+Math.random()*1.5}s ${Math.random()*0.5}s linear forwards`}}/>))}</div>);
}
function btn(bg,col="white"){return{width:"100%",padding:"13px",borderRadius:16,border:"none",background:bg,color:col,fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:`0 5px 16px ${bg}55`};}
function makeQ(gens,n=20){return Array.from({length:n},(_,i)=>gens[i%gens.length]()).sort(()=>Math.random()-0.5);}

/* ── 1학기 문제 ── */
// 1단원: 9까지의 수
const g1_1_1=[
  ()=>{const n=Math.floor(Math.random()*9)+1;const items=["🍎","🌟","🐶","🌸","⚽"][Math.floor(Math.random()*5)];return{q:`${items.repeat(n)}\n${items}는 몇 개인가요?`,choices:[n,n===9?1:n+1,n===1?9:n-1,n===9?2:n+2].map(String).sort(()=>Math.random()-0.5),ans:String(n),explain:`${items}가 ${n}개 있어요.`};},
  ()=>{const n=Math.floor(Math.random()*8)+1;return{q:`${n}보다 1 큰 수는?`,choices:[String(n+1),String(n),String(n+2),String(n-1<1?9:n-1)].sort(()=>Math.random()-0.5),ans:String(n+1),explain:`${n}보다 1 큰 수는 ${n+1}이에요.`};},
  ()=>{const n=Math.floor(Math.random()*8)+2;return{q:`${n}보다 1 작은 수는?`,choices:[String(n-1),String(n),String(n+1),String(n-2<1?9:n-2)].sort(()=>Math.random()-0.5),ans:String(n-1),explain:`${n}보다 1 작은 수는 ${n-1}이에요.`};},
  ()=>{const a=Math.floor(Math.random()*8)+1,b=Math.floor(Math.random()*8)+1;return{q:`${a}와 ${b} 중 더 큰 수는?`,choices:[String(a),String(b)],ans:String(Math.max(a,b)),explain:`${Math.max(a,b)}이 더 커요.`};},
  ()=>{const n=Math.floor(Math.random()*9)+1;const words=["일","이","삼","사","오","육","칠","팔","구"];return{q:`${words[n-1]}은 숫자로?`,choices:[String(n),String(n===9?1:n+1),String(n===1?9:n-1),String(n===1?8:n===9?7:n+2)].sort(()=>Math.random()-0.5),ans:String(n),explain:`${words[n-1]} = ${n}이에요.`};},
  ()=>{const n=Math.floor(Math.random()*9)+1;return{q:`${n}은 몇 번째 수인가요?\n(1, 2, 3, 4, 5, 6, 7, 8, 9)`,choices:[`${n}번째`,`${n+1>9?1:n+1}번째`,`${n-1<1?9:n-1}번째`,`${n+2>9?2:n+2}번째`].sort(()=>Math.random()-0.5),ans:`${n}번째`,explain:`${n}은 ${n}번째 수예요.`};},
  ()=>{const a=Math.floor(Math.random()*9)+1,b=Math.floor(Math.random()*9)+1;return{q:`${a}와 ${b} 중 더 작은 수는?`,choices:[String(a),String(b)],ans:String(Math.min(a,b)),explain:`${Math.min(a,b)}이 더 작아요.`};},
];
// 2단원: 여러 가지 모양
const g1_1_2=[
  ()=>({q:`상자 모양(직육면체)의 특징은?`,choices:["평평한 면이 있다","둥글다","꼭짓점이 없다","면이 없다"].sort(()=>Math.random()-0.5),ans:"평평한 면이 있다",explain:`상자(직육면체)는 평평한 면이 있어요.`}),
  ()=>({q:`공 모양(구)의 특징은?`,choices:["어디서나 잘 굴러간다","평평한 면이 있다","꼭짓점이 있다","모서리가 있다"].sort(()=>Math.random()-0.5),ans:"어디서나 잘 굴러간다",explain:`공(구)은 어디서나 잘 굴러가요.`}),
  ()=>({q:`원통 모양(원기둥)의 특징은?`,choices:["한 방향으로 잘 굴러간다","평평한 면이 없다","어디서나 굴러간다","세울 수 없다"].sort(()=>Math.random()-0.5),ans:"한 방향으로 잘 굴러간다",explain:`원통(원기둥)은 한 방향으로 잘 굴러가요.`}),
  ()=>({q:`어떤 모양을 쌓기 가장 좋나요?`,choices:["상자 모양","공 모양","원통 모양","풍선 모양"].sort(()=>Math.random()-0.5),ans:"상자 모양",explain:`상자 모양은 평평한 면이 있어서 쌓기 쉬워요.`}),
  ()=>({q:`어떤 모양이 가장 잘 굴러가나요?`,choices:["공 모양","상자 모양","책 모양","블록 모양"].sort(()=>Math.random()-0.5),ans:"공 모양",explain:`공(구)은 둥글어서 어디서나 잘 굴러가요.`}),
  ()=>({q:`평평한 면으로 쌓을 수 있는 모양은?`,choices:["상자 모양과 원통 모양","공 모양","공과 원통 모양","없다"].sort(()=>Math.random()-0.5),ans:"상자 모양과 원통 모양",explain:`상자와 원통은 평평한 면이 있어 쌓을 수 있어요.`}),
];
// 3단원: 덧셈과 뺄셈
const g1_1_3=[
  ()=>{const a=Math.floor(Math.random()*4)+1,b=Math.floor(Math.random()*4)+1,s=a+b;if(s>9)return g1_1_3[0]();return{q:`${a} + ${b} = ?`,choices:[String(s),String(s+1),String(s-1<1?9:s-1),String(Math.min(s+2,9))].sort(()=>Math.random()-0.5),ans:String(s),explain:`${a}+${b}=${s}`};},
  ()=>{const s=Math.floor(Math.random()*7)+2,a=Math.floor(Math.random()*(s-1))+1,b=s-a;return{q:`${s} - ${a} = ?`,choices:[String(b),String(b+1),String(b-1<0?8:b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${s}-${a}=${b}`};},
  ()=>{const a=Math.floor(Math.random()*4)+1,b=Math.floor(Math.random()*4)+1,s=a+b;if(s>9)return g1_1_3[0]();return{q:`사과 ${a}개와 배 ${b}개를 더하면?`,choices:[String(s),String(s+1),String(s-1<0?9:s-1),String(s===9?1:s+2)].sort(()=>Math.random()-0.5),ans:String(s),explain:`${a}+${b}=${s}개`};},
  ()=>{const s=Math.floor(Math.random()*6)+3,a=Math.floor(Math.random()*(s-1))+1,b=s-a;return{q:`풍선이 ${s}개 있었는데 ${a}개가 터졌어요.\n남은 풍선은?`,choices:[String(b),String(b+1),String(b-1<0?8:b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${s}-${a}=${b}개`};},
  ()=>{const b=Math.floor(Math.random()*4)+1,s=Math.floor(Math.random()*4)+b+1;if(s>9)return g1_1_3[4]();const a=s-b;return{q:`□ + ${b} = ${s}\n□에 알맞은 수는?`,choices:[String(a),String(a+1),String(a-1<0?8:a-1),String(a+2)].sort(()=>Math.random()-0.5),ans:String(a),explain:`${s}-${b}=${a}`};},
  ()=>{const a=Math.floor(Math.random()*4)+1,s=Math.floor(Math.random()*5)+a;if(s>9)return g1_1_3[5]();const b=s-a;return{q:`${s} - □ = ${a}\n□에 알맞은 수는?`,choices:[String(b),String(b+1),String(b-1<0?8:b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${s}-${a}=${b}`};},
];
// 4단원: 비교하기
const g1_1_4=[
  ()=>{const a=Math.floor(Math.random()*15)+5,b=Math.floor(Math.random()*15)+5;return{q:`연필 ${a}cm와 지우개 ${b}cm 중\n더 긴 것은?`,choices:["연필","지우개"],ans:a>b?"연필":"지우개",explain:`${Math.max(a,b)}cm가 더 길어요.`};},
  ()=>{const a=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*8)+2;return{q:`무게 ${a}kg와 ${b}kg 중\n더 무거운 것은?`,choices:[`${a}kg`,`${b}kg`],ans:`${Math.max(a,b)}kg`,explain:`${Math.max(a,b)}kg이 더 무거워요.`};},
  ()=>({q:`어느 것이 더 넓은가요?`,choices:["교실 바닥","책상 위","공책 위","지우개 위"].sort(()=>Math.random()-0.5),ans:"교실 바닥",explain:`교실 바닥이 가장 넓어요.`}),
  ()=>({q:`어느 컵에 물이 더 많이 들어가나요?`,choices:["큰 컵","작은 컵"],ans:"큰 컵",explain:`큰 컵에 물이 더 많이 들어가요.`}),
  ()=>{const a=Math.floor(Math.random()*9)+1,b=Math.floor(Math.random()*9)+1;if(a===b)return g1_1_4[4]();return{q:`${a}와 ${b} 중 더 무거운 쪽은?\n(큰 수가 더 무겁다고 가정)`,choices:[String(a),String(b)],ans:String(Math.max(a,b)),explain:`${Math.max(a,b)}이 더 커서 더 무거워요.`};},
  ()=>({q:`가장 짧은 것은?`,choices:["개미","지렁이","연필","자"].sort(()=>Math.random()-0.5),ans:"개미",explain:`개미가 가장 짧(작)아요.`}),
];
// 5단원: 50까지의 수
const g1_1_5=[
  ()=>{const n=Math.floor(Math.random()*40)+11;return{q:`${n}은 10묶음이 몇 개이고\n낱개가 몇 개인가요?`,choices:[`${Math.floor(n/10)}묶음 ${n%10}개`,`${Math.floor(n/10)+1}묶음 ${n%10}개`,`${Math.floor(n/10)}묶음 ${n%10+1}개`,`${Math.floor(n/10)-1}묶음 ${n%10}개`].sort(()=>Math.random()-0.5),ans:`${Math.floor(n/10)}묶음 ${n%10}개`,explain:`${n}=10이 ${Math.floor(n/10)}묶음, 낱개 ${n%10}개`};},
  ()=>{const n=Math.floor(Math.random()*40)+11;return{q:`${n}보다 1 큰 수는?`,choices:[String(n+1),String(n),String(n+2),String(n-1)].sort(()=>Math.random()-0.5),ans:String(n+1),explain:`${n}+1=${n+1}`};},
  ()=>{const a=Math.floor(Math.random()*40)+11,b=Math.floor(Math.random()*40)+11;return{q:`${a}와 ${b} 중 더 큰 수는?`,choices:[String(a),String(b)],ans:String(Math.max(a,b)),explain:`${Math.max(a,b)}이 더 커요.`};},
  ()=>{const tens=Math.floor(Math.random()*4)+1;return{q:`10씩 ${tens}묶음은 얼마인가요?`,choices:[String(tens*10),String(tens*10+10),String(tens*10-10),String(tens*10+1)].sort(()=>Math.random()-0.5),ans:String(tens*10),explain:`10×${tens}=${tens*10}이에요.`};},
  ()=>{const n=Math.floor(Math.random()*39)+11;return{q:`${n}, ${n+1}, ${n+2}, □, ${n+4}\n□에 알맞은 수는?`,choices:[String(n+3),String(n+4),String(n+2),String(n+5)].sort(()=>Math.random()-0.5),ans:String(n+3),explain:`1씩 커지는 규칙이에요. ${n+2}+1=${n+3}`};},
  ()=>{const n=Math.floor(Math.random()*38)+12;return{q:`${n}보다 1 작은 수는?`,choices:[String(n-1),String(n),String(n+1),String(n-2)].sort(()=>Math.random()-0.5),ans:String(n-1),explain:`${n}-1=${n-1}`};},
];

/* ── 2학기 문제 ── */
// 1단원: 100까지의 수
const g1_2_1=[
  ()=>{const n=Math.floor(Math.random()*50)+51;return{q:`${n}은 10묶음이 몇 개이고\n낱개가 몇 개인가요?`,choices:[`${Math.floor(n/10)}묶음 ${n%10}개`,`${Math.floor(n/10)+1}묶음 ${n%10}개`,`${Math.floor(n/10)}묶음 ${n%10+1}개`,`${Math.floor(n/10)-1}묶음 ${n%10}개`].sort(()=>Math.random()-0.5),ans:`${Math.floor(n/10)}묶음 ${n%10}개`,explain:`${n}=10이 ${Math.floor(n/10)}묶음, 낱개 ${n%10}개`};},
  ()=>{const a=Math.floor(Math.random()*49)+51,b=Math.floor(Math.random()*49)+51;return{q:`${a}와 ${b} 중 더 큰 수는?`,choices:[String(a),String(b)],ans:String(Math.max(a,b)),explain:`${Math.max(a,b)}이 더 커요.`};},
  ()=>({q:`99보다 1 큰 수는?`,choices:["100","98","101","99"].sort(()=>Math.random()-0.5),ans:"100",explain:`99+1=100이에요.`}),
  ()=>{const n=Math.floor(Math.random()*48)+52;return{q:`${n}보다 1 작은 수는?`,choices:[String(n-1),String(n),String(n+1),String(n-2)].sort(()=>Math.random()-0.5),ans:String(n-1),explain:`${n}-1=${n-1}`};},
  ()=>{const tens=Math.floor(Math.random()*9)+1;return{q:`10씩 ${tens}묶음은?`,choices:[String(tens*10),String(tens*10+10),String(tens*10-10),String(tens*10+1)].sort(()=>Math.random()-0.5),ans:String(tens*10),explain:`10×${tens}=${tens*10}`};},
  ()=>{const n=Math.floor(Math.random()*8)*10+10;return{q:`${n}, ${n+10}, ${n+20}, □, ${n+40}\n□에 알맞은 수는?`,choices:[String(n+30),String(n+40),String(n+20),String(n+50)].sort(()=>Math.random()-0.5),ans:String(n+30),explain:`10씩 커지는 규칙. ${n+20}+10=${n+30}`};},
];
// 2단원: 덧셈과 뺄셈(1) — 받아올림 없는 두 자리
const g1_2_2=[
  ()=>{const a=Math.floor(Math.random()*40)+10,b=Math.floor(Math.random()*9)+1;const s=a+b;if(s>99)return g1_2_2[0]();return{q:`${a} + ${b} = ?`,choices:[String(s),String(s+1),String(s-1),String(s+10)].sort(()=>Math.random()-0.5),ans:String(s),explain:`${a}+${b}=${s}`};},
  ()=>{const a=Math.floor(Math.random()*50)+20,b=Math.floor(Math.random()*19)+1;const d=a-b;if(d<10)return g1_2_2[1]();return{q:`${a} - ${b} = ?`,choices:[String(d),String(d+1),String(d-1),String(d+10)].sort(()=>Math.random()-0.5),ans:String(d),explain:`${a}-${b}=${d}`};},
  ()=>{const a=Math.floor(Math.random()*3)+1,b=Math.floor(Math.random()*3)+1;return{q:`${a}0 + ${b}0 = ?`,choices:[String((a+b)*10),String((a+b)*10+10),String((a+b)*10-10),String((a+b+1)*10)].sort(()=>Math.random()-0.5),ans:String((a+b)*10),explain:`${a*10}+${b*10}=${(a+b)*10}`};},
  ()=>{const b=Math.floor(Math.random()*9)+1,s=Math.floor(Math.random()*40)+20,a=s-b;if(a<10)return g1_2_2[3]();return{q:`□ + ${b} = ${s}\n□에 알맞은 수는?`,choices:[String(a),String(a+1),String(a-1),String(a+10)].sort(()=>Math.random()-0.5),ans:String(a),explain:`${s}-${b}=${a}`};},
];
// 3단원: 여러 가지 모양(2학기)
const g1_2_3=[
  ()=>({q:`□ 모양(직사각형)의 특징은?`,choices:["네 꼭짓점이 있다","꼭짓점이 없다","굴러간다","면이 없다"].sort(()=>Math.random()-0.5),ans:"네 꼭짓점이 있다",explain:`직사각형은 꼭짓점이 4개 있어요.`}),
  ()=>({q:`△ 모양(삼각형)의 꼭짓점은 몇 개?`,choices:["3개","4개","2개","5개"].sort(()=>Math.random()-0.5),ans:"3개",explain:`삼각형의 꼭짓점은 3개예요.`}),
  ()=>({q:`○ 모양(원)의 특징은?`,choices:["꼭짓점이 없다","꼭짓점이 4개","직선이 있다","각이 있다"].sort(()=>Math.random()-0.5),ans:"꼭짓점이 없다",explain:`원은 꼭짓점이 없어요.`}),
  ()=>({q:`□ 모양을 본뜰 수 있는 물건은?`,choices:["상자 면","공","연필 옆면","돌"].sort(()=>Math.random()-0.5),ans:"상자 면",explain:`상자의 면을 본뜨면 □(직사각형)이 나와요.`}),
  ()=>({q:`○ 모양을 본뜰 수 있는 물건은?`,choices:["동전","상자","책","자"].sort(()=>Math.random()-0.5),ans:"동전",explain:`동전을 본뜨면 ○(원)이 나와요.`}),
  ()=>({q:`꼭짓점이 4개인 도형은?`,choices:["□ 모양","△ 모양","○ 모양","없다"].sort(()=>Math.random()-0.5),ans:"□ 모양",explain:`□(직사각형)의 꼭짓점은 4개예요.`}),
];
// 4단원: 시계 보기
const g1_2_4=[
  ()=>{const h=Math.floor(Math.random()*12)+1;return{q:`짧은 바늘이 ${h}를 가리키고\n긴 바늘이 12를 가리키면?`,choices:[`${h}시`,`${h+1>12?1:h+1}시`,`${h-1<1?12:h-1}시`,`${h}시 30분`].sort(()=>Math.random()-0.5),ans:`${h}시`,explain:`긴 바늘이 12이면 정각. ${h}시예요.`};},
  ()=>{const h=Math.floor(Math.random()*12)+1;return{q:`짧은 바늘이 ${h}와 ${h+1>12?1:h+1} 사이,\n긴 바늘이 6을 가리키면?`,choices:[`${h}시 30분`,`${h}시`,`${h+1>12?1:h+1}시`,`${h}시 15분`].sort(()=>Math.random()-0.5),ans:`${h}시 30분`,explain:`긴 바늘이 6이면 30분. ${h}시 30분이에요.`};},
  ()=>({q:`긴 바늘이 12를 가리키면\n몇 분인가요?`,choices:["0분(정각)","30분","15분","45분"].sort(()=>Math.random()-0.5),ans:"0분(정각)",explain:`긴 바늘이 12이면 0분(정각)이에요.`}),
  ()=>({q:`긴 바늘이 6을 가리키면\n몇 분인가요?`,choices:["30분","0분","15분","45분"].sort(()=>Math.random()-0.5),ans:"30분",explain:`긴 바늘이 6이면 30분이에요.`}),
  ()=>{const h=Math.floor(Math.random()*11)+1;return{q:`지금 ${h}시예요.\n1시간 후는 몇 시인가요?`,choices:[`${h+1}시`,`${h}시`,`${h+2}시`,`${h-1<1?12:h-1}시`].sort(()=>Math.random()-0.5),ans:`${h+1}시`,explain:`${h}시+1시간=${h+1}시예요.`};},
  ()=>({q:`하루는 몇 시간인가요?`,choices:["24시간","12시간","60시간","48시간"].sort(()=>Math.random()-0.5),ans:"24시간",explain:`하루는 24시간이에요.`}),
];
// 5단원: 덧셈과 뺄셈(2)
const g1_2_5=[
  ()=>{const a=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*8)+2,s=a+b;return{q:`${a} + ${b} = ?\n(10이 넘는 덧셈)`,choices:[String(s),String(s+1),String(s-1),String(s+10)].sort(()=>Math.random()-0.5),ans:String(s),explain:`${a}+${b}=${s}`};},
  ()=>{const s=Math.floor(Math.random()*8)+12,a=Math.floor(Math.random()*8)+2,b=s-a;if(b<2||b>9)return g1_2_5[1]();return{q:`${s} - ${a} = ?`,choices:[String(b),String(b+1),String(b-1<0?9:b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`${s}-${a}=${b}`};},
  ()=>{const a=Math.floor(Math.random()*5)+5,b=10-a;return{q:`${a} + □ = 10\n□에 알맞은 수는?`,choices:[String(b),String(b+1),String(b-1<0?9:b-1),String(b+2)].sort(()=>Math.random()-0.5),ans:String(b),explain:`10-${a}=${b}`};},
  ()=>{const a=Math.floor(Math.random()*8)+2,b=Math.floor(Math.random()*8)+2,s=a+b;return{q:`달걀 ${a}개와 ${b}개를 합치면?`,choices:[String(s),String(s+1),String(s-1),String(s+2)].sort(()=>Math.random()-0.5),ans:String(s),explain:`${a}+${b}=${s}개`};},
];
// 6단원: 규칙 찾기
const g1_2_6=[
  ()=>{const s=Math.floor(Math.random()*5)+1,seq=[s,s+1,s+2,0,s+4],ans=s+3;return{q:`규칙을 찾아 □에 알맞은 수는?\n${seq[0]}, ${seq[1]}, ${seq[2]}, □, ${seq[4]}`,choices:[String(ans),String(ans+1),String(ans-1),String(ans+2)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`1씩 커지는 규칙. ${s+2}+1=${ans}`};},
  ()=>{const pats=[["🔴","🔵"],["⭐","🌙"],["🐶","🐱"]],pat=pats[Math.floor(Math.random()*pats.length)],len=5,seq=Array.from({length:len},(_,i)=>pat[i%pat.length]),ans=seq[len-1];return{q:`규칙을 찾아 ?에 알맞은 것은?\n${seq.slice(0,-1).join(" ")} ?`,choices:[...new Set([ans,...pat])].sort(()=>Math.random()-0.5).slice(0,4),ans,explain:`${pat.join(",")} 패턴이 반복돼요. ?=${ans}`};},
  ()=>{const s=Math.floor(Math.random()*3)*2+2,seq=[s,s+2,s+4,0,s+8],ans=s+6;return{q:`규칙을 찾아 □에 알맞은 수는?\n${seq[0]}, ${seq[1]}, ${seq[2]}, □, ${seq[4]}`,choices:[String(ans),String(ans+2),String(ans-2),String(ans+4)].sort(()=>Math.random()-0.5),ans:String(ans),explain:`2씩 커지는 규칙. ${s+4}+2=${ans}`};},
  ()=>({q:`1, 3, 5, 7, □\n□에 알맞은 수는?`,choices:["9","8","10","6"].sort(()=>Math.random()-0.5),ans:"9",explain:`2씩 커지는 규칙. 7+2=9`}),
  ()=>({q:`10, 9, 8, 7, □\n□에 알맞은 수는?`,choices:["6","5","7","8"].sort(()=>Math.random()-0.5),ans:"6",explain:`1씩 작아지는 규칙. 7-1=6`}),
  ()=>{const n=Math.floor(Math.random()*5)+1;return{q:`${n}, ${n+2}, ${n+4}, □\n□에 알맞은 수는?`,choices:[String(n+6),String(n+5),String(n+7),String(n+8)].sort(()=>Math.random()-0.5),ans:String(n+6),explain:`2씩 커지는 규칙. ${n+4}+2=${n+6}`};},
];

const SDATA1={
  1:{title:"1학기",emoji:"🌱",bg:"linear-gradient(135deg,#FFF3E0,#FFF9E6)",border:"#FFD08A",units:[
    {id:1,title:"9까지의 수",    emoji:"🔢",color:"#FF9F43",light:"#FFF3E0",border:"#FFD08A",gens:g1_1_1},
    {id:2,title:"여러 가지 모양",emoji:"🔷",color:"#48DBFB",light:"#E0F7FA",border:"#80DEEA",gens:g1_1_2},
    {id:3,title:"덧셈과 뺄셈",  emoji:"➕",color:"#FF6B81",light:"#FCE4EC",border:"#F48FB1",gens:g1_1_3},
    {id:4,title:"비교하기",      emoji:"⚖️",color:"#A29BFE",light:"#EDE7F6",border:"#CE93D8",gens:g1_1_4},
    {id:5,title:"50까지의 수",   emoji:"🔢",color:"#55EFC4",light:"#E0F2F1",border:"#80CBC4",gens:g1_1_5},
  ]},
  2:{title:"2학기",emoji:"🍂",bg:"linear-gradient(135deg,#EDE7F6,#E8EAF6)",border:"#B39DDB",units:[
    {id:1,title:"100까지의 수",    emoji:"💯",color:"#5F27CD",light:"#EDE7F6",border:"#B39DDB",gens:g1_2_1},
    {id:2,title:"덧셈과 뺄셈(1)", emoji:"➕",color:"#00B894",light:"#E0F2F1",border:"#80CBC4",gens:g1_2_2},
    {id:3,title:"여러 가지 모양", emoji:"🔷",color:"#0984E3",light:"#E3F2FD",border:"#90CAF9",gens:g1_2_3},
    {id:4,title:"시계 보기",       emoji:"🕐",color:"#E17055",light:"#FBE9E7",border:"#FFCCBC",gens:g1_2_4},
    {id:5,title:"덧셈과 뺄셈(2)", emoji:"➕",color:"#6C5CE7",light:"#EDE7F6",border:"#CE93D8",gens:g1_2_5},
    {id:6,title:"규칙 찾기",       emoji:"🔍",color:"#00CEC9",light:"#E0F7FA",border:"#80DEEA",gens:g1_2_6},
  ]},
};

function QuizScreen1({semester,unitId,onBack,onStar}){
  const unit=SDATA1[semester].units.find(u=>u.id===unitId);
  const [questions]=useState(()=>makeQ(unit.gens));
  const [qIdx,setQIdx]=useState(0);const[selected,setSelected]=useState(null);const[status,setStatus]=useState(null);const[showHint,setShowHint]=useState(false);const[shake,setShake]=useState(false);const[combo,setCombo]=useState(0);const[showCombo,setShowCombo]=useState(false);const[confetti,setConfetti]=useState(false);const[score,setScore]=useState(0);const[done,setDone]=useState(false);
  const q=questions[qIdx],prog=(qIdx/20)*100;
  function pick(c){if(status)return;setSelected(c);if(c===q.ans){setStatus("correct");setConfetti(true);setTimeout(()=>setConfetti(false),1800);const nc=combo+1;setCombo(nc);setScore(s=>s+1);if(nc>=3){setShowCombo(true);setTimeout(()=>setShowCombo(false),1600);}}else{setStatus("wrong");setShake(true);setShowHint(true);setCombo(0);setTimeout(()=>setShake(false),600);}}
  function next(){if(qIdx+1>=20){const fs=score+(status==="correct"?1:0);onStar(`${semester}-${unitId}`,fs>=18?3:fs>=12?2:1);setDone(true);}else{setQIdx(i=>i+1);setSelected(null);setStatus(null);setShowHint(false);}}
  if(done){const fs=score;return(<div style={{textAlign:"center",padding:"20px 0"}}>{confetti&&<Confetti/>}<div style={{fontSize:72,marginBottom:12}}>{fs>=18?"🏆":fs>=12?"🥈":"🎯"}</div><div style={{fontSize:24,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{unit.title} 완료!</div><div style={{fontSize:16,color:"#636E72",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>20문제 중 {fs}개 정답</div><div style={{fontSize:28,marginBottom:20}}>{Array.from({length:3},(_,i)=><span key={i} style={{opacity:i<(fs>=18?3:fs>=12?2:1)?1:0.25}}>⭐</span>)}</div><button onClick={onBack} style={btn(unit.color)}>단원 목록으로</button></div>);}
  return(<div>{confetti&&<Confetti/>}{showCombo&&(<div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"white",borderRadius:24,padding:"20px 36px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)",textAlign:"center",zIndex:999,animation:"popIn 0.4s ease"}}><div style={{fontSize:48}}>🔥</div><div style={{fontSize:22,fontWeight:900,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{combo}연속 정답!</div></div>)}<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:800,color:unit.color,fontFamily:"'Nunito',sans-serif"}}>{unit.emoji} {unit.title} · {qIdx+1}/20</span>{combo>=3&&<span style={{background:unit.color,color:"white",fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:99}}>🔥{combo}연속</span>}</div><div style={{height:10,background:"#F0F0F0",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${prog}%`,background:`linear-gradient(90deg,${unit.color},${unit.border})`,transition:"width 0.4s ease",borderRadius:99}}/></div></div><span style={{fontSize:12,fontWeight:800,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>✅{score}</span></div><div style={{background:unit.light,border:`2px solid ${unit.border}`,borderRadius:24,padding:"16px 14px",marginBottom:12,animation:shake?"shake 0.5s":"none",textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#2D3436",fontFamily:"'Nunito',sans-serif",lineHeight:1.7,whiteSpace:"pre-line"}}>{q.q}</div></div><div style={{display:"grid",gridTemplateColumns:q.choices.length===2?"1fr 1fr":"1fr 1fr",gap:8,marginBottom:10}}>{q.choices.map((c,i)=>{let bg="#fff",border="2px solid #E0E0E0",col="#2D3436";if(selected===c){if(status==="correct"){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}else{bg="#FFEBEE";border="2px solid #EF9A9A";col="#C62828";}}if(status&&c===q.ans&&selected!==c){bg="#E8F5E9";border="2px solid #66BB6A";col="#2E7D32";}return(<button key={i} onClick={()=>pick(c)} style={{padding:"14px 6px",borderRadius:14,background:bg,border,color:col,fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:status?"default":"pointer",transition:"transform 0.12s"}} onMouseEnter={e=>{if(!status)e.currentTarget.style.transform="scale(1.03)";}} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{c}</button>);})}</div>{showHint&&status==="wrong"&&(<div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:14,padding:"10px 12px",marginBottom:10}}><div style={{fontSize:11,fontWeight:800,color:"#E17055",fontFamily:"'Nunito',sans-serif",marginBottom:3}}>💡 이렇게 생각해봐요!</div><div style={{fontSize:12,color:"#636E72",fontFamily:"'Nunito',sans-serif",lineHeight:1.6}}>{q.explain}</div></div>)}{status==="correct"&&(<div style={{background:"#E8F5E9",border:"2px solid #A5D6A7",borderRadius:14,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>🎉</span><div><div style={{fontSize:14,fontWeight:900,color:"#2E7D32",fontFamily:"'Nunito',sans-serif"}}>정답이에요!</div><div style={{fontSize:11,color:"#66BB6A",fontFamily:"'Nunito',sans-serif"}}>{q.explain}</div></div></div>)}{status==="correct"&&<button onClick={next} style={btn(unit.color)}>{qIdx+1>=20?"결과 보기 🏆":"다음 문제 →"}</button>}{status==="wrong"&&<button onClick={()=>{setSelected(null);setStatus(null);setShowHint(false);}} style={btn("#EF9A9A","#C62828")}>다시 풀기 🔄</button>}</div>);}

function SemesterSelect1({sc,onSelect}){return(<div style={{textAlign:"center",padding:"8px 0"}}><div style={{fontSize:52,marginBottom:8}}>🎒</div><h1 style={{margin:0,fontSize:24,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>1학년 수학</h1><p style={{margin:"6px 0 24px",color:"#B2BEC3",fontSize:13,fontFamily:"'Nunito',sans-serif"}}>학기를 선택해서 공부해보세요!</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>{[1,2].map(sem=>{const sd=SDATA1[sem],s=sc[sem]||0;return(<button key={sem} onClick={()=>onSelect(sem)} style={{background:sd.bg,border:`3px solid ${sd.border}`,borderRadius:24,padding:"24px 16px",cursor:"pointer",transition:"transform 0.15s",boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><div style={{fontSize:40,marginBottom:6}}>{sd.emoji}</div><div style={{fontSize:16,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif",marginBottom:4}}>{sd.title}</div><div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif",marginBottom:10}}>{sem===1?"5단원":"6단원"} · 각 20문제</div><div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginBottom:4}}>{Array.from({length:sem===1?15:18},(_,j)=><span key={j} style={{fontSize:11,opacity:j<s?1:0.18}}>⭐</span>)}</div><div style={{fontSize:11,color:"#888",fontFamily:"'Nunito',sans-serif"}}>{s}/{sem===1?15:18} ⭐</div></button>);})}</div></div>);}

function UnitSelect1({semester,stars,onSelect,onBack}){const sd=SDATA1[semester];return(<div style={{padding:"0 4px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#B2BEC3"}}>←</button><div><div style={{fontSize:11,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>1학년 수학</div><div style={{fontSize:18,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{sd.emoji} {sd.title}</div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{sd.units.map((u,i)=>(<button key={u.id} onClick={()=>onSelect(u.id)} style={{background:u.light,border:`2.5px solid ${u.border}`,borderRadius:20,padding:"14px 12px",cursor:"pointer",textAlign:"left",boxShadow:"0 3px 12px rgba(0,0,0,0.06)",animation:`slideUp 0.4s ${i*0.07}s both`,transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><div style={{fontSize:24,marginBottom:4}}>{u.emoji}</div><div style={{fontSize:12,fontWeight:900,color:"#2D3436",fontFamily:"'Nunito',sans-serif"}}>{u.id}단원</div><div style={{fontSize:11,fontWeight:700,color:u.color,fontFamily:"'Nunito',sans-serif"}}>{u.title}</div><div style={{marginTop:6,display:"flex",gap:1}}>{Array.from({length:3},(_,j)=><span key={j} style={{fontSize:12,opacity:j<(stars[`${semester}-${u.id}`]||0)?1:0.2}}>⭐</span>)}</div><div style={{marginTop:2,fontSize:10,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>20문제</div></button>))}</div></div>);}

export default function App1({onBack}){
  const [screen,setScreen]=useState("semester");const [activeSem,setActiveSem]=useState(null);const [activeUnit,setActiveUnit]=useState(null);const [stars,setStars]=useState({});
  const sc={1:SDATA1[1].units.reduce((s,u)=>s+(stars[`1-${u.id}`]||0),0),2:SDATA1[2].units.reduce((s,u)=>s+(stars[`2-${u.id}`]||0),0)};
  return(<div style={{minHeight:"100vh",background:"linear-gradient(160deg,#F8F9FA 0%,#EEF2FF 100%)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:20,boxSizing:"border-box"}}><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet"/><div style={{background:"white",borderRadius:32,padding:"24px 20px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.08)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:"2px dashed #F0F0F0"}}><div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#B2BEC3",padding:0}}>←</button><span style={{fontSize:13,fontWeight:800,color:"#B2BEC3",fontFamily:"'Nunito',sans-serif"}}>초등 1학년</span></div><div style={{background:"#FFF9E6",border:"2px solid #FDCB6E",borderRadius:99,padding:"4px 14px",fontSize:13,fontWeight:900,color:"#FF9F43",fontFamily:"'Nunito',sans-serif"}}>⭐ {sc[1]+sc[2]}</div></div>{screen==="semester"&&<SemesterSelect1 sc={sc} onSelect={sem=>{setActiveSem(sem);setScreen("units");}}/>}{screen==="units"&&activeSem&&<UnitSelect1 semester={activeSem} stars={stars} onSelect={uid=>{setActiveUnit(uid);setScreen("quiz");}} onBack={()=>setScreen("semester")}/>}{screen==="quiz"&&activeSem&&activeUnit&&<QuizScreen1 semester={activeSem} unitId={activeUnit} onBack={()=>setScreen("units")} onStar={(key,s)=>setStars(p=>({...p,[key]:Math.max(p[key]||0,s)}))}/>}</div><style>{`@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}@keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}30%{transform:translateX(8px)}45%{transform:translateX(-6px)}60%{transform:translateX(6px)}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes popIn{0%{transform:translate(-50%,-50%) scale(0.4);opacity:0}60%{transform:translate(-50%,-50%) scale(1.1)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}body{margin:0;font-family:'Nunito',sans-serif;}`}</style></div>);
}
