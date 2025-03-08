import React from 'react'

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 dark:text-white py-6 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Brand Info */}
        <div>
          <h2 className="text-xl font-semibold">RecipeHub</h2>
          <p className="text-gray-400 mt-2">Discover and share amazing recipes from around the world.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-medium">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="/recipes" className="text-gray-400 hover:text-white">Recipes</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-lg font-medium">Follow Us</h3>
          <div className="mt-3 flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} RecipeHub. All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer
