"use client";
import { Card } from "@/components/ui2/card";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const backgroundImage = "https://picsum.photos/seed/sahejlife/1920/1080";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* <div className="mb-8 flex justify-center md:justify-start">
            <img
              src={logoSrc}
              alt="Sahej Life"
              className="h-10"
              onError={(e) => {
                // Fallback if logo doesn't load
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' dominant-baseline='middle' fill='%231eb45e'%3ESahej Life%3C/text%3E%3C/svg%3E";
              }}
            />
          </div> */}

          <Card className="border shadow-sm p-6 md:p-8">{children}</Card>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div
        className="hidden md:flex md:flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full h-full bg-gradient-to-r from-primary/30 to-primary/10 backdrop-blur-sm flex flex-col justify-center items-center p-10">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl font-bold mb-6">
              Your Health Journey Starts Here
            </h1>
            <p className="text-xl mb-8">
              Connect with top healthcare professionals and manage your health
              seamlessly with Sahej Life.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <span>Access to 10,000+ verified doctors</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span>Secure and private health records</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <span>Book appointments in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
