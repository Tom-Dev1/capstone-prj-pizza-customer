"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Link } from "react-router-dom"

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const pizzaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (pizzaRef.current) {
            gsap.fromTo(
                pizzaRef.current,
                { rotation: -5 },
                {
                    rotation: 5,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                },
            )
        }
    }, [])

    return (
        <section id="home" ref={sectionRef} className="h-screen flex items-center relative overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://placehold.co/1920x1080')",
                    filter: "brightness(0.4)",
                }}
            />

            <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                            Pizza Ý Chính Hiệu
                            <span className="text-primary block mt-2">Làm Với Tình Yêu</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-200">
                            Trải nghiệm hương vị Naples với những chiếc bánh pizza thủ công được làm từ nguyên liệu tươi ngon nhất và
                            công thức truyền thống.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/order">
                                <button className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto text-center">
                                    Đặt Hàng Ngay
                                </button>
                            </Link>
                            <Link to="/#menu">
                                <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
                                    Xem Thực Đơn
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={pizzaRef}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mt-8 md:mt-0 max-w-sm mx-auto md:max-w-none"
                    >
                        <img src="https://placehold.co/600x600" alt="Pizza Ngon" className="rounded-full w-full h-auto" />
                        <div className="absolute top-0 right-0 bg-primary text-white rounded-full p-4 sm:p-6 shadow-lg">
                            <div className="text-center">
                                <span className="block text-xl sm:text-2xl font-bold">20%</span>
                                <span className="text-xs sm:text-sm">GIẢM</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

