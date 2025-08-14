import React from 'react' 
import Link from 'next/link'

function Navbar() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                      <div className="flex-shrink-0">
                          <a href="#" className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-gray-800">Demo Registration</span>
                          </a>
                      </div>
                      <nav className="hidden md:flex space-x-8">
                          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Print/Verify</Link>
                          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
                      </nav>
                      <div className="md:hidden">
                          {/* <!-- Mobile menu button can be added here --> */}
                      </div>
                  </div>
              </div>
          </header>
  )
}

export default Navbar