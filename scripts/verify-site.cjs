const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
(async () => {
 const browser = await chromium.launch({headless:true,channel:'chrome'});
 const results=[];const errors=[];
 for (const lang of ['zh','en']) {
  for (const width of [390,768,1440]) {
   const context=await browser.newContext({viewport:{width,height:width===1440?1000:844},locale:lang==='zh'?'zh-CN':'en-US',reducedMotion:'reduce'});
   const page=await context.newPage();
   page.on('pageerror', e=>errors.push(String(e)));
   for (const file of ['','privacy.html','terms.html','careers.html','404.html']) {
    const response=await page.goto('http://127.0.0.1:8899/'+(lang==='en'?'en/':'')+file+'?lang='+lang);
    await page.waitForLoadState('networkidle');
    await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
    await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode().catch(()=>{}))));
    const check=await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth,placeholders:/\{\{|undefined|\[object Object\]/.test(document.body.innerText),headings:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href'))}));
    if (response.status()!==200||check.overflow||check.placeholders||check.headings!==1||check.brokenImages.length)errors.push({lang,width,file,...check});
    for(const href of check.links.filter(h=>h?.startsWith('#')))if(!await page.locator('[id="'+href.slice(1)+'"]').count())errors.push({missingAnchor:href,file});
    results.push({lang,width,file,status:response.status(),...check,links:undefined});
    if(file===''&&width!==768) {
     await page.screenshot({path:path.join(root,'evidence',`${lang}-${width}-home.png`),fullPage:true});
     await page.screenshot({path:path.join(root,'evidence',`${lang}-${width}-hero.png`)});
     await page.locator('#faq details').first().locator('summary').click();
     if(await page.locator('#faq details').first().getAttribute('open')===null)errors.push('FAQ failed');
     if(width===390){await page.locator('.menu').click();if(await page.locator('.menu').getAttribute('aria-expanded')!=='true') errors.push('menu open'); await page.locator('#navigation a').first().click();if(await page.locator('.menu').getAttribute('aria-expanded')!=='false') errors.push('menu close');}
     await page.locator('.language').click();await page.waitForLoadState('networkidle');
     if(await page.locator('html').getAttribute('lang')!==(lang==='zh'?'en':'zh-Hans'))errors.push('language switch');
    }
    if(['privacy.html','terms.html'].includes(file)&&width===1440) await page.screenshot({path:path.join(root,'evidence',`${lang}-${file.replace('.html','')}.png`),fullPage:true});
   }
   await context.close();
  }
 }
 // Destination and asset validation across generated HTML.
 const htmlFiles=['index.html','privacy.html','terms.html','careers.html','404.html'].flatMap(p=>[p,'en/'+p]);
 const context=await browser.newContext();const page=await context.newPage();
 for(const file of htmlFiles){await page.goto('http://127.0.0.1:8899/'+file+'?lang='+ (file.startsWith('en/')?'en':'zh'));const refs=await page.evaluate(()=>[...document.querySelectorAll('a[href],link[href],script[src],img[src]')].map(e=>e.href||e.src).filter(u=>u.startsWith(location.origin)));for(const ref of [...new Set(refs)]){const res=await page.request.get(ref);if(res.status()!==200)errors.push({brokenURL:ref,status:res.status()});}}

 // Real missing routes, browser language selection, keyboard and reduced motion.
 for(const [locale,path,expected] of [['en-US','/privacy.html','en'],['zh-TW','/','zh-Hans'],['fr-FR','/','en']]) {
  const c=await browser.newContext({locale});const p=await c.newPage();await p.goto('http://127.0.0.1:8899'+path);await p.waitForLoadState('networkidle');if(await p.locator('html').getAttribute('lang')!==expected)errors.push({languageDetection:locale,path});await c.close();
 }
 for(const lang of ['zh','en']) {
  const res=await page.goto('http://127.0.0.1:8899/'+(lang==='en'?'en/':'')+'missing-page?lang='+lang);if(res.status()!==404)errors.push('404 status');
  await page.getByRole('main').getByRole('link').click();await page.waitForLoadState('networkidle');if(!await page.locator('#experience').count())errors.push('404 return');
 }
 await page.goto('http://127.0.0.1:8899/?lang=zh');await page.keyboard.press('Tab');if(await page.locator(':focus').getAttribute('href')!=='#main')errors.push('skip focus');await page.keyboard.press('Enter');
 await page.locator('#faq summary').first().focus();await page.keyboard.press('Enter');if(await page.locator('#faq details').first().getAttribute('open')===null)errors.push('keyboard FAQ');
 await page.emulateMedia({reducedMotion:'reduce'});if(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)!=='auto')errors.push('reduced motion');
 await context.close();await browser.close();
 fs.writeFileSync(path.join(root,'evidence/browser-results.json'),JSON.stringify({checkedAt:new Date().toISOString(),results,errors},null,2));
 console.log(JSON.stringify({pages:results.length,errors},null,2));if(errors.length)process.exitCode=1;
})();
