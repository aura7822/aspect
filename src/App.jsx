import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import Toasts from './components/Toasts.jsx'
import Breadcrumb from './components/Breadcrumb.jsx'
import HelpHub from './components/HelpHub.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import CaseStudyDetail from './pages/CaseStudyDetail.jsx'
import Pricing from './pages/Pricing.jsx'
import StartProject from './pages/StartProject.jsx'
import Developers from './pages/Developers.jsx'
import Transparency from './pages/Transparency.jsx'
import Changelog from './pages/Changelog.jsx'
import Blog from './pages/Blog.jsx'
import Company from './pages/Company.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import WarRoomRetired from './pages/WarRoomRetired.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex">
      <ScrollToTop />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <Breadcrumb />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/start-a-project" element={<StartProject />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<Company page="about" />} />
            <Route path="/careers" element={<Company page="careers" />} />
            <Route path="/contact" element={<Company page="contact" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/war-room/:id" element={<WarRoomRetired />} />
            <Route path="/legal/privacy" element={<Legal page="privacy" />} />
            <Route path="/legal/terms" element={<Legal page="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <HelpHub />
      <Toasts />
    </div>
  )
}
