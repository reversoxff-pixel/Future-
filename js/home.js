document.addEventListener("DOMContentLoaded",()=>{
 const data=[["Aprendiz administrativo","Jovem aprendiz","Alpha Desenvolvimento","São Paulo"],["Estágio em tecnologia","Estágio","Tech Inovação","São Paulo"],["Assistente de criação","Estágio","Digital Criativa","Remoto"]];
 const target=document.getElementById("home-jobs");
 if(target)target.innerHTML=data.map(v=>`<article class="job-mini"><span class="job-tag">${v[1]}</span><h3>${v[0]}</h3><p>${v[2]} · ${v[3]}</p><a class="text-link" href="pages/vagas.html">Ver oportunidade <i data-lucide="arrow-up-right"></i></a></article>`).join("");
 if(window.lucide)lucide.createIcons();
 const form=document.getElementById("home-search");if(form)form.addEventListener("submit",e=>{e.preventDefault();const q=document.getElementById("home-query").value.trim();location.href="pages/vagas.html"+(q?"?q="+encodeURIComponent(q):"")});
});