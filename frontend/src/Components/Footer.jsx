import React from 'react';
import { Mail, Github, Heart, Linkedin } from 'lucide-react'; 

export default function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`mt-12 py-8 ${darkMode ? 'bg-gray-900 text-gray-400 border-t border-gray-700' : 'bg-gray-100 text-gray-600 border-t border-gray-200'}`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold mb-4">Connect & Contribute</h3>

        <div className="flex justify-center space-x-6 mb-6">
          {/* Contact Link */}
          <a
            href="mailto:contactdev712@gmail.com" 
            className={`flex items-center space-x-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-200`}
            aria-label="Contact via Email"
          >
            <Mail size={20} />
            <span>Contact Us</span>
          </a>

          {/* GitHub Contribution Link */}
          <a
            href="https://github.com/saim712/StudentTaskManager" 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200`}
            aria-label="Contribute on GitHub"
          >
            <Github size={20} />
            <span>Contribute</span>
          </a>

          {/*  NEW: LinkedIn Profile Link  */}
          <a
            href="https://www.linkedin.com/in/saim-rauf-satti/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 ${darkMode ? 'text-blue-500 hover:text-blue-400' : 'text-blue-700 hover:text-blue-800'} transition-colors duration-200`}
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Other information */}
        <p className="text-sm mb-2">
          &copy; {currentYear} TaskMaster. All rights reserved.
        </p>
        <p className="text-sm flex items-center justify-center">
          Built with <Heart size={16} className="mx-1 text-red-500" /> for productivity.
        </p>
      </div>
    </footer>
  );
}