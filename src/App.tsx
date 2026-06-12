/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'motion/react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { MagneticCursor } from './components/MagneticCursor';
import { Hero } from './components/Hero';

// Lazy load below-the-fold components to improve Lighthouse Performance
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const Education = lazy(() => import('./components/Education').then(module => ({ default: module.Education })));
const BentoGrid = lazy(() => import('./components/BentoGrid').then(module => ({ default: module.BentoGrid })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const AnalyticsData = lazy(() => import('./components/AnalyticsData').then(module => ({ default: module.AnalyticsData })));
const Stats = lazy(() => import('./components/Stats').then(module => ({ default: module.Stats })));
const FAQ = lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const Chatbot = lazy(() => import('./components/Chatbot').then(module => ({ default: module.Chatbot })));
const BookCollabModal = lazy(() => import('./components/BookCollabModal').then(module => ({ default: module.BookCollabModal })));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadChatbot, setLoadChatbot] = useState(false);
  const [isBookCollabOpen, setIsBookCollabOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (loading) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let interactionOccurred = false;

    const startLoading = () => {
      if (!interactionOccurred) {
        interactionOccurred = true;
        setLoadChatbot(true);
        cleanup();
      }
    };

    const cleanup = () => {
      clearTimeout(timeoutId);
      ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach((event) =>
        window.removeEventListener(event, startLoading)
      );
    };

    // Load after 5 seconds idle
    timeoutId = setTimeout(() => {
      startLoading();
    }, 5000);

    // Load on user interaction
    ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach((event) =>
      window.addEventListener(event, startLoading, { once: true, passive: true })
    );

    return cleanup;
  }, [loading]);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sany.ai';
  const defaultImage = `${currentUrl}/og-image.jpg`; // Placeholder for actual OG image

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "MD Abdullah Sany",
    "alternateName": "Abdullah Sany",
    "url": "https://sany.ai/",
    "jobTitle": "AI-Hybrid Developer & Software Engineer",
    "description": "Welcome to the official portfolio of MD Abdullah Sany, an innovative AI-Hybrid Developer specializing in intelligent digital experiences, seamless automations, and modern web applications.",
    "knowsAbout": ["Artificial Intelligence", "Web Development", "Software Engineering", "Frontend Development", "Automation", "React"],
    "sameAs": [
      "https://github.com/mdabdullahsany",
      "https://www.linkedin.com/in/mdabdullahsany/",
      "https://twitter.com/mdabdullahsany"
    ]
  };

  return (
    <div className="min-h-screen font-sans selection:bg-electric-blue/30 selection:text-white antialiased overflow-x-hidden">
      <Helmet>
        <title>MD Abdullah Sany | AI-Hybrid Developer Portfolio (SANY.AI)</title>
        <meta name="description" content="Welcome to the official portfolio of MD Abdullah Sany, an innovative AI-Hybrid Developer specializing in intelligent digital experiences, seamless automations, and modern web applications." />
        <meta name="keywords" content="Abdullah Sany, MD Abdullah Sany, Sany, AI-Hybrid Developer, Software Engineer, Web Developer, Full Stack Developer, React Developer, AI Developer, AI Integrations, sany.ai, Bangladesh Developer, Sany Portfolio" />
        <meta property="og:title" content="MD Abdullah Sany | AI-Hybrid Developer" />
        <meta property="og:description" content="Explore the portfolio of MD Abdullah Sany, an AI-Hybrid Developer building intelligent digital experiences and automations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:site_name" content="MD Abdullah Sany Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MD Abdullah Sany | AI-Hybrid Developer" />
        <meta name="twitter:description" content="Explore the portfolio of MD Abdullah Sany, an AI-Hybrid Developer building intelligent digital experiences and automations." />
        <meta name="twitter:image" content={defaultImage} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-electric-blue origin-left z-[100]"
            style={{ scaleX }}
          />
          <MagneticCursor />
          <BackgroundEffects />
          <Navbar onBookCollab={() => setIsBookCollabOpen(true)} />
          
          <main className="relative z-10 flex flex-col gap-8 md:gap-16 pb-0">
            <Hero />
            <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50"><span className="w-6 h-6 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" /></div>}>
              <Stats />
              <About />
              <Skills />
              <Education />
              <Services />
              <Projects />
              <AnalyticsData />
              <BentoGrid />
              <FAQ />
              <div className="h-12" /> {/* Spacer */}
              <Contact />
            </Suspense>
          </main>
          
          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {loadChatbot && (
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          )}

          <Suspense fallback={null}>
            <BookCollabModal 
              isOpen={isBookCollabOpen} 
              onClose={() => setIsBookCollabOpen(false)} 
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
