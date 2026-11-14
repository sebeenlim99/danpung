import "./style.css";
import { createClient } from "@supabase/supabase-js";
import { OIF, CSF, TITLE } from "./glyphs.js";

/* Supabase 연결 (주소와 공개 키는 원래 공개돼도 되는 값이에요) */
const SB_URL = import.meta.env.VITE_SUPABASE_URL || "https://veyvcbbruyursvhhdfmc.supabase.co";
const SB_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_E5FTnElbDQ0EWXkPEkxR0Q_G-aeM4ER";
const sb = createClient(SB_URL, SB_KEY, { auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true } });


const C={paper:"#F5CDB0",paper2:"#F1B48E",verm:"#EF4A23",verm2:"#C7381A",orange:"#F7931E",rust:"#B5482E",ink:"#3A2318",line:"#8A4B2F",cream:"#F4EDE1",grey:"#7D8C78"};
const MONO='"Leaf Drafting",monospace',HEAD='"Leaf Hwaljjak",sans-serif',SERIF='"Noto Serif KR",serif';
const BYE=["내일은 어떤 잎이 떨어져 있을까요?","내일도 한 잎 모으러 오세요."];
const SPECIES=["벚나무","은행나무","단풍나무","당단풍나무","복자기","느티나무","참나무","플라타너스","감나무","화살나무","담쟁이","메타세쿼이아","모름"];
const crispWord=v=>v>=100?"완벽한 바삭":v>=80?"아주 바삭":v>=60?"바삭":v>=40?"살짝 바삭":v>=20?"촉촉":"눅눅";
const crispText=o=>o.crisp!=null?`${o.crisp}점 ${crispWord(o.crisp)}`:(o.state||"");

const TRAD=[
 {g:"붉은 계열",n:"주",h:"朱",hex:"#C8372D",d:"예전부터 인주, 단청, 부적 글씨 등에 두루 쓰이던 색이에요. 주사라는 붉은 돌을 곱게 갈아 만들었어요. 수은이 들어 있어 독성이 있기 때문에 지금은 대부분 합성 안료로 대체해 사용합니다."},
 {g:"붉은 계열",n:"다홍",h:"大紅",hex:"#E33B2E",d:"'같은 값이면 다홍치마'라는 속담처럼, 혼례 같은 경사스러운 자리에 어울리는 다홍색이에요. '대홍'이 소리나는 대로 바뀐 말로, 잇꽃(홍화) 물을 거듭 들여야 나오는 색이라 귀히 여겨졌어요."},
 {g:"붉은 계열",n:"적",h:"赤",hex:"#B23A33",d:"오방색에서 적색은 남쪽, 여름, 불을 의미하는 색상이에요. 붉은색은 나쁜 기운을 쫓는다는 믿음으로 인해 동짓날 팥죽을 쑤어 먹고 이 색을 문에 뿌리기도 했어요."},
 {g:"붉은 계열",n:"연지",h:"臙脂",hex:"#A3203E",d:"연지 곤지 할 때 연지예요. 잇꽃(홍화) 꽃잎에서 붉은 색소를 뽑아 만든 짙은 붉은색입니다. 다홍색보다 조금 더 붉은 빛으로, 잇꽃에서 노란 물을 좀 더 빼내야 얻을 수 있던 색이에요."},
 {g:"붉은 계열",n:"홍",h:"紅",hex:"#D44A55",d:"제사상의 붉은 과일은 동쪽, 흰 과일은 서쪽에 놓는다는 홍동백서(紅東白西)의 홍색이에요. 잇꽃으로 물들인 붉은색을 통틀어 이르는 이름으로, 한 번 물들이면 분홍, 여러 번 거듭 물들일수록 담홍, 진홍 등의 색이름이 붙어요."},
 {g:"붉은 계열",n:"홍매",h:"紅梅",hex:"#D7707E",d:"붉은 꽃의 매화, 홍매화의 꽃잎 색이에요. 이른 봄 추위 속에서 가장 먼저 피는 매화는 절개의 상징이기도 합니다. 백매와 함께 옛 그림에 자주 나오는데, 화려하고 화사한 분위기를 낼 때 홍매를 그렸어요."},
 {g:"붉은 계열",n:"분홍",h:"粉紅",hex:"#E8A0A4",d:"'분(粉)'은 흰 가루, 곧 화장용 흰 분이나 흰 안료를 뜻해요. 흰 가루에 붉은색을 섞은 색이라는 뜻에서 분홍이라는 이름이 붙었습니다. 실제 동양화에서도 호분에 연지나 주를 섞어 분홍을 만들어요."},
 {g:"붉은 계열",n:"담주",h:"淡朱",hex:"#E5937A",d:"'담(淡)'은 물을 타 연하게 만들었다는 의미로, 담주는 주를 연하게 만든 색이에요. 꽃잎 끝이나 볼처럼 은은한 붉은 기를 낼 때 많이 써요. 담묵, 담채의 담도 같은 담이에요."},
 {g:"붉은 계열",n:"주홍",h:"朱紅",hex:"#E25C2B",d:"주에 노란 기가 더해져 주황에 가까운 붉은색을 뜻해요. 단청이나 옛 공예품에서 볼 수 있는 밝고 따뜻한 빨강이에요. 잘 익은 감 껍질이나 단풍잎 끝이 이 색에 가까워요."},
 {g:"붉은 계열",n:"장단",h:"長丹",hex:"#E2702F",d:"단청에서 쓰는 주황빛 안료의 이름이에요. 단청은 몇 가지 정해진 안료로만 칠할 수 있는데, 장단색은 그 중 따듯한 주황을 칠할 때 사용합니다. 납을 가공해 만든 연단(鉛丹) 계열의 안료로, 단청 문양의 띠나 꽃잎 부분에서 자주 볼 수 있어요."},
 {g:"붉은 계열",n:"석간주",h:"石間硃",hex:"#8E3B2A",d:"궁궐이나 절의 기둥과 창틀을 칠한 검붉은 색이 대부분 이 석간주 색이에요. 이름 그대로 '돌 사이에서 나는 붉은 흙'을 곱게 걸러 안료로 사용합니다. 값이 싸고 햇빛에 잘 바래지 않아 넓은 면을 칠할 때 주로 사용했어요."},
 {g:"붉은 계열",n:"대자",h:"代赭",hex:"#9B5534",d:"동양화에서 바위, 흙, 나무줄기, 사람 피부 밑색으로 많이 사용해요. 순하고 물에 잘 녹아서 수묵담채에도 자주 쓰여요. 중국 대주(代州) 지방에서 나는 붉은 흙(赭)에서 유래했다고 해요."},
 {g:"노란 계열",n:"황",h:"黃",hex:"#EDB82E",d:"오방색에서 황은 가운데, 흙(土)을 맡은 색이에요. 동서남북의 한가운데라는 뜻 때문에 오랫동안 황제를 상징하는 색이었어요. 곡식이 익는 땅의 색이라 풍요를 의미하기도 해요."},
 {g:"노란 계열",n:"치자",h:"梔子",hex:"#F2B33D",d:"치자나무 열매를 물에 우려 얻는 노란 물감이에요. 옷감 염료로도, 음식의 색을 내는 데에도 쓰여요. 치자나무는 초여름에 하얀 꽃을 피우는데, 꽃 향이 아주 진해요."},
 {g:"노란 계열",n:"울금",h:"鬱金",hex:"#E19F2B",d:"생강과 식물인 울금의 뿌리줄기를 사용해 만든 안료예요. 카레의 노란색을 내는 강황과 비슷한 식물이에요. 옷감을 물들이면 주황빛이 살짝 도는 따듯한 노란색이에요."},
 {g:"노란 계열",n:"행색",h:"杏色",hex:"#F0B482",d:"살구(杏) 열매처럼 연한 주황빛이에요. 살구나무는 봄에 연분홍 꽃을 피우고, 여름에 노란 열매를 맺어요. 당나라 시인 두목의 시에 나오는 '행화촌(杏花村)'은 살구꽃 핀 술집 마을을 가리켜요."},
 {g:"노란 계열",n:"담황",h:"淡黃",hex:"#F2DA9C",d:"노랑을 물에 옅게 탄 듯한 연노랑색이에요. 봄 새순이나 볏짚처럼 부드러운 노랑을 그릴 때 써요. 은행잎이 다 떨어진 뒤 볕에 바래 가면 이런 색이 돼요."},
 {g:"노란 계열",n:"송화",h:"松花",hex:"#F0DD7C",d:"소나무 꽃가루, 송홧가루의 연노랑이에요. 봄이 되면 송홧가루가 날려서 장독대나 차 위가 노랗게 덮이곤 합니다. 이 가루를 꿀에 반죽해 틀에 찍어낸 과자가 송화다식이에요."},
 {g:"노란 계열",n:"등황",h:"藤黃",hex:"#E7A90F",d:"동남아시아 가르시니아 나무의 수지를 굳혀 만든 노란 안료예요. 동양화에서 맑고 투명한 노랑을 낼 때 쓰거나, 쪽빛과 섞어 풀색을 만들어 써요. 독성이 있어 붓을 입에 물지 않도록 주의해야 해요."},
 {g:"노란 계열",n:"황토",h:"黃土",hex:"#BE8848",d:"초가집 흙벽이나 온돌방 바닥 등, 생활 가까이에 늘 있었던 색이에요. 동양화에서는 황토를 물에 걸러 안료로 사용해요. 천을 물들이면 은은한 누런빛이 나요."},
 {g:"노란 계열",n:"향색",h:"香色",hex:"#C9A36E",d:"차분하고 따듯한 베이지에 가까워요. 향 재료를 달인 물로 물들인 옅은 누런빛으로, 바싹 마른 잎이 햇빛에 바래면 이런 색이에요."},
 {g:"노란 계열",n:"추향",h:"秋香",hex:"#B79A45",d:"'가을 향기'라는 이름을 가진 올리브빛으로, 중국 전통 색이름으로 널리 알려졌어요. 국화나 마른 풀잎처럼 가을 들판의 차분한 색이에요."},
 {g:"갈색 계열",n:"갈",h:"褐",hex:"#855632",d:"우리가 매일 쓰는 갈색이 바로 이 갈을 써요. 거친 털옷이나 베옷의 빛깔에서 나온 이름이에요. 칡 갈(葛)이 아니라 털옷 갈(褐) 자를 써요. '갈의(褐衣)'는 거친 옷, 곧 가난한 사람이 입는 옷을 뜻하기도 했어요."},
 {g:"갈색 계열",n:"다갈",h:"茶褐",hex:"#8C5E3C",d:"질그릇이나 오래된 나무 가구에서 자주 보이는 색으로, 가을 끝무렵 낙엽이 바싹 마르면 이런 색이 돼요. 진하게 우린 차(茶)의 빛깔과 같다고 해서 이런 이름이 붙었어요."},
 {g:"갈색 계열",n:"고동",h:"古銅",hex:"#664630",d:"오래된 구리, 고동(古銅)처럼 검붉은 갈색으로, 구리가 오랜 시간 공기와 만나 산화되면서 생기는 깊은 색이에요. 바다의 고둥과는 상관없는 이름이에요."},
 {g:"초록 계열",n:"유록",h:"柳綠",hex:"#8DAE4B",d:"봄 버들잎처럼 연두에 가까운 녹색이에요. 버드나무는 봄에 가장 먼저 잎을 피워 봄을 알리는 나무로 알려졌어요. 단풍이 들기 전 잎 가장자리에 남은 연두가 이 색에 가까워요."},
 {g:"초록 계열",n:"하엽",h:"荷葉",hex:"#4F7B4C",d:"단청에서 사용하는 짙은 초록이에요. 연잎(荷葉)은 물방울을 굴려 털어내어 진흙 속에서 깨끗함을 지키는 상징으로 여겨졌어요."},
 {g:"초록 계열",n:"뇌록",h:"磊綠",hex:"#5C8A6D",d:"단청에서 사용하는 푸른 기 도는 초록이에요. 서까래나 기둥 윗부분에 주로 사용해, 석간주와 함께 단청의 바탕을 이루는 색이에요. 경상북도 지역에서 나는 녹색 흙을 원료로 썼다고 알려져 있어요."},
 {g:"초록 계열",n:"석록",h:"石綠",hex:"#3F8D6B",d:"채색화 중 진채화에서 산과 바위를 칠할 때 주로 사용하는 색이에요. 공작석(말라카이트)을 곱게 갈아 만든 안료로, 구리가 포함되어 선명하고 묵직한 초록이 나와요. 입자의 굵기에 따라 색감이 달라져요."},
 {g:"보라 계열",n:"자",h:"紫",hex:"#6A3F70",d:"지치(자초) 뿌리에서 얻은 보라예요. 지치 뿌리는 겉이 짙은 보라색이라 '자초(紫草)'라고 부르기도 해요. 보라 물을 들이기가 어려워 귀한 색으로 여겨졌어요."},
 {g:"보라 계열",n:"자주",h:"紫朱",hex:"#7E2B4D",d:"자(紫)보다 붉은 기가 강한 짙은 붉은 보라예요. 저고리의 옷고름이나 댕기처럼 옛 옷의 포인트 색으로 많이 쓰였어요. 붉은 단풍잎이 다 마르기 직전 잎맥 주변에 이런 색이 돌기도 해요."},
 {g:"무채 계열",n:"먹",h:"墨",hex:"#2C2927",d:"소나무나 기름을 태운 그을음을 아교와 반죽해 굳힌 것이 먹이에요. 그을음의 종류에 따라 빛이 다르고, 같은 먹이라고 해도 물을 얼마나 타는지에 따라 수만 가지의 색을 만들어낼 수 있어요."},
 {g:"무채 계열",n:"회",h:"灰",hex:"#8F8B84",d:"재(灰)의 빛깔, 잿빛이에요. 기와지붕이나 오래된 돌담에서 쉽게 볼 수 있는 색으로, 먹을 물에 많이 타면 탈수록 이 색에 가까워져요."},
 {g:"무채 계열",n:"호분",h:"胡粉",hex:"#F1ECE0",d:"조개껍데기를 말려 곱게 빻아 만든 흰 안료예요. 동양화에서는 흰색 대부분을 호분으로 표현해요. 아교와 섞어 손가락으로 오래 개어야 고르게 발려요."}
];

/* ---------- 유틸 ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad3=n=>String(n).padStart(3,"0");
function todayKey(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
const dotDate=k=>k.replace(/-/g,".");
const shortDate=k=>{const p=k.split("-");return (+p[1])+"."+(+p[2])};
const mmdd=k=>{const p=k.split("-");return p[1]+"."+p[2]};
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove("on"),2400)}
function withTimeout(p,ms){return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error("timeout")),ms))])}
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* ---------- 윤곽선 글자 (오이냉체·조선100년체) ---------- */
const PCACHE=new Map();
function gpath(F,ch){const k=F===OIF?"o"+ch:"c"+ch;if(!PCACHE.has(k))PCACHE.set(k,new Path2D(F.g[ch][1]));return PCACHE.get(k)}
function gwidth(F,text,size,track){let w=0;for(const ch of text){const g=F.g[ch];w+=(g?g[0]:F.upm*.3)}return w*size/F.upm+(track||0)*Math.max(0,[...text].length-1)}
function gext(F,text){let lo=0,hi=0;for(const ch of text){const g=F.g[ch];if(g&&g[1]){lo=Math.min(lo,g[2]);hi=Math.max(hi,g[3])}}return{lo,hi}}
/* 글자 맨 아래가 bottom에 닿도록 크기·기준선 계산 */
function gfit(F,text,maxW,maxH,bottom){const e=gext(F,text),sz=Math.min(maxW/gwidth(F,text,1),maxH*F.upm/((e.hi-e.lo)||F.upm));return{sz,y:bottom+e.lo*sz/F.upm}}
/* 단풍잎 제목을 캔버스에: 가운데 X, 맨 아래 bottom */
let TP=null;
function drawTitle(x,X,bottom,maxW,maxH,fill){
  if(!TP)TP=[new Path2D(TITLE.text),new Path2D(TITLE.leaf)];
  const b=TITLE.bb,w=b[2]-b[0],h=b[3]-b[1],s=Math.min(maxW/w,maxH/h);
  x.save();x.translate(X-w*s/2-b[0]*s,bottom-b[3]*s);x.scale(s,s);x.fillStyle=fill;x.fill(TP[0]);x.fill(TP[1]);x.restore();
}
function gdraw(x,F,text,X,Y,size,align,fill,track){
  track=track||0;const s=size/F.upm,w=gwidth(F,text,size,track);let cx=align==="center"?X-w/2:align==="right"?X-w:X;x.fillStyle=fill;
  for(const ch of text){const g=F.g[ch];if(g){if(g[1]){x.save();x.translate(cx,Y);x.scale(s,s);x.fill(gpath(F,ch));x.restore()}cx+=g[0]*s+track}else cx+=F.upm*.3*s+track}
  return w;
}
function gsvg(F,text,fill,label){
  let x=0,p="";for(const ch of text){const g=F.g[ch];if(!g){x+=F.upm*.3;continue}if(g[1])p+=`<path transform="translate(${x} 0)" d="${g[1]}"/>`;x+=g[0]}
  const h=F.asc-F.desc;return`<svg viewBox="0 ${-F.asc} ${Math.max(1,x)} ${h}" fill="${fill}" role="img" aria-label="${esc(label||text)}" preserveAspectRatio="xMinYMid meet">${p}</svg>`;
}
function gsvgTight(F,text,fill){ /* 큰 제목: 글자 높이에 꼭 맞게 */
  let x=0,p="";for(const ch of text){const g=F.g[ch];if(!g){x+=F.upm*.3;continue}if(g[1])p+=`<path transform="translate(${x} 0)" d="${g[1]}"/>`;x+=g[0]}
  return`<svg viewBox="0 ${-F.upm*0.84} ${x} ${F.upm*0.96}" fill="${fill}" role="img" aria-label="${esc(text)}">${p}</svg>`;
}

/* ---------- 색 계산 ---------- */
const LIN=new Float32Array(256);for(let i=0;i<256;i++){const c=i/255;LIN[i]=c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)}
function fxyz(t){return t>0.008856?Math.cbrt(t):(7.787*t+16/116)}
function rgb2lab(r,g,b){const R=LIN[r],G=LIN[g],B=LIN[b];const x=fxyz((R*0.4124+G*0.3576+B*0.1805)/0.95047),y=fxyz(R*0.2126+G*0.7152+B*0.0722),z=fxyz((R*0.0193+G*0.1192+B*0.9505)/1.08883);return[116*y-16,500*(x-y),200*(y-z)]}
function lab2rgb(L,a,b){let y=(L+16)/116,x=a/500+y,z=y-b/200;const fi=t=>{const t3=t*t*t;return t3>0.008856?t3:(t-16/116)/7.787};x=fi(x)*0.95047;y=fi(y);z=fi(z)*1.08883;const R=x*3.2406-y*1.5372-z*0.4986,G=-x*0.9689+y*1.8758+z*0.0415,B=x*0.0557-y*0.2040+z*1.0570;const g=c=>{c=Math.max(0,c);return 255*(c<=0.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-0.055)};return[g(R),g(G),g(B)]}
function hex2rgb(h){h=h.replace("#","");return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function rgb2hex(r,g,b){return"#"+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("").toUpperCase()}
TRAD.forEach(t=>{t.lab=rgb2lab(...hex2rgb(t.hex))});
function nearestTrad(hex){const lab=rgb2lab(...hex2rgb(hex));let best=TRAD[0],bd=1e9;for(const t of TRAD){const d=Math.hypot(lab[0]-t.lab[0],lab[1]-t.lab[1],lab[2]-t.lab[2]);if(d<bd){bd=d;best=t}}return{t:best,d:bd}}
function assignNames(pal){
  const used=new Set(),out=new Map();
  for(const hex of pal){const lab=rgb2lab(...hex2rgb(hex));
    const ranked=TRAD.map(t=>({t,d:Math.hypot(lab[0]-t.lab[0],lab[1]-t.lab[1],lab[2]-t.lab[2])})).sort((a,b)=>a.d-b.d);
    const pick=ranked.find(r=>!used.has(r.t.n)&&r.d<=ranked[0].d+9)||ranked[0];used.add(pick.t.n);out.set(hex,pick)}
  return out;
}
const closeness=d=>d<8?"거의 같음":d<16?"가까움":"비슷한 계열";

function kmeans(P,n,k,iters,rnd){
  k=Math.min(k,n);const C=new Float32Array(k*3);const D=new Float32Array(n).fill(1e12);
  let idx=Math.floor(rnd()*n);C[0]=P[idx*3];C[1]=P[idx*3+1];C[2]=P[idx*3+2];
  for(let c=1;c<k;c++){let sum=0;for(let i=0;i<n;i++){const dx=P[i*3]-C[(c-1)*3],dy=P[i*3+1]-C[(c-1)*3+1],dz=P[i*3+2]-C[(c-1)*3+2];const d=dx*dx+dy*dy+dz*dz;if(d<D[i])D[i]=d;sum+=D[i]}
    let r=rnd()*sum,j=0;for(;j<n-1;j++){r-=D[j];if(r<=0)break}C[c*3]=P[j*3];C[c*3+1]=P[j*3+1];C[c*3+2]=P[j*3+2]}
  const S=new Float64Array(k*3),N=new Int32Array(k);
  for(let it=0;it<iters;it++){S.fill(0);N.fill(0);
    for(let i=0;i<n;i++){let bi=0,bd=1e12;for(let c=0;c<k;c++){const dx=P[i*3]-C[c*3],dy=P[i*3+1]-C[c*3+1],dz=P[i*3+2]-C[c*3+2];const d=dx*dx+dy*dy+dz*dz;if(d<bd){bd=d;bi=c}}N[bi]++;S[bi*3]+=P[i*3];S[bi*3+1]+=P[i*3+1];S[bi*3+2]+=P[i*3+2]}
    for(let c=0;c<k;c++)if(N[c]){C[c*3]=S[c*3]/N[c];C[c*3+1]=S[c*3+1]/N[c];C[c*3+2]=S[c*3+2]/N[c]}}
  return{C,N,k};
}

/* ---------- 누끼 ---------- */
function cutout(img,sens){
  const w0=img.naturalWidth,h0=img.naturalHeight,sc=Math.min(1,800/Math.max(w0,h0));
  const w=Math.max(8,Math.round(w0*sc)),h=Math.max(8,Math.round(h0*sc)),N=w*h;
  const cv=document.createElement("canvas");cv.width=w;cv.height=h;const cx=cv.getContext("2d",{willReadFrequently:true});cx.drawImage(img,0,0,w,h);
  const id=cx.getImageData(0,0,w,h),px=id.data;
  const LW=0.5,lab=new Float32Array(N*3);
  for(let i=0;i<N;i++){const l=rgb2lab(px[i*4],px[i*4+1],px[i*4+2]);lab[i*3]=l[0]*LW;lab[i*3+1]=l[1];lab[i*3+2]=l[2]}
  const m=Math.max(2,Math.round(Math.min(w,h)*0.025)),bidx=[];
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(x<m||x>=w-m||y<m||y>=h-m)bidx.push(y*w+x)}
  const step=Math.max(1,Math.floor(bidx.length/4000)),ns=Math.ceil(bidx.length/step),S=new Float32Array(ns*3);
  let si=0;for(let j=0;j<bidx.length&&si<ns;j+=step,si++){const p=bidx[j];S[si*3]=lab[p*3];S[si*3+1]=lab[p*3+1];S[si*3+2]=lab[p*3+2]}
  const km=kmeans(S,si,3,8,mulberry(7));
  const thr=7+sens*0.3,t2=thr*thr;
  const like=new Uint8Array(N);
  for(let i=0;i<N;i++){let bd=1e12;for(let c=0;c<km.k;c++){if(!km.N[c])continue;const dx=lab[i*3]-km.C[c*3],dy=lab[i*3+1]-km.C[c*3+1],dz=lab[i*3+2]-km.C[c*3+2];const d=dx*dx+dy*dy+dz*dz;if(d<bd)bd=d}like[i]=bd<t2?1:0}
  const bg=new Uint8Array(N),q=new Int32Array(N);let qh=0,qt=0;
  const seed=i=>{if(like[i]&&!bg[i]){bg[i]=1;q[qt++]=i}};
  for(let x=0;x<w;x++){seed(x);seed((h-1)*w+x)}for(let y=0;y<h;y++){seed(y*w);seed(y*w+w-1)}
  while(qh<qt){const i=q[qh++],x=i%w,y=(i/w)|0;if(x>0)seed(i-1);if(x<w-1)seed(i+1);if(y>0)seed(i-w);if(y<h-1)seed(i+w)}
  let fg=new Uint8Array(N);for(let i=0;i<N;i++)fg[i]=bg[i]?0:1;
  const er=new Uint8Array(N);for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;er[i]=fg[i]&&fg[i-1]&&fg[i+1]&&fg[i-w]&&fg[i+w]?1:0}
  const di=new Uint8Array(N);for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;di[i]=er[i]||er[i-1]||er[i+1]||er[i-w]||er[i+w]?1:0}
  fg=di;
  const lbl=new Int32Array(N),sizes=[0];let L=0;
  for(let s=0;s<N;s++){if(!fg[s]||lbl[s])continue;L++;let cnt=0;qh=0;qt=0;q[qt++]=s;lbl[s]=L;
    while(qh<qt){const i=q[qh++];cnt++;const x=i%w,y=(i/w)|0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const j=yy*w+xx;if(fg[j]&&!lbl[j]){lbl[j]=L;q[qt++]=j}}}
    sizes.push(cnt)}
  let big=0;for(let l=1;l<=L;l++)if(sizes[l]>big)big=sizes[l];
  let total=0;for(let i=0;i<N;i++){if(fg[i]&&sizes[lbl[i]]<big*0.25)fg[i]=0;if(fg[i])total++}
  let ok=true;if(total<N*0.01||total>N*0.97){ok=false;fg.fill(1);total=N}
  const A=new Uint8ClampedArray(N);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){let s=0,c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;s+=fg[yy*w+xx];c++}A[y*w+x]=ok?Math.round(255*s/c):255}
  let x0=w,y0=h,x1=0,y1=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(A[y*w+x]>8){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  for(let i=0;i<N;i++)px[i*4+3]=A[i];
  cx.putImageData(id,0,0);
  const bw=x1-x0+1,bh=y1-y0+1,pad=Math.round(Math.max(bw,bh)*0.04);
  const out=document.createElement("canvas");out.width=bw+pad*2;out.height=bh+pad*2;out.getContext("2d").drawImage(cv,x0,y0,bw,bh,pad,pad,bw,bh);
  return{canvas:out,ok};
}
function extractPalette(canvas){
  const w=canvas.width,h=canvas.height,d=canvas.getContext("2d").getImageData(0,0,w,h).data,pts=[];
  const total=w*h,step=Math.max(1,Math.floor(total/6000));
  for(let i=0;i<total;i+=step){if(d[i*4+3]>220){const l=rgb2lab(d[i*4],d[i*4+1],d[i*4+2]);pts.push(l[0],l[1],l[2])}}
  const n=pts.length/3;if(n<10)return[];
  const km=kmeans(Float32Array.from(pts),n,6,14,mulberry(11));
  const cl=[];for(let c=0;c<km.k;c++)if(km.N[c])cl.push({lab:[km.C[c*3],km.C[c*3+1],km.C[c*3+2]],n:km.N[c]});
  cl.sort((a,b)=>b.n-a.n);
  const merged=[];for(const c of cl){const m=merged.find(o=>Math.hypot(o.lab[0]-c.lab[0],o.lab[1]-c.lab[1],o.lab[2]-c.lab[2])<11);if(m){m.n+=c.n}else merged.push({lab:c.lab.slice(),n:c.n})}
  merged.sort((a,b)=>b.n-a.n);
  return merged.filter(c=>c.n/n>=0.03).slice(0,5).map(c=>rgb2hex(...lab2rgb(...c.lab)));
}

/* ---------- 조각 (가로·세로가 제각각인 직사각형) ---------- */
const ASPECTS=[1.55,.64,1.3,.78,1.9,.56,1.12];
function tileFinder(canvas){
  const w=canvas.width,h=canvas.height,d=canvas.getContext("2d").getImageData(0,0,w,h).data,W1=w+1,I=new Int32Array(W1*(h+1));
  for(let y=0;y<h;y++){let row=0;for(let x=0;x<w;x++){row+=d[(y*w+x)*4+3]<230?1:0;I[(y+1)*W1+x+1]=I[y*W1+x+1]+row}}
  const bad=(x0,y0,x1,y1)=>I[y1*W1+x1]-I[y0*W1+x1]-I[y1*W1+x0]+I[y0*W1+x0];
  /* (cx,cy)를 가운데로 잎 안에 들어가는 가장 큰 직사각형의 반높이 (가로 = 세로 × a) */
  const maxR=(cx,cy,a)=>{cx=Math.round(cx);cy=Math.round(cy);let lo=0,hi=Math.floor(Math.min(cy,h-cy,cx/a,(w-cx)/a));if(hi<=0)return 0;
    while(lo<hi){const m=(lo+hi+1)>>1,mw=Math.round(m*a);if(bad(cx-mw,cy-m,cx+mw,cy+m)===0)lo=m;else hi=m-1}return lo};
  return{w,h,maxR};
}
function autoTile(canvas,a){
  const f=tileFinder(canvas),step=Math.max(3,Math.round(Math.min(f.w,f.h)/70));let best={cx:f.w/2,cy:f.h/2,hh:0};
  for(let y=step;y<f.h;y+=step)for(let x=step;x<f.w;x+=step){const hh=f.maxR(x,y,a);if(hh>best.hh)best={cx:x,cy:y,hh}}
  if(best.hh<Math.min(f.w,f.h)*0.06)best={cx:f.w/2,cy:f.h/2,hh:Math.round(Math.min(f.h,f.w/a)*0.25)};
  best.hw=Math.round(best.hh*a);return best;
}
/* 직사각형을 오려 내기. 네 모서리를 살짝 안쪽으로 비틀어 가위로 자른 느낌 */
function makeTile(canvas,tile,rot,long,seed){
  const sw=tile.hw*2,sh=tile.hh*2,odd=(rot||0)%2===1,ow=odd?sh:sw,oh=odd?sw:sh,k=long/Math.max(ow,oh);
  const W=Math.max(1,Math.round(ow*k)),H=Math.max(1,Math.round(oh*k)),c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  x.fillStyle=C.cream;x.fillRect(0,0,W,H);
  x.translate(W/2,H/2);x.rotate((rot||0)*Math.PI/2);x.drawImage(canvas,tile.cx-tile.hw,tile.cy-tile.hh,sw,sh,-sw*k/2,-sh*k/2,sw*k,sh*k);
  return c;
}
function encodeTile(c){let u=c.toDataURL("image/webp",.86);if(!u.startsWith("data:image/webp"))u=c.toDataURL("image/png");return u}

/* ---------- 저장소 ---------- */
/* 로그인: Supabase(표 + 사진 저장소), 로그인 전: 이 브라우저(IndexedDB) */
function dataURLtoBlob(u){const [h,b]=u.split(",");const mime=h.match(/:(.*?);/)[1],bin=atob(b),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:mime})}
const extOf=u=>u.startsWith("data:image/webp")?"webp":u.startsWith("data:image/jpeg")?"jpg":"png";
const Local={
  db:null,
  async open(){if(this.db)return this.db;this.db=await new Promise((res,rej)=>{const r=indexedDB.open("danpung",1);r.onupgradeneeded=()=>r.result.createObjectStore("leaves",{keyPath:"date"});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});return this.db},
  async all(){const db=await this.open();return new Promise((res,rej)=>{const r=db.transaction("leaves").objectStore("leaves").getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error)})},
  async put(o){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction("leaves","readwrite");t.objectStore("leaves").put(o);t.oncomplete=res;t.onerror=()=>rej(t.error)})},
  async del(k){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction("leaves","readwrite");t.objectStore("leaves").delete(k);t.oncomplete=res;t.onerror=()=>rej(t.error)})},
  async clear(){const db=await this.open();return new Promise((res,rej)=>{const t=db.transaction("leaves","readwrite");t.objectStore("leaves").clear();t.oncomplete=res;t.onerror=()=>rej(t.error)})}
};
const Store={mode:"local",user:null,items:new Map(),
  async init(){
    const {data:{session}}=await sb.auth.getSession();
    this.user=session?session.user:null;
    if(this.user){this.mode="cloud";await this.loadCloud()}
    else{this.mode="local";await this.loadLocal()}
  },
  async loadLocal(){this.items.clear();try{(await Local.all()).forEach(o=>this.items.set(o.date,o))}catch(e){this.mode="mem"}},
  async loadCloud(){
    const {data,error}=await sb.from("leaves").select("date,species,place,crisp,memo,palette,ta,img_path,tile_path").order("date");
    if(error)throw error;
    const paths=data.flatMap(r=>[r.img_path,r.tile_path].filter(Boolean)),urls=new Map();
    for(let i=0;i<paths.length;i+=100){const {data:su}=await sb.storage.from("leaves").createSignedUrls(paths.slice(i,i+100),60*60*24);(su||[]).forEach(x=>{if(x.signedUrl)urls.set(x.path,x.signedUrl)})}
    this.items.clear();
    for(const r of data)this.items.set(r.date,{date:r.date,species:r.species,place:r.place,crisp:r.crisp,memo:r.memo,palette:r.palette||[],ta:r.ta||1,img:urls.get(r.img_path)||"",tile:r.tile_path?urls.get(r.tile_path)||"":"",img_path:r.img_path,tile_path:r.tile_path});
  },
  async putCloud(o){
    const uid=this.user.id,v=Date.now().toString(36),up=async(u,name)=>{
      if(!u||!u.startsWith("data:"))return null;
      const path=`${uid}/${o.date}-${name}-${v}.${extOf(u)}`;
      const {error}=await sb.storage.from("leaves").upload(path,dataURLtoBlob(u),{upsert:true,contentType:dataURLtoBlob(u).type});
      if(error)throw error;return path};
    const prev=this.items.get(o.date);
    const img_path=await up(o.img,"leaf")||o.img_path,tile_path=await up(o.tile,"tile")||o.tile_path||null;
    const row={date:o.date,species:o.species||"",place:o.place||"",crisp:o.crisp??null,memo:o.memo||"",palette:o.palette||[],ta:o.ta||1,img_path,tile_path,updated_at:new Date().toISOString()};
    const {error}=await sb.from("leaves").upsert(row,{onConflict:"user_id,date"});
    if(error)throw error;
    /* 같은 날 잎을 바꿨으면 예전 사진은 지움 */
    if(prev&&prev.img_path){const old=[prev.img_path,prev.tile_path].filter(p=>p&&p!==img_path&&p!==tile_path);if(old.length)sb.storage.from("leaves").remove(old)}
    return{...o,img_path,tile_path};
  },
  async put(o){
    if(this.mode==="cloud"){const saved=await this.putCloud(o);this.items.set(o.date,saved);return}
    if(this.mode==="local")await Local.put(o);
    this.items.set(o.date,o);
  },
  async del(k){
    if(this.mode==="cloud"){const o=this.items.get(k);const {error}=await sb.from("leaves").delete().eq("date",k);if(error)throw error;
      const ps=[o&&o.img_path,o&&o.tile_path].filter(Boolean);if(ps.length)await sb.storage.from("leaves").remove(ps)}
    else if(this.mode==="local")await Local.del(k);
    this.items.delete(k);
  },
  /* 로그인 전에 이 브라우저에 모은 잎을 계정으로 옮김 (같은 날짜가 이미 있으면 계정 쪽을 둠) */
  async migrateLocal(){
    let list=[];try{list=await Local.all()}catch(e){return 0}
    let n=0;for(const o of list){if(this.items.has(o.date))continue;try{const saved=await this.putCloud(o);this.items.set(o.date,saved);n++}catch(e){console.warn("옮기기 실패",o.date,e)}}
    if(n===list.filter(o=>!this.items.has(o.date)).length+n)try{await Local.clear()}catch(e){}
    return n;
  },
  sorted(){return[...this.items.values()].sort((a,b)=>a.date<b.date?-1:1)},
  numberOf(k){return this.sorted().findIndex(o=>o.date===k)+1}
};

/* ---------- 로그인 ---------- */
const displayName=u=>{if(!u)return"";const m=u.user_metadata||{};return m.full_name||m.name||m.nickname||m.preferred_username||(u.email?u.email.split("@")[0]:"나")};
function renderAuth(){
  const el=$("#authbar");if(!el)return;
  el.innerHTML=Store.user?`<span class="who">${esc(displayName(Store.user))}님의 표본장</span><button class="btn small" data-act="logout">로그아웃</button>`
    :`<span class="who">로그인하면 표본이 계정에 남아요</span><button class="btn small primary" data-act="login">로그인</button>`;
}
function openLogin(){
  openModal(`<p class="bigmsg">표본을 계정에 모아두기</p>
    <p class="note" style="margin:6px 0 18px">로그인하면 어느 기기에서든 내 표본장을 볼 수 있어요. 로그인하지 않아도 쓸 수 있지만, 그땐 이 브라우저에만 저장돼요.</p>
    <p class="safe">로그인 시 이름(닉네임)과 이메일만 사용해요. 표본은 나만 볼 수 있어요.</p>
    <div class="loginbtns"><button class="btn kakao" data-act="oauth" data-provider="kakao">카카오로 시작하기</button><button class="btn google" data-act="oauth" data-provider="google">구글로 시작하기</button></div>
    <div class="or"><span>또는 이메일로</span></div>
    <form class="mailform" id="mailForm" novalidate>
      <div id="mailStep1"><input class="t" type="email" id="mailIn" placeholder="이메일 주소" autocomplete="email" inputmode="email" required>
        <button class="btn" type="submit" id="mailBtn">인증번호 받기</button></div>
      <div id="mailStep2" hidden><p class="note" id="mailSent" style="margin:0 0 6px"></p>
        <input class="t" id="codeIn" placeholder="메일로 받은 인증번호" autocomplete="one-time-code" inputmode="numeric" maxlength="10">
        <div class="row" style="margin-top:10px"><button class="btn primary" type="submit" id="codeBtn">확인</button><button class="btn" type="button" data-act="mailBack">메일 다시 쓰기</button></div></div>
      <p class="note">비밀번호 없이, 메일로 온 번호만 넣으면 돼요.</p>
    </form>
    <div class="row" style="margin-top:16px;justify-content:space-between;align-items:center"><a class="plink" href="/privacy.html" target="_blank" rel="noopener">개인정보처리방침</a><button class="btn" data-close>나중에 할게요</button></div>`);
  $("#mailForm").addEventListener("submit",e=>{e.preventDefault();$("#mailStep2").hidden?mailSend():mailVerify()});
}
async function oauth(provider){
  const {error}=await sb.auth.signInWithOAuth({provider,options:{redirectTo:location.origin+location.pathname}});
  if(error)toast("로그인을 시작하지 못했어요. 잠시 뒤 다시 해주세요");
}
/* 이메일 로그인: 비밀번호 없이 인증번호(OTP) */
let mailAddr="";
async function mailSend(){
  const v=($("#mailIn").value||"").trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){toast("이메일 주소를 확인해 주세요");$("#mailIn").focus();return}
  const b=$("#mailBtn");b.disabled=true;b.textContent="보내는 중…";
  const {error}=await sb.auth.signInWithOtp({email:v,options:{shouldCreateUser:true,emailRedirectTo:location.origin+location.pathname}});
  b.disabled=false;b.textContent="인증번호 받기";
  if(error){toast(/rate|limit|seconds/i.test(error.message)?"잠시 뒤에 다시 보내 주세요":"메일을 보내지 못했어요. 잠시 뒤 다시 해주세요");console.warn(error);return}
  mailAddr=v;$("#mailStep1").hidden=true;$("#mailStep2").hidden=false;
  $("#mailSent").textContent=`${v} 으로 인증번호를 보냈어요. 메일이 안 보이면 스팸함도 봐 주세요.`;$("#codeIn").focus();
}
async function mailVerify(){
  const code=($("#codeIn").value||"").replace(/\D/g,"");
  if(code.length<6){toast("인증번호를 다시 확인해 주세요");return}
  const b=$("#codeBtn");b.disabled=true;
  const {error}=await sb.auth.verifyOtp({email:mailAddr,token:code,type:"email"});
  b.disabled=false;
  if(error){toast(/expired/i.test(error.message)?"인증번호가 만료됐어요. 다시 받아 주세요":"인증번호가 맞지 않아요");console.warn(error);return}
  /* 성공하면 onAuthStateChange가 표본장을 불러와요 */
}
/* 탈퇴: 사진 → 표본 → 계정 순서로 지움 */
function openLeave(){
  const n=Store.items.size;
  openModal(`<p class="bigmsg">탈퇴하기</p>
    <p class="note" style="margin:6px 0 14px">계정과 함께 모은 표본 ${n}장, 사진이 모두 지워져요. 지운 표본은 되돌릴 수 없어요.</p>
    ${n?`<p class="note" style="margin:0 0 14px">남겨두고 싶으면 먼저 표본장의 <b>조각보 저장</b>이나 표본 카드를 저장해 두세요.</p>`:""}
    <div class="row" style="justify-content:flex-end"><button class="btn" data-close>그만둘게요</button><button class="btn danger" data-act="leaveGo">모두 지우고 탈퇴</button></div>`);
}
async function leaveGo(){
  const b=$("#modalBody [data-act=leaveGo]");if(b){b.disabled=true;b.textContent="지우는 중…"}
  try{
    const uid=Store.user.id,bucket=sb.storage.from("leaves");
    for(;;){const {data,error}=await bucket.list(uid,{limit:1000});if(error)throw error;if(!data||!data.length)break;
      const {error:e2}=await bucket.remove(data.map(f=>`${uid}/${f.name}`));if(e2)throw e2;if(data.length<1000)break}
    const {error:e3}=await sb.from("leaves").delete().eq("user_id",uid);if(e3)throw e3;
    const {error:e4}=await sb.rpc("delete_my_account");if(e4)throw e4;
    await sb.auth.signOut({scope:"local"});
    closeModal();toast("탈퇴했어요. 그동안 고마웠어요");
  }catch(e){console.error(e);if(b){b.disabled=false;b.textContent="모두 지우고 탈퇴"}toast("탈퇴하지 못했어요. 잠시 뒤 다시 해주세요")}
}
let authBusy=false;
sb.auth.onAuthStateChange((event,session)=>{
  if(event!=="SIGNED_IN"&&event!=="SIGNED_OUT")return;
  const uid=session?session.user.id:null;if((Store.user&&Store.user.id)===uid)return;
  setTimeout(async()=>{ /* 콜백 안에서 바로 Supabase를 부르지 않도록 한 박자 늦춤 */
    if(authBusy)return;authBusy=true;
    try{
      Store.user=session?session.user:null;
      if(Store.user){Store.mode="cloud";await Store.loadCloud();const n=await Store.migrateLocal();if(n)toast(`이 브라우저에 있던 표본 ${n}장을 계정으로 옮겼어요`)}
      else{Store.mode="local";await Store.loadLocal()}
      S.phase=Store.items.get(todayKey())?"done":"empty";S.edit=null;closeModal();renderAll();renderAuth();
    }catch(e){console.error(e);toast("표본장을 불러오지 못했어요")}
    finally{authBusy=false}
  },0);
});

/* ---------- 다운로드·복사 ---------- */
async function offer(canvas,filename){
  const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));
  const file=new File([blob],filename,{type:"image/png"});
  /* 휴대폰: 공유 창(사진에 저장 가능) / 컴퓨터: 바로 내려받기 */
  if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)&&navigator.canShare&&navigator.canShare({files:[file]})){
    try{await navigator.share({files:[file],title:filename});return}catch(e){if(e&&e.name==="AbortError")return}
  }
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),4000);toast("저장했어요");
}
async function copyText(txt){
  try{await navigator.clipboard.writeText(txt);toast("복사했어요")}
  catch(e){openModal(`<p class="bigmsg">아래 내용을 복사해 주세요</p><textarea style="width:100%;height:170px;font:inherit;border:1px solid ${C.ink};background:transparent;padding:10px" readonly>${esc(txt)}</textarea><div class="row" style="margin-top:10px"><button class="btn" data-close>닫기</button></div>`);const ta=$("#modalBody textarea");ta.focus();ta.select()}
}
const hexLines=pal=>{const AN=assignNames(pal);return pal.map(h=>{const {t}=AN.get(h);return`${h}  ${t.n} ${t.h}`}).join("\n")};

/* ---------- 캔버스 공통 ---------- */
function loadImg(src){return new Promise((res,rej)=>{const i=new Image();if(/^https?:/.test(src))i.crossOrigin="anonymous";i.onload=()=>res(i);i.onerror=rej;i.src=src})}
async function fontsReady(){try{await Promise.all([document.fonts.load(`400 20px ${MONO}`),document.fonts.load(`300 20px ${MONO}`),document.fonts.load(`900 20px ${HEAD}`),document.fonts.load(`400 20px ${SERIF}`,"朱紅")]);await document.fonts.ready}catch(e){}}
function paperBG(x,W,H,dark,seed){
  if(dark){x.fillStyle=C.ink;x.fillRect(0,0,W,H)}
  else{const g=x.createLinearGradient(0,0,W*.3,H);g.addColorStop(0,"#F8D8BF");g.addColorStop(.55,C.paper);g.addColorStop(1,C.paper2);x.fillStyle=g;x.fillRect(0,0,W,H);
    const r=x.createRadialGradient(W*.9,0,0,W*.9,0,W*.9);r.addColorStop(0,"rgba(247,147,30,.35)");r.addColorStop(1,"rgba(247,147,30,0)");x.fillStyle=r;x.fillRect(0,0,W,H)}
  const im=x.getImageData(0,0,W,H),d=im.data,rnd=mulberry(seed||5),a=dark?9:16;
  for(let i=0;i<d.length;i+=4){const n=(rnd()-.5)*a;d[i]+=n;d[i+1]+=n;d[i+2]+=n}
  x.putImageData(im,0,0);
}
function paperSheet(x,W,H,seed){
  x.fillStyle="#EFE5D3";x.fillRect(0,0,W,H);const r=mulberry(seed||21);
  const blots=[["125,140,120",.30],["201,163,110",.34],["181,72,46",.14],["125,140,120",.2],["201,163,110",.22]];
  for(const [c,a] of blots){const cx=r()*W,cy=r()*H,rad=(.25+r()*.35)*Math.max(W,H),g=x.createRadialGradient(cx,cy,0,cx,cy,rad);g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(0,0,W,H)}
  const im=x.getImageData(0,0,W,H),d=im.data;for(let i=0;i<d.length;i+=4){const n=(r()-.5)*22;d[i]+=n;d[i+1]+=n;d[i+2]+=n}x.putImageData(im,0,0);
}
function darkSheet(x,W,H,seed){x.fillStyle="#14100D";x.fillRect(0,0,W,H);const r=mulberry(seed||3),im=x.getImageData(0,0,W,H),d=im.data;for(let i=0;i<d.length;i+=4){const n=(r()-.5)*12;d[i]+=n;d[i+1]+=n;d[i+2]+=n}x.putImageData(im,0,0)}
function rule(x,x0,x1,y,color,w){x.fillStyle=color||C.line;x.fillRect(x0,Math.round(y),x1-x0,w||1.5)}
function wrapText(x,txt,maxW,maxLines){
  const out=[];let line="";
  for(const ch of txt){const t=line+ch;if(x.measureText(t).width>maxW&&line){out.push(line);line=ch.trim()?ch:"";}else line=t}
  if(line)out.push(line);
  if(out.length>maxLines){const keep=out.slice(0,maxLines);keep[maxLines-1]=fitText(x,keep[maxLines-1]+"…",maxW);return keep}
  return out;
}
function fitText(x,txt,maxW){if(x.measureText(txt).width<=maxW)return txt;let s=txt;while(s.length&&x.measureText(s+"…").width>maxW)s=s.slice(0,-1);return s+"…"}

/* ---------- 히어로: 스프레이 스텐실 ---------- */
function halton(i,b){let f=1,r=0;while(i>0){f/=b;r+=f*(i%b);i=Math.floor(i/b)}return r}
function strHash(t){let h=2166136261;for(const c of t){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
let heroBusy=false,heroAgain=false;
async function renderHero(){
  if(heroBusy){heroAgain=true;return}heroBusy=true;heroAgain=false;
  try{
  const cv=$("#heroCv"),W=1200,H=800;cv.width=W;cv.height=H;const x=cv.getContext("2d");
  const m=document.createElement("canvas");m.width=W;m.height=H;const mx=m.getContext("2d");
  const list=Store.sorted(),n=list.length,base=H*Math.min(.6,.92/Math.sqrt(Math.max(1,n)));
  for(let i=0;i<n;i++){const o=list[i];let im;try{im=await loadImg(o.img)}catch(e){continue}
    const r=mulberry(strHash(o.date));const px=n===1?.5:.07+.86*halton(i+1,2),py=n===1?.5:.1+.8*halton(i+1,3);
    mx.save();mx.translate(px*W,py*H);mx.rotate((r()-.5)*1.7);const s=base*(.85+r()*.3)/Math.max(im.width,im.height);
    mx.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s);mx.restore()}
  $("#heroNote").hidden=n>0;
  const mb=document.createElement("canvas");mb.width=W;mb.height=H;const mbx=mb.getContext("2d");mbx.filter=`blur(${Math.max(3,Math.round(base*.016))}px)`;mbx.drawImage(m,0,0);mbx.filter="none";
  const ma=mbx.getImageData(0,0,W,H).data,img=x.createImageData(W,H),d=img.data,r2=mulberry(3);
  const V=hex2rgb(C.verm),R=hex2rgb(C.rust),G=hex2rgb(C.grey),O=hex2rgb(C.orange),P=hex2rgb(C.cream);
  const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
  for(let y=0;y<H;y++){const v=y/H;for(let xx=0;xx<W;xx++){const u=xx/W,i=y*W+xx;
    const top=lerp(O,V,Math.min(1,u*1.3));let col=v<.6?lerp(top,R,v/.6*.7):lerp(lerp(top,R,.7),G,(v-.6)/.4);
    let dens=.5+.42*(.5+.5*Math.sin(u*5.3+v*2.7)*Math.cos(v*4.1-u*1.9));
    dens*=1-(ma[i*4+3]/255)*.985;
    const o=i*4;
    if(r2()<dens){const j=(r2()-.5)*26;d[o]=col[0]+j;d[o+1]=col[1]+j;d[o+2]=col[2]+j}
    else{const j=(r2()-.5)*8;d[o]=P[0]+j;d[o+1]=P[1]+j;d[o+2]=P[2]+j}
    d[o+3]=255}}
  x.putImageData(img,0,0);
  }finally{heroBusy=false;if(heroAgain)setTimeout(renderHero,0)}
}
function renderHeroMeta(){
  const list=Store.sorted();$("#heroNo").textContent="No."+pad3(list.length);
  $("#heroDate").textContent=dotDate(todayKey());
  $("#heroCap").textContent=list.length?`가을 ${todayKey().slice(0,4)}, ${list.length}잎을 오려낸 자리`:`가을 ${todayKey().slice(0,4)}`;
}

/* ---------- 표본 카드 ---------- */
async function renderCard(L){
  await fontsReady();
  const W=1080,H=1350,cv=document.createElement("canvas");cv.width=W;cv.height=H;const x=cv.getContext("2d");
  paperBG(x,W,H,false,7);
  const no=Store.numberOf(L.date)||1;
  x.font=`400 26px ${MONO}`;x.fillStyle=C.ink;x.textAlign="left";x.fillText("단풍 표본실 — 落葉 標本",60,86);
  x.textAlign="right";x.fillStyle=C.verm;x.fillText(`No.${pad3(no)}`,1020,86);
  rule(x,60,1020,104);
  x.strokeStyle=C.verm;x.lineWidth=2;x.strokeRect(61,131,958,520);
  const img=await loadImg(L.img);const bw=820,bh=450,s=Math.min(bw/img.width,bh/img.height),iw=img.width*s,ih=img.height*s;
  x.drawImage(img,540-iw/2,130+261-ih/2,iw,ih);
  x.font=`400 24px ${MONO}`;x.fillStyle=C.verm;x.textAlign="center";
  x.fillText(fitText(x,[L.species||"수종 모름",L.place].filter(Boolean).join(", "),900),540,692);
  // 팔레트
  const pal=L.palette||[],AN=assignNames(pal),cs=74,gap=46,tw=pal.length*cs+Math.max(0,pal.length-1)*gap;let px=540-tw/2;
  pal.forEach(h=>{x.fillStyle=h;x.fillRect(px,718,cs,cs);x.strokeStyle=C.ink;x.lineWidth=1.5;x.strokeRect(px+.75,718.75,cs-1.5,cs-1.5);
    gdraw(x,CSF,AN.get(h).t.n,px+cs/2,840,34,"center",C.ink);px+=cs+gap});
  // 기록 줄
  const rows=[["모은 날",dotDate(L.date),"바삭정도",crispText(L)],["수종",L.species,"장소",L.place],["한잎평",L.memo]];
  let y=872;rule(x,60,1020,y);
  rows.forEach(r=>{x.textAlign="left";x.font=`300 21px ${MONO}`;x.fillStyle=C.verm;x.fillText(r[0],60,y+33);
    x.font=`400 25px ${MONO}`;x.fillStyle=C.ink;x.fillText(fitText(x,r[1]||"—",r.length>2?300:820),150,y+34);
    if(r.length>2){x.font=`300 21px ${MONO}`;x.fillStyle=C.verm;x.fillText(r[2],560,y+33);x.font=`400 25px ${MONO}`;x.fillStyle=C.ink;x.fillText(fitText(x,r[3]||"—",330),680,y+34)}
    y+=50;rule(x,60,1020,y)});
  // 큰 날짜 (오이냉체 윤곽선)
  const dt=mmdd(L.date),fit=gfit(OIF,dt,940,236,1290);
  gdraw(x,OIF,dt,540,fit.y,fit.sz,"center",C.verm);
  return cv;
}

async function renderPalette(pal,heading,sub){
  await fontsReady();
  const W=1080,row=262,H=330+pal.length*row+90,cv=document.createElement("canvas");cv.width=W;cv.height=H;const x=cv.getContext("2d");
  paperBG(x,W,H,false,9);
  x.font=`400 26px ${MONO}`;x.fillStyle=C.ink;x.textAlign="left";x.fillText(sub,60,86);x.textAlign="right";x.fillStyle=C.verm;x.fillText("단풍 표본실",1020,86);
  rule(x,60,1020,104);
  x.font=`900 104px ${HEAD}`;x.fillStyle=C.verm;x.textAlign="left";x.fillText(heading,54,236);
  rule(x,60,1020,280);
  const AN=assignNames(pal);
  pal.forEach((h,i)=>{const y=300+i*row,{t,d}=AN.get(h);
    x.fillStyle=h;x.fillRect(60,y,150,150);x.fillStyle=t.hex;x.fillRect(218,y,70,150);
    x.strokeStyle=C.ink;x.lineWidth=1.5;x.strokeRect(60.75,y+.75,148.5,148.5);x.strokeRect(218.75,y+.75,68.5,148.5);
    const nw=gdraw(x,CSF,t.n,322,y+64,64,"left",C.ink);
    x.font=`400 40px ${SERIF}`;x.fillStyle=C.verm;x.textAlign="left";x.fillText(t.h,322+nw+16,y+60);
    x.font=`400 21px ${MONO}`;x.fillStyle=C.ink;const ls=wrapText(x,t.d,690,4);ls.forEach((l,k)=>x.fillText(l,324,y+100+k*30));
    x.font=`300 19px ${MONO}`;x.fillStyle="#6b4a3d";x.fillText(`잎 ${h}     전통색 ${t.hex}`,324,y+100+ls.length*30+10);
    rule(x,60,1020,y+row-12)});
  return cv;
}

async function renderQuilt(list){
  await fontsReady();
  const n=list.length,W=1080,inner=940,gap=4,target=n<=3?260:n<=8?210:170;
  const rows=quiltRows(list.map((o,i)=>({o,i,a:tileAspect(o)})),inner,target,gap),gh=rows.reduce((t,r)=>t+r.h,0)+gap*(rows.length-1);
  const H=Math.max(1350,Math.ceil(gh+460)),cv=document.createElement("canvas");cv.width=W;cv.height=H;const x=cv.getContext("2d");
  darkSheet(x,W,H,11);
  x.font=`400 26px ${MONO}`;x.fillStyle=C.cream;x.textAlign="left";x.fillText("단풍 조각보",60,86);
  x.textAlign="right";x.fillStyle=C.orange;x.fillText(`${dotDate(list[0].date)} – ${dotDate(list[n-1].date)}, ${n}잎`,1020,86);
  rule(x,60,1020,104,"rgba(244,237,225,.45)");
  let y=Math.round(140+Math.max(0,(H-140-280-gh)/2));
  for(const r of rows){let cx=70;if(r.last){const rw=r.items.reduce((t,it)=>t+it.a*r.h,0)+gap*(r.items.length-1);cx=540-rw/2}
    for(const {o,a} of r.items){const w=a*r.h,rr=mulberry(strHash(o.date)),rot=(rr()-.5)*1.6*Math.PI/180;
      try{const im=await loadImg(o.tile||o.img);x.save();x.translate(cx+w/2,y+r.h/2);x.rotate(rot);
        if(o.tile){clipQuad(x,cutQuad(o.date),-w/2,-r.h/2,w,r.h);x.drawImage(im,-w/2,-r.h/2,w,r.h)}else{const s=Math.min(w*.8/im.width,r.h*.8/im.height);x.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s)}
        x.restore()}catch(e){}
      cx+=w+gap}
    y+=r.h+gap}
  rule(x,60,1020,H-250,"rgba(244,237,225,.45)");
  drawTitle(x,540,H-56,940,180,C.verm);
  return cv;
}

/* ---------- 화면 ---------- */
const S={phase:"loading",edit:null,shelf:"quilt",modalKey:null};

function tradList(pal,compact){
  if(!pal.length)return`<p class="note">색을 뽑지 못했어요.</p>`;
  const AN=assignNames(pal);
  return`<ol class="tlist${compact?" compact":""}">`+pal.map(hex=>{const{t,d}=AN.get(hex);
    return`<li><div class="sws"><i style="background:${hex}" title="잎 ${hex}"></i><span>→</span><i style="background:${t.hex}" title="${t.n} ${t.hex}"></i></div>
      <div><div class="tname">${gsvg(CSF,t.n,C.ink)}<span class="th">${t.h}</span><span class="tg">${t.g}</span></div>
      <p class="d">${esc(t.d)}</p><p class="note hexes"><span>잎 ${hex}</span><span>전통색 ${t.hex}</span></p></div></li>`}).join("")+`</ol>`;
}

function renderToday(){
  const el=$("#today"),k=todayKey(),have=Store.items.get(k);
  $("#todayLead").textContent=dotDate(k);
  if(S.phase==="loading"){el.innerHTML=`<p class="muted">표본장을 여는 중…</p>`;return}
  if(S.phase==="done"&&have){
    el.innerHTML=`<div class="done"><div><img class="cardimg" id="todayCard" alt="오늘의 표본 카드"></div><div>
      <p class="bigmsg">오늘의 한 잎을 모았어요</p><p class="stamp hexes"><span>No.${pad3(Store.numberOf(k))}</span><span>${esc(have.species||"수종 모름")}</span>${have.place?`<span>${esc(have.place)}</span>`:""}</p>
      <p class="subhead">이 잎의 색이름</p>${tradList(have.palette||[])}
      <div class="row" style="margin-top:20px"><button class="btn primary" data-act="saveCard" data-key="${k}">표본 카드 저장</button><button class="btn" data-act="savePal" data-key="${k}">색 팔레트 저장하기</button><button class="btn" data-act="copyHex" data-key="${k}">HEX 복사</button></div>
      <div class="row" style="margin-top:12px"><button class="btn" data-act="redo">오늘의 잎 다시 만들기</button></div>
      <p class="note" style="margin-top:12px">${BYE[Math.floor(Math.random()*BYE.length)]}</p></div></div>`;
    renderCard(have).then(cv=>{const im=$("#todayCard");if(im)im.src=cv.toDataURL("image/png")});
    return;
  }
  if(S.phase==="editing"&&S.edit){
    const E=S.edit;
    el.innerHTML=`<div class="editor"><div>
        <div class="stage" id="stage"><img id="prev" alt="누끼 딴 잎 미리보기"><div class="box" id="box"></div><div class="busy" id="busy" hidden>다시 오리는 중…</div></div>
        <div class="tilerow"><canvas id="tileprev" width="152" height="152" aria-label="잎 조각 미리보기"></canvas>
          <div style="flex:1"><div style="font-size:14px">조각보에 들어갈 조각</div><div class="note">네모를 끌어서 위치를 옮겨요.</div>
          <label class="f" for="tsize" style="margin-top:6px">조각 크기</label><input type="range" id="tsize" min="35" max="100" value="${Math.round(E.tscale*100)}">
          <div class="row" style="margin-top:8px"><button class="btn" data-act="shape">모양 바꾸기</button><button class="btn" data-act="rot">90° 돌리기</button><button class="btn" data-act="autoTile">자동으로</button></div></div></div>
        <label class="f" for="sens">누끼 민감도 <span id="sensv">${E.sens}</span></label>
        <input type="range" id="sens" min="0" max="100" value="${E.sens}">
        
        <div class="row" style="margin-top:10px"><button class="btn" data-act="toggleOrig" aria-pressed="${E.showOrig}">${E.showOrig?"누끼 보기":"원본 보기"}</button></div>
        <div id="cutwarn"></div>
      </div><div>
        <label class="f" for="place">장소</label><input class="t" id="place" maxlength="24" placeholder="예: 보라매공원 산책로" value="${esc(E.form.place)}">
        <label class="f" for="species">수종</label><input class="t" id="species" list="splist" maxlength="20" placeholder="골라도 되고 직접 써도 돼요" value="${esc(E.form.species)}">
        <datalist id="splist">${SPECIES.map(s=>`<option value="${s}">`).join("")}</datalist>
        <label class="f" for="crisp">바삭정도 <b id="crispv" style="font-weight:400;color:var(--ink)">${E.form.crisp}점 ${crispWord(E.form.crisp)}</b></label><input type="range" id="crisp" min="0" max="100" value="${E.form.crisp}">
        <label class="f" for="memo">한잎평</label><input class="t" id="memo" maxlength="40" placeholder="예: 바삭하지 않지만 꽤나 이븐한 색깔이다." value="${esc(E.form.memo)}">
        <label class="f">이 잎의 색이름</label><div id="palbox"></div>
        <div class="row" style="margin-top:22px"><button class="btn primary" data-act="commit" id="commit">표본으로 등록</button><button class="btn" data-act="cancel">${have?"취소":"다른 사진 고르기"}</button></div>
        ${have?`<p class="note">등록하면 오늘 모은 잎이 이 잎으로 바뀌어요.</p>`:""}
      </div></div>`;
    paintEdit();
    return;
  }
  el.innerHTML=`<label class="drop" id="drop"><input type="file" id="file" accept="image/*">
      <span class="big">잎 사진을 끌어다 놓거나<br>붙여넣어 주세요</span>
      <span class="ways"><span>여기를 눌러 고르기</span><span>파일 끌어다 놓기</span><span><kbd>Ctrl</kbd>+<kbd>V</kbd> 붙여넣기</span></span>
      <span class="note" style="display:block;margin-top:16px">단색 바탕 위에 놓고 위에서 찍으면 누끼가 깔끔해요</span></label>
    ${have?`<div class="row" style="justify-content:center"><button class="btn" data-act="backDone">그냥 원래 잎으로 둘게요</button></div>`:""}`;
  const file=$("#file");file.addEventListener("change",()=>{if(file.files[0])takeFile(file.files[0])});
}

function paintEdit(){
  const E=S.edit;if(!E)return;
  const prev=$("#prev");if(prev){prev.onload=placeBox;prev.src=E.showOrig?E.srcURL:E.cutURL;if(prev.complete)placeBox()}
  drawTilePrev();
  const pb=$("#palbox");if(pb)pb.innerHTML=tradList(E.palette,true);
  const w=$("#cutwarn");if(w)w.innerHTML=E.ok?"":`<div class="warn">누끼가 잘 안 잡혀서 사진 전체를 썼어요. 민감도를 바꿔보거나 단색 바탕에서 다시 찍어보세요.</div>`;
}
function placeBox(){
  const E=S.edit,box=$("#box"),prev=$("#prev"),st=$("#stage");if(!E||!box||!prev||!st)return;
  if(E.showOrig||!prev.naturalWidth){box.style.display="none";return}
  const pr=prev.getBoundingClientRect(),sr=st.getBoundingClientRect(),k=pr.width/E.canvas.width;
  box.style.display="block";box.style.left=(pr.left-sr.left+(E.tile.cx-E.tile.hw)*k)+"px";box.style.top=(pr.top-sr.top+(E.tile.cy-E.tile.hh)*k)+"px";
  box.style.width=(E.tile.hw*2*k)+"px";box.style.height=(E.tile.hh*2*k)+"px";
}
function applyTileScale(){ /* 지금 위치에서 잎 안에 들어가는 가장 큰 네모 × 크기 비율 */
  const E=S.edit;if(!E.finder)E.finder=tileFinder(E.canvas);
  const a=E.aspect,m=E.finder.maxR(E.tile.cx,E.tile.cy,a),min=Math.min(E.canvas.width,E.canvas.height)*.04;
  if(m<min){toast("네모 가운데가 잎 안에 오도록 옮겨주세요");return false}
  E.tile.hh=Math.max(min,Math.round(m*E.tscale));E.tile.hw=Math.round(E.tile.hh*a);return true;
}
function drawTilePrev(){const E=S.edit,tp=$("#tileprev");if(!E||!tp)return;const x=tp.getContext("2d"),t=makeTile(E.canvas,E.tile,E.rot,140,E.seed),ox=(152-t.width)/2,oy=(152-t.height)/2;x.clearRect(0,0,152,152);x.save();clipQuad(x,cutQuad(todayKey()),ox,oy,t.width,t.height);x.drawImage(t,ox,oy);x.restore()}
function clipQuad(x,q,ox,oy,w,h){x.beginPath();q.forEach(([a,b],i)=>{const px=ox+a*w,py=oy+b*h;i?x.lineTo(px,py):x.moveTo(px,py)});x.closePath();x.clip()}
let drag=null,dragRAF=0;
document.addEventListener("pointerdown",e=>{const box=e.target.closest("#box");if(!box||!S.edit)return;e.preventDefault();
  try{box.setPointerCapture(e.pointerId)}catch(_){}
  const pr=$("#prev").getBoundingClientRect();drag={id:e.pointerId,x:e.clientX,y:e.clientY,cx:S.edit.tile.cx,cy:S.edit.tile.cy,k:S.edit.canvas.width/pr.width};box.classList.add("grab")});
document.addEventListener("pointermove",e=>{if(!drag||e.pointerId!==drag.id)return;const E=S.edit,T=E.tile,W=E.canvas.width,H=E.canvas.height;
  T.cx=Math.max(T.hw,Math.min(W-T.hw,drag.cx+(e.clientX-drag.x)*drag.k));T.cy=Math.max(T.hh,Math.min(H-T.hh,drag.cy+(e.clientY-drag.y)*drag.k));
  placeBox();if(!dragRAF)dragRAF=requestAnimationFrame(()=>{dragRAF=0;drawTilePrev()})});
function endDrag(e){if(!drag||e.pointerId!==drag.id)return;drag=null;const b=$("#box");if(b)b.classList.remove("grab");
  const E=S.edit;E.tile.cx=Math.round(E.tile.cx);E.tile.cy=Math.round(E.tile.cy);applyTileScale();placeBox();drawTilePrev()}
document.addEventListener("pointerup",endDrag);document.addEventListener("pointercancel",endDrag);
window.addEventListener("resize",()=>{if(S.phase==="editing")placeBox()});

async function startEdit(file){
  if(!file||!file.type||!file.type.startsWith("image/")){toast("이미지 파일만 받아요");return false}
  const url=URL.createObjectURL(file);let img;
  try{img=await loadImg(url)}catch(e){toast("이 사진은 열 수 없어요. HEIC라면 JPG로 바꿔서 올려주세요");return false}
  const keep=S.edit&&S.phase==="editing"?S.edit.form:{place:"",species:"",crisp:50,memo:""};
  const oc=document.createElement("canvas"),os=Math.min(1,1000/Math.max(img.naturalWidth,img.naturalHeight));oc.width=Math.round(img.naturalWidth*os);oc.height=Math.round(img.naturalHeight*os);oc.getContext("2d").drawImage(img,0,0,oc.width,oc.height);
  const ai=Math.floor(Math.random()*ASPECTS.length);
  S.edit={img,srcURL:oc.toDataURL("image/jpeg",.88),sens:50,showOrig:false,rot:0,tscale:1,ai,aspect:ASPECTS[ai],seed:(Date.now()%100000)+1,form:keep,palette:[],cutURL:"",ok:true,canvas:null};
  S.phase="editing";recut();renderToday();return true;
}
async function takeFile(f){
  if(S.phase==="loading"){toast("표본장을 여는 중이에요. 잠시 뒤 다시 해주세요");return}
  if(S.phase==="editing")readForm();
  closeModal();
  if(await startEdit(f)){const t=$(".sechead");if(t)t.scrollIntoView({behavior:"smooth",block:"start"})}
}
function recut(){
  const E=S.edit,r=cutout(E.img,E.sens);E.canvas=r.canvas;E.ok=r.ok;E.cutURL=r.canvas.toDataURL("image/png");E.palette=extractPalette(r.canvas);
  E.tile=autoTile(r.canvas,E.aspect);E.finder=null;
}
let recutT=null;
function scheduleRecut(){const b=$("#busy");if(b)b.hidden=false;clearTimeout(recutT);recutT=setTimeout(()=>{recut();paintEdit();const b2=$("#busy");if(b2)b2.hidden=true},140)}
function readForm(){const E=S.edit;if(!E)return;const g=id=>{const e=document.getElementById(id);return e?e.value.trim():E.form[id]||""};E.form.place=g("place");E.form.species=g("species");E.form.memo=g("memo")}

function encodeLeaf(canvas){
  let max=560,url="";
  for(let tries=0;tries<5;tries++){
    const s=Math.min(1,max/Math.max(canvas.width,canvas.height)),c=document.createElement("canvas");
    c.width=Math.max(1,Math.round(canvas.width*s));c.height=Math.max(1,Math.round(canvas.height*s));c.getContext("2d").drawImage(canvas,0,0,c.width,c.height);
    url=c.toDataURL("image/webp",0.86);if(!url.startsWith("data:image/webp"))url=c.toDataURL("image/png");
    if(url.length<200000)return url;max=Math.round(max*0.78);
  }
  return url;
}
async function commit(){
  readForm();const E=S.edit,k=todayKey();
  const btn=$("#commit");if(btn){btn.disabled=true;btn.textContent="등록하는 중…"}
  const o={date:k,img:encodeLeaf(E.canvas),tile:encodeTile(makeTile(E.canvas,E.tile,E.rot,360,E.seed)),ta:(E.rot%2?E.tile.hh/E.tile.hw:E.tile.hw/E.tile.hh),palette:E.palette.slice(),place:E.form.place,species:E.form.species,crisp:E.form.crisp,memo:E.form.memo,updatedAt:Date.now(),v:3};
  try{await Store.put(o)}catch(e){
    console.error(e);toast(Store.mode==="cloud"?"계정에 저장하지 못했어요. 인터넷 연결을 확인하고 다시 해주세요":"저장하지 못했어요. 잠시 뒤 다시 해주세요");
    if(btn){btn.disabled=false;btn.textContent="표본으로 등록"}return}
  S.phase="done";S.edit=null;renderAll();toast("오늘의 한 잎을 모았어요");
}

function renderShelf(){
  const list=Store.sorted(),el=$("#shelf");
  $("#shelfLead").textContent=list.length?`${list.length}잎`:"";
  $("#shelfBar").hidden=!list.length;
  document.querySelectorAll("[data-shelf]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.shelf===S.shelf));
  const lab=(o,i)=>`No.${pad3(i+1)} ${esc(dotDate(o.date))} ${esc(o.species||"")} 열기`;
  if(!list.length){el.className="";el.innerHTML=`<div class="empty">아직 비어 있어요. 첫 잎을 올려주세요.</div>`}
  else if(S.shelf==="quilt"){el.className="quilt";S.quiltW=0;layoutQuilt()}
  else{el.className="leaves";el.innerHTML=list.map((o,i)=>`<button class="leaf" data-open="${o.date}" aria-label="${lab(o,i)}"><img src="${o.img}" alt=""><small>No.${pad3(i+1)}&nbsp;&nbsp;${shortDate(o.date)}</small></button>`).join("")}
  const all=list.flatMap(o=>o.palette||[]);
  $("#autumnWrap").hidden=!all.length;
  $("#strip").innerHTML=all.map(h=>`<i style="background:${h}" title="${h} ${nearestTrad(h).t.n}"></i>`).join("");
  $("#stripCount").textContent=`${list.length}잎, ${all.length}색`;
}
/* 줄 나누기: 조각 비율을 따라 줄마다 가로를 꽉 채우는 높이를 정함 */
function quiltRows(items,W,target,gap){
  const rows=[];let row=[],sum=0;
  for(const it of items){row.push(it);sum+=it.a;const w=sum*target+gap*(row.length-1);
    if(w>=W){const h=(W-gap*(row.length-1))/sum;rows.push({items:row,h});row=[];sum=0}}
  if(row.length){const h=Math.min(target,(W-gap*(row.length-1))/sum);rows.push({items:row,h,last:true})}
  return rows;
}
const tileAspect=o=>o.ta||1;
/* 네 모서리를 안쪽으로 크게 비튼 사각형 (0~1 비율). 같은 잎은 늘 같은 모양 */
function cutQuad(key){
  const r=mulberry(strHash("cut"+key)),j=()=>.012+r()*.1;
  return[[j(),j()],[1-j(),j()],[1-j(),1-j()],[j(),1-j()]];
}
const quadCSS=q=>`polygon(${q.map(([a,b])=>`${(a*100).toFixed(1)}% ${(b*100).toFixed(1)}%`).join(",")})`;
function layoutQuilt(){
  const el=$("#shelf");if(!el||!el.classList.contains("quilt"))return;
  const cs=getComputedStyle(el),W=Math.floor(el.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight));
  if(W<=0||W===S.quiltW)return;S.quiltW=W;
  const list=Store.sorted(),gap=W<560?2:3,target=W<560?92:Math.max(120,Math.min(170,W/6));
  el.style.setProperty("--qg",gap+"px");
  const items=list.map((o,i)=>({o,i,a:tileAspect(o)})),rows=quiltRows(items,W,target,gap);
  el.innerHTML=rows.map(r=>`<div class="qrow" style="height:${r.h.toFixed(1)}px${r.last?";justify-content:center":""}">`+r.items.map(({o,i,a})=>{const rr=mulberry(strHash(o.date)),rot=((rr()-.5)*1.6).toFixed(2);
    return`<button data-open="${o.date}" aria-label="No.${pad3(i+1)} ${esc(dotDate(o.date))} ${esc(o.species||"")} 열기" style="width:${(a*r.h).toFixed(1)}px;height:${r.h.toFixed(1)}px;transform:rotate(${rot}deg)">${o.tile?`<img src="${o.tile}" alt="" style="clip-path:${quadCSS(cutQuad(o.date))}">`:`<img class="whole" src="${o.img}" alt="">`}<small>${shortDate(o.date)}</small></button>`}).join("")+`</div>`).join("");
}
let quiltT=null;
try{new ResizeObserver(()=>{clearTimeout(quiltT);quiltT=setTimeout(layoutQuilt,80)}).observe($("#shelf"))}catch(e){}
function uniqueTop(list,n){const out=[];for(const h of list){if(out.some(o=>{const a=rgb2lab(...hex2rgb(o)),b=rgb2lab(...hex2rgb(h));return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])<10}))continue;out.push(h);if(out.length>=n)break}return out}

function renderDict(){
  const groups=[...new Set(TRAD.map(t=>t.g))];$("#dictN").textContent=TRAD.length+"색";
  $("#dict").innerHTML=groups.map(g=>`<div class="dgroup">${g}</div>`+TRAD.filter(t=>t.g===g).map(t=>`<div class="dcard"><i style="background:${t.hex}"></i><div class="tname">${gsvg(CSF,t.n,C.ink)}<span class="th">${t.h}</span></div><p>${esc(t.d)}</p><div class="hx">${t.hex}</div></div>`).join("")).join("");
}
function renderFoot(){$("#foot").textContent=Store.mode==="cloud"?"표본은 내 계정에 보관돼요.":Store.mode==="local"?"로그인 전에는 이 브라우저에만 보관돼요.":"이 화면에서는 표본이 저장되지 않아요.";
  const l=$("#footLinks");if(l)l.innerHTML=`<a class="plink" href="/privacy.html">개인정보처리방침</a>${Store.user?`<button class="plink" data-act="leave">탈퇴하기</button>`:""}`}
let heroT=null;
function renderAll(){renderToday();renderShelf();renderFoot();renderHeroMeta();clearTimeout(heroT);heroT=setTimeout(renderHero,60)}

/* ---------- 모달 ---------- */
function openModal(html){$("#modalBody").innerHTML=html;$("#overlay").classList.add("on");const f=$("#modalBody button");if(f)f.focus({preventScroll:true})}
function closeModal(){$("#overlay").classList.remove("on");$("#modalBody").innerHTML="";S.modalKey=null}
async function openLeaf(k){
  const o=Store.items.get(k);if(!o)return;S.modalKey=k;const no=Store.numberOf(k);
  openModal(`<div class="row" style="justify-content:space-between;border-bottom:1px solid ${C.ink};padding-bottom:8px;margin-bottom:14px;font-size:13px"><span class="hexes"><span>No.${pad3(no)}</span><span>${dotDate(k)}</span></span><button class="btn" data-close>닫기</button></div>
    <img class="cardimg" id="mCard" alt="표본 카드 No.${pad3(no)}">
    <p class="subhead" style="margin-top:24px">이 잎의 색이름</p>${tradList(o.palette||[])}
    <div class="row" style="margin-top:18px"><button class="btn primary" data-act="saveCard" data-key="${k}">표본 카드 저장</button><button class="btn" data-act="savePal" data-key="${k}">색 팔레트 저장하기</button><button class="btn" data-act="copyHex" data-key="${k}">HEX 복사</button></div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" data-act="del" data-key="${k}">이 잎 지우기</button></div>`);
  const cv=await renderCard(o);const im=$("#mCard");if(im)im.src=cv.toDataURL("image/png");
}

/* ---------- 이벤트 ---------- */
document.addEventListener("click",async e=>{
  if(e.target===$("#overlay")){closeModal();return}
  const t=e.target.closest("button,[data-close]");if(!t)return;
  if(t.hasAttribute("data-close")){closeModal();return}
  if(t.dataset.open){openLeaf(t.dataset.open);return}
  if(t.dataset.shelf){S.shelf=t.dataset.shelf;renderShelf();return}
  if(t.dataset.act==="login"){openLogin();return}
  if(t.dataset.act==="oauth"){oauth(t.dataset.provider);return}
  if(t.dataset.act==="logout"){await sb.auth.signOut();toast("로그아웃했어요");return}
  if(t.dataset.act==="leave"){openLeave();return}
  if(t.dataset.act==="leaveGo"){leaveGo();return}
  if(t.dataset.act==="mailBack"){$("#mailStep2").hidden=true;$("#mailStep1").hidden=false;$("#codeIn").value="";$("#mailIn").focus();return}
  const act=t.dataset.act,key=t.dataset.key,o=key?Store.items.get(key):null;
  if(act==="rot"){readForm();S.edit.rot=(S.edit.rot+1)%4;paintEdit();return}
  if(act==="shape"){readForm();const E=S.edit;E.ai=(E.ai+1)%ASPECTS.length;E.aspect=ASPECTS[E.ai];if(!applyTileScale())E.tile=autoTile(E.canvas,E.aspect);const W=E.canvas.width,H=E.canvas.height;E.tile.cx=Math.max(E.tile.hw,Math.min(W-E.tile.hw,E.tile.cx));E.tile.cy=Math.max(E.tile.hh,Math.min(H-E.tile.hh,E.tile.cy));placeBox();drawTilePrev();return}
  if(act==="autoTile"){readForm();S.edit.tile=autoTile(S.edit.canvas,S.edit.aspect);S.edit.tscale=1;const ts=$("#tsize");if(ts)ts.value=100;paintEdit();return}
  if(act==="saveQuilt"){const l=Store.sorted();if(!l.length)return;const cv=await renderQuilt(l);return offer(cv,`단풍조각보_${todayKey()}.png`)}
  if(act==="commit")return commit();
  if(act==="cancel"){S.edit=null;S.phase=Store.items.get(todayKey())&&t.textContent==="취소"?"done":"empty";renderToday();return}
  if(act==="redo"){S.phase="empty";renderToday();return}
  if(act==="backDone"){S.phase="done";renderToday();return}
  if(act==="toggleOrig"){readForm();S.edit.showOrig=!S.edit.showOrig;t.setAttribute("aria-pressed",S.edit.showOrig);t.textContent=S.edit.showOrig?"누끼 보기":"원본 보기";paintEdit();return}
  if(act==="saveCard"&&o){const cv=await renderCard(o);return offer(cv,`단풍표본_No${pad3(Store.numberOf(key))}_${key}.png`)}
  if(act==="savePal"&&o){const cv=await renderPalette(o.palette||[],"이 잎의 색",`No.${pad3(Store.numberOf(key))}   ${dotDate(key)}`);return offer(cv,`단풍팔레트_${key}.png`)}
  if(act==="copyHex"&&o)return copyText(hexLines(o.palette||[]));
  if(act==="del"&&o){
    if(t.dataset.confirm!=="1"){t.dataset.confirm="1";t.textContent="한 번 더 누르면 지워져요";return}
    try{await Store.del(key)}catch(err){toast("지우지 못했어요");return}
    closeModal();if(key===todayKey())S.phase="empty";renderAll();toast("지웠어요");return}
});
$("#stripCopy").addEventListener("click",()=>copyText(Store.sorted().map(o=>`${dotDate(o.date)}\n${hexLines(o.palette||[])}`).join("\n\n")));
$("#stripSave").addEventListener("click",async()=>{const top=uniqueTop(Store.sorted().flatMap(o=>o.palette||[]),8);const cv=await renderPalette(top,"올해의 가을색",`${Store.items.size}잎에서 고른 ${top.length}색`);offer(cv,`올해의가을색_${todayKey()}.png`)});
document.addEventListener("input",e=>{
  if(e.target.id==="sens"){S.edit.sens=+e.target.value;$("#sensv").textContent=S.edit.sens;scheduleRecut()}
  if(e.target.id==="crisp"){const v=+e.target.value;S.edit.form.crisp=v;$("#crispv").textContent=`${v}점 ${crispWord(v)}`}
  if(e.target.id==="tsize"){S.edit.tscale=+e.target.value/100;applyTileScale();placeBox();drawTilePrev()}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#overlay").classList.contains("on"))closeModal()});

/* 끌어다 놓기·붙여넣기: 페이지 어디서나 */
const hasFiles=e=>e.dataTransfer&&[...(e.dataTransfer.types||[])].includes("Files");
let dragDepth=0;
window.addEventListener("dragenter",e=>{if(!hasFiles(e))return;e.preventDefault();dragDepth++;$("#dropov").classList.add("on")});
window.addEventListener("dragover",e=>{if(hasFiles(e)){e.preventDefault();e.dataTransfer.dropEffect="copy"}});
window.addEventListener("dragleave",e=>{if(!hasFiles(e))return;dragDepth=Math.max(0,dragDepth-1);if(!dragDepth)$("#dropov").classList.remove("on")});
window.addEventListener("drop",e=>{if(!hasFiles(e))return;e.preventDefault();dragDepth=0;$("#dropov").classList.remove("on");
  const f=[...e.dataTransfer.files].find(f=>f.type&&f.type.startsWith("image/"));if(f)takeFile(f);else toast("이미지 파일만 받아요")});
window.addEventListener("paste",e=>{
  const items=[...((e.clipboardData&&e.clipboardData.items)||[])],it=items.find(i=>i.kind==="file"&&i.type.startsWith("image/"));
  if(!it)return;e.preventDefault();takeFile(it.getAsFile());
});

/* ---------- 시작 ---------- */
{const b=TITLE.bb,ph=(b[3]-b[1])*.02;$("#bigTitle").innerHTML=`<svg viewBox="${b[0]} ${b[1]-ph} ${b[2]-b[0]} ${b[3]-b[1]+ph*2}" fill="${C.verm}" role="img" aria-label="단풍표본실"><path d="${TITLE.text}"/><path d="${TITLE.leaf}"/></svg>`}
renderHeroMeta();renderHero();
(async()=>{try{await Store.init()}catch(e){console.error(e);Store.mode="local";await Store.loadLocal();toast("계정 표본장을 불러오지 못해서 이 브라우저 표본을 보여드려요")}
  S.phase=Store.items.get(todayKey())?"done":"empty";renderAll();renderAuth()})();
