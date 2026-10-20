#!/usr/bin/env python3
"""Build dependency-free bilingual pages. Run from any directory."""
from pathlib import Path
import json, html, re
ROOT=Path(__file__).resolve().parent.parent
EMAIL='initlifeltd@gmail.com'
# App Store Connect regional prices read back on 2026-10-21; no FX conversion.
PRICES = {
 'zh': {'currency': '¥', 'personal': ('22', '68'), 'family': ('38', '198')},
 'en': {'currency': 'US$', 'personal': ('2.99', '9.99'), 'family': ('4.99', '29.99')},
}
COPY={'zh': {'nav': ['体验', '你的掌控', '方案', '常见问题'],
        'skip': '跳到正文',
        'menu': '打开导航',
        'status': '本地优先 · 自主掌控',
        'eyebrow': '你的重要资料，值得一个好归处。',
        'hero': '平时安心收好。<br>需要时，<span>就在手边。</span>',
        'lede': '从每天的密码，到偶尔才用的证件与恢复资料。SecretBankX 把重要数字资料收进你掌控的加密资料库，为 iPhone、iPad 与 Mac 而设计。',
        'explore': '探索 SecretBankX',
        'plans': '了解方案',
        'platform': '为 iPhone · iPad · 原生 Mac 而设计',
        'visual': 'SecretBankX 原生 App 界面',
        'vault': '我的资料库',
        'all': '全部资料',
        'personal': '个人',
        'travel': '旅行资料',
        'family': '家庭',
        'search': '搜索重要资料',
        'item': '资料',
        'login': '登录信息',
        'notes': '安全备注',
        'docs': '证件与附件',
        'recent': '随手存好，随时找到。',
        'travelname': '下一站，日本',
        'travelcopy': '出行资料，放在一起',
        'recovery': '恢复资料',
        'recoverycopy': '为下一次换机做好准备',
        'offline': '本地优先',
        'offlinecopy': '离线也能读取已保存资料',
        'password': '密码已加密保存',
        'badge': '你的资料，你来掌控',
        'ribbon': ['本地加密', '自选同步位置', '可导出，可恢复'],
        'intro': '不只是密码。<br>也是生活的底稿。',
        'introcopy': '少一点翻找，多一点从容。让分散在相册、聊天和备忘录里的重要资料，各有归处。',
        'uses': [['01', '每天的登录', '密码、验证码与恢复码，集中整理。iPhone / iPad 的系统密码自动填充，让日常登录更顺手。'],
                 ['02', '低频的重要时刻', '证件、保单、旅行信息与加密附件。需要办理事情时，知道该去哪里找。'],
                 ['03', '下一台设备', '导出、完整备份和恢复，让迁移有准备。你的资料，也应该方便带走。']],
        'access': '把熟悉的资料，<br>带到新的归处。',
        'accesscopy': '从其他密码管理器迁入资料，敏感数据的解析和解密在本机完成。日常使用系统自动填充、密码生成与 TOTP，让登录和整理都更顺手。',
        'accessnote': '系统自动填充依赖系统设置及目标 App / 网站支持。Mac 提供原生资料库体验。',
        'control': '资料在哪里，<br>由你决定。',
        'controlcopy': '先在本地加密保存，再按你的选择同步。SecretBankX 不运营接收或存储资料库内容的服务器，也不向你出售云存储空间。',
        'storage': [['iCloud', '用于自己的 Apple 设备', '使用你自己的 iCloud 空间。'],
                    ['Files', '选择你信任的目录', '使用系统文件夹或兼容的文件提供方。'],
                    ['HTTPS WebDAV', '连接你选择的服务', '由你授权连接，服务由提供方运营。']],
        'syncnote': '日常同步传送加密变更、恢复快照与所需附件；手工导出的完整备份是独立操作。存储服务仍可能接收连接和文件元数据。',
        'restoretitle': '为“万一”留一条路。',
        'restorecopy': '基础导入、导出、备份与恢复免费。定期保存独立备份，并妥善保管主密码；客服无法替你重置主密码并解密资料。',
        'restoresteps': ['保存独立完整备份', '妥善保管主密码', '需要时验证并恢复'],
        'share': '重要的资料，<br>交给对的人。',
        'sharecopy': '为共享库邀请指定成员，并按拥有者、编辑者、查看者角色分配权限。只分享你决定分享的资料。',
        'sharenote': 'Apple 家人共享的是购买权益，不会自动共享资料库。资料访问需要独立邀请与授权。',
        'roles': ['拥有者', '编辑者', '查看者'],
        'pricing': '基础安全，始终免费。<br>进阶功能，按需选择。',
        'pricingcopy': '个人与家庭高级版功能相同。选择年付或买断，选择只为自己购买或与符合条件的 Apple 家人共用购买权益。',
        'free': '免费基础版',
        'freeprice': '免费',
        'freedesc': '安全地开始，也能自由离开。',
        'freefeatures': ['基础存取、密码生成与 AutoFill',
                         '本地弱密码和复用检查、基础模板',
                         '导入、导出、完整备份与恢复',
                         '接受邀请，按授权参与已有共享库'],
        'premium': '高级版共同功能',
        'premiumfeatures': ['高级生成、自定义模板与密码历史', '新增附件、手动已知密码泄露检查', '新建共享库与邀请成员'],
        'personalplan': '个人高级版',
        'familyplan': '家庭高级版',
        'personaldesc': '为你自己提供全部高级功能。',
        'familydesc': '同样的高级功能，通过 Apple 家人共享共用购买权益。',
        'year': '/ 年',
        'once': '一次性买断',
        'yearly': '年付',
        'lifetime': '买断',
        'pricefoot': '以上为中国大陆地区人民币售价。其他地区价格可能不同，实际价格、优惠与可用性以 Apple 购买确认页为准。年付自动续订，可在 Apple '
                     '账号设置中管理或取消。',
        'expiry': '到期也保留你的资料。',
        'expirycopy': '订阅到期或家人共享权益消失，不删除已有资料，不阻止读取、同步、导出、恢复、退出及必要安全维护；仅限制新增付费操作。',
        'faq': '把关心的事，<br>说清楚。',
        'questions': [['支持哪些设备？',
                       'SecretBankX 为 iPhone、iPad 和原生 Mac 而设计。自动填充等系统能力依赖相应平台、系统设置及目标 App 或网站支持。'],
                      ['资料会上传到 SecretBankX 吗？',
                       '我们不运营接收或存储资料库内容的服务器。启用同步后，加密文件进入你选择的存储服务；服务方仍可能处理 '
                       'IP、连接及文件元数据。主动支持邮件会把你选定的正文和附件发送给收件方。'],
                      ['密码泄露检查如何保护隐私？',
                       '检查仅在你明确发起时进行，通过 HTTPS 直连 HIBP，发送密码 SHA-1 '
                       '哈希前五位，在本地匹配结果。不发送明文密码、完整哈希、用户名或网站；服务方仍可观察 IP、前缀和请求时间。这不是后台持续监控。'],
                      ['家庭高级版会自动分享所有密码吗？',
                       '不会。家庭高级版通过 Apple '
                       '家人共享提供购买权益，资料库访问仍需独立邀请和角色授权。个人高级版同样能创建共享库并邀请成员；受邀成员可以免费按授权参与。'],
                      ['忘记主密码，能找回资料吗？',
                       '我们没有可以重置主密码并解密资料的服务。便捷解锁不代替完整手工恢复所需的主密码。请保管主密码，并提前保存、验证独立备份。'],
                      ['诊断记录会自动上传吗？',
                       '不会。脱敏诊断仅保存在本地，最多 30 天、50 '
                       'MiB。只有你主动导出、分享或发送支持邮件时，所选内容才会外发。发送前请检查，不要提供密码、恢复秘密或资料库内容。']],
        'closing': '重要的东西。<br>留在自己手里。',
        'closingcopy': '让重要资料各有归处。了解 SecretBankX 如何保管、同步与恢复你的资料。',
        'support': '联系开发者',
        'privacy': '隐私政策',
        'terms': '服务条款',
        'brand': 'InitLife 个人品牌出品',
        'footer': '为重要资料，留一份安心。',
        'draft': '隐私与使用约定',
        'updated': '更新于 2026 年 10 月 20 日',
        'toc': '本页目录',
        'home': '返回首页',
        'error': '这一页，暂时没找到。',
        'errordesc': '地址可能有误。回到首页，继续了解 SecretBankX。'},
 'en': {'nav': ['Experience', 'Your control', 'Plans', 'FAQ'],
        'skip': 'Skip to content',
        'menu': 'Open navigation',
        'status': 'Local first · Yours to control',
        'eyebrow': 'A place for what matters.',
        'hero': 'Safely kept.<br><span>Ready for life.</span>',
        'lede': 'From everyday passwords to the documents and recovery details you rarely need. '
                'SecretBankX keeps your digital essentials in an encrypted vault you control, '
                'designed for iPhone, iPad and Mac.',
        'explore': 'Explore SecretBankX',
        'plans': 'Explore plans',
        'platform': 'Designed for iPhone · iPad · native Mac',
        'visual': 'Native SecretBankX App interface · shown in Chinese',
        'vault': 'My vault',
        'all': 'All items',
        'personal': 'Personal',
        'travel': 'Travel',
        'family': 'Family',
        'search': 'Find what matters',
        'item': 'Items',
        'login': 'Logins',
        'notes': 'Secure notes',
        'docs': 'Documents & files',
        'recent': 'A little order. A lot of calm.',
        'travelname': 'Next stop, Japan',
        'travelcopy': 'Your travel essentials, together',
        'recovery': 'Recovery details',
        'recoverycopy': 'Ready for your next device',
        'offline': 'Local first',
        'offlinecopy': 'Read saved items, even offline',
        'password': 'Password stored encrypted',
        'badge': 'Your information. Your control.',
        'ribbon': ['Encrypted on device', 'Your choice of storage', 'Export and recover'],
        'intro': 'More than passwords.<br>A little order for life.',
        'introcopy': 'Less searching. More peace of mind. Give the important things scattered '
                     'across photos, messages and notes a place of their own.',
        'uses': [['01',
                  'Everyday sign-ins',
                  'Keep passwords, verification codes and recovery codes together. System password '
                  'AutoFill on iPhone and iPad makes daily sign-ins easier.'],
                 ['02',
                  'The occasional essentials',
                  'Documents, insurance details, travel information and encrypted attachments. '
                  'Know where to look when life asks for them.'],
                 ['03',
                  'Your next device',
                  'Export, complete backups and recovery help you prepare for a move. Your '
                  'information should be easy to take with you.']],
        'access': 'Familiar information.<br>A new place to belong.',
        'accesscopy': 'Bring information from another password manager, with sensitive parsing and '
                      'decryption performed on your device. System AutoFill, password generation '
                      'and TOTP help with everyday sign-ins and organization.',
        'accessnote': 'System AutoFill depends on system settings and support from the destination '
                      'app or website. Mac provides a native vault experience.',
        'control': 'Where it lives.<br>Your decision.',
        'controlcopy': 'Encrypted locally first, synced when you choose. SecretBankX does not '
                       'operate a server that receives or stores your vault contents, or sell you '
                       'cloud storage space.',
        'storage': [['iCloud', 'For your own Apple devices', 'Use your own iCloud storage.'],
                    ['Files',
                     'A folder you trust',
                     'Choose a system folder or compatible file provider.'],
                    ['HTTPS WebDAV',
                     'A service of your choice',
                     'You authorize access; the provider operates the service.']],
        'syncnote': 'Daily sync transfers encrypted changes, recovery snapshots and required '
                    'attachments. A manually exported complete backup is a separate operation. '
                    'Storage providers may still receive connection and file metadata.',
        'restoretitle': 'A way back, just in case.',
        'restorecopy': 'Basic import, export, backup and recovery are free. Keep independent '
                       'backups and protect your master password; support cannot reset it and '
                       'decrypt your information.',
        'restoresteps': ['Keep a complete independent backup',
                         'Protect your master password',
                         'Verify and restore when needed'],
        'share': 'The right things.<br>The right people.',
        'sharecopy': 'Invite specific people to a shared vault, with owner, editor and viewer '
                     'roles. Share the information you choose to share.',
        'sharenote': 'Apple Family Sharing shares purchase entitlement. Vault access requires a '
                     'separate invitation and authorization.',
        'roles': ['Owner', 'Editor', 'Viewer'],
        'pricing': 'Basic security. Always free.<br>More, when you need it.',
        'pricingcopy': 'Personal and Family Premium have the same features. Choose yearly or '
                       'lifetime, for yourself or for eligible family members through Apple Family '
                       'Sharing.',
        'free': 'Free essentials',
        'freeprice': 'Free',
        'freedesc': 'Start safely. Leave freely.',
        'freefeatures': ['Basic storage, password generation and AutoFill',
                         'Local weak/reused password checks and basic templates',
                         'Import, export, complete backup and recovery',
                         'Join existing shared vaults within your permissions'],
        'premium': 'Included in both Premium plans',
        'premiumfeatures': ['Advanced generation, custom templates and password history',
                            'Add attachments and manually check known password exposure',
                            'Create shared vaults and invite members'],
        'personalplan': 'Personal Premium',
        'familyplan': 'Family Premium',
        'personaldesc': 'All Premium features for you.',
        'familydesc': 'The same features, with purchase entitlement shared through Apple Family '
                      'Sharing.',
        'year': '/ year',
        'once': 'one-time purchase',
        'yearly': 'Yearly',
        'lifetime': 'Lifetime',
        'pricefoot': 'US base prices in USD, not worldwide prices. Products, local prices, offers '
                     'and availability are shown in Apple’s purchase sheet. Yearly subscriptions '
                     'renew automatically; manage or cancel them in Apple Account settings.',
        'expiry': 'Your information stays yours.',
        'expirycopy': 'If a subscription or Family Sharing entitlement ends, existing items remain '
                      'available for reading, sync, export, recovery, leaving a vault and '
                      'essential security maintenance. Only new paid operations are restricted.',
        'faq': 'A few good<br>questions.',
        'questions': [['Which devices does it support?',
                       'SecretBankX is designed for iPhone, iPad and native Mac. System features '
                       'such as AutoFill depend on the platform, system settings and support from '
                       'the destination app or website.'],
                      ['Does SecretBankX receive my vault?',
                       'We do not operate a server that receives or stores vault contents. '
                       'Optional sync sends encrypted files to storage you choose. Providers may '
                       'still process IP addresses, connection and file metadata. Support emails '
                       'you initiate send your selected message and attachments to the recipient.'],
                      ['How does password exposure checking work?',
                       'Only when you explicitly start a check, the App connects directly to HIBP '
                       'over HTTPS, sends the first five characters of a password’s SHA-1 hash and '
                       'matches the response locally. It sends no plaintext password, full hash, '
                       'username or website. The service can still observe your IP address, prefix '
                       'and request time. It is not continuous background monitoring.'],
                      ['Does Family Premium share all my passwords?',
                       'No. Apple Family Sharing shares purchase entitlement. Vault access still '
                       'needs a separate invitation and role authorization. Personal Premium can '
                       'also create shared vaults and invite members; invited members can '
                       'participate for free within their permissions.'],
                      ['Can you recover a forgotten master password?',
                       'We have no password-reset service that can decrypt your vault. Convenient '
                       'unlock does not replace the master password needed for a manual full '
                       'restoration. Protect your master password and keep verified, independent '
                       'backups.'],
                      ['Are diagnostics uploaded automatically?',
                       'No. Redacted diagnostics stay on device for up to 30 days and 50 MiB. '
                       'Selected content leaves only when you export, share or send a support '
                       'email. Review it first; never include passwords, recovery secrets or vault '
                       'contents.']],
        'closing': 'Life’s essentials.<br>In your hands.',
        'closingcopy': 'Give your essentials a place of their own. Explore how SecretBankX stores, '
                       'syncs and restores your information.',
        'support': 'Contact the developer',
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Service',
        'brand': 'An InitLife personal brand project',
        'footer': 'A little peace of mind for what matters.',
        'draft': 'Privacy and use',
        'updated': 'Updated October 20, 2026',
        'toc': 'On this page',
        'home': 'Back to home',
        'error': 'This page is out of reach.',
        'errordesc': 'The address may be incorrect. Head home to explore SecretBankX.'}}

def build(lang):
 c=COPY[lang]; prefix='/en/' if lang=='en' else '/'; other='zh' if lang=='en' else 'en'
 def url(page=''): return prefix+page
 def switch(page=''): return ('/' if lang=='en' else '/en/')+page+'?lang='+other
 def header(page=''):
  return f'''<a class="skip" href="#main">{c['skip']}</a><header class="header"><div class="shell nav"><a class="brand" href="{url()}"><img src="/assets/app-icon.png" width="36" height="36" alt="">SecretBankX</a><button class="menu" aria-expanded="false" aria-controls="navigation" aria-label="{c['menu']}"><span></span><span></span></button><nav id="navigation" aria-label="{'主导航' if lang=='zh' else 'Main navigation'}">{''.join(f'<a href="{url()}#{target}">{label}</a>' for label,target in zip(c['nav'],['experience','control','plans','faq']))}</nav><a class="language" href="{switch(page)}" lang="{other}" data-language="{other}">{'EN' if lang=='zh' else '中文'} <span aria-hidden="true">↗</span></a></div></header>'''
 def footer(): return f'''<footer class="shell footer"><div><a class="brand" href="{url()}"><img src="/assets/app-icon.png" width="32" height="32" alt="">SecretBankX</a><p>{c['footer']}</p></div><div class="footerlinks"><a href="{url('privacy.html')}">{c['privacy']}</a><a href="{url('terms.html')}">{c['terms']}</a><a href="mailto:{EMAIL}">{c['support']}</a></div><div class="footerbottom"><span>© 2026 SecretBankX</span><a href="https://beian.miit.gov.cn/">浙ICP备14001301号-2</a><a class="publisher-brand" href="https://initlife.com/"><img src="/assets/initlife-logo.png?v=20261021-transparent" width="15" height="15" alt="InitLife IL 标志"><span>{c['brand']} ↗</span></a></div></footer>'''
 def document(title,body,page='',desc=None):
  desc=desc or c['lede']; canonical='https://secretbankx.initlife.com'+url(page)
  return f'''<!doctype html><html lang="{'zh-Hans' if lang=='zh' else 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} — SecretBankX</title><meta name="description" content="{html.escape(desc)}"><meta name="theme-color" content="#f5f6f8"><meta property="og:title" content="{html.escape(title)} — SecretBankX"><meta property="og:description" content="{html.escape(desc)}"><meta property="og:type" content="website"><meta property="og:image" content="https://secretbankx.initlife.com/assets/app-icon.png"><link rel="canonical" href="{canonical}"><link rel="alternate" hreflang="zh-Hans" href="https://secretbankx.initlife.com/{page}"><link rel="alternate" hreflang="en" href="https://secretbankx.initlife.com/en/{page}"><link rel="icon" href="/assets/app-icon.png"><link rel="stylesheet" href="/style.css?v=20261021-brand-size2"><script defer src="/site.js"></script></head><body>{header(page)}{body}{footer()}</body></html>'''
 def row(symbol,title,sub): return f'<div class="vaultrow"><span class="itemicon">{symbol}</span><div><b>{title}</b><small>{sub}</small></div><span class="rowarrow" aria-hidden="true">↗</span></div>'
 rows=row('✳','Atlas Mail','hello@example.com')+row('◈',c['travelname'],c['travelcopy'])+row('⌘',c['recovery'],c['recoverycopy'])
 hero=f'''<section class="hero shell"><div class="herocopy"><div class="status"><i></i>{c['status']}</div><p class="eyebrow">{c['eyebrow']}</p><h1>{c['hero']}</h1><p class="lede">{c['lede']}</p><div class="actions"><a class="button primary" href="#experience">{c['explore']} <span aria-hidden="true">↗</span></a><a class="textlink" href="#plans">{c['plans']} <span aria-hidden="true">→</span></a></div><p class="platform">{c['platform']}</p></div><figure class="productstage device-stage"><div class="orb"></div><a class="mac-capture" href="/assets/app-mac-apple-light.webp" target="_blank" aria-label="{'放大查看 Mac 首页与账号详情' if lang=='zh' else 'View the native Mac account overview and details'}"><img src="/assets/app-mac-apple-light.webp" width="2400" height="1640" alt="{'Mac 原生首页：资料列表与苹果账号详情，使用演示数据' if lang=='zh' else 'Native Mac app showing an account list and Apple Account details with demo data'}"></a><a class="phone-capture" href="/assets/app-iphone-home-light.webp" target="_blank" aria-label="{'放大查看 iPhone 账号首页' if lang=='zh' else 'View the native iPhone account overview'}"><img src="/assets/app-iphone-home-light.webp" width="1206" height="2622" alt="{'iPhone 原生账号首页：与 Mac 相同的演示资料' if lang=='zh' else 'Native iPhone account overview with the same demo records as Mac'}"></a><figcaption>{'Mac 与 iPhone 原生界面' if lang=='zh' else 'Native Mac and iPhone interfaces'}</figcaption></figure></section>'''
 uses=''.join(f'<article><span class="index">{n}</span><h3>{t}</h3><p>{d}</p></article>' for n,t,d in c['uses'])
 storage=''.join(f'<div class="storagerow"><span class="storageicon">{s}</span><div><h3>{t}</h3><p>{d}</p></div><span aria-hidden="true">↗</span></div>' for s,t,d in c['storage'])
 prices=''
 regional_prices=PRICES[lang]
 currency=regional_prices['currency']
 for name,desc,year,once in [(c['personalplan'],c['personaldesc'],*regional_prices['personal']),(c['familyplan'],c['familydesc'],*regional_prices['family'])]:
  prices+=f'<article class="pricecard"><span class="tiny">PREMIUM</span><h3>{name}</h3><p>{desc}</p><div class="amount"><small>{c["yearly"]}</small><strong>{currency}{year}</strong><span>{c["year"]}</span></div><div class="lifetime"><span>{c["lifetime"]}</span><b>{currency}{once}</b><small>{c["once"]}</small></div></article>'
 faq=''.join(f'<details><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>' for q,a in c['questions'])
 body=f'''<main id="main">{hero}<div class="shell promises">{''.join(f'<span><b aria-hidden="true">✓</b>{r}</span>' for r in c['ribbon'])}<span class="promisenote">{c['badge']}</span></div><section class="shell section" id="experience"><div class="sectionheading"><p class="eyebrow">01 / EVERYDAY ESSENTIALS</p><h2>{c['intro']}</h2><p>{c['introcopy']}</p></div><div class="usegrid">{uses}</div><div class="access"><figure class="accessart semantic-art"><img src="/assets/illustration-migration.svg" width="760" height="620" loading="lazy" alt="{'将重要资料整理进新的文件夹' if lang=='zh' else 'Important documents finding a new home'}"></figure><div><p class="eyebrow">LESS FRICTION</p><h2>{c['access']}</h2><p>{c['accesscopy']}</p><small>{c['accessnote']}</small></div></div></section><section class="control" id="control"><div class="shell controlgrid"><div class="controlcopy"><p class="eyebrow">02 / YOUR DATA, YOUR CHOICE</p><h2>{c['control']}</h2><p>{c['controlcopy']}</p><a class="textlink" href="{url('privacy.html')}">{c['privacy']} ↗</a><div class="mini-vault" aria-hidden="true"><div class="vaultlock">◈</div><span>ENCRYPTED ON DEVICE</span><div class="vaultline"></div><div class="destinations"><span>iCloud</span><span>Files</span><span>WebDAV</span></div></div></div><div class="storage">{storage}<p class="fine">{c['syncnote']}</p></div></div></section><section class="shell recovery"><div><p class="eyebrow">A WAY BACK</p><h2>{c['restoretitle']}</h2><p>{c['restorecopy']}</p></div><ol>{''.join(f'<li><span>{i:02}</span>{s}</li>' for i,s in enumerate(c['restoresteps'],1))}</ol></section><section class="shell sharing"><div><p class="eyebrow">03 / TOGETHER, BY CHOICE</p><h2>{c['share']}</h2><p>{c['sharecopy']}</p><p class="fine">{c['sharenote']}</p></div><figure class="shareart semantic-art"><img src="/assets/illustration-sharing.svg" width="760" height="620" loading="lazy" alt="{'将一份受保护的资料交给指定的人' if lang=='zh' else 'Protected information shared with a chosen person'}"></figure></section><section class="section shell" id="plans"><div class="sectionheading"><p class="eyebrow">04 / SIMPLE CHOICES</p><h2>{c['pricing']}</h2><p>{c['pricingcopy']}</p></div><div class="pricegrid"><article class="pricecard free"><span class="tiny">ESSENTIALS</span><h3>{c['free']}</h3><p>{c['freedesc']}</p><strong class="freeamount">{c['freeprice']}</strong><ul>{''.join(f'<li>{f}</li>' for f in c['freefeatures'])}</ul></article>{prices}</div><div class="premiumfeatures"><h3>{c['premium']}</h3><ul>{''.join(f'<li>✓ &nbsp;{f}</li>' for f in c['premiumfeatures'])}</ul></div><p class="fine pricefoot">{c['pricefoot']}</p><div class="expiry"><b>{c['expiry']}</b><p>{c['expirycopy']}</p></div></section><section class="shell faq section" id="faq"><div><p class="eyebrow">GOOD TO KNOW</p><h2>{c['faq']}</h2><a class="textlink" href="mailto:{EMAIL}">{c['support']} ↗</a></div><div>{faq}</div></section><section class="closing"><div class="shell"><img src="/assets/app-icon.png" width="76" height="76" alt="SecretBankX"><p class="eyebrow">{c['status']}</p><h2>{c['closing']}</h2><p>{c['closingcopy']}</p><a class="button primary" href="mailto:{EMAIL}">{c['support']} ↗</a></div></section></main>'''
 out=ROOT/('en' if lang=='en' else '');out.mkdir(exist_ok=True)
 (out/'index.html').write_text(document('重要资料，随时在手' if lang=='zh' else 'Life’s essentials, in your hands',body),encoding='utf-8')
 # Migrate every candidate policy section in its original order; interpolate only verified brand/contact values.
 policies=json.loads((ROOT/'i18n'/f'{lang}.json').read_text())
 for page in ['privacy','terms']:
  p=policies[page];sections='';toc=[]
  for k,v in p.items():
   if not k.startswith('s'):continue
   v= [x.replace('{{company}}','InitLife').replace('{{privacy_email}}',EMAIL).replace('{{contact_email}}',EMAIL) for x in v] if isinstance(v,list) else v.replace('{{company}}','InitLife').replace('{{privacy_email}}',EMAIL).replace('{{contact_email}}',EMAIL)
   if k.endswith('_title'):
    if k.count('_')==1: toc.append((k,v))
    tag='h2' if k.count('_')==1 else 'h3';sections+=f'<{tag} id="{k}">{v}</{tag}>'
   elif isinstance(v,list):sections+='<ul>'+''.join(f'<li>{x}</li>' for x in v)+'</ul>'
   elif k.endswith('_email'):sections+=f'<p>{v}<a href="mailto:{EMAIL}">{EMAIL}</a></p>'
   elif k.endswith('_privacy_link'): sections+=f'<p><a href="{url("privacy.html")}">{v}</a></p>'
   else:
    v=re.sub(r'https://[A-Za-z0-9./_-]+',lambda m:'<a href="'+m[0]+'">'+m[0]+'</a>',v)
    sections+=f'<p>{v}</p>'
  if page=='terms':
   supplement=(f'<h2>{c["expiry"]}</h2><p>{c["expirycopy"]}</p><p>{c["pricefoot"]}</p>')
   sections+=supplement
  toc_html=''.join('<a href="#'+k+'">'+v+'</a>' for k,v in toc)
  body=f'<main id="main" class="shell document"><div class="documenthead"><p class="eyebrow">{c["draft"]}</p><h1>{c[page]}</h1><p>{c["updated"]}</p></div><div class="documentgrid"><aside class="toc"><b>{c["toc"]}</b>{toc_html}</aside><article class="documentbody"><div class="policyhighlight">{p["highlight"]}</div>{sections}</article></div></main>'
  (out/f'{page}.html').write_text(document(c[page],body,f'{page}.html',p['meta_desc']),encoding='utf-8')
 body=f'<main id="main" class="shell error"><p class="eyebrow">404</p><h1>{c["error"]}</h1><p>{c["errordesc"]}</p><a class="button primary" href="{url()}">{c["home"]} →</a></main>'
 (out/'404.html').write_text(document('404',body,'404.html'),encoding='utf-8')
 # Existing public careers address becomes an honest contact page; no fictitious hiring/team claims.
 body=f'<main id="main" class="shell error"><p class="eyebrow">INITLIFE / SECRETBANKX</p><h1>{c["support"]}</h1><p>{c["brand"]}</p><a class="button primary" href="mailto:{EMAIL}">{EMAIL} ↗</a></main>'
 (out/'careers.html').write_text(document(c['support'],body,'careers.html'),encoding='utf-8')
for lang in COPY:build(lang)
