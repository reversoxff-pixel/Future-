document.addEventListener("DOMContentLoaded",()=>{
const form=document.getElementById("cv-form"),output=document.getElementById("cv-output");
const val=id=>document.getElementById(id).value.trim();
const put=(id,value)=>document.getElementById(id).textContent=value||"Não informado.";
form.addEventListener("submit",e=>{e.preventDefault();put("out-name",val("cv-name"));const contact=[val("cv-email"),val("cv-phone"),val("cv-city")].filter(Boolean).join(" · ");put("out-contact",contact);put("out-objective",val("cv-objective"));put("out-education",val("cv-education"));put("out-experience",val("cv-experience"));put("out-skills",val("cv-skills"));output.classList.remove("hidden");document.getElementById("cv-message").textContent="Seu currículo foi montado. Confira a prévia e use o botão para imprimir ou salvar como PDF.";output.scrollIntoView({behavior:"smooth",block:"start"})});
document.getElementById("print-cv").addEventListener("click",()=>window.print());
});