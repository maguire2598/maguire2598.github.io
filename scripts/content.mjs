import MarkdownIt from 'markdown-it';
import { parse } from 'yaml';
const md = new MarkdownIt({ html: false, linkify: true });
export function parseContent(source, file, type) {
  const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`${file}: 缺少 YAML 属性区`);
  const data = parse(match[1]);
  if (!data || typeof data !== 'object') throw new Error(`${file}: 属性必须是对象`);
  if (data.draft !== undefined && typeof data.draft !== 'boolean') throw new Error(`${file}: draft 必须是 true 或 false`);
  if (data.draft === true) return null;
  for (const key of ['title','date','description']) if (typeof data[key] !== 'string' || !data[key].trim()) throw new Error(`${file}: 缺少有效 ${key}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0,10)!==data.date) throw new Error(`${file}: 日期必须是有效 YYYY-MM-DD`);
  if (!match[2].trim()) throw new Error(`${file}: 正文为空`);
  const tags=data.tags ?? [];
  if(!Array.isArray(tags)||tags.some(t=>typeof t!=='string'||!t.trim())) throw new Error(`${file}: tags 必须是文字列表`);
  const id=data.slug ?? file.split('/').pop().replace(/\.md$/i,'');
  if(typeof id!=='string'||!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error(`${file}: 请填写由小写英文、数字和连字符组成的 slug`);
  return {id,type,title:data.title,date:data.date,desc:data.description,tags,tag:tags[0]||'未分类',featured:data.featured===true,example:data.example===true,file,body:md.render(match[2])};
}
