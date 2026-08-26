import { ThemeProvider, Box, CssBaseline, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import theme from './theme/theme';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Partners = lazy(() => import('./pages/Partners'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const Lead = lazy(() => import('./pages/Lead'));
const QRGenerator = lazy(() => import('./pages/QRGenerator'));
const StudentSlate = lazy(() => import('./pages/StudentSlate'));

function ExternalRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);
  return null;
}

function PageFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Loading…
      </Typography>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            left: 8,
            top: -48,
            zIndex: 2000,
            bgcolor: 'background.paper',
            color: 'text.primary',
            px: 2,
            py: 1,
            borderRadius: 1,
            border: '2px solid',
            borderColor: 'primary.main',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'top 0.15s ease-in-out',
            '&:focus-visible': {
              top: 8,
            },
          }}
        >
          Skip to main content
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box id="main-content" component="main" tabIndex={-1} sx={{ flexGrow: 1 }}>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/events" element={<Events />} />
                <Route path="/lead" element={<Lead />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/qr" element={<QRGenerator />} />
                <Route path="/checkin" element={<StudentSlate />} />
                <Route
                  path="/seaso26"
                  element={<ExternalRedirect href="https://forms.gle/hJtHBtT5BRexuVgj8" />}
                />
                <Route
                  path="/seaso26-volunteer"
                  element={
                    <ExternalRedirect href="https://docs.google.com/forms/d/e/1FAIpQLSeWoyN973oVwosgE5Sq15u9V8bCUttuo9gyXe6brqs_AQxRrQ/viewform" />
                  }
                />
                <Route path="/seagrad26" element={<Navigate to="/events" replace />} />
                <Route path="/seagrad2026" element={<Navigate to="/events" replace />} />
                <Route path="/tos-vendor" element={<Navigate to="/events" replace />} />
                <Route path="/tos-performer" element={<Navigate to="/events" replace />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
