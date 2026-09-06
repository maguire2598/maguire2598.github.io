import test from 'node:test';import assert from 'node:assert/strict';import {parseContent} from './content.mjs';
const source='---\ntitle: 测试\ndate: 2026-09-06\ndescription: 摘要\ntags: [Git]\n---\n## 标题\n\n**正文**';
test('解析 Markdown 和属性',()=>{const e=parseContent(source,'content/notes/test.md','学习笔记');assert.equal(e.id,'test');assert.match(e.body,/<h2>标题<\/h2>/);assert.deepEqual(e.tags,['Git']);});
test('草稿不进入公开输出',()=>assert.equal(parseContent('---\ndraft: true\n---\n私密内容','draft.md','文章'),null));
test('拒绝歧义草稿属性和错误日期',()=>{assert.throws(()=>parseContent(source.replace('title: 测试','draft: "false"\ntitle: 测试'),'test.md','文章'));assert.throws(()=>parseContent(source.replace('2026-09-06','2026-02-30'),'test.md','文章'));});
test('正文不能注入脚本或危险链接',()=>{const e=parseContent(source+'\n<script>alert(1)</script>\n[点击](javascript:alert(1))','test.md','文章');assert.ok(!e.body.includes('<script>'));assert.ok(!e.body.includes('href="javascript:'));});
