import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';

// Subpage Views
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { News } from './pages/News';
import { Contact } from './pages/Contact';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefillDoctorId, setPrefillDoctorId] = useState('');
  const [prefillDept, setPrefillDept] = useState('');

  const handleOpenBooking = (doctorId = '', department = '') => {
    setPrefillDoctorId(doctorId);
    setPrefillDept(department);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPrefillDoctorId('');
    setPrefillDept('');
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200 antialiased font-sans selection:bg-teal-500 selection:text-white">
          {/* Scroll to Top helper */}
          <ScrollToTop />

          {/* Sticky Header Navbar */}
          <Navbar onOpenBooking={() => handleOpenBooking()} />

          {/* Main Routed Page Content stage */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
              <Route path="/about" element={<About onOpenBooking={() => handleOpenBooking()} />} />
              <Route path="/services" element={<Services onOpenBooking={handleOpenBooking} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Secure Footer Ribbon */}
          <Footer />

          {/* Global Appointment Booking Drawer overlay */}
          <AppointmentModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
            initialDoctorId={prefillDoctorId}
            initialDept={prefillDept}
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
