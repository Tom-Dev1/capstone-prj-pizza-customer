"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Star } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sectionRef.current) {
            const testimonials = sectionRef.current.querySelectorAll(".testimonial-item")

            gsap.fromTo(
                testimonials,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                },
            )
        }
    }, [])

    const testimonials = [
        {
            name: "Nguyễn Thị Hương",
            role: "Blogger Ẩm Thực",
            image: "/placeholder.svg?height=100&width=100",
            quote: "Pizza ngon nhất mà tôi từng ăn ngoài Ý. Lớp vỏ giòn hoàn hảo và các loại nhân luôn tươi ngon!",
            rating: 5,
        },
        {
            name: "Trần Minh Tuấn",
            role: "Khách Hàng Thường Xuyên",
            image: "/placeholder.svg?height=100&width=100",
            quote: "Tôi đặt pizza từ PizzaCapstone ít nhất một lần mỗi tuần. Giao hàng luôn đúng giờ và pizza vẫn còn nóng!",
            rating: 5,
        },
        {
            name: "Lê Thị Phương",
            role: "Nhà Phê Bình Ẩm Thực",
            image: "/placeholder.svg?height=100&width=100",
            quote:
                "Sự chú ý đến từng chi tiết và chất lượng nguyên liệu làm nên sự khác biệt của PizzaCapstone so với các tiệm pizza khác trong thành phố.",
            rating: 4,
        },
    ]

    return (
        <section id="testimonials" ref={sectionRef} className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                    >
                        Khách Hàng Nói Gì
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="section-divider"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
                    >
                        Đừng chỉ tin lời chúng tôi. Đây là những gì khách hàng hài lòng nói về pizza của chúng tôi.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-item card p-4 md:p-6 lg:p-8">
                            <div className="flex items-center mb-3 md:mb-4">
                                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mr-3 md:mr-4 border-2 border-primary/20">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-lg">{testimonial.name}</h3>
                                    <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-3 md:mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 md:w-5 md:h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 italic text-sm md:text-base">{testimonial.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

