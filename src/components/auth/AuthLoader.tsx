import Lottie from 'lottie-react';
import authLoaderData from './AuthLoaderData';

interface AuthLoaderProps {
  className?: string;
}

export default function AuthLoader({ className }: AuthLoaderProps) {
  return (
    <div className={className} aria-hidden="true">
      <Lottie animationData={authLoaderData} loop autoplay />
    </div>
  );
}
