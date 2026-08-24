import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import Toasts from './components/Toasts.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
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
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import WarRoomRetired from './pages/WarRoomRetired.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

const AUTH_PAGES = ['/login', '/forgot-password', '/reset-password', '/verify-email']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isAuthPage = AUTH_PAGES.includes(pathname)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in-view'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  if (isAuthPage) {
    // Auth pages are deliberately chrome-free — no sidebar, navbar, or
    // breadcrumb — so there's nothing to distract from (or leak app
    // structure to someone) before a session exists.
    return (
      <div className="min-h-screen">
        <ScrollToTop />
        <Routes key={pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
        <Toasts />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <ScrollToTop />
      <ErrorBoundary>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <Breadcrumb />
        <main className="flex-1 overflow-x-hidden">
          <Routes key={pathname}>
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
            <Route path="/war-room/:id" element={<WarRoomRetired />} />
            <Route path="/legal/privacy" element={<Legal page="privacy" />} />
            <Route path="/legal/terms" element={<Legal page="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </ErrorBoundary>
      <HelpHub />
      <Toasts />
    </div>
  )
}
