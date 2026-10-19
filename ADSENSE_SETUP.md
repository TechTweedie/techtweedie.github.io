# Google AdSense + Google-certified CMP checklist (Tech Tweedie `v2`)

**Observed account status on 19 October 2026 (user screenshot):** site ownership verified; `techtweedie.github.io` **Requires review**. Google Ads may not serve until the site's status is **Ready**. We cannot administer the AdSense account using the GitHub integration.

## Implemented in v2
- Removed the legacy **Silktide** cookie banner, its CSS/JS resources and the prior **Google Tag Manager** injection (including the previous analytics-consent popup).
- Kept `<meta name="google-adsense-account" content="ca-pub-6680433426341726">` on all Hugo-generated pages and the matching `static/ads.txt`.
- Added Google's official async `adsbygoogle.js?client=ca-pub-6680433426341726` tag on the homepage and individual blog articles. This is the Google tag used for site review and its **Privacy & messaging** CMP. It is intentionally absent from Privacy Policy / Cookie Policy / About / Contact / Terms.
- **No manually placed ads** were created. `params.adsense.enabled` remains `false` (reserved for any future hand-placed units); `params.adsense.loadTag` is `true` to load the Google service needed for CMP and review.
- **Important:** The AdSense tag can enable **Auto ads** automatically *after approval* if Auto ads are enabled in the AdSense account. Before publishing the Google CMP, ensure **Auto ads are OFF** in your AdSense account. There is no source-only guarantee that tag loading prevents ad serving after approval.
- Updated the published privacy/cookie policy text and static regression checks.
- Google's certified CMP **cannot** be created or published by editing GitHub. It is supplied by the publisher's AdSense account when correctly configured. A deployed script alone does not prove that the message is visible.

## Required in your Google AdSense account

1. **Sites → techtweedie.github.io → Request review.** Google has already verified ownership, according to your screenshot. Reviews may take days or several weeks.
2. At the consent platform selection step after requesting review, choose **Google's CMP** with **three buttons**: **Consent**, **Do not consent**, **Manage options**; submit the choice. Google's process can automatically create a European regulations message.
3. In **Privacy & messaging → European regulations → Manage**, confirm this exact site is selected and create/publish a message if one has not been created. Set privacy policy URL to **https://techtweedie.github.io/privacy-policy/**. Include UK, EEA and Switzerland and keep consent purposes off by default. Review ad partners, wording, languages and regional requirements. A draft does **not** count as published.
4. **Privacy & messaging → European regulations → Settings**: consider **Maximise message coverage**, which can show a Google-certified fallback when required consent is missing. Ensure the published message uses the appropriate three-button choices, rather than relying exclusively on a two-button fallback.
5. Review **AdSense → Ads → By site → techtweedie.github.io** and set **Auto ads OFF while review/CMP activation is pending**. After status is Ready and the CMP can be verified on eligible visitors, enable only the ad formats you want. The code already carries the standard Google tag.
6. Test in a fresh UK browser after the Google message is published, including **Consent**, **Do not consent**, **Manage options**, revocation, mobile display, and pre-consent third-party requests. Google documents that its message is managed by AdSense and normally inserts a consent revocation link for approved sites carrying the tag.
7. Verify the live site offers the message and `https://techtweedie.github.io/ads.txt` is served; confirm no Silktide banner or GTM requests. Google may delay serving CMP messaging until the account/site is eligible. If it doesn't display, check account selection, message publication and the AdSense tag first.

## Scope and limitations

Google's certified IAB TCF CMP manages **Google's ad-related consent**, not all possible third-party embeds. Separately assess embedded video, comments, Google Fonts and other external scripts. The site cannot be declared fully UK GDPR/AdSense compliant based on code inspection alone. AdSense approval, actual Google CMP publication, tag/request behaviour and the AdSense Policy Center remain account and live-browser checks.

Google's official resources:
- [Request review / choose Google's CMP](https://support.google.com/adsense/answer/12169212)
- [Create and publish a European regulations message](https://support.google.com/adsense/answer/10960768)
- [Google certified CMP requirements](https://support.google.com/adsense/answer/13554116)
- [Maximise message coverage](https://support.google.com/adsense/answer/17341119)
- [Consent revocation link](https://support.google.com/adsense/answer/10959060)
