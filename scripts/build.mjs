import {readdir,readFile,mkdir,writeFile,cp} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseContent} from './content.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const entries=[];
async function walk(dir,type){for(const item of await readdir(resolve(root,dir),{withFileTypes:true})){const file=`${dir}/${item.name}`;if(item.isDirectory())await walk(file,type);else if(/\.md$/i.test(item.name)){const entry=parseContent(await readFile(resolve(root,file),'utf8'),file,type);if(entry)entries.push(entry);}}}
await walk('content/articles','文章');await walk('content/notes','学习笔记');
const ids=new Set();for(const entry of entries){if(ids.has(entry.id))throw new Error(`重复 slug: ${entry.id}`);ids.add(entry.id);}
entries.sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
await mkdir(resolve(root,'dist'),{recursive:true});
for(const file of ['index.html','style.css','app.js','assets'])await cp(resolve(root,file),resolve(root,'dist',file),{recursive:true});
await writeFile(resolve(root,'dist/content.js'),`window.MAJECT_CONTENT = ${JSON.stringify(entries).replace(/</g,'\\u003c')};\n`);
await writeFile(resolve(root,'dist/.nojekyll'),'');
await cp(resolve(root,'content/uploads'),resolve(root,'dist/content/uploads'),{recursive:true});
console.log(`已生成 ${entries.length} 篇 Markdown 内容，输出到 dist/`);
