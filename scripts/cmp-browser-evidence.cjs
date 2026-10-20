// Captures reproducible, unauthenticated browser evidence for the Google AdSense CMP.
// The browser runs on a GitHub-hosted runner because the assistant's local runner
// cannot resolve public network hosts. No Google account or personal cookies used.
const { chromium, devices } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const out = path.resolve('cmp-evidence');
fs.mkdirSync(out, { recursive: true });
const cases = [
  { id: '01-desktop-normal', url: 'https://techtweedie.github.io/', mobile: false },
  { id: '02-desktop-gdpr-forced', url: 'https://techtweedie.github.io/?fc=alwaysshow&fctype=gdpr', mobile: false },
  { id: '03-mobile-gdpr-forced', url: 'https://techtweedie.github.io/?fc=alwaysshow&fctype=gdpr', mobile: true },
  { id: '04-privacy-page-gdpr-forced', url: 'https://techtweedie.github.io/privacy-policy/?fc=alwaysshow&fctype=gdpr', mobile: false },
];
const isGoogle = (url) => /google(syndication|adservices|fc|usercontent)?\.com|doubleclick\.net|fundingchoices|googleapis\.com/i.test(url);
function safeUrl(s) {
  try {
    const u = new URL(s);
    // Do not store query values or response bodies in public evidence.
    return u.origin + u.pathname + (u.search ? '?keys=' + [...u.searchParams.keys()].join(',') : '');
  } catch { return String(s).slice(0, 180); }
}
function jsonFile(name, value) {
  fs.writeFileSync(path.join(out, name), JSON.stringify(value, null, 2) + '\n');
}
async function runOne(browser, test) {
  const context = await browser.newContext(test.mobile
    ? { ...devices['iPhone 13'], locale: 'en-GB', timezoneId: 'Europe/London', serviceWorkers: 'block' }
    : { viewport: { width: 1365, height: 900 }, locale: 'en-GB', timezoneId: 'Europe/London', serviceWorkers: 'block' });
  await context.tracing.start({ screenshots: true, snapshots: true, sources: false });
  const page = await context.newPage();
  const network = [];
  const messages = [];
  let navigationError = null;
  page.on('response', r => {
    if (isGoogle(r.url()) || r.url().startsWith('https://techtweedie.github.io/')) {
      network.push({ kind: 'response', url: safeUrl(r.url()), status: r.status(), fromServiceWorker: r.fromServiceWorker() });
    }
  });
  page.on('requestfailed', r => {
    network.push({ kind: 'request-failed', url: safeUrl(r.url()), failure: r.failure()?.errorText || 'unknown' });
  });
  page.on('console', m => {
    if (['error', 'warning'].includes(m.type())) messages.push({ kind: m.type(), text: m.text().slice(0, 450) });
  });
  page.on('pageerror', error => messages.push({ kind: 'page-error', text: error.message.slice(0, 700) }));
  try {
    await page.goto(test.url, { waitUntil: 'domcontentloaded', timeout: 40000 });
  } catch (error) {
    navigationError = error.message;
  }
  await page.waitForTimeout(16000);
  let inspected = {};
  try {
    inspected = await page.evaluate(async () => {
      const googleTag = [...document.querySelectorAll('script[src*="adsbygoogle.js"]')].map(x => x.getAttribute('src'));
      const consentFrames = [...document.querySelectorAll('iframe')].map(f => ({
        url: f.src ? (new URL(f.src, location.href)).origin + (new URL(f.src, location.href)).pathname : '',
        title: f.title,
        visible: f.getBoundingClientRect().width > 0 && f.getBoundingClientRect().height > 0 && getComputedStyle(f).visibility !== 'hidden',
      }));
      const modal = [...document.querySelectorAll('[role="dialog"],[aria-modal="true"],[class*="fc-dialog"]')]
        .filter(e => e.getBoundingClientRect().height > 0 && getComputedStyle(e).visibility !== 'hidden')
        .map(e => ({ tag: e.tagName, text: (e.innerText || '').slice(0, 200) }));
      let tcfPing = null;
      if (typeof window.__tcfapi === 'function') {
        tcfPing = await Promise.race([
          new Promise(resolve => {
            try { window.__tcfapi('ping', 2, (data, success) => resolve({ success, data })); }
            catch (error) { resolve({ error: String(error) }); }
          }),
          new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 2000)),
        ]);
      }
      return {
        title: document.title,
        finalUrl: location.href,
        googleTag,
        privacySettingsLink: !!document.getElementById('google-privacy-settings'),
        privacySettingsCmpReady: document.getElementById('google-privacy-settings')?.getAttribute('data-google-cmp-ready') || null,
        scriptsWithLegacyBanner: [...document.querySelectorAll('script[src*="silktide"],link[href*="silktide"]')].length,
        frames: consentFrames,
        modals: modal,
        googlefcPresent: typeof window.googlefc !== 'undefined',
        tcfapiPresent: typeof window.__tcfapi === 'function',
        tcfPing,
        googleFcNodes: document.querySelectorAll('[id*="googlefc"],[class*="googlefc"],[id*="fc-"],[class*="fc-"]').length,
      };
    });
  } catch (error) { inspected = { evaluationError: error.message }; }
  const frameTexts = [];
  for (const f of page.frames()) {
    if (f === page.mainFrame()) continue;
    try {
      const content = await f.locator('body').innerText({ timeout: 1600 });
      frameTexts.push({ url: safeUrl(f.url()), matchedConsentTerms: /do not consent|manage options|consent to|privacy choices|reject all/i.test(content), excerpt: content.slice(0, 250) });
    } catch (error) {
      frameTexts.push({ url: safeUrl(f.url()), error: String(error.message).slice(0, 160) });
    }
  }
  try {
    await page.screenshot({ path: path.join(out, test.id + '.png'), fullPage: false, timeout: 12000, animations: 'disabled' });
  } catch (error) { messages.push({ kind: 'screenshot-error', text: error.message }); }
  await context.tracing.stop({ path: path.join(out, test.id + '-trace.zip') });
  const report = {
    case: test.id, testedUrl: test.url, timestampUtc: new Date().toISOString(), browser: 'Chromium (Playwright)', viewport: test.mobile ? 'iPhone 13 emulation' : '1365x900',
    navigationError, ...inspected, frameTexts, network, messages,
  };
  jsonFile(test.id + '.json', report);
  await context.close();
  return report;
}
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const results = [];
  for (const test of cases) {
    const result = await runOne(browser, test);
    results.push(result);
    console.log(JSON.stringify({
      case: result.case,
      navigationError: result.navigationError,
      googleTagCount: result.googleTag?.length || 0,
      privacySettingsLink: result.privacySettingsLink || false,
      privacySettingsCmpReady: result.privacySettingsCmpReady || null,
      googlefcPresent: result.googlefcPresent,
      tcfapiPresent: result.tcfapiPresent,
      tcfPing: result.tcfPing,
      modalCount: result.modals?.length || 0,
      frameCount: result.frames?.length || 0,
      matchedConsentIframe: result.frameTexts?.some(x => x.matchedConsentTerms) || false,
      googleResponses: result.network?.filter(x => x.kind === 'response' && isGoogle(x.url)).slice(0, 12),
      failedRequests: result.network?.filter(x => x.kind === 'request-failed').slice(0, 12),
      screenshot: 'cmp-evidence/' + result.case + '.png',
    }, null, 2));
  }
  await browser.close();
  jsonFile('result.json', { timestampUtc: new Date().toISOString(), runnerRegion: 'GitHub-hosted runner (public IP location not assumed)', results });
  const lines = [
    '# Google AdSense CMP browser test — Tech Tweedie',
    '',
    'Generated UTC: ' + new Date().toISOString(),
    '',
    '**Scope:** public website only, unauthenticated Playwright Chromium desktop/mobile. No publisher login, no actual consent clicks. Region simulated by locale, NOT network IP. Google debug mode bypasses geo checks.',
    '',
    '| Case | Page loaded | AdSense tag | Settings link | Google FC API | TCF API | Visible dialog elements | Consent iframe content found |',
    '|---|---|---|---|---|---|---|---|',
    ...results.map(r => '| ' + r.case + ' | ' + (r.navigationError ? 'No' : 'Yes') + ' | ' + (r.googleTag?.length || 0) + ' | ' + (r.privacySettingsLink ? 'Yes' : 'No') + ' | ' + (r.googlefcPresent ? 'Yes' : 'No') + ' | ' + (r.tcfapiPresent ? 'Yes' : 'No') + ' | ' + (r.modals?.length || 0) + ' | ' + (r.frameTexts?.some(x => x.matchedConsentTerms) ? 'Yes' : 'Not observed') + ' |'),
    '',
    '## Interpretation and limitations',
    '- A Google script being present in HTML is not proof the publisher account has activated a European regulations message.',
    '- A missing dialog under `?fc=alwaysshow&fctype=gdpr` may indicate a missing site assignment, unpublished message, message propagation delay, browser blocking, network failures, or account eligibility.',
    '- The precise browser and Google network errors are in the per-case JSON files; screenshots capture the visible state. Do not infer legal compliance from this automation.',
    '- Playwright traces contain rendered page snapshots and network metadata. They are stored as GitHub Actions artifacts (30-day retention) and should be shared thoughtfully.',
    '- If production is awaiting Google AdSense site approval, that remains a possible account-side cause, which this audit cannot independently confirm.',
    '',
    'Official test mode: https://developers.google.com/funding-choices/fc-api-docs',
  ];
  fs.writeFileSync(path.join(out, 'README.md'), lines.join('\n') + '\n');
  console.log(lines.join('\n'));
})().catch(error => {
  fs.writeFileSync(path.join(out, 'RUNNER_ERROR.txt'), String(error.stack || error) + '\n');
  console.error(error);
  process.exitCode = 1;
});
