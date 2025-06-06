"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Utensils, Award, Clock, Leaf } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null)
    const featureRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (sectionRef.current) {
            // Create animation for the section sliding up
            gsap.fromTo(
                sectionRef.current,
                {
                    y: "10%",
                },
                {
                    y: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1,
                    },
                },
            )

            // Animate each feature card
            featureRefs.current.forEach((ref, index) => {
                if (ref) {
                    gsap.fromTo(
                        ref,
                        {
                            opacity: 0,
                            y: 30,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                            delay: 0.1 * index,
                            scrollTrigger: {
                                trigger: ref,
                                start: "top bottom-=50",
                                toggleActions: "play none none reverse",
                            },
                        },
                    )
                }
            })
        }
    }, [])

    const features = [
        {
            icon: <Utensils className="w-10 h-10 text-primary" />,
            title: "Công Thức Chính Hiệu",
            description: "Pizza của chúng tôi được làm theo công thức truyền thống Ý được truyền qua nhiều thế hệ.",
        },
        {
            icon: <Award className="w-10 h-10 text-primary" />,
            title: "Chất Lượng Cao Cấp",
            description:
                "Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất từ các nhà cung cấp đáng tin cậy ở địa phương và Ý.",
        },
        {
            icon: <Clock className="w-10 h-10 text-primary" />,
            title: "Giao Hàng Nhanh",
            description: "Pizza nóng hổi và tươi ngon được giao đến tận nhà trong vòng 30 phút hoặc bạn sẽ được miễn phí.",
        },
        {
            icon: <Leaf className="w-10 h-10 text-primary" />,
            title: "Nguyên Liệu Tươi",
            description:
                "Tất cả các loại nhân của chúng tôi đều tươi, không đông lạnh, để đảm bảo hương vị và chất lượng tốt nhất.",
        },
    ]

    // Update the Features component for better responsiveness
    return (
        <section id="features" ref={sectionRef} className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                    >
                        Tại Sao Chọn Pizza Của Chúng Tôi
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
                        Chúng tôi tự hào về cam kết chất lượng, truyền thống và sự hài lòng của khách hàng. Đây là những điều làm
                        nên sự khác biệt của chúng tôi.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el) => { featureRefs.current[index] = el }}
                            className="card p-5 md:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

