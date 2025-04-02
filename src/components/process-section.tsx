"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AOS from "aos"
import "aos/dist/aos.css"

gsap.registerPlugin(ScrollTrigger)

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 500,
            easing: "ease-out",
            once: false,
            mirror: true,
        })

        if (sectionRef.current) {
            // Parallax effect for the background using GSAP
            gsap.to(".parallax-bg", {
                y: "30%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })

            // Rotate pizza images on scroll using GSAP
            gsap.to(".rotate-element", {
                rotation: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })
        }

        // Refresh AOS when the component mounts
        AOS.refresh()

        return () => {
            // Clean up ScrollTrigger animations
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    const processSteps = [
        {
            number: "01",
            title: "Bột Nhào Thủ Công",
            description:
                "Pizza của chúng tôi bắt đầu với bột nhào thủ công được làm mới hàng ngày. Chúng tôi sử dụng hỗn hợp bột đặc biệt và để lên men trong 24 giờ để tạo ra hương vị và kết cấu hoàn hảo.",
            image: "https://placehold.co/400x400",
        },
        {
            number: "02",
            title: "Sốt Cao Cấp",
            description:
                "Sốt đặc trưng của chúng tôi được làm từ cà chua San Marzano, nhập khẩu từ Ý và nổi tiếng với hương vị ngọt và độ axit thấp. Chúng tôi thêm hỗn hợp thảo mộc và gia vị để tạo ra hương vị hoàn hảo.",
            image: "https://placehold.co/400x400",
        },
        {
            number: "03",
            title: "Nhân Chất Lượng",
            description:
                "Chúng tôi chọn lựa những nguyên liệu tốt nhất cho nhân pizza, từ rau củ tươi đến các loại thịt và phô mai cao cấp. Mỗi loại nhân được lựa chọn cẩn thận để đảm bảo sự kết hợp hương vị tốt nhất.",
            image: "https://placehold.co/400x400",
        },
        {
            number: "04",
            title: "Lò Đốt Củi",
            description:
                "Pizza của chúng tôi được nướng trong lò đốt củi truyền thống ở nhiệt độ lên đến 480°C. Điều này tạo ra lớp vỏ hoàn hảo - giòn bên ngoài và mềm bên trong.",
            image: "https://placehold.co/400x400",
        },
    ]

    return (
        <section id="process" ref={sectionRef} className="relative overflow-hidden bg-gray-100 py-12 md:py-20">
            {/* Background elements */}
            <div className="absolute inset-0 parallax-bg opacity-10">
                <div className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64">
                    <img
                        src="https://placehold.co/150x150"
                        alt="Hình ảnh pizza"
                        width={200}
                        height={200}
                        className="rotate-element"
                    />
                </div>
                <div className="absolute bottom-20 right-10 w-24 md:w-48 h-24 md:h-48">
                    <img
                        src="https://placehold.co/150x150"
                        alt="Hình ảnh pizza"
                        width={150}
                        height={150}
                        className="rotate-element"
                    />
                </div>
                <div className="absolute top-40 right-1/4 w-16 md:w-32 h-16 md:h-32">
                    <img
                        src="https://placehold.co/150x150"
                        alt="Hình ảnh pizza"
                        width={100}
                        height={100}
                        className="rotate-element"
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 md:mb-16" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Quy Trình Làm Pizza Của Chúng Tôi</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-4 md:mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                            Khám phá nghệ thuật và khoa học đằng sau những chiếc pizza thơm ngon của chúng tôi. Từ bột nhào đến giao
                            hàng, chúng tôi đảm bảo chất lượng ở mọi bước.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div className="space-y-8 md:space-y-12">
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 md:gap-6"
                                    data-aos="fade-right"
                                    data-aos-delay={100 + index * 100}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-white text-xl md:text-2xl font-bold">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{step.title}</h3>
                                        <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-lg shadow-lg"
                                    data-aos="zoom-in"
                                    data-aos-delay={100 + index * 100}
                                >
                                    <img
                                        src={step.image || "/placeholder.svg"}
                                        alt={step.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 md:mt-20 text-center" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Trải Nghiệm Sự Khác Biệt</h3>
                        <p className="text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
                            Cam kết về chất lượng và truyền thống là điều làm nên sự khác biệt của pizza chúng tôi. Chúng tôi mời bạn
                            nếm thử sự khác biệt mà niềm đam mê và nguyên liệu cao cấp tạo nên.
                        </p>
                        <button
                            className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            Đặt Pizza Ngay
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

