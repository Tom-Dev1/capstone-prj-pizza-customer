"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Utensils, Wine, Music, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

export default function DiningExperience() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (sectionRef.current) {
            // Animate section title and description
            gsap.fromTo(
                ".dining-title",
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

            // Animate each dining area image
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    gsap.fromTo(
                        ref,
                        { opacity: 0, scale: 0.9 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            delay: 0.2 * index,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ref,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                        },
                    )
                }
            })
        }

        return () => {
            // Clean up ScrollTrigger
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    const diningAreas = [
        {
            title: "Khu Vực Chính",
            description: "Không gian rộng rãi với thiết kế hiện đại, phù hợp cho các nhóm bạn bè và gia đình.",
            image: "/placeholder.svg?height=400&width=600",
            capacity: "60 chỗ ngồi",
            features: ["Bàn lớn", "Bàn nhỏ", "Ghế cao"],
        },
        {
            title: "Khu Vực Ngoài Trời",
            description:
                "Không gian ngoài trời thoáng đãng với cây xanh và ánh sáng tự nhiên, lý tưởng cho những ngày đẹp trời.",
            image: "/placeholder.svg?height=400&width=600",
            capacity: "40 chỗ ngồi",
            features: ["Mái che", "Đèn trang trí", "Cây xanh"],
        },
        {
            title: "Phòng Riêng",
            description: "Không gian riêng tư cho các buổi họp mặt, sinh nhật hoặc sự kiện đặc biệt với dịch vụ chuyên biệt.",
            image: "/placeholder.svg?height=400&width=600",
            capacity: "20 chỗ ngồi",
            features: ["Âm thanh riêng", "Màn hình", "Phục vụ riêng"],
        },
    ]

    const diningFeatures = [
        {
            icon: <Utensils className="w-10 h-10 text-primary" />,
            title: "Ẩm Thực Đẳng Cấp",
            description: "Thưởng thức pizza chính hiệu Ý và các món ăn Địa Trung Hải được chế biến bởi đầu bếp hàng đầu.",
        },
        {
            icon: <Wine className="w-10 h-10 text-primary" />,
            title: "Rượu Vang Tuyển Chọn",
            description: "Bộ sưu tập rượu vang Ý và quốc tế được lựa chọn kỹ lưỡng để kết hợp hoàn hảo với món ăn của bạn.",
        },
        {
            icon: <Music className="w-10 h-10 text-primary" />,
            title: "Âm Nhạc Sống",
            description: "Thưởng thức âm nhạc sống vào các tối cuối tuần, tạo nên không khí ấm cúng và lãng mạn.",
        },
        {
            icon: <Users className="w-10 h-10 text-primary" />,
            title: "Phục Vụ Tận Tâm",
            description:
                "Đội ngũ nhân viên chuyên nghiệp và thân thiện, luôn sẵn sàng mang đến trải nghiệm ẩm thực tuyệt vời.",
        },
    ]

    return (
        <section id="dining" ref={sectionRef} className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16 dining-title">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                    >
                        Trải Nghiệm Ẩm Thực Tại Nhà Hàng
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
                        Hãy đến và trải nghiệm không gian ấm cúng, món ăn ngon và dịch vụ tận tâm tại nhà hàng PizzaCapstone. Chúng
                        tôi cung cấp nhiều lựa chọn chỗ ngồi phù hợp với mọi dịp, từ bữa tối lãng mạn đến họp mặt gia đình.
                    </motion.p>
                </div>

                {/* Dining Areas */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    {diningAreas.map((area, index) => (
                        <div
                            key={index}

                            ref={(el) => {
                                imageRefs.current[index] = el
                            }}
                            className="bg-white rounded-lg overflow-hidden shadow-lg"
                        >
                            <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                                <img
                                    src={area.image || "/placeholder.svg"}
                                    alt={area.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            </div>
                            <div className="p-4 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">{area.title}</h3>
                                <p className="text-gray-600 text-sm md:text-base mb-3">{area.description}</p>
                                <div className="flex items-center text-gray-700 mb-2">
                                    <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                                    <span className="text-sm md:text-base">{area.capacity}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {area.features.map((feature, i) => (
                                        <span key={i} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dining Experience Features */}
                <div className="bg-gray-50 rounded-xl p-6 md:p-10 mb-12 md:mb-16">
                    <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">Điều Gì Làm Nên Trải Nghiệm Đặc Biệt</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {diningFeatures.map((feature, index) => (
                            <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Special Events */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-12 md:mb-16">
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">Sự Kiện Đặc Biệt</h3>
                        <p className="text-gray-600 mb-4">
                            Nhà hàng chúng tôi là địa điểm lý tưởng cho mọi dịp đặc biệt của bạn. Từ tiệc sinh nhật, kỷ niệm đến họp
                            mặt công ty, chúng tôi cung cấp dịch vụ tổ chức sự kiện trọn gói với thực đơn tùy chỉnh và không gian
                            riêng tư.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                                <ArrowRight className="w-5 h-5 text-primary mr-2 mt-0.5" />
                                <span>Tiệc sinh nhật và kỷ niệm</span>
                            </li>
                            <li className="flex items-start">
                                <ArrowRight className="w-5 h-5 text-primary mr-2 mt-0.5" />
                                <span>Họp mặt gia đình và bạn bè</span>
                            </li>
                            <li className="flex items-start">
                                <ArrowRight className="w-5 h-5 text-primary mr-2 mt-0.5" />
                                <span>Sự kiện doanh nghiệp và hội thảo</span>
                            </li>
                            <li className="flex items-start">
                                <ArrowRight className="w-5 h-5 text-primary mr-2 mt-0.5" />
                                <span>Tiệc cưới nhỏ và tiệc đính hôn</span>
                            </li>
                        </ul>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-primary hover:bg-primary/90">Đặt Sự Kiện Đặc Biệt</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
                                <DialogHeader>
                                    <DialogTitle>Đặt Sự Kiện Đặc Biệt</DialogTitle>
                                    <DialogDescription>
                                        Vui lòng cung cấp thông tin chi tiết về sự kiện của bạn để chúng tôi có thể phục vụ tốt nhất.
                                    </DialogDescription>
                                </DialogHeader>
                                {!formSubmitted ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="event-name" className="text-right">
                                                    Họ tên
                                                </Label>
                                                <Input id="event-name" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="event-email" className="text-right">
                                                    Email
                                                </Label>
                                                <Input id="event-email" type="email" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="event-phone" className="text-right">
                                                    Điện thoại
                                                </Label>
                                                <Input id="event-phone" type="tel" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="event-type" className="text-right">
                                                    Loại sự kiện
                                                </Label>
                                                <Input id="event-type" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="event-date" className="text-right">
                                                    Ngày
                                                </Label>
                                                <Input id="event-date" type="date" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="event-guests" className="text-right">
                                                    Số khách
                                                </Label>
                                                <Input id="event-guests" type="number" min="1" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-start gap-4">
                                                <Label htmlFor="event-details" className="text-right pt-2">
                                                    Chi tiết
                                                </Label>
                                                <Textarea id="event-details" className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" className="bg-primary hover:bg-primary/90">
                                                Gửi Yêu Cầu
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                ) : (
                                    <div className="py-6 text-center">
                                        <Calendar className="w-16 h-16 mx-auto text-primary mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">Đã Nhận Yêu Cầu!</h3>
                                        <p className="text-gray-600 mb-4">
                                            Cảm ơn bạn đã liên hệ về sự kiện đặc biệt. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để thảo
                                            luận chi tiết.
                                        </p>
                                        <Button onClick={() => setFormSubmitted(false)} variant="outline" className="mt-2">
                                            Gửi Yêu Cầu Khác
                                        </Button>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="/placeholder.svg?height=600&width=800"
                            alt="Sự kiện đặc biệt"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-4 md:p-6 text-white">
                                <h4 className="text-lg md:text-xl font-semibold mb-2">Không Gian Sự Kiện</h4>
                                <p className="text-sm md:text-base">Không gian linh hoạt có thể tùy chỉnh theo nhu cầu của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reservation CTA */}
                <div className="bg-primary/10 rounded-xl p-6 md:p-10 text-center">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">Đặt Bàn Ngay Hôm Nay</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Đừng bỏ lỡ cơ hội thưởng thức ẩm thực Ý chính hiệu trong không gian tuyệt vời của chúng tôi. Đặt bàn trước
                        để đảm bảo có chỗ ngồi tốt nhất và trải nghiệm dịch vụ đặc biệt.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/booking">
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3">Đặt Bàn Trực Tuyến</Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white px-6 py-3"
                        >
                            Gọi: (028) 3456-7890
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

