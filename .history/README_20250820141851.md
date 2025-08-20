# Universal Links Test - File Hosting Platform

A modern file hosting platform built with Next.js, designed for iOS and Android applications with universal link support. Deployable to Vercel with a beautiful, responsive UI.

## Features

- 🚀 **Vercel Ready**: Optimized for deployment on Vercel
- 📱 **Platform Support**: Dedicated sections for iOS, Android, and Universal files
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📁 **File Management**: Upload, organize, and download files
- 🔗 **Universal Links**: Ready for iOS and Android universal link integration
- 📊 **API Endpoints**: RESTful API for file operations
- 🔒 **CORS Enabled**: Cross-origin resource sharing for mobile apps

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd universal-links-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Option 3: Manual Upload

1. Build the project: `npm run build`
2. Upload the `.next` folder to Vercel

## File Structure

```
universal-links-test/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   └── files/         # File management API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── public/                # Static files
│   └── files/             # Hosted files directory
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## API Endpoints

### File Management

- `GET /api/files` - List all files
- `POST /api/files` - Upload a new file
- `GET /files/[filename]` - Download a specific file

### Example Usage

```javascript
// List files
const response = await fetch("/api/files");
const { files } = await response.json();

// Upload file
const formData = new FormData();
formData.append("file", fileInput.files[0]);
const uploadResponse = await fetch("/api/files", {
  method: "POST",
  body: formData,
});

// Download file
window.open("/files/your-file.zip", "_blank");
```

## Universal Links Setup

### iOS Configuration

1. **Add Associated Domains**

   ```xml
   <!-- In your iOS app's Info.plist -->
   <key>com.apple.developer.associated-domains</key>
   <array>
       <string>applinks:your-domain.vercel.app</string>
   </array>
   ```

2. **Create apple-app-site-association file**
   ```json
   {
     "applinks": {
       "apps": [],
       "details": [
         {
           "appID": "TEAM_ID.com.example.universallinks",
           "paths": ["/files/*"]
         }
       ]
     }
   }
   ```

### Android Configuration

1. **Add Digital Asset Links**

   ```json
   [
     {
       "relation": ["delegate_permission/common.handle_all_urls"],
       "target": {
         "namespace": "android_app",
         "package_name": "com.example.universallinks",
         "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
       }
     }
   ]
   ```

2. **Place at** `/.well-known/assetlinks.json`

## Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Custom domain for universal links
NEXT_PUBLIC_DOMAIN=your-domain.vercel.app
```

## Customization

### Styling

The app uses Tailwind CSS. Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### File Types

Update the file upload component in `app/page.tsx` to restrict file types or add validation.

### API Routes

Extend the API routes in `app/api/files/route.ts` to add authentication, file size limits, or additional functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- Create an issue on GitHub
- Check the Vercel documentation
- Review Next.js documentation

---

Built with ❤️ using Next.js, Tailwind CSS, and Vercel
