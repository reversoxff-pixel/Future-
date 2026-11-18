document.addEventListener("DOMContentLoaded",()=>{
const courses=[
["Introdução à programação","Tecnologia","Comece a entender lógica, algoritmos e os primeiros passos no desenvolvimento de sistemas.","code"],
["Informática para o trabalho","Tecnologia","Conheça ferramentas digitais, arquivos, documentos e boas práticas no computador.","monitor"],
["Comunicação profissional","Comunicação","Aprenda a se comunicar com clareza em entrevistas, equipes e ambientes de trabalho.","messages-square"],
["Atendimento ao cliente","Comunicação","Desenvolva escuta, empatia, organização e resolução de situações do dia a dia.","headset"],
["Educação financeira básica","Negócios","Entenda orçamento, planejamento e organização das finanças pessoais.","wallet"],
["Empreendedorismo na prática","Negócios","Transforme uma ideia em uma proposta de negócio com planejamento inicial.","lightbulb"],
["Como preparar seu currículo","Carreira","Organize experiências, projetos, cursos e habilidades para apresentar seu perfil.","file-user"],
["Preparação para entrevistas","Carreira","Conheça etapas de processos seletivos e como se preparar para conversar com recrutadores.","user-check"]
];
const list=document.getElementById("course-list"),search=document.getElementById("course-search"),area=document.getElementById("course-area");
function render(){const q=search.value.toLowerCase();const arr=courses.filter(c=>(!q||c.join(" ").toLowerCase().includes(q))&&(!area.value||c[1]===area.value));list.innerHTML=arr.length?arr.map(c=>`<article class="info-card course-card"><div class="feature-icon"><i data-lucide="${c[3]}"></i></div><span class="eyebrow">${c[1]}</span><h3>${c[0]}</h3><p>${c[2]}</p><div class="course-meta"><span>Conteúdo recomendado</span><span>Aprendizagem</span></div></article>`).join(""):'<div class="empty-state">Nenhum conteúdo encontrado. Experimente outra pesquisa.</div>';if(window.lucide)lucide.createIcons()}
search.addEventListener("input",render);area.addEventListener("change",render);render();
});