import{a as g,S as m,i as l}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y="53379684-45c44d339c561808b5ad44122",p="https://pixabay.com/api/";async function h(n){const t={key:y,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true"};try{return(await g.get(p,{params:t})).data}catch(o){return console.log("Error",o),null}}const a={gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")},L=new m(".gallery a",{captionsData:"alt",captionDelay:250});function S(n){const t=n.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:s,comments:d,downloads:f})=>`
        <li class="gallery-item">
          <a href="${i}">
            <img src="${o}" alt="${e}" />
          </a>
          <ul class="info">
            <li><strong>Likes</strong> ${r}</li>
            <li><strong>Views</strong> ${s}</li>
            <li><strong>Comments</strong> ${d}</li>
            <li><strong>Downloads</strong> ${f}</li>
          </ul>
        </li>`).join("");a.gallery.insertAdjacentHTML("beforeend",t),L.refresh()}function b(){a.gallery.innerHTML=""}function q(){a.loader.classList.remove("hidden")}function c(){a.loader.classList.add("hidden")}const u=document.querySelector(".form"),w=u.querySelector("input[name='search-text']");u.addEventListener("submit",P);async function P(n){n.preventDefault();const t=w.value.trim();if(!t){l.error({message:"Please enter a search query!",position:"topRight"});return}b(),q();try{const o=await h(t);if(c(),o.hits.length===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}S(o.hits)}catch{c(),l.error({message:"Error fetching data. Try again later.",position:"topRight"})}}
//# sourceMappingURL=index.js.map
