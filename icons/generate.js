import { favicons } from "favicons";
import fs from "fs-extra";

const source = "icons/favicon.png"; // Source image(s). `string`, `buffer` or array of `string`
const metaDescription =
  "Pühajärve jaanituli 2024 peaesinejateks on Nervo, Luude, Quintino, A.M.C, 1991 ja Issey Cross. Lisaks on esindatud eesti artiste paremik.";

const configuration = {
  path: "/", // Path for overriding default icons path. `string`
  appName: "Pühajärve jaanituli 2024", // Your application's name. `string`
  appShortName: null, // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: metaDescription, // Your application's description. `string`
  developerName: "", // Your (or your developer's) name. `string`
  developerURL: "", // Your (or your developer's) URL. `string`
  dir: "auto", // Primary text direction for name, short_name, and description
  lang: "et_EE", // Primary language for name and short_name
  background: "#FFF", // Background colour for flattened icons. `string`
  theme_color: "#FFF", // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: "browser", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: "/", // set of URLs that the browser considers within your app
  start_url: "/", // Start URL when launching the application from a device. `string`
  preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
  relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
  version: "1.0", // Your application's version string. `string`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  manifestMaskable: false, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: false, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: { background: false }, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  },
  shortcuts: [
    // Your applications's Shortcuts (see: https://developer.mozilla.org/docs/Web/Manifest/shortcuts)
    // Array of shortcut objects:
    // {
    //   name: "View your Inbox", // The name of the shortcut. `string`
    //   short_name: "inbox", // optionally, falls back to name. `string`
    //   description: "View your inbox messages", // optionally, not used in any implemention yet. `string`
    //   url: "/inbox", // The URL this shortcut should lead to. `string`
    //   icon: "test/inbox_shortcut.png", // source image(s) for that shortcut. `string`, `buffer` or array of `string`
    // },
    // more shortcuts objects
  ],
};

try {
  clearOldFiles();

  /* GENERATE DATA */
  const iconsData = await favicons(source, configuration);
  // console.log(response.images); // Array of { name: string, contents: <buffer> }
  // console.log(response.files); // Array of { name: string, contents: <string> }
  // console.log(iconsData.html); // Array of strings (html elements)

  /* GENERATE FILES */
  iconsData.images.map((image) => {
    fs.outputFileSync(`./static/${image.name}`, image.contents);
  });

  const manifest = iconsData.files.filter((item) => item.name === "manifest.webmanifest");
  fs.outputFileSync("./static/manifest.webmanifest", manifest[0].contents);

  const browserconfig = iconsData.files.filter((item) => item.name === "browserconfig.xml");
  fs.outputFileSync("./static/browserconfig.xml", browserconfig[0].contents);

  /* UPDATE APP HTML */
  const html = fs.readFileSync("./src/app.html", { encoding: "utf8", flag: "r" });
  const newHtml = html.replace(
    /<!-- Icons Start -->.*<!-- Icons End -->/s,
    `<!-- Icons Start -->\n    ${iconsData.html.join("\n    ")}\n    <!-- Icons End -->`
  );
  fs.writeFileSync("./src/app.html", newHtml, { encoding: "utf8", flag: "w" });

  console.log("!!! Successfully generated icons !!!");
} catch (error) {
  console.log(error.message);
}

async function clearOldFiles() {
  fs.readdirSync("./static").forEach((file) => {
    if (isIconImageFile(file)) fs.removeSync("./static/" + file);
  });
  fs.removeSync("./static/manifest.webmanifest");
  fs.removeSync("./static/browserconfig.xml");
}

function isIconImageFile(name) {
  const starts = ["android-chrome", "apple-touch", "mstile", "favicon"];
  if (/\.(png|ico)$/.test(name)) {
    return starts.some((item) => name.startsWith(item));
  }
  return false;
}
