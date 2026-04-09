function updateValues(){
document.getElementById("hVal").innerText=document.getElementById("height").value;
document.getElementById("lVal").innerText=document.getElementById("load").value;
document.getElementById("sVal").innerText=document.getElementById("safety").value;
}

function runSim(){

let m=document.getElementById("material").value;
let h=document.getElementById("hazard").value;
let s=document.getElementById("structure").value;

let height=parseFloat(document.getElementById("height").value);
let load=parseFloat(document.getElementById("load").value);
let safety=parseFloat(document.getElementById("safety").value);

let score=100;

// MATERIAL
if(m==="steel") score-=8;
if(m==="concrete") score-=15;
if(m==="wood") score-=30;

// STRUCTURE
if(s==="truss") score-=5;
if(s==="frame") score-=10;
if(s==="beam") score-=15;

// HAZARDS
if(h==="earthquake") score-=25;
if(h==="flood") score-=18;
if(h==="fire") score-=20;
if(h==="typhoon") score-=28;
if(h==="landslide") score-=22;
if(h==="wind") score-=12;

// VARIABLES
score -= height * 0.4;
score -= load * 0.3;
score += safety * 12;

if(score>100) score=100;
if(score<0) score=0;

// GRADE
let grade=
score>=85?"A (Safe)":
score>=70?"B (Moderate)":
score>=50?"C (Risk)":"D (Fail)";

// OUTPUT
document.getElementById("result").innerHTML=`
<h3>Simulation Result</h3>
<p><b>Score:</b> ${Math.round(score)}</p>
<p><b>Grade:</b> ${grade}</p>
`;

// RECOMMENDATION
let rec="";

if(m==="wood") rec="Upgrade to steel or reinforced concrete.";
else if(h==="earthquake") rec="Apply seismic-resistant design.";
else if(h==="typhoon") rec="Improve aerodynamic form and anchorage.";
else if(h==="flood") rec="Elevate foundation and drainage.";
else if(height>70) rec="Reduce height or increase stiffness.";
else if(load>70) rec="Redistribute loads.";
else rec="Design is within safe engineering limits.";

document.getElementById("recommendation").innerHTML=`
<h3>Recommendation</h3>
<p>${rec}</p>
`;

// CHART
let c=document.getElementById("chart");
let ctx=c.getContext("2d");

c.width=300;
c.height=150;

ctx.clearRect(0,0,c.width,c.height);

ctx.fillStyle="#38bdf8";
ctx.fillRect(50,150,50,-score);

ctx.fillStyle="#ef4444";
ctx.fillRect(150,150,50,-(100-score));
}