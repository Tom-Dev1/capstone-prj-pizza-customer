import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (sectionRef.current && formRef.current) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            )
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        alert("Đã gửi biểu mẫu! Trong ứng dụng thực tế, dữ liệu này sẽ được gửi đến máy chủ.")
    }

    return (
        <section id="contact" ref={sectionRef} className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                    >
                        Liên Hệ Với Chúng Tôi
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-20 h-1 bg-primary mx-auto mb-4 md:mb-6"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
                    >
                        Bạn có câu hỏi hoặc phản hồi? Chúng tôi rất muốn nghe từ bạn. Hãy liên hệ với đội ngũ của chúng tôi.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    <div>
                        <div className="grid gap-6 md:gap-8">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-2 md:p-3 rounded-full mr-4">
                                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg mb-1">Địa Chỉ</h3>
                                    <p className="text-gray-600 text-sm md:text-base">123 Đường Pizza, Quận 1, TP.HCM</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-primary/10 p-2 md:p-3 rounded-full mr-4">
                                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg mb-1">Số Điện Thoại</h3>
                                    <p className="text-gray-600 text-sm md:text-base">(028) 3456-7890</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-primary/10 p-2 md:p-3 rounded-full mr-4">
                                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg mb-1">Email</h3>
                                    <p className="text-gray-600 text-sm md:text-base">info@pizzaCapstone.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-primary/10 p-2 md:p-3 rounded-full mr-4">
                                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg mb-1">Giờ Mở Cửa</h3>
                                    <p className="text-gray-600 text-sm md:text-base">Thứ Hai - Chủ Nhật: 11:00 - 22:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-50 p-4 md:p-8 rounded-lg shadow-md">
                        <div className="grid gap-4 md:gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ Tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tiêu Đề
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tin Nhắn
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm md:text-base"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-primary text-white py-2 md:py-3 px-4 md:px-6 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
                            >
                                Gửi Tin Nhắn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

