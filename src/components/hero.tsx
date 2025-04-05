import { startTransition, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Link, useNavigate } from "react-router-dom"
import Pizza1 from "@/assets/Pizza600x600.png"
import pizzabg from "@/assets/pizzatomatoe.jpg"
export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const pizzaRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate();

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
                    backgroundImage: `url(${pizzabg})`,
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
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 md:mb-6">
                            <span className=" bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent font-script tracking-widest">
                                Pizza Ý Chính Hiệu
                            </span>
                            <span className="text-orange-500 font-script text-primary block mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-normal text-right">
                                Làm Với Tình Yêu
                            </span>
                        </div>


                        <p className="indent-6 text-base sm:text-lg md:text-lg text-gray-200 italic">
                            Trải nghiệm hương vị Naples với những chiếc bánh pizza thủ công
                        </p>
                        <p className="text-base sm:text-lg md:text-lg mb-6 md:mb-8 text-gray-200 italic">
                            được làm từ nguyên liệu tươi ngon nhất và công thức truyền thống.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    startTransition(() => {
                                        navigate("/booking");
                                    });
                                }}
                                className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto text-center"
                            >
                                Đặt Hàng Ngay
                            </button>

                            {/*  */}
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
                        <img src={Pizza1} alt="Pizza Ngon" className="rounded-full w-full h-auto" />
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

