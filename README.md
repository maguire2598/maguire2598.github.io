# Maject Notes 界面预览

运行 npm ci、npm run build，然后使用静态 HTTP 服务器预览 dist 目录。

已实现：暖色响应式首页、两个真实 GitHub 项目链接、文章阅读视图、学习笔记搜索与标签筛选、两种奶蛙形态切换。奶蛙始终静音自动循环播放，无需手动播放。

文章和学习笔记已改为从 content/articles 和 content/notes 中的 Markdown 生成。已包含 GitHub Actions 自动发布配置、内容管理入口和逐篇编辑链接。详细步骤见 [GitHub 管理指南](GITHUB-GUIDE.md)。现有内容仍标为示例，发布自己的内容时移除 example 属性。项目介绍在 index.html 中维护。

样式位于 style.css。奶蛙素材位于 assets，站立形态为原视频前 5 秒，无笑场；爬行形态约 20 秒。两段均无音轨。

本目录为完整静态界面文件，可用于后续 GitHub Pages 集成。当前未在线发布。
