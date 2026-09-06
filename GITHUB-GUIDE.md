# 通过 GitHub 管理 Maject Notes

## 首次发布

将本目录全部源文件上传到 `maguire2598/maguire2598.github.io` 仓库根目录，包含隐藏目录 `.github`、package.json、package-lock.json、scripts、content 和 assets。不上传 node_modules 或 dist。

在 Settings → Pages → Source 选择 **GitHub Actions**，替代之前的 Deploy from a branch。提交到 main 后自动检查、构建和发布。首次启用后也可在 Actions 手动运行 Publish Maject Notes。

目前完成的是本地集成，尚未连接远程仓库。网站管理链接在仓库上传后可用。

## 上传文章或笔记

在 GitHub 打开 `content/articles`（文章）或 `content/notes`（笔记），点击 Add file → Create new file 或 Upload files。文件后缀 `.md`，填写下面的格式后 Commit changes 到 main。

```markdown
---
title: 我的第一篇文章
slug: my-first-post
date: 2026-09-06
description: 用一句话介绍文章。
tags: [学习, 实践]
draft: false
featured: false
---

## 今天学到什么

这里写正文，支持 **加粗**、列表、表格、引用和代码块。

![图片说明](content/uploads/example.png)
```

slug 是全站唯一的小写英文、数字、连字符标识，发布后保持不变。date 使用 YYYY-MM-DD。featured: true 设为精选文章（多个时优先日期较新者）。标签自动生成。现有 7 篇示例已迁移成 Markdown；换成自己的内容时删除 example: true。

页脚“管理内容”打开 GitHub 内容目录；文章底部“在 GitHub 编辑”打开对应文件。只有拥有仓库写入权限的账号能提交修改。

## 图片与 Obsidian

图片上传到 content/uploads，正文使用 `![说明](content/uploads/文件名.png)`。建议文件名用英文。Obsidian 笔记需要标准 Markdown，暂不转换 [[双链]]、![[附件]] 或 Dataview。

## 草稿与错误

draft: true 不进入网站产物，但公开仓库的源文件仍然公开，私人草稿应留在本地。删除 Markdown 并提交可从网站移除文章。缺少属性、错误日期、重复 slug 会使构建失败并指出文件，不会用错误构建替换旧网站。

## 本地预览

安装 Node.js 22 或以上，依次运行：

```sh
npm ci
npm test
npm run build
python -m http.server 4173 --directory dist
```

访问 http://localhost:4173。修改文件后重新构建并刷新。预览 dist，而不是源目录。项目介绍暂在 index.html 维护。
