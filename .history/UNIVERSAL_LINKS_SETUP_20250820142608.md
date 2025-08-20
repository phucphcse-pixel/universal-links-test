# Universal Links Setup Guide

## 📱 iOS Configuration

### 1. **Update apple-app-site-association file**

Edit `public/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOUR_TEAM_ID.YOUR_BUNDLE_ID",
        "paths": [
          "/files/*",
          "/api/*",
          "/config/*"
        ]
      }
    ]
  }
}
```

**Thay thế:**
- `YOUR_TEAM_ID`: Team ID từ Apple Developer Account
- `YOUR_BUNDLE_ID`: Bundle ID của app (ví dụ: com.example.myapp)

### 2. **Add Associated Domains to iOS App**

Trong Xcode, thêm vào `Info.plist`:

```xml
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:your-domain.vercel.app</string>
</array>
```

### 3. **Handle Universal Links in iOS App**

```swift
// AppDelegate.swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if userActivity.activityType == NSUserActivityTypeBrowsingWeb {
        let url = userActivity.webpageURL!
        // Handle the URL
        handleUniversalLink(url: url)
        return true
    }
    return false
}

func handleUniversalLink(url: URL) {
    // Parse URL and navigate to appropriate screen
    let path = url.path
    if path.hasPrefix("/files/") {
        let filename = String(path.dropFirst(7)) // Remove "/files/"
        // Open file in app
    }
}
```

## 🤖 Android Configuration

### 1. **Update assetlinks.json file**

Edit `public/.well-known/assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.universallinks",
      "sha256_cert_fingerprints": [
        "YOUR_SHA256_FINGERPRINT"
      ]
    }
  }
]
```

**Lấy SHA256 Fingerprint:**
```bash
# Debug certificate
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Release certificate
keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
```

### 2. **Add Intent Filter to Android App**

Trong `AndroidManifest.xml`:

```xml
<activity android:name=".MainActivity">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https"
              android:host="your-domain.vercel.app"
              android:pathPrefix="/files/" />
    </intent-filter>
</activity>
```

### 3. **Handle App Links in Android App**

```kotlin
// MainActivity.kt
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Handle incoming intent
    intent?.data?.let { uri ->
        handleAppLink(uri)
    }
}

private fun handleAppLink(uri: Uri) {
    val path = uri.path
    if (path?.startsWith("/files/") == true) {
        val filename = path.substring(7) // Remove "/files/"
        // Open file in app
    }
}
```

## 🔧 Testing Universal Links

### 1. **Test iOS Universal Links**

```bash
# Test apple-app-site-association file
curl -I https://your-domain.vercel.app/.well-known/apple-app-site-association

# Test with iOS Simulator
xcrun simctl openurl booted "https://your-domain.vercel.app/files/test.json"
```

### 2. **Test Android App Links**

```bash
# Test assetlinks.json file
curl -I https://your-domain.vercel.app/.well-known/assetlinks.json

# Test with ADB
adb shell am start -W -a android.intent.action.VIEW -d "https://your-domain.vercel.app/files/test.json" com.example.universallinks
```

### 3. **Online Validators**

- **iOS**: [Apple's App Search API Validation Tool](https://search.developer.apple.com/appsearch-validation-tool)
- **Android**: [Digital Asset Links API](https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://your-domain.vercel.app&relation=delegate_permission/common.handle_all_urls)

## 📋 Checklist

### Before Deployment
- [ ] Update `apple-app-site-association` with correct Team ID and Bundle ID
- [ ] Update `assetlinks.json` with correct Package Name and SHA256 Fingerprint
- [ ] Test files are accessible via HTTPS
- [ ] Verify Content-Type headers are set correctly

### After Deployment
- [ ] Test iOS universal links with simulator
- [ ] Test Android app links with device/emulator
- [ ] Verify files are accessible from mobile apps
- [ ] Test deep linking to specific files

## 🚨 Common Issues

1. **iOS: "This app is not allowed to query for scheme"**
   - Check Associated Domains capability is enabled
   - Verify apple-app-site-association file is accessible

2. **Android: App links not working**
   - Verify SHA256 fingerprint matches exactly
   - Check `android:autoVerify="true"` is set
   - Ensure HTTPS is used

3. **Files not accessible**
   - Check CORS headers are set correctly
   - Verify file paths in universal link configuration
   - Test direct file access via browser

## 📞 Support

For issues:
1. Check Apple/Google documentation
2. Use online validation tools
3. Test with different devices/simulators
4. Verify network connectivity and HTTPS
