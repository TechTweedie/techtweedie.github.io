# Migration Guide from Old Tech Tweedie Site

## ✅ Completed Configuration Updates

### Site Configuration
- ✅ Updated `baseURL` to `https://techtweedie.github.io/`
- ✅ Changed language from Bengali to English
- ✅ Set site title to "Tech Tweedie"
- ✅ Added Power Platform focused description and keywords
- ✅ Updated Google Analytics ID to `G-2GHVQK02Y4`
- ✅ Updated GitHub repo links

### Author Information
- ✅ Updated author name to "Ian Tweedie" 
- ✅ Set nickname to "Tech Tweedie"
- ✅ Added contact information (email: ian.tweedie@hotmail.com)
- ✅ Updated social links (GitHub: itweedie, LinkedIn: iantweedie, etc.)
- ✅ Updated summary to focus on Power Platform and Microsoft technologies

### Content Sections
- ✅ Updated About section with Power Platform focus
- ✅ Updated Skills section with Power Platform, Microsoft, and Hugo skills
- ✅ Added custom menu items (YouTube channel, Free Tools)

## 🔄 Manual Steps Required

### 1. Logo Files Migration
You need to replace the placeholder logo files with your actual Tech Tweedie logos:

**Replace these files in `assets/images/site/`:**
- `main-logo.png` - Replace with your main Tech Tweedie logo
- `inverted-logo.png` - Replace with your inverted/white version logo  
- `favicon.png` - Replace with your favicon
- `background.jpg` - Optionally replace with your preferred background

**From your old site, copy:**
- `/logo-01_150x150.png` → rename to `main-logo.png`
- Create an inverted version for `inverted-logo.png`
- Your favicon files

### 2. Author Avatar
Replace `assets/images/author/john.png` with your photo and rename to `ian.png`

### 3. Skill Section Images
Create/add skill logos in `assets/images/sections/skills/` for:
- `powerapps.png`
- `powerautomate.png`
- `powerbi.png`
- `dataverse.png`
- `pcf.png`
- `hugo.png`
- `typescript.png`
- `azure.png`

### 4. Content Migration
- Copy your blog posts from `content/posts/` in the old site
- Update front matter to match the new theme format
- Copy any other content pages you want to keep

### 5. Menu Structure (Optional)
If you want the exact same menu as your old site, add this to your `hugo.yaml`:

```yaml
menu:
  main:
    - identifier: "tags"
      name: "Tags"
      url: "/tags/"
      weight: 2
    - identifier: "categories"
      name: "Categories"
      url: "/categories/"
      weight: 3
    - identifier: "youtube"
      name: "YouTube"
      url: "https://www.youtube.com/channel/UCy1a2QSDVZNDwZf7KbNmoHQ"
      weight: 4
    - identifier: "freetools"
      name: "Free Tools"
      url: "https://mightora.io/"
      weight: 5
```

## 🎨 Theme Differences

### Font
- Old site: FeelIt theme (font family not specified)
- New site: Mulish font family (Google Fonts)
- The new font should work well for your content type

### Layout
- The new Toha theme has a more modern, portfolio-focused layout
- Includes sections for Skills, Projects, Experience, etc.
- You can disable sections you don't need in their respective YAML files

### Features
Both sites have:
- ✅ Dark/Light theme toggle
- ✅ Google Analytics
- ✅ Social sharing
- ✅ Search functionality  
- ✅ Blog posts with tags/categories

## 🚀 Next Steps

1. **Replace the logo files** as described above
2. **Run the site locally** to test: `hugo server`
3. **Migrate your blog content** from the old repository
4. **Customize any sections** you don't need by setting `enable: false`
5. **Deploy to GitHub Pages** when ready

## 📝 Notes
- The theme automatically handles responsive design
- SEO settings are already configured with your descriptions
- Social share buttons are enabled for Facebook, Twitter, LinkedIn, Reddit, WhatsApp, and Email
- The portfolio section is enabled if you want to showcase projects
