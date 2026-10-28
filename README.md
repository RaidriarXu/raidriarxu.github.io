# Hongyu Xu — personal website

面向美国 Software Engineer / Applied AI / AI Agent 岗位的英文个人网站，包含首页和 Tangerine Intelligence 项目详情页。采用 Next.js App Router、TypeScript 和 Tailwind CSS，构建输出为 `out/` 中的静态文件，不需要运行时服务器或数据库。

## 本地运行

使用 Node.js 22 或更新版本（部署工作流使用 Node.js 24）和 npm。

```powershell
npm ci
npm run dev
```

打开终端显示的本地地址。首次安装会使用 npm 网络连接；字体由项目依赖提供并打包到站点中，访问者不需要连接 Google Fonts。

检查和预览生产构建：

```powershell
npm run typecheck
npm run build
npm run verify:export
npm run preview
```

`preview` 直接提供 `out/`，因此也能验证真正部署后的静态路由。默认地址为 `http://127.0.0.1:3000`；端口被占用时使用 `npm run preview -- --port 3100`。修改源码后需要重新构建才能更新该预览。`npm run dev` 会自动更新。

## 修改文案、链接和项目

英文文案和事实字段集中在 [`src/content/site.ts`](src/content/site.ts)。主要对象包括：

| 对象                          | 内容                                                                       |
| ----------------------------- | -------------------------------------------------------------------------- |
| `profile`                     | 姓名、教育背景、毕业时间、个人介绍、求职方向、邮件及职业主页链接           |
| `projects`                    | 三个项目的简介、个人贡献、技术、图片及公开链接                             |
| `tangerine`                   | 项目背景、独立承担的工作、操作流程、技术决策、交付、具体难点及有定义的指标 |
| `experience` / `coneResearch` | 经历、教育背景，以及研究的已完成、已验证和进行中范围                       |
| `homeCopy` / `diagramCopy`    | 首页栏目文案与明确标注的概念流程图说明                                     |
| `howIWork`                    | 首页 How I Work 的第一人称介绍与 Tangerine 详情页入口                      |

以最新简历、项目实现和用户确认的记录为事实来源。每个项目的 `sourceStatus` 用于记录来源；图片对象中的 `isDemo` 和 `caption` 用于区分真实素材与演示素材。不要把账户总数改为日活/并发用户，也不要把文档检索指标改为答案准确率。CONE Lab 的实现、进行中的研究、已验证结果应保持区分。

未知的外链使用 `null`，不要使用 `#` 或虚构地址。组件会仅在有真实地址时显示对应入口。每次修改后运行类型检查及导出检查。

`tangerineHarness` 管理详情页的 harness 实现说明，`sourceFiles` 保存代码依据，不在网页暴露本地路径。`perspective` 管理独立的 How I Work 板块，包含 `label`、`title`、`introduction`、`backgroundTitle`、`background`、`beliefs` 和可选 `closing`。每条 belief 包含 `title`、`explanation` 与可选的真实经历 `experience`。该板块已根据 Hongyu 提供的第一人称叙述填写；设为 `null` 可以隐藏板块和导航。

首页 `howIWork` 保持约 100–150 词，具体经历放在详情页。个人使用 Codex / Claude Code 的任务协调方式与 Tangerine 产品能力分开描述；客户查询表属于业务知识整理和检索设计，不代表多 agent 共享记忆。模型规模与成本的表述是个人设计目标，不是经过量化验证的效果。

首页按「个人介绍 → How I Work → Selected Work → About → Research → Contact」排列，先呈现工作思考，再展示成果；Tangerine 详情页也将个人思考放在实现与交付部分之前。页面采用统一底色，通过手记式衬线标题与三段思考、产品案例展示、经历时间线和研究条目来切换模块风格，不依赖背景色块分区。内容宽度由内部 `.container` 统一控制。

`tangerinePreview` 管理首页的小案例文字：业务问题、三项具体实现和指标说明。首页采用小型概念流程图与实现说明并排展示，图的文案位于 `diagramCopy.workflow.compact`；手机端按顺序堆叠。完整概念流程图保留在详情页。后续提供真实图片时，`projects[0].media` 仍可在首页的实现说明之后显示。

## 替换简历

当前下载文件位置为：

```text
public/resume/Hongyu-Xu-Resume.pdf
```

用最新真实 PDF 覆盖该文件即可保持下载地址不变。若变更文件名，同时更新 `profile.links.resume`。内容配置使用不含部署前缀的路径，例如 `/resume/Hongyu-Xu-Resume.pdf`；不要写入 `/public/`。构建时会加上 GitHub Pages 仓库路径。

## 添加图片与演示

把优化后的 WebP、AVIF、PNG 或 JPEG 放入 `public/images/`。在对应项目的 `media` 数组中加入对象，例如：

```typescript
{
  src: "/images/tangerine-approved-workflow.webp",
  alt: "Describe the actual interface and the relevant action shown.",
  caption: "Explain what this approved screenshot demonstrates.",
  width: 1600,
  height: 1000,
  isDemo: false,
}
```

示例文件名只是配置示例，不是仓库中已有文件。`width` / `height` 应使用实际图片尺寸，以减少页面布局跳动。请为每张图片提供有意义的替代文字；真实客户数据应先脱敏，合成界面或演示数据需要在 caption 中明确标注。大体积视频使用轻量封面，在该媒体对象的 `videoUrl` 中填写真实外部播放地址，避免首页自动加载视频。

## GitHub Pages 部署

本站使用 GitHub Pages 的免费地址，无需购买独立域名：

- 网站：[https://raidriarxu.github.io/](https://raidriarxu.github.io/)
- 源码：[RaidriarXu/raidriarxu.github.io](https://github.com/RaidriarXu/raidriarxu.github.io)
- 部署记录：[GitHub Actions](https://github.com/RaidriarXu/raidriarxu.github.io/actions)

部署工作流为 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，仓库已启用 GitHub Actions 作为 Pages 发布来源。以后修改本站内容或简历后，提交并推送到 `main` 即会自动检查、构建和部署：

```powershell
git status
git add src public README.md
git commit -m "Update portfolio content"
git push
```

只暂存本次确实修改、准备公开的文件；其他配置或脚本有变更时，按需加入暂存。等待 Actions 的 build 和 deploy 都成功后，再检查线上效果。

如果以后迁移到其他仓库，设置步骤如下：

1. 创建或选择真实 GitHub 仓库，将本站源码和 `package-lock.json` 推送到 `main`。不要提交 `node_modules/`、`.next/`、`out/` 或私密原始素材。
2. 在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
3. 推送到 `main` 或在 **Actions** 中手动运行 **Validate and deploy GitHub Pages**。
4. 工作流安装锁定版本的依赖，执行类型检查、静态构建和资源检查，然后上传 `out/` 并部署。部署完成后的真实网址显示在该工作流的 `github-pages` 环境中。

默认分支不是 `main` 时，修改工作流中 `push.branches` 和 `pull_request.branches`。Pull Request 会执行检查及构建，不会部署。

工作流通过 GitHub 官方 `configure-pages` 获取站点的 origin 和 base path，因此支持以下两种情况：

- 用户或组织主页仓库 `USERNAME.github.io`：根路径部署。
- 普通项目仓库：部署到 `/REPOSITORY-NAME/`。

需要自定义域名时，先在 GitHub Pages 设置中完成域名及 DNS 配置，再重新运行工作流；构建会使用 Pages 返回的真实域名和路径。不要在源文件中硬编码用户名、仓库名或域名。

## 手动设置部署路径

通常无需创建环境文件。手动构建或使用其他静态托管时，可将 `.env.example` 复制为 `.env.local`：

```dotenv
NEXT_PUBLIC_BASE_PATH=/your-repository
NEXT_PUBLIC_SITE_URL=https://YOUR-USERNAME.github.io
```

`NEXT_PUBLIC_BASE_PATH` 是空字符串或以 `/` 开头、没有末尾 `/` 的路径。`NEXT_PUBLIC_SITE_URL` 只填 origin，不包含仓库路径。真实域名尚未确定时保留为空。修改后重新构建，因为静态导出的配置在构建时确定。

也可以在 PowerShell 临时验证仓库子路径：

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/portfolio-check'
npm run build
npm run verify:export
npm run preview -- --port 3100
```

此时打开 `http://127.0.0.1:3100/portfolio-check/`。恢复本地根路径时停止预览，清除环境变量并重新构建：

```powershell
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
npm run build
```

静态预览和导出检查会从生成的资源路径中识别部署前缀。可用 `--base-path` 显式覆盖，但通常不需要。不要在 Next.js `<Link>` 的路由上重复添加前缀；普通图片、下载和其他静态资源要使用项目提供的路径辅助函数。

## 验证范围

`npm run verify:export` 检查导出的 HTML 页面标题、文档语言、图片 alt、本地链接、锚点、脚本、样式、字体、图片以及本地 PDF 下载文件，也检测空链接、无效占位锚点和错误的仓库前缀。它也检查本地 Open Graph / Twitter 分享图片；配置真实域名后，检查各页面的 canonical URL 是否指向正确路径。外部链接只验证 URL 语法，不把语法检查当作服务可访问性验证。

发布前还应实际检查首页和详情页：桌面及手机宽度、键盘 Tab 顺序、跳过导航入口、页面与锚点导航、图片、外链、PDF 下载，以及开启系统 reduced-motion 后的表现。类型检查和静态资源检查不能替代视觉检查。

本次实现已检查桌面 1440px、手机 390px 和窄屏 320px 的主要页面；仓库子路径 `/portfolio-check/` 也完成了构建及静态资源验证。浏览器实际下载的简历与提供的原始 PDF 的 SHA-256 一致。GitHub、FQC 首页及演示列表返回成功响应；LinkedIn 拒绝自动化访问（HTTP 999），因此保留简历中的原始地址，未将其报告为已验证可访问。

生产构建和开发脚本显式使用 webpack，避免本机 Windows 沙箱中遇到的 Turbopack 子进程启动失败。布局尊重 `prefers-reduced-motion`，关闭平滑滚动与过渡；本次检查了 CSS 规则，没有修改系统的动画偏好设置。

社交分享图为 `public/images/social-card.png`，可编辑 `scripts/generate-social.mjs` 后运行 `npm run generate:social` 重新生成。分享图中的文字与主内容同步维护。运行 `npm run format` 可格式化源码。真实域名通过部署工作流注入；未配置域名的本地构建使用 localhost 作为分享图 URL 的基础地址。

## 尚待补充的真实素材

- 可公开的 Tangerine 产品截图、经批准的脱敏截图或明确标注的演示数据，以及可分享的演示视频链接。
- 如需进一步丰富项目叙述，可补充可公开的交付/使用记录和具体技术难点说明；只有确认过的内容才写入网页。
- CONE Lab 可公开的处理流程图或研究可视化，以及后续新增且确实验证过的结果。

最新简历和联系方式已作为本轮材料提供，不在缺失清单中。原始合同、凭据、客户数据和未经批准的项目文件不应放入 `public/`；该目录内的文件都会进入可下载的静态站点。
