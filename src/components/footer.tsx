import { Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">PizzaCapstone</h3>
                        <p className="text-gray-400 mb-4">
                            Serving authentic Italian pizza with the freshest ingredients since 2010.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#home" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="#menu" className="text-gray-400 hover:text-white transition-colors">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="#about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
                            <li>Saturday - Sunday: 11:00 AM - 11:00 PM</li>
                            <li>Holidays: 12:00 PM - 9:00 PM</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter for special offers and updates.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} PizzaCapstone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

