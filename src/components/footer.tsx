import { Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">PizzaCapstone</h3>
                        <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                            Phục vụ pizza Ý chính hiệu với nguyên liệu tươi ngon nhất từ năm 2010.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Liên Kết Nhanh</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/#home" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/#menu" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                                    Thực Đơn
                                </Link>
                            </li>
                            <li>
                                <Link to="/#about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                                    Về Chúng Tôi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/#contact"
                                    className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                                >
                                    Liên Hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Giờ Mở Cửa</h4>
                        <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                            <li>Thứ Hai - Thứ Sáu: 11:00 - 22:00</li>
                            <li>Thứ Bảy - Chủ Nhật: 11:00 - 23:00</li>
                            <li>Ngày Lễ: 12:00 - 21:00</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Bản Tin</h4>
                        <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                            Đăng ký nhận bản tin của chúng tôi để nhận các ưu đãi đặc biệt và cập nhật.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="px-3 md:px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900 text-sm md:text-base"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white px-3 md:px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors text-sm md:text-base"
                            >
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
                    <p>&copy; {new Date().getFullYear()} PizzaCapstone. Đã đăng ký bản quyền.</p>
                </div>
            </div>
        </footer>
    )
}

