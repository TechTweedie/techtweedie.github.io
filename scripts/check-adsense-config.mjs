import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const location = (path) => new URL('../' + path, import.meta.url);
const read = (path) => readFileSync(location(path), 'utf8');
const publisher = '6680433426341726';
const config = read('hugo.yaml');
const head = read('layouts/partials/header.html');
const adPartial = read('layouts/partials/adsense/head.html');
const adsTxt = read('static/ads.txt');
const privacy = read('content/privacy-policy/index.md');
const cookies = read('content/cookie-policy/index.md');
const footer = read('layouts/partials/mightora-footer.html');
const homepage = read('layouts/index.html');
const base = read('layouts/_default/baseof.html');

assert.match(head, new RegExp('name="google-adsense-account" content="ca-pub-' + publisher + '"'));
assert.equal(adsTxt.trim(), 'google.com, pub-' + publisher + ', DIRECT, f08c47fec0942fa0');
assert.match(config, /gitBranch:\s*v2/);
assert.match(config, /adsense:\s*\n\s+loadTag:\s*true/);
assert.match(config, /enabled:\s*false/);

// Official tag on the homepage + articles; not on legal pages and not duplicated.
assert.match(adPartial, /site\.Params\.adsense\.loadTag/);
assert.match(adPartial, /eq \.Kind "home"/);
assert.match(adPartial, /eq \.Section "posts"/);
assert.match(adPartial, /adsbygoogle\.js\?client=/);
assert.match(head, /partial "adsense\/head.html"/);
assert.match(homepage, /partial "header.html"/);
assert.match(base, /partial "header.html"/);
// Comments may legitimately describe the removed integration; inspect executable markup.
const executableHead = head.replace(/{{\/\*[\s\S]*?\*\/}}/g, '').replace(/<!--[\s\S]*?-->/g, '');
assert.doesNotMatch(executableHead, /silktide|googletagmanager|gtag\(/i);
assert.doesNotMatch(head, /pagead2\.googlesyndication\.com/);

// No untrusted or uncertified old banner assets remain.
for (const path of [
  'static/cookie-banner/silktide-consent-manager.js',
  'static/cookie-banner/silktide-consent-manager.css',
  'static/path-to-css/silktide-consent-manager.js',
  'static/path-to-css/silktide-consent-manager.css',
]) {
  assert.equal(existsSync(location(path)), false, path + ' should be removed');
}

// The policy should explain which services have been retired, not pretend
// their names never existed (historical disclosures are appropriate).
assert.match(cookies, /not loaded/);
assert.doesNotMatch(cookies, /Silktide banner asks solely|consent-gated Google Tag Manager integration/i);
assert.match(cookies, /Privacy & messaging/);
assert.match(privacy, /privacy@tweed\.technology/);
assert.match(cookies, /privacy@tweed\.technology/);
assert.match(footer, /privacy-policy\//);
assert.match(footer, /cookie-policy\//);

console.log('Google AdSense integration checks passed. CMP publication and site approval require AdSense account verification.');
