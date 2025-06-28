import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

    if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Breadcrumb */}
         <div className="bg-gray-50 border-b">
           <div className="container mx-auto px-4 py-3">
             <nav className="flex items-center text-sm">
               <Link to="/" className="text-gray-600 hover:text-gray-900">
                 Home
               </Link>
               <span className="mx-2 text-gray-400">/</span>
               <Link to="/login" className="text-gray-600 hover:text-gray-900">
                 Login
               </Link>
               <span className="mx-2 text-gray-400">/</span>
               <span className="text-gray-900 font-medium">Forgot Password</span>
             </nav>
           </div>
         </div>

         {/* Success Message */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 px-4 py-8 max-w-md mx-auto w-full flex flex-col justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Check your email
              </h1>
              
              <p className="text-gray-600 mb-2">
                We've sent password reset instructions to
              </p>
              
              <p className="text-gray-900 font-medium mb-8">
                {email}
              </p>
              
              <div className="space-y-4">
                <Button 
                  asChild 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                >
                  <Link to="/login">Back to Sign In</Link>
                </Button>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                >
                  Didn't receive the email? Click to resend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
       <div className="bg-gray-50 border-b">
         <div className="container mx-auto px-4 py-3">
           <nav className="flex items-center text-sm">
             <Link to="/" className="text-gray-600 hover:text-gray-900">
               Home
             </Link>
             <span className="mx-2 text-gray-400">/</span>
             <Link to="/login" className="text-gray-600 hover:text-gray-900">
               Login
             </Link>
             <span className="mx-2 text-gray-400">/</span>
             <span className="text-gray-900 font-medium">Forgot Password</span>
           </nav>
         </div>
       </div>

       {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-4 py-8 max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Forgot your password?
            </h1>
            
            <p className="text-gray-600">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="john@example.com"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">
              Send Reset Link
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 