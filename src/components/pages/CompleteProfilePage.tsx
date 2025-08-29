import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up to API
    navigate("/verify-email");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb - same structure as Login */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Create Account</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
          <h1 className="text-left text-sm font-semibold text-gray-700 mb-3">You're almost done</h1>

          {/* Info banner */}
          <div className="rounded-lg overflow-hidden mb-6 border bg-white">
            <div className="flex items-center gap-2 px-4 py-3 bg-teal-700 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm.75 5.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0Zm-.75 9a1.125 1.125 0 1 1 1.125-1.125A1.125 1.125 0 0 1 12 16.5Z" />
              </svg>
              <p className="text-sm font-medium">Complete your personal profile by providing the</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="relative">
                <Input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First name" className="h-11 pl-9 bg-gray-100" />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="relative">
                <Input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last name" className="h-11 pl-9 bg-gray-100" />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <Checkbox id="terms2" checked={acceptTerms} onCheckedChange={(c)=>setAcceptTerms(!!c)} />
              <span>I accept the <Link to="/terms-conditions" className="text-primary">Terms of Service</Link></span>
            </label>
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <Checkbox id="privacy2" checked={acceptPrivacy} onCheckedChange={(c)=>setAcceptPrivacy(!!c)} />
              <span>I accept the <Link to="/privacy-policy" className="text-primary">Privacy Policy</Link></span>
            </label>

            <div className="border rounded-lg p-4 bg-white">
              <p className="font-semibold text-gray-800 text-sm">Communication Preferences (Optional)</p>
              <p className="text-xs text-gray-500 mt-1">Don't miss out on our latest promotions and news</p>
              <label className="flex items-center gap-2 mt-3 text-sm text-gray-700">
                <Checkbox id="emailConsent" checked={emailConsent} onCheckedChange={(c)=>setEmailConsent(!!c)} />
                <span>I consent to receive email communication</span>
              </label>
            </div>

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

