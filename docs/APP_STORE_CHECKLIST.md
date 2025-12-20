# App Store Submission Checklist

Short checklist to prepare SubTrack for App Store submission:

- Assets
  - `assets/icon.png` — 1024×1024 PNG (dark background, centered logo, no rounded corners)
  - `assets/splash.png` — large PNG (e.g., 1242×2688) with dark gradient and centered logo
  - Replace `SubMate` branding with `SubTrack` and make sure App Store screenshots use the new name.
- App metadata
  - `app.json` updated with `name: "SubTrack"`, `icon` and `splash` keys, and `ios.bundleIdentifier: "com.harshith.subtrack"`
- Screenshots to capture (iPhone 14 Pro recommended)
  1. Login
  2. Dashboard
  3. Add Subscription
  4. AI Chat

- Build for App Store
  - `npx expo prebuild`
  - Use `npx expo build:ios` or `eas build` / Xcode to produce the App Store artifact

Notes:
- Replace the placeholder `assets/icon.png` and `assets/splash.png` with production images before submission.
- Make sure all required screenshots are recorded at 1242×2778 (iPhone 14 Pro resolution) to avoid App Store rejections for missing screenshots.
