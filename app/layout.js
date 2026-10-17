// app/layout.js
import './globals.css';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Stair Calculator',
  description: 'Simple Stair & Cost Calculator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}