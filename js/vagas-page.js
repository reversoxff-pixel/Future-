document.addEventListener("DOMContentLoaded",()=>{
const jobs=[
{title:"Aprendiz administrativo",company:"Alpha Desenvolvimento",type:"Jovem aprendiz",place:"São Paulo",desc:"Aprendizado de rotinas administrativas, organização de documentos e apoio à equipe."},
{title:"Estágio em tecnologia",company:"Tech Inovação",type:"Estágio",place:"São Paulo",desc:"Oportunidade educativa para estudantes interessados em programação e tecnologia."},
{title:"Auxiliar de atendimento",company:"Conecta Serviços",type:"Primeiro emprego",place:"São Paulo",desc:"Desenvolvimento de comunicação, atendimento e organização no ambiente profissional."},
{title:"Assistente de criação",company:"Digital Criativa",type:"Estágio",place:"Remoto",desc:"Contato com comunicação visual, ferramentas digitais e criatividade."},
{title:"Jovem aprendiz em atendimento",company:"Nova Geração",type:"Jovem aprendiz",place:"São Paulo",desc:"Aprendizagem de atendimento, trabalho em equipe e rotina de uma empresa."},
{title:"Assistente de suporte",company:"Mundo Digital",type:"Primeiro emprego",place:"Remoto",desc:"Noções de suporte técnico, tecnologia e atendimento ao usuário."}
];
const search=document.getElementById("job-search"),type=document.getElementById("job-type"),place=document.getElementById("job-place"),results=document.getElementById("job-results"),count=document.getElementById("job-count");
function render(){const q=search.value.toLowerCase().trim();const filtered=jobs.filter(j=>(!q||[j.title,j.company,j.desc,j.type].join(" ").toLowerCase().includes(q))&&(!type.value||j.type===type.value)&&(!place.value||j.place===place.value));count.textContent=filtered.length+" oportunidade(s) demonstrativa(s) encontrada(s).";results.innerHTML=filtered.length?filtered.map(j=>`<article class="info-card course-card"><div class="feature-icon"><i data-lucide="briefcase-business"></i></div><span class="eyebrow">${j.type}</span><h3>${j.title}</h3><p>${j.company} · ${j.place}</p><p>${j.desc}</p><div class="course-meta"><span>Bolsa/salário a combinar</span></div></article>`).join(""):'<div class="empty-state">Nenhuma oportunidade encontrada. Tente alterar os filtros.</div>';if(window.lucide)lucide.createIcons()}
[search,type,place].forEach(el=>el.addEventListener("input",render));const q=new URLSearchParams(location.search).get("q");if(q)search.value=q;render();
});