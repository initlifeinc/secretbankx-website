# 官网本地改造证据 · 2026-10-20

归属：SEC-129（官网内容）；LB-530（最终发布链接与材料）。本任务不新建、关闭或重复验收原问题。

## 首屏外观统一

按用户要求，Mac 与 iPhone 统一使用浅色原生截图。Mac 通过隔离演示 App 自身的显示设置选择 Light 后重新截图，不使用滤镜反转或改画界面。原深色网页素材已移除。

## 首屏配图再优化

按用户本轮选择，原生 App 图片只出现在首屏。Mac 使用 2026-10-20 新截取的有数据首页与 Cloud Storage 账号详情，iPhone 使用原生“数据与同步”页面；支持点击查看原始截图。Mac 使用本地当前已构建 Debug App 的隔离副本，独立 bundle ID、新建演示 App Group 与 UUID 存储作用域，未改 App 工程或其他项目。内置混合导入 fixture 产生六条合成资料，再在真实 App UI 中整理展示名称，密码始终遮蔽。截图来源与哈希见 `native-assets.json`。

“把熟悉的资料，带到新的归处”配图改为文件夹与资料迁入 SVG；“重要的资料，交给对的人”改为受保护资料与指定接收者 SVG。均为网站原生矢量插画，非 App 界面，不再配原生界面图注。旧三张未使用 App 图片已移除。

## 本轮用户修正

2026-10-20：官网改为长期正式产品介绍，去掉版本号、首发准备、未开放及候选政策等消费者文案。该文案调整不构成部署授权，也不关闭 App 真实渠道验收。用户确认 App 备案为 `浙ICP备14001301号-3`，网站备案为 `浙ICP备14001301号-2`，后者对应 **initlife.com**。页脚明确标为“网站备案（initlife.com）”，链接工信部，不声称子域名另获独立备案；App 编号没有混用为网站编号。工信部在线查询本轮未能独立读取，编号与完成状态来自用户确认。

子域名规则来源：[阿里云官方备案 FAQ](https://help.aliyun.com/zh/icp-filing/basic-icp-service/support/for-the-record-domain-faq/)、[腾讯云备案域名准备](https://cloud.tencent.com/document/product/243/18905)：主域名已备案后普通子域名无需单独备案；转接中国内地另一接入商时仍需办理相应接入备案。本轮未改变 GitHub Pages 托管。

## 本地审阅

- 中文：http://127.0.0.1:8899/?lang=zh
- English：http://127.0.0.1:8899/en/?lang=en
- 政策稳定地址：`/privacy.html`、`/terms.html`；英文对应 `/en/privacy.html`、`/en/terms.html`。
- `/careers.html` 原地址保留为个人开发者联系页，删除虚构招聘／团队叙事。
- `/404.html`、`/en/404.html` 以及缺失路由的 404 返回可用。本地使用 `python3 scripts/preview.py`。

## 设计与实现

明亮灰白、深蓝产品区、克制蓝色、较大的中文/英文标题、细分隔线与柔和圆角。叙事顺序为重要资料 → 日常使用 → 自选存储 → 备份恢复 → 家庭协作 → 免费与四商品 → FAQ。独立静态中英文 HTML，语言链接可分享、可在禁用脚本时使用；脚本仅处理语言偏好与移动导航，无第三方请求、分析或字体依赖。

价格明确为美国基础美元价：个人年付 2.99／买断 9.99，家庭年付 4.99／买断 29.99；没有人民币换算、固定促销、售卖按钮或未验证下载链接。免费基础存取、导入导出、备份恢复与到期安全边界均保留。个人/家庭高级版同功能，家人共享购买权益与资料库权限分开。网页采用正式产品口径，移除版本与发布进度叙事；没有新增下载或销售已开放的断言。原八区与渠道检查留在内部验收。

## 素材与事实依据

完整路径及 SHA-256 见 `source-manifest.json`，从 App 工程**实际工作区**读取，不限于 HEAD。没有读取 `test_accounts.md` 或拷贝测试凭据。未改 App 工程、参考仓库或其他项目。

| 依据 | 网页采用内容 |
| --- | --- |
| `docs/product_plans/00_product_strategy_roadmap.md` | 重要资料库定位；未发布；Apple 首发平台；不运营资料库服务器；提醒等未来能力不宣传 |
| `09_membership_tiers_and_entitlements.md` | 免费矩阵、个人/家庭同功能、受邀免费参与、到期保全 |
| `11_competitive_intelligence_and_commercial_strategy.md`、`34_family_products_development_plan.md` | 四商品美国基础价格、家人共享权益边界；不复活旧人民币目标和过期优惠 |
| `06_sharing_vault_plan.md` | Owner/editor/viewer；共同资料与购买权益分开；仍待真实双端验收 |
| `33_password_health_plan.md` | 本地弱/复用检查，手动 HIBP 五位前缀检查，非持续监控 |
| `35_local_diagnostics_and_feedback_plan.md` | 本地 30 天／50 MiB，无自动上传；主动邮件/分享外发 |
| `docs/publish/privacy-and-encryption.md` | 存储方元数据、支持邮件、诊断与 HIBP 边界；不把标签/加密声明未决事项写成已通过 |
| `website/i18n/{en,zh}.js`、`i18n.js`、`config.js` | 当前未提交的中英文政策候选逐节迁移至 JSON 与新页面；主体为使用 InitLife 品牌的个人开发者。条款另补免费/到期边界与美国基础价格说明；更新日期 2026-10-20，消费者页移除候选/准备状态文案，实际部署仍待批准 |
| `MARKET_AVAILABILITY_DECISION.md` | 八区首发目标，包括中国大陆；不声称已供应或备案全部审批通过 |
| `docs/ux/README.md`、`数据与同步首版/README.md` | 核验原生实拍索引与正在迁移的版本；历史截图未包装为当前界面 |
| `Assets.xcassets/AppIcon.appiconset/icon_256.png` | 当前 App 图标，原图复制 256×256，约 92 KiB；最大显示 76 CSS px，避免使用 1024 原图 |
| InitLife 参考仓库 `app_webpage` 的 `dist/assets/styles.css` | 只提取留白、层级和圆角的视觉方向；未复制其文案、素材或部署逻辑，未修改其未跟踪 design 目录 |

首屏的 Mac 与 iPhone 原生截图详见上方最新素材记录。两张原生 PNG 均转为无损 WebP，解码后逐像素相等；只通过 CSS 添加外框、阴影、倾斜与布局。未把测试截图作为真实渠道验收结论。

## 实际验证

Google Chrome / Playwright，宽度 390、768、1440 CSS px，中英文首页、隐私、条款、联系、404 共 30 个组合。完整机器结果见 `browser-results.json`；代表截图保留本地（PNG 已忽略，不加入发布内容）。

- 中英文隐私/条款 JSON 与 App 工作区候选逐字段相等，四组全部保留；条款页面另附到期/免费与基础价格说明。
- 各页面 HTTP 成功、无横向溢出、断图、空品牌、占位符或页面脚本错误；一个 h1。
- 站内路由、资源和目录锚点有效；语言切换保持当前页面，中文/英文内容和 HTML lang 对应。
- 手机导航开关和点击关闭、原生 FAQ 展开、键盘 Tab 跳转正文、Enter 展开 FAQ、减少动态效果。
- 浏览器 zh-TW、en-US、fr-FR 的初始语言选择；fr-FR 回退英文。
- 缺失路由返回 HTTP 404，页面可以返回首页。
- 已人工查看中文桌面/手机首屏与英文全页，修正次级正文对比度。模拟视口不等于在真实手机/iPad Safari 上完成验收。

截图：`zh-1440-hero.png`、`zh-390-hero.png`（首屏）；`zh-1440-home.png`、`zh-390-home.png`、`en-1440-home.png`、`en-390-home.png`（全页）；`{zh,en}-{privacy,terms}.png`（政策）。

## 发布边界与剩余确认

GitHub API `repos/initlifeinc/secretbankx-website/pages` 只读检查：`build_type=legacy`，`source.branch=main`，`source.path=/`；现有自定义域名 `secretbankx.initlife.com`。**main 推送会触发线上发布。** 本轮没有 push、部署、DNS/CNAME 修改或外部消息。所有实现保留在本地工作区。

1. 用户审阅本地中英文视觉、产品文案及政策候选，明确批准后才能发布。
2. 原任务继续核验家庭协作的独立身份/双端门禁、真实商品/交易和各平台商店可用性。网页效果和源码不证明这些门禁通过。
3. 用户已确认备案完成并提供号码；上架原任务继续核对平台记录、实际主体一致性、八区可售及四商品人民币价格。本轮不重复要求用户完成备案。
4. 隐私标签、出口加密问卷和正式 Archive 检查仍按原发布任务完成；政策候选不构成提交批准。
5. 发布批准后由原任务执行正式发布，并对线上中英文页面、资源、稳定政策链接及商店入口重新读回。当前没有将未上线商店链接放入消费者下载入口。

## 2026-10-21 原生 Mac 第二栏与首屏更新

用户授权联系既有开发聊天「优化 mac 默认窗口尺寸」，开发任务 LB-566 已修复真实 App 默认布局：账号列表 min/ideal/max 为 320/350/440pt，窗口默认 1200×820pt、最小 1080×680pt。构建与原生 AX 验证见 `/Users/initlife/Documents/SourceCodeManager/SecretBankX_extracted/output/LB-566-window-size/columns/checks.json`；该证据不证明鼠标拖拽验收通过。此前“无外部消息”记录仅对应早期网页重构，本次已按用户要求向开发聊天发送改进请求。

从修复构建的隔离运行副本重新拍摄，默认第二栏 AX 实测 349.5pt。通过正常 App 导入流程使用六条中文演示资料，分组为“日常与远行”，选中“山海邮箱”登录详情；邮箱、网址均为示例，密码保持遮盖。截图专用副本未使用生产数据。原始窗口为 `native-runtime/mac-accounts-wide-light.png`，发布素材为 `assets/app-mac-accounts-wide-light.webp`，无损转码逐像素一致。网页只添加外框与排布，Mac 与 iPhone 均为浅色。

替换后使用 Google Chrome 检查中英文首页 × 390/768/1440px 共 6 个组合：无断图、横向溢出或页面脚本错误，新图 HTTP 200。结果见 `hero-refresh-results.json`；桌面与手机截图已更新并人工查看。`git diff --check` 通过。本次未推送或部署。

## 2026-10-21 同数据两端截图调整

按用户反馈，将演示登录资料改为“苹果账号”，网址为 `https://account.apple.com`，邮箱仍是合成示例 `alex@example.com`，密码遮盖。App 内实际编辑、保存后重新截图。Mac 捕获会话的紫色系统共享提示通过结束捕获并重启隔离 App 消除；单次原生窗口截图直接显示红黄绿三色按钮。未绘制替换按钮或生成伪界面。新原图为 `native-runtime/mac-apple-clean-light.png`，来自开发任务 `output/LB-566-window-size/clean-captures/mac-restarted.png`，发布无损素材 `assets/app-mac-apple-light.webp`。

iPhone 改用同一份合成资料导入后的账号首页，原图 `native-runtime/app-iphone-home-light.png`，发布素材 `assets/app-iphone-home-light.webp`。两端均显示“日常与远行”及相同六条资料，“苹果账号”在列表首位；Mac 另显示该账号详情。两张原图无损转 WebP 并逐像素校验一致。手机图为模拟器原生截图，未宣称真机。此前“数据与同步”图不再用于首屏。

最终 Mac 选用重新启动后“所有”首页原图 `mac-restarted.png`，使六条记录展示顺序与 iPhone 首页一致；Mac 同时展示苹果账号详情。中英文 × 390/768/1440px 六组资源与布局检查通过，原生窗口三色按钮及两端同数据已人工核对，结果见 `hero-refresh-results.json`。没有推送或部署。

## 2026-10-21 中文人民币价格纠正

按用户要求先查本地上架素材；本地只有中国区价格待核验记录，未找到完整现行四商品人民币表。随后从用户已登录的 App Store Connect 逐项只读核准：中国大陆个人年付 ¥22、个人买断 ¥68、家庭年付 ¥38、家庭买断 ¥198。各商品 URL、页面读回位置见 `regional-prices.json`。本次只读价格，未改商店配置。网页中文价格卡片、地区说明与中文条款已改为人民币，英文保留 US$2.99/9.99/4.99/29.99；之前全文价格均为美元的记录与“中文条款和 App 源材料逐字段相等”的结论由此更新取代。中文条款仅替换四项价格及地区，其他条款不变。配置价格不证明可售、审核或交易验收通过；不在官网宣传首购促销。没有推送或部署。

人民币调整验证：Google Chrome 中英文 × 390/768/1440px，逐项断言四个价格、中文地区说明及中英文条款价格，无横向溢出。结果见 `regional-price-results.json`；已人工查看中文桌面价格区截图。`git diff --check` 通过。

## 2026-10-21 中国区缺失优惠补齐

用户明确授权：中国区没有价格或推介促销优惠时补齐，参考美国。四项人民币常规价格均已存在，未改价。个人年付中国区已有前 6 个月提前支付 ¥8 的优惠（2026-09-14 至 2026-12-31），保留原配置。家庭年付原优惠仅覆盖七区，中国区缺失；已在 App Store Connect 创建仅中国大陆一地区的新推介优惠：参照美国 US$0.29 覆盖首月，Apple 自动区域计算产生 ¥3 覆盖首月，开始日期 2026-10-21，无结束日期，之后按 ¥38/年续订。确认提交后刷新页面并打开一地区价格浮层，读回中国大陆 ¥3，首月提前支付；原七区优惠仍独立保留。摘要见 `regional-prices.json` 的 `introductoryOfferFollowup`。未改可售地区、提交审核或发布 App；官网未部署，也未新增促销宣传。

## 2026-10-21 正式官网发布授权

用户已审阅并明确授权：在 SBX 工程沉淀截图文档与 skill 后，提交并发布官网。此前“待批准／未授权发布”的描述是历史边界，本次已获得发布授权。只发布官网，不提交 App 审核或发布 App。GitHub API 当前核实仍为 main 根目录 legacy Pages，远端 origin 是 GitHub，不是 GitLab。最终部署与公网读回信息见发布结果记录。

发布前完整验证：30 个中英文页面／视口组合及语言切换、导航、FAQ、404、键盘与减少动态效果全部通过。素材逐 RGBA 通道复核后，为 Mac WebP 补上 `exact=True`，保留透明圆角下不可见的 RGB 值，保证原图与解码素材所有通道一致；可见界面未重绘。截图 skill 与脚本验证通过。
