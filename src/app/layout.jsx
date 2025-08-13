import './globals.css';
import ChatButton from '@/components/ui/ChatButton';

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <ChatButton />
    </>
  );
}
