const entries=[
{id:'welcome',type:'文章',title:'给想法一个可以停留的地方',tag:'随笔',desc:'关于 Maject Notes，以及从第一篇记录开始的这件小事。',body:'<p>这是一篇用于预览排版的示例文章，你可以替换为自己的第一篇博客。</p><h2>从记录开始</h2><p>不必等到知识形成完整的体系。一个问题、一次尝试、一段终于看懂的代码，都可以成为记录的起点。</p><h2>让想法留下来</h2><p>Maject Notes 分为项目、文章和学习笔记三个板块。项目放实践成果，文章展开想法，学习笔记保存那些刚刚弄懂的小问题。</p>'},
{id:'learn-by-building',type:'文章',title:'在动手做的过程中，重新理解学习',tag:'学习与实践',desc:'把「看懂了」变成「做出来」，中间还差什么？',body:'<p>界面示例文章，非作者已发表作品。</p><h2>理解需要一次检验</h2><p>看完教程之后，关掉参考资料，试着独立完成一个最小的例子。做不出来的部分，往往就是下一步需要学习的部分。</p><h2>记录卡住的地方</h2><p>保留问题、猜想和验证过程。这些记录比单独收藏一个答案更有助于下一次独立解决问题。</p>'},
{id:'notes-that-help',type:'文章',title:'笔记不是收藏夹，而是思考的痕迹',tag:'知识管理',desc:'少抄一点，多写一句「我是怎么理解的」。',body:'<p>界面示例文章，非作者已发表作品。</p><h2>用自己的话解释</h2><p>阅读之后，先试着概括核心观点，再补充一个自己熟悉的例子。原文可以作为引用，自己的理解应该成为笔记的主体。</p>'},
{id:'small-project',type:'文章',title:'从一个小项目开始，让想法落地',tag:'项目手记',desc:'先完成一个能运行的小版本，再慢慢把它变好。',body:'<p>界面示例文章，非作者已发表作品。</p><h2>给第一版设一个边界</h2><p>选择一个真实的问题，让第一个版本只完成一件事。观察它是否解决问题，再决定下一步。</p>'},
{id:'git-basics',type:'学习笔记',title:'Git 常用命令：从提交到同步',tag:'Git',desc:'工作区、暂存区与仓库，一次理清日常操作。',body:'<p>示例学习笔记。</p><h2>检查与提交</h2><pre><code>git status\ngit add 文件名\ngit commit -m "描述这次修改"\ngit push</code></pre><p>提交前检查差异，确认没有密码或私人文件。commit 保存本地版本，push 才会上传到远程仓库。</p>'},
{id:'markdown',type:'学习笔记',title:'Markdown 排版速查：写作需要的那些语法',tag:'Markdown',desc:'标题、列表、链接与代码块，让内容保持清晰。',body:'<p>示例学习笔记。</p><h2>常用语法</h2><pre><code># 一级标题\n## 二级标题\n- 列表条目\n**加粗文字**\n[链接名称](https://example.com)</code></pre><p>一个段落讲一件事。用标题标记主题，用列表整理并列的内容。</p>'},
{id:'active-recall',type:'学习笔记',title:'主动回忆：合上书以后，还能讲出多少？',tag:'学习方法',desc:'把重读换成提问，用一次回忆发现理解的空白。',body:'<p>示例学习笔记。</p><h2>一个简单的练习</h2><p>读完一小节后，先合上资料，写出三个核心要点。然后重新打开资料，检查遗漏和错误。</p><p>把没答出来的地方记成问题，留待下一次复习。</p>'}
];
const $=s=>document.querySelector(s);let tag='全部';
$('#article-list').innerHTML=entries.filter(e=>e.type==='文章'&&e.id!=='welcome').map(e=>`<a class="article-row" href="#read/${e.id}"><div class="meta"><span>${e.tag}</span><span>示例文章</span></div><h3>${e.title} ↗</h3><p>${e.desc}</p></a>`).join('');
function notes(){const q=$('#search').value.trim().toLowerCase();const items=entries.filter(e=>e.type==='学习笔记'&&(tag==='全部'||e.tag===tag)&&`${e.title}${e.desc}`.toLowerCase().includes(q));$('#note-list').innerHTML=items.map((e,i)=>`<a class="note-row" href="#read/${e.id}"><span class="note-number">0${i+1}</span><div><h3>${e.title}</h3><p>${e.desc}</p></div><span class="note-tag"># ${e.tag}</span><span>↗</span></a>`).join('');$('#empty').hidden=items.length>0;}
document.querySelectorAll('[data-tag]').forEach(b=>b.addEventListener('click',()=>{tag=b.dataset.tag;document.querySelectorAll('[data-tag]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});notes();}));$('#search').addEventListener('input',notes);notes();
function route(){const detail=location.hash.startsWith('#read/');$('#home').hidden=detail;$('#reader').hidden=!detail;if(detail){const e=entries.find(e=>`#read/${e.id}`===location.hash);$('#reader-title').textContent=e?.title||'这篇笔记还没有写下';$('#reader-type').textContent=e?`${e.type} / ${e.tag} / 示例内容`:'';$('#reader-body').innerHTML=e?.body||'<p>请返回笔记本，看看其他内容。</p>';document.title=`${e?.title||'未找到笔记'} · Maject Notes`;window.scrollTo(0,0);}else document.title='Maject Notes · 学习与创造的记录';}addEventListener('hashchange',route);route();
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
