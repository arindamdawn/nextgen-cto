"use client";

import React from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import { getSocialIcon } from '@/components/ui/SocialIcons';
import { landingPageConfig } from '@/config/landingPageConfig';

export default function Footer() {
  const { footer } = landingPageConfig;
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <ScrollReveal 
          direction="up" 
          duration={0.6}
          threshold={0.1}
        >
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            {/* Company Name */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {footer.companyName}
              </h3>
              <p className="text-gray-300 text-sm">
                {footer.tagline}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                  aria-label={`Follow us on ${link.name}`}
                >
                  {getSocialIcon(link.icon, "w-5 h-5")}
                </a>
              ))}
            </div>

            {/* Copyright Notice */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} {footer.companyName}. {footer.copyright}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}