# AdSense launch checklist (Tech Tweedie, v2)

This site is **prepared for** AdSense but intentionally **does not load Google ads by default**. Google alone decides whether a site is accepted. Do not claim ads are active or compliant until the checks below pass.

## Already in source

- Hugo default branch links target v2.
- Meta tag `google-adsense-account=ca-pub-6680433426341726` is present on every page for site ownership verification. This tag does not set advertising cookies.
- `static/ads.txt` has `google.com, pub-6680433426341726, DIRECT, f08c47fec0942fa0`. **Verify that this is YOUR publisher ID** before serving ads.
- AdSense loading is controlled by `params.adsense.enabled` in `hugo.yaml` (currently false). Once enabled, its official async ad script is loaded on **blog article** pages only. No ads on legal pages.
- The legacy Silktide banner is *not* an advertising CMP. While AdSense is off, it requests analytics consent only, with Tag Manager deferred until opt-in. When AdSense is enabled, the legacy banner and Tag Manager are switched off to avoid conflicting consent systems.
- Privacy and cookie policies explain the staged rollout.

## Required account-side work BEFORE switching on

1. Open [Google AdSense](https://www.google.com/adsense/) > Sites. Add/verify `https://techtweedie.github.io/` under the AdSense account with publisher ID `pub-6680433426341726`; request site review; wait for **Ready** status. You can verify site ownership with the already-installed meta tag (no advertising script required).
2. In AdSense > Privacy & messaging, create and **publish** a **European regulations** message using Google's **certified IAB TCF CMP**. Select the **three-button** choice (Consent / Do not consent / Manage options). Configure your ad technology providers and link your privacy policy. Check coverage for **UK, EEA and Switzerland**. Check any other regions whose rules apply to your traffic, including relevant US-state settings. Publishing a draft is not enough.
3. Test the CMP on a UK/EEA session, including consent, rejection, change/withdrawal, cookies/network requests and mobile rendering. Confirm its message is actually displayed where required and preference changes are accessible. Review Google's latest EU user consent and publisher policies.
4. Audit the **GTM-MP29JHZT** container separately: while `adsense.enabled=false`, the site only loads it after analytics opt-in; ensure it contains **no advertising/marketing tags** that would run merely from analytics consent. When ads are enabled GTM is deliberately disabled by the template; restore it only with a consent-aware plan.
5. Review Giscus comments, embedded YouTube/media, third-party fonts and shared UI assets for privacy disclosures and consent as needed. Audit each live page for original useful content, safe placement, links, technical accuracy and accidental-click risk. AdSense account content and auto-ads controls must be reviewed separately.
6. Verify that `https://techtweedie.github.io/ads.txt` returns the correct entry. Google recommends ads.txt; it is not mandatory. Verify deployed `<meta name="google-adsense-account">` and that the live site uses the v2 workflow.
7. Set `params.adsense.enabled: true` in `hugo.yaml` on v2, deploy, and verify the generated article HTML includes one `adsbygoogle.js?client=ca-pub-6680433426341726` tag. Manage Auto ads and ad locations within AdSense; start conservatively and check desktop/mobile. Do not put units next to navigation, click targets, legal pages or downloads.
8. Verify in a fresh browser in at least one UK/EEA test that the **certified CMP appears before Google ad requests requiring consent**, and that declining does not load personalised advertising/tracking. Confirm AdSense policy centre has no outstanding issues. Review periodically.

## Important limitations

- A Google Consent Mode snippet, a third-party cookie banner, or a privacy policy alone **cannot replace the required certified CMP** for Google advertising in the EEA/UK/Switzerland.
- We have **not** verified the Google AdSense account, active Google CMP messages, GTM container internals or the current deployment result. A source-code change cannot guarantee AdSense acceptance or legal compliance.
- No additional ad slot or third-party tracking is activated until the account setup above is complete.

Official guidance:
- https://support.google.com/adsense/answer/13554116
- https://support.google.com/adsense/answer/12169212
- https://support.google.com/adsense/answer/12171612
- https://support.google.com/adsense/answer/48182
