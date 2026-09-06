const entries=window.MAJECT_CONTENT||[];
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const repo='https://github.com/maguire2598/maguire2598.github.io';
let tag='全部';
const articles=entries.filter(e=>e.type==='文章'), featured=articles.find(e=>e.featured)||articles[0];
const feature=$('.featured');
if(featured){feature.href='#read/'+featured.id;feature.innerHTML='<span class="eyebrow">'+(featured.example?'示例文章':'精选文章')+'</span><h3>'+esc(featured.title)+'</h3><p>'+esc(featured.desc)+'</p><div class="featured-bottom"><span>'+esc(featured.date)+'</span><span>↗</span></div>';}else feature.hidden=true;
$('#article-list').innerHTML=articles.filter(e=>e!==featured).map(e=>'<a class="article-row" href="#read/'+e.id+'"><div class="meta">'+esc(e.date)+' / '+esc(e.tag)+(e.example?' / 示例':'')+'</div><h3>'+esc(e.title)+' ↗</h3><p>'+esc(e.desc)+'</p></a>').join('')||'<p>更多文章，陆续记录。</p>';
const noteEntries=entries.filter(e=>e.type==='学习笔记');
const tags=['全部',...new Set(noteEntries.flatMap(e=>e.tags).filter(t=>t!=='全部'))];
$('.filters').innerHTML=tags.map(t=>'<button data-tag="'+esc(t)+'" aria-pressed="'+(t===tag)+'" class="'+(t===tag?'active':'')+'">'+esc(t)+'</button>').join('');
function notes(){const q=$('#search').value.trim().toLowerCase();const items=noteEntries.filter(e=>(tag==='全部'||e.tags.includes(tag))&&[e.title,e.desc,...e.tags].join(' ').toLowerCase().includes(q));$('#note-list').innerHTML=items.map((e,i)=>'<a class="note-row" href="#read/'+e.id+'"><span class="note-number">'+String(i+1).padStart(2,'0')+'</span><div><h3>'+esc(e.title)+'</h3><p>'+esc(e.desc)+(e.example?' · 示例笔记':'')+'</p></div><span class="note-tag"># '+esc(e.tag)+'</span><span>↗</span></a>').join('');$('#empty').hidden=items.length>0;}
document.querySelectorAll('[data-tag]').forEach(b=>b.addEventListener('click',()=>{tag=b.dataset.tag;document.querySelectorAll('[data-tag]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});notes();}));
$('#search').addEventListener('input',notes);notes();
const edit=document.createElement('a');edit.className='text-link';edit.textContent='在 GitHub 编辑 ↗';edit.target='_blank';edit.rel='noopener';$('#reader').append(edit);
function route(){const detail=location.hash.startsWith('#read/');$('#home').hidden=detail;$('#reader').hidden=!detail;if(detail){const e=entries.find(e=>'#read/'+e.id===location.hash);$('#reader-title').textContent=e?.title||'这篇笔记还没有写下';$('#reader-type').textContent=e?[e.type,e.date,...e.tags,e.example?'示例内容':''].filter(Boolean).join(' / '):'';$('#reader-body').innerHTML=e?.body||'<p>请返回笔记本，看看其他内容。</p>';edit.hidden=!e;if(e){edit.href=repo+'/edit/main/'+e.file.split('/').map(encodeURIComponent).join('/');$('#reader > a').href=e.type==='学习笔记'?'#notes':'#articles';}document.title=(e?.title||'未找到笔记')+' · Maject Notes';window.scrollTo(0,0);}else document.title='Maject Notes · 学习与创造的记录';}
addEventListener('hashchange',route);route();
let crawling=false;
const video=$('#frog-video');
function autoplayFrog(){
  video.muted=true;
  video.autoplay=true;
  video.loop=true;
  video.play().catch(()=>{});
}
video.addEventListener('canplay',autoplayFrog);
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden) autoplayFrog();
});
autoplayFrog();
function swap(){
  crawling=!crawling;
  video.src=crawling?'assets/frog-crawl.mp4':'assets/frog-idle.mp4';
  $('#frog-state').textContent=crawling?'02 / 趴着爬行':'01 / 站着看你';
  autoplayFrog();
}
$('#frog').addEventListener('click',swap);
$('#switch-frog').addEventListener('click',swap);
