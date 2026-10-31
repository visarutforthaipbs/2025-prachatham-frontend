/* Shared helpers. Inlined by build.py. No data lives here. */
(function(){
  // Theme: explicit site choice wins; otherwise follow the system.
  // Same key + semantics as src/app/layout.tsx pre-paint script.
  var root=document.documentElement,mq=matchMedia("(prefers-color-scheme: dark)");
  function apply(){
    var t=null;try{t=localStorage.getItem("prachatham-theme")}catch(e){}
    var dark=t==="dark"||((!t||t==="system")&&mq.matches);
    root.setAttribute("data-theme",dark?"dark":"light");
  }
  apply();
  (mq.addEventListener?mq.addEventListener("change",apply):mq.addListener(apply));
  addEventListener("storage",function(e){if(e.key==="prachatham-theme")apply()});
})();
window.$=function(s,r){return(r||document).querySelector(s)};
window.el=function(tag,attrs,kids){
  var n=document.createElement(tag);
  for(var k in(attrs||{})){var v=attrs[k];if(v===false||v==null)continue;
    if(k==="text")n.textContent=v;else n.setAttribute(k,v===true?"":v)}
  (kids||[]).forEach(function(c){n.appendChild(typeof c==="string"?document.createTextNode(c):c)});
  return n};
window.fmt=function(n,d){return Number(n).toLocaleString("en-US",{minimumFractionDigits:d||0,maximumFractionDigits:d||0})};
// Display rule for per-rai values: TRUNCATE (never round up) to <=1 decimal and drop a trailing ".0".
// Why: the article prints 60,000/10,808 = 5.551.. as "5.5"; toFixed(1) would show 5.6 and contradict the text.
window.fmtT=function(n){var t=Math.floor(Number(n)*10+1e-9)/10;return fmt(t,t%1?1:0)};
// "ดูเป็นตาราง": the table is an ALTERNATIVE view. It replaces the chart in place (chart hidden, table shown),
// so the document is never taller than max(chart, table) and the fixed iframe height holds with no inner scrollbar.
window.tableToggle=function(btn,panel,chart){
  btn.addEventListener("click",function(){
    var open=panel.hasAttribute("hidden");
    if(open){panel.removeAttribute("hidden");chart.setAttribute("hidden","")}
    else{panel.setAttribute("hidden","");chart.removeAttribute("hidden")}
    btn.setAttribute("aria-pressed",open?"true":"false");
    btn.textContent=open?"ดูเป็นกราฟ":"ดูเป็นตาราง";
    btn.setAttribute("aria-label",open?"กลับไปดูกราฟ":"ดูข้อมูลเป็นตาราง");
  });
};
