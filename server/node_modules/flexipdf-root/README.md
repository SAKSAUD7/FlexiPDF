# FlexiPDF - Comprehensive PDF Tools Suite

A full-stack web application offering a comprehensive suite of PDF manipulation tools, similar to iLovePDF and Smallpdf.

## 🚀 Features

- 30+ PDF tools including conversion, editing, compression, and more
- Modern, responsive UI with drag-and-drop file upload
- Secure file handling with automatic cleanup
- Premium features with Stripe/Razorpay integration
- Optional user authentication and file history

## 🛠 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **File Processing**: Cloudmersive API / PDF.co API
- **Authentication**: JWT (optional)
- **Payment**: Stripe/Razorpay
- **Storage**: Local temp storage (S3 optional)
- **Hosting**: Vercel (Frontend) + Render/VPS (Backend)

## 🏗 Project Structure

```
pdf-tool-suite/
├── client/                  # React frontend
│   ├── pages/              # Tool pages
│   ├── components/         # Reusable components
│   ├── App.jsx
│   └── tailwind.config.js
├── server/                 # Node backend
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   ├── uploads/           # Temporary storage
│   └── index.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for PDF processing services

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret
   CLOUDMERSIVE_API_KEY=your_api_key
   STRIPE_SECRET_KEY=your_stripe_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## 🔧 Adding New Tools

1. Create a new page in `client/pages/`
2. Add corresponding route in `server/routes/`
3. Implement the tool logic in `server/utils/`
4. Add the tool to the homepage grid

## 🔐 API Integration

The application uses Cloudmersive API for PDF processing. To integrate:

1. Sign up for an API key at [Cloudmersive](https://cloudmersive.com)
2. Add the key to your `.env` file
3. Use the API client in your route handlers

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

### Backend (Render)

1. Create a new Web Service
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests. 