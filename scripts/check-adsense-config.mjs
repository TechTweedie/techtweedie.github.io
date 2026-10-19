import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const id = '6680433426341726';
const config = read('hugo.yaml');
const head = read('layouts/partials/header.html');
const adPartial = read('layouts/partials/adsense/head.html');
const adsTxt = read('static/ads.txt');
const privacy = read('content/privacy-policy/index.md');
const cookies = read('content/cookie-policy/index.md');
const footer = read('layouts/partials/mightora-footer.html');

// Ownership is verifiable without loading ads or cookies.
assert.match(head, new RegExp('name="google-adsense-account" content="ca-pub-' + id + '"'));
assert.match(adsTxt.trim(), new RegExp('^google\\.com, pub-' + id + ', DIRECT, f08c47fec0942fa0$'));
assert.match(config, /gitBranch:\s*v2/);
assert.match(config, /adsense:\s*\n\s+enabled:\s*false/);

// Fail closed by default. Never serve ads on utility/legal pages.
assert.match(adPartial, /site\.Params\.adsense\.enabled/);
assert.match(adPartial, /eq \.Section "posts"/);
assert.match(adPartial, /eq \.Kind "page"/);
assert.match(adPartial, new RegExp('adsbygoogle\\.js\\?client='));

// GTM can only be loaded after an explicit analytics consent callback.
assert.match(head, /if not site\.Params\.adsense\.enabled/);
assert.match(head, /onAccept:\s*function\s*\(\)\s*\{ window\.techTweedieEnableAnalytics\(\)/);
assert.match(head, /tag\.src = 'https:\/\/www\.googletagmanager\.com\/gtm\.js/);
assert.doesNotMatch(head, /<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtm\.js/);

// Policies and contact information must be real and linked.
for (const text of [privacy, cookies]) {
  assert.match(text, /privacy@tweed\.technology/);
  assert.doesNotMatch(text, /NOTE FOR SITE OWNER|yourdomain\.com/);
}
assert.match(footer, /privacy-policy\//);
assert.match(footer, /cookie-policy\//);
assert.match(footer, /contact\//);
console.log('AdSense static readiness checks passed. External CMP/account approval still required.');
