# EduLink Pro - Educational Communication Platform

🎓 **Bridge the gap between students and lecturers with AI-powered insights, seamless messaging, smart scheduling, and collaborative learning tools.**

## 🌟 Features

### 🔐 **Authentication System**
- Role-based authentication (Student/Lecturer)
- Secure registration and login
- Protected routes with role-based access control
- Mock session management

### 💬 **Messaging System**
- Real-time chat interface with typing indicators
- File attachments and media sharing
- Message search and advanced filtering
- Conversation threading and replies
- Online/offline status indicators

### 📅 **Appointment Management**
- Smart appointment booking system
- Office hours management
- Calendar integration
- Appointment status tracking (scheduled, confirmed, completed, cancelled)
- Conflict detection and resolution

### 🤖 **AI Assistant (EduBot)**
- Interactive AI chat with contextual responses
- Smart suggestions and quick actions
- Category-based assistance (Academic, Technical, Career, Wellness)
- Predefined knowledge base for common queries

### 📊 **Dashboard Analytics**
- Student dashboard with conversation overview
- Lecturer dashboard with query management
- Real-time statistics and metrics
- Engagement tracking and insights

### 📱 **Mobile-First Design**
- Responsive design across all devices
- Touch-friendly interface
- Mobile bottom navigation
- PWA (Progressive Web App) ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mehara-rothila/hackvite_front.git
   cd hackvite_front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css                 # Global styles with Tailwind CSS
│   ├── layout.tsx                  # Root layout component
│   ├── page.tsx                    # Landing page
│   ├── login/
│   │   └── page.tsx               # Login page
│   ├── register/
│   │   ├── page.tsx               # Registration role selection
│   │   ├── student/
│   │   │   └── page.tsx           # Student registration
│   │   └── lecturer/
│   │       └── page.tsx           # Lecturer registration
│   ├── student/
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Student dashboard
│   │   ├── conversations/
│   │   │   ├── page.tsx           # Conversations list
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Individual conversation
│   │   └── appointments/
│   │       └── page.tsx           # Appointment management
│   ├── lecturer/
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Lecturer dashboard
│   │   └── queries/
│   │       └── page.tsx           # Query management
│   └── edubot/
│       └── page.tsx               # AI Assistant
├── lib/
│   └── auth.ts                    # Authentication utilities
├── types/
│   └── index.ts                   # TypeScript type definitions
├── public/
│   └── manifest.json              # PWA manifest
├── next.config.ts                 # Next.js configuration
└── postcss.config.js              # PostCSS configuration
```

## 🎯 Demo Accounts

### Student Account
- **Email:** `student@university.edu`
- **Password:** Any password
- **Features:** Messaging, appointment booking, AI assistant

### Lecturer Account  
- **Email:** `prof@university.edu`
- **Password:** Any password
- **Features:** Query management, student communication, analytics

## 🔧 Technologies Used

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Authentication:** Custom mock authentication system
- **PWA:** next-pwa for Progressive Web App features
- **Icons:** Emoji-based icons for cross-platform compatibility

## 📱 Mobile Support

EduLink Pro is fully responsive and includes:
- Touch-friendly interface
- Mobile bottom navigation
- Optimized layouts for small screens
- PWA installation support

## 🤖 AI Features

The EduBot AI Assistant provides:
- **Academic Help:** Study tips, assignment guidance, exam preparation
- **Technical Support:** Programming help, debugging assistance
- **Time Management:** Schedule creation, productivity tips
- **Career Guidance:** Industry insights, skill development
- **Wellness Support:** Stress management, mental health resources

## 🔮 Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] Advanced analytics dashboard
- [ ] Resource library and file management
- [ ] Video conferencing integration
- [ ] Mobile app development
- [ ] Multi-language support

## 📄 License

This project is developed for educational purposes and competition entry.

## 👥 Team

Developed for HackVite Competition

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for better educational communication**