document.addEventListener("DOMContentLoaded",()=>{
 const iconify=()=>{if(window.lucide)lucide.createIcons()};
 iconify();
 const toggle=document.querySelector(".menu-toggle"), links=document.querySelector(".nav-links");
 if(toggle&&links){toggle.addEventListener("click",()=>{const open=links.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.innerHTML=open?'<i data-lucide="x"></i>':'<i data-lucide="menu"></i>';iconify()});links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.innerHTML='<i data-lucide="menu"></i>';iconify()}))}
 const header=document.querySelector(".header");if(header)window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>25));
 document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
 document.querySelectorAll(".reveal").forEach(el=>{if(!("IntersectionObserver"in window)){el.classList.add("visible");return}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});io.observe(el)});
});