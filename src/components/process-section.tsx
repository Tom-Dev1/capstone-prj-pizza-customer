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
                y: "40%",
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
            image: "https://img.freepik.com/free-photo/close-up-person-cooking_23-2150980258.jpg?t=st=1743805238~exp=1743808838~hmac=f46d52ef3e703224885f0cd0fd7746f4ce4ec4d1ad037839222eea6e23e493ff&w=996",
        },
        {
            number: "02",
            title: "Sốt Cao Cấp",
            description:
                "Sốt đặc trưng của chúng tôi được làm từ cà chua San Marzano, nhập khẩu từ Ý và nổi tiếng với hương vị ngọt và độ axit thấp. Chúng tôi thêm hỗn hợp thảo mộc và gia vị để tạo ra hương vị hoàn hảo.",
            image: "https://img.freepik.com/free-photo/tasty-traditional-pizza-arrangement_23-2148921295.jpg?t=st=1743793112~exp=1743796712~hmac=68332e71d53dd0391c4596f9b6fac47264568d48ac2cd7f51dbd54b06a06fa40&w=740",
        },
        {
            number: "03",
            title: "Nhân Chất Lượng",
            description:
                "Chúng tôi chọn lựa những nguyên liệu tốt nhất cho nhân pizza, từ rau củ tươi đến các loại thịt và phô mai cao cấp. Mỗi loại nhân được lựa chọn cẩn thận để đảm bảo sự kết hợp hương vị tốt nhất.",
            image: "https://img.freepik.com/free-photo/top-view-cook-preparing-pizza_23-2150283021.jpg?t=st=1743793157~exp=1743796757~hmac=3ad835591a2c59ceeaba8f130ecbc3aba749d32e7683184b98a26e17573109c5&w=996",
        },
        {
            number: "04",
            title: "Lò Đốt Củi",
            description:
                "Pizza của chúng tôi được nướng trong lò đốt củi truyền thống ở nhiệt độ lên đến 480°C. Điều này tạo ra lớp vỏ hoàn hảo - giòn bên ngoài và mềm bên trong.",
            image: "https://img.freepik.com/free-photo/high-angle-baking-delicious-pizza_23-2150235790.jpg?t=st=1743793275~exp=1743796875~hmac=cb963ab331dff957300807357ae4977d10e5d4bef0746526fc23bfe402037f67&w=996",
        },
    ]

    return (
        <section id="process" ref={sectionRef} className="relative overflow-hidden bg-gray-100 py-12 md:py-20">
            {/* Background elements */}
            <div className="absolute inset-0 parallax-bg opacity-10">
                <div className="absolute top-20 left-72 w-32 md:w-64 h-32 md:h-64">
                    <img
                        src="https://img.freepik.com/free-psd/freshly-baked-pizza-with-cut-slice-isolated-transparent-background_191095-9041.jpg?t=st=1743794254~exp=1743797854~hmac=67f634ae2393e824a1be020d68e1369bb6a7ae6c5a8f9f2ea3fd66bb50b387dd&w=826"
                        alt="Hình ảnh pizza"
                        width={200}
                        height={200}
                        className="rotate-element"
                    />
                </div>
                <div className="absolute bottom-96 right-64 w-24 md:w-48 h-24 md:h-48">
                    <img
                        src="https://img.freepik.com/free-psd/delicious-pepperoni-pizza-with-mushrooms-olives_191095-91111.jpg?t=st=1743794226~exp=1743797826~hmac=02c764abc68fd252f9a4eebfdb72f4893572d9e404f72a84f870e90e0556d487&w=826"
                        alt="Hình ảnh pizza"
                        width={250}
                        height={250}
                        className="rotate-element"
                    />
                </div>
                <div className="absolute top-30 right-96 w-16 md:w-32 h-16 md:h-32">
                    <img
                        src="https://img.freepik.com/free-psd/delicious-pepperoni-pizza-culinary-delight_632498-24206.jpg?t=st=1743794196~exp=1743797796~hmac=2c4fa7021545c481fe21957c39ecd27c63dfefa89f17f6fd2dc48c398bebb801&w=826"
                        alt="Hình ảnh pizza"
                        width={300}
                        height={300}
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

