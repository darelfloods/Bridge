import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Payment } from './pages/Payment';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { Testimonials } from './pages/Testimonials';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/services',
    Component: Services,
  },
  {
    path: '/payment',
    Component: Payment,
  },
  {
    path: '/checkout',
    Component: Checkout,
  },
  {
    path: '/testimonials',
    Component: Testimonials,
  },
  {
    path: '/contact',
    Component: Contact,
  },
]);
