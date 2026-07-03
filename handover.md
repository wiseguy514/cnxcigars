# CNX Cigars Handover
**Session:** 28/06/2026 (seventh pass)
**Branch:** master
**Deploy:** Cloudflare Workers via GitHub (0xShaynegit/cnxcigarsv2)
**Live URL:** https://cnxcigarsv2.slrclaude.workers.dev

---

## Current State

Site is live. Age gate is active. All 160 image references verified present. All WhatsApp/LINE info obfuscated. Compliance pages updated. Homepage copy audit complete. PageSpeed 96 accessibility, 100 SEO.

---

## What Was Done This Session (sixth pass)

### Image Audit
- Fixed duplicate humidor image in adv section (advImg0/advImg3 both used humidor-stocked-shelves)
- advImg0 (The Humidor): now humidor-my-father-davidoff-selection
- advImg3 (Cigar Experience): now humidor-stocked-shelves
- Audited all 160 image references across 11 pages against actual images folder
- Fixed 2 missing images: lounge-full-overview-from-mezzanine (deleted) replaced with event-night-full-room-overhead-mezzanine across lounge.html + about.html
- Fixed humidor-multi-brand-shelf-overview (deleted) replaced with humidor-romeo-julieta-upmann-multi-shelf across services.html + about.html
- OG/Twitter image aligned to logo across all pages (services.html was using lounge chair image)

### WhatsApp + LINE Obfuscation
- All plain-text +66 622 769 937 and Bodazey removed from all 11 pages
- Replaced with .obf-wa / .obf-line spans populated via atob() decode script injected before </body>
- services.html body copy instance also fixed
- JSON-LD schema on index.html retains phone for SEO   intentional

### Copy Overhaul (Previous Directive)
- Founder page: added 1997 Havana legacy anchor, Habanos S.A., Pacific Cigar Company chain of custody paragraph
- Collection FAQ: removed "competitive prices" language
- Lounge + Services: "contact us" replaced with intake/protocol framing throughout

### Homepage Copy Audit (6-Point Audit)
- Stats block: "Nationwide Shipping" → "Compliant Distribution" (B2B framing)
- Shipping footer: consumer delivery copy → B2B/verified client allocation language
- Price FAQ: question + answer rewritten   removed 200/1500 THB ranges, replaced with excise compliance framing. JSON-LD schema also updated.
- Gatekeeping language removed: "private lounges", "kind of silence", "A Circle" → "A Community"
- Section 01/05 collision fixed: elegance/refinement copy replaced with climate/preservation focus
- Padron 1926 card: image was league-of-fat-bastards.webp, label now matches (League of Fat Bastards)
- 3 lounge-area "Reserve a Seat" CTAs → "Visit the Lounge"
- "Book Your Visit" → "Walk In or Send a Message"
- "Contact us directly" button → "Get in Touch"
- Amir Nadimi entity pulled into "Thirty Years" section opening paragraph

### Compliance Update
- Age gate copy: cites Thailand Tobacco Products Control Act B.E. 2560, links to ToS + PP
- Age gate legal micro-copy: non-transactional archive statement, ToS and PP links
- Services form: PDPA consent notice injected above submit button with PP link
- Terms of Service: Act named by full title, non-transactional archive clause added, Chiang Mai jurisdiction specified
- Privacy Policy: 24-month retention clock set, cookie clause updated with cnx_age_verified reference

### Age Gate Reinstated
- Removed style="display:none" from <div id="gate"> in index.html
- Gate now active on all visits; localStorage cnx_age_verified persists 30 days

### Contact Info Visibility Fix (seventh pass)
- Footer on all 10 non-index pages: .obf-wa/.obf-line spans replaced with <a href="#" id="ftr-wa"> and <a href="#" id="ftr-line"> showing "WhatsApp" and "LINE" text only
- Decode script updated to use click handler + window.open() instead of setting href   number and LINE ID never appear in browser status bar
- index.html footer icons (ft-wa, ft-line): same treatment via setPopup() helper. FB and Messenger left as standard href links (not sensitive)
- Chaty widget: WA and LINE channels use href="#" + window.open() click handler. FB and Messenger remain standard href. Text labels restored (appear beside icons on hover, desktop only)

---

## External Topical Map (28/06/2026)

Full map at `.md/external-topical-map.md`

| # | Action | Owner | Status |
|---|---|---|---|
| 1 | Google Business Profile | Amir / Shayne | Pending |
| 2 | CMA article "Best Cigar Lounge in Chiang Mai" | Claude | Done 28/06/2026 |
| 3 | CMLocals Nimman nightlife article | Claude | Done 28/06/2026 |
| 4 | TripAdvisor listing | Amir | Pending |
| 5 | Chiang Mai Citylife outreach | Shayne | Pending |
| 6 | The Thaiger submission | Shayne | Pending |
| 7 | GBP Q&A seeds + first 3 posts | Claude drafted, Amir publishes | Ready - see .md/gbp-setup.md |
| 8 | LinkedIn article from Amir | Claude drafts | Pending |

GBP setup doc (description, Q&A, posts) at `.md/gbp-setup.md` — ready to paste.

---

## Still Pending Before Delivery

1. **Analytics token**   replace ANALYTICS_TOKEN_PLACEHOLDER in all 11 pages
2. **Browser verify**   full scroll desktop + mobile before launch
3. **OG social card**   currently logo (black on black on social). Low priority.
4. **Google Business Profile**   post-launch (drafts ready in .md/gbp-setup.md)
5. **Search Console**   submit sitemap post-launch

---

## Architecture Notes

- **Vanilla HTML/CSS/JS only. Zero frameworks.**
- **No dist folder.** Files served from repo root via .assetsignore
- **Worker** (not Pages): wrangler.toml with [assets] directory = "."
- **Chaty widget**: scripts/chaty-widget.js?v=4 on all 11 pages. 5 channels: WA, LINE, FB, Messenger, Email.
- **Obfuscation pattern**: WA and LINE URLs decoded via atob() at runtime. All WA/LINE links use href="#" + window.open() click handler so number/ID never appear in browser status bar. FB and Messenger use standard href (not sensitive). JSON-LD schema on index.html retains plain phone for SEO -- intentional.
- **Age gate**: localStorage key cnx_age_verified, 30-day persistence
- **Fonts**: WOFF2 from ./fonts/woff2/ with font-display:swap
- **Images**: WebP only, ./images/, all 160 references verified present
- **Walk-ins are ALWAYS welcome**   never change this framing site-wide

## File Line Endings (Critical)

collection.html = CRLF
accessories.html = LF
Other files vary. Always check before any PowerShell string replacement.

---

## Latest Commit

c69a555 - Footer: hide wa.me/line.me URLs from browser status bar
