# CoderPulse Widgets - Distribution Guide

This guide explains how to package and distribute your widgets for WordPress and other external platforms.

## 📦 WordPress Plugin Distribution

I have provided a boilerplate plugin in the `wordpress/` directory.

### How to use:

1. Zip the `wordpress/` directory.
2. Upload the `.zip` to any WordPress site via **Plugins > Add New > Upload Plugin**.

### 🟢 Gutenberg Block Support (Modern)

Your widgets are now registered as native WordPress blocks.

1. Open the Block Editor (Gutenberg) on any page/post.
2. Click the **+** (Toggle Block Inserter).
3. Search for **"CoderPulse"**.
4. Drag and drop the **Hello World** or **Star Rating** widget into your content.
5. Use the **Block Settings** sidebar to customize properties like names or rating values.

### 🟡 Shortcode Support (Legacy)

If you prefer shortcodes or are using a Classic Editor:

- `[cp-hello-world name="Coder"]`
- `[cp-star-rating rating="4"]`

### 📦 WordPress Plugin Repository Submission

The `wordpress/` directory now includes a `readme.txt` file and uses standard function prefixing (`cpw_`), making it ready for submission to the [WordPress Plugin Directory](https://wordpress.org/plugins/add/).

- **After Approval**: Add `SVN_USERNAME` and `SVN_PASSWORD` to your GitHub Secrets. Subsequent releases will automatically sync with the WordPress SVN repository.

---

## 🔐 Automated NPM Publishing (Trusted Publishing)

To automate NPM publishing securely, we use **NPM Trusted Publishing**. You can set this up on [npmjs.com](https://www.npmjs.com) to trust your GitHub repository, eliminating the need for static secret tokens.

The `release.yml` workflow is already configured to support this out of the box.

---

## 🛠️ Page Builder Integration (Elementor / Beaver Builder)

To make your widgets show up as native "Elements" or "Modules", you can extend the WordPress plugin.

### Elementor Integration

You can register a new widget by extending `\Elementor\Widget_Base`.
In the `render()` method, you would simply echo the custom HTML tag:

```php
echo '<cp-star-rating rating="' . $settings['rating'] . '"></cp-star-rating>';
```

### Beaver Builder Integration

You would use `FLBuilder::register_module()` and point it to a template file that contains your custom tag.

---

## 🔗 Backlink Strategy

Every widget now includes a small "Powered by CoderPulse" link in its Shadow DOM. This ensures that every time a widget is embedded, it builds brand awareness and a potential backlink to `coderpulse.io`.
