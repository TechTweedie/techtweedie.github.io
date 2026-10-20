# Google AdSense + Google-certified CMP checklist (Tech Tweedie `v2`)

**Observed account status on 19 October 2026 (user screenshot):** site ownership verified; `techtweedie.github.io` **Requires review**. Google Ads may not serve until the site's status is **Ready**. We cannot administer the AdSense account using the GitHub integration.

## Implemented in v2
- Removed the legacy **Silktide** cookie banner, its CSS/JS resources and the prior **Google Tag Manager** injection (including the previous analytics-consent popup).
- Kept `<meta name="google-adsense-account" content="ca-pub-6680433426341726">` on all Hugo-generated pages and the matching `static/ads.txt`.
- Added Google's official async `adsbygoogle.js?client=ca-pub-6680433426341726` tag **site-wide**. Google's Privacy & messaging documentation allows its user messaging to be delivered through an existing AdSense tag. Loading it site-wide avoids visitors bypassing the CMP simply by landing on a non-blog page.
- Added a persistent **Privacy & cookie settings** footer link. When Google's consent API is ready it opens Google's revocation/settings message; if the API is unavailable it falls back to the local Cookie Policy.
- **No manually placed ads** were created. `params.adsense.enabled` remains `false` (reserved for any future hand-placed units); `params.adsense.loadTag` is `true` to load the Google service needed for CMP and review.
- **Important:** The AdSense tag can enable **Auto ads** automatically after approval if Auto ads are enabled in the AdSense account. Use AdSense Auto ads/page exclusions to keep ads off legal or other excluded pages as required.
- Updated static regression checks and the Playwright audit. The browser audit now runs on Ubuntu 24.04 because the previously pinned Playwright release does not support the Ubuntu 26.04 GitHub runner.
- Google's certified CMP **cannot** be created or published by editing GitHub. It is supplied by the publisher's AdSense account when correctly configured. A deployed script alone does not prove that the message is visible.

## Required in your Google AdSense account

1. **Sites → techtweedie.github.io → Request review** if the site still shows Requires review.
2. In **Privacy & messaging → European regulations → Manage**, confirm the message for `techtweedie.github.io` has status **Published**, not Draft. Google says publication can take up to around 10 minutes to become visible.
3. Confirm this exact site is selected in the message and the privacy policy URL is **https://techtweedie.github.io/privacy-policy/**. Include the UK/EEA/Switzerland as appropriate and review the consent choices, vendors and languages.
4. In **Privacy & messaging → European regulations → Settings**, review **Maximise message coverage** and Consent Mode settings.
5. In **Ads → By site → techtweedie.github.io**, keep Auto ads configured exactly as intended. If you do not want ads on legal pages, add AdSense page exclusions for those URLs.
6. Test in an Incognito/private UK browser using **https://techtweedie.github.io/?fc=alwaysshow&fctype=gdpr**. Google documents this debug query for a published GDPR message. Then test the normal URL after clearing site data.
7. Verify **https://techtweedie.github.io/ads.txt** is served and contains the matching publisher ID.

## Scope and limitations

Google's certified IAB TCF CMP manages Google's ad-related consent, not all possible third-party embeds. Separately assess embedded video, comments, fonts and other external scripts. The site cannot be declared fully UK GDPR/AdSense compliant based on code inspection alone. AdSense approval, actual Google CMP publication, tag/request behaviour and the AdSense Policy Centre remain account/live-browser checks.

Google's official resources:
- [Google CMP / certified CMP requirements](https://support.google.com/adsense/answer/13554116)
- [Publish and unpublish messages](https://support.google.com/adsense/answer/13651178)
- [How the Google CMP works](https://support.google.com/adsense/answer/16918505)
- [Maximise message coverage](https://support.google.com/adsense/answer/17341119)
- [Privacy & Messaging JavaScript API and debug mode](https://developers.google.com/funding-choices/fc-api-docs)
