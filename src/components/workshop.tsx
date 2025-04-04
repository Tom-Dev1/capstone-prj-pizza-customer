"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Calendar, Clock, Users, ChefHat, Award, ArrowRight, Utensils, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function WorkshopSection() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const horizontalRef = useRef<HTMLDivElement>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)
    const panelsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        // Create a cleanup function to ensure all ScrollTriggers are properly killed
        const cleanup = () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.id === "workshop-horizontal") {
                    trigger.kill(true) // Kill and revert any changes
                }
            })
        }

        // Clean up any existing ScrollTriggers first
        cleanup()

        if (horizontalRef.current && sectionsRef.current && panelsRef.current.length > 0) {
            // Get the panels
            const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[]

            // Calculate the total width of all panels
            const totalPanelsWidth = panels.reduce((total, panel) => total + panel.offsetWidth, 0)

            // Set the width of the sections container to accommodate all panels
            gsap.set(sectionsRef.current, { width: totalPanelsWidth })

            // Create the horizontal scroll animation
            const horizontalScroll = gsap.to(sectionsRef.current, {
                x: () => -(totalPanelsWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    id: "workshop-horizontal", // Add an ID for easier reference
                    trigger: horizontalRef.current,
                    pin: true,
                    start: "top top",
                    end: () => `+=${totalPanelsWidth - window.innerWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                    onLeaveBack: (self) => {
                        // Ensure proper unpinning when scrolling back up
                        self.refresh()
                    },
                    onLeave: (self) => {
                        // Ensure proper unpinning when scrolling down
                        self.refresh()
                    },
                },
            })

            // Animate each panel as it comes into view
            panels.forEach((panel, i) => {
                gsap.fromTo(
                    panel,
                    {
                        opacity: i === 0 ? 1 : 0.5,
                        scale: i === 0 ? 1 : 0.9,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: panel,
                            start: "left center",
                            toggleActions: "play none none reverse",
                            containerAnimation: horizontalScroll,
                        },
                    },
                )
            })

            // Force a refresh of ScrollTrigger to ensure proper layout
            ScrollTrigger.refresh()
        }

        // Clean up function
        return cleanup
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
        // In a real application, you would send the form data to a server here
    }

    const workshops = [
        {
            title: "Lớp Học Neapolitan",
            description: "Học nghệ thuật làm pizza Neapolitan chính hiệu từ các đầu bếp pizza bậc thầy của chúng tôi.",
            image:
                "https://img.freepik.com/free-photo/high-angle-people-cooking-pizza-together_23-2150283011.jpg?t=st=1743794061~exp=1743797661~hmac=9f5e7ac25eedbc894efdea543c323b474e18fa00aad6c3bac7705c95e3d1eb28&w=1380",
            duration: "3 giờ",
            price: "2.190.000đ",
            capacity: "8 người",
        },
        {
            title: "Sáng Tạo Pizza Cao Cấp",
            description: "Khám phá các loại nhân sáng tạo và kết hợp để tạo ra pizza cao cấp đặc trưng của riêng bạn. Pizzaaa!",
            image:
                "https://img.freepik.com/free-photo/top-view-cook-preparing-pizza_23-2150283022.jpg?t=st=1743794027~exp=1743797627~hmac=6f2ed88e27418fc5de172f703253bacaa26f62200323d3d1643e295da726417e&w=1380",
            duration: "2.5 giờ",
            price: "1.890.000đ",
            capacity: "10 người",
        },
        {
            title: "Pizza Vui Vẻ Cho Gia Đình",
            description:
                "Một lớp học đầy niềm vui cho cả gia đình. Trẻ em sẽ thích thú làm những chiếc mini pizza của riêng mình!",
            image:
                "https://img.freepik.com/free-photo/high-angle-woman-kid-cooking-together_23-2150446114.jpg?ga=GA1.1.248564778.1736943439&semt=ais_hybrid&w=740",
            duration: "2 giờ",
            price: "1.490.000đ",
            capacity: "12 người",
        },
    ]

    const uniquePizzas = [
        {
            name: "Truffle Delight",
            description: "Kem nấm truffle đen, nấm rừng, phô mai mozzarella và rau arugula rưới dầu truffle.",
            image: "https://img.freepik.com/free-photo/seafood-pizza_1203-8950.jpg?t=st=1743805408~exp=1743809008~hmac=97b54dc575229803cd12ef1867f3f0cc9948f5dbebfe69be52fad873924f03dd&w=996",
            tags: ["Cao cấp", "Chay"],
        },
        {
            name: "Giấc Mơ Địa Trung Hải",
            description: "Ớt chuông nướng, atiso, ô liu, phô mai feta và thảo mộc tươi trên đế bánh mỏng.",
            image: "https://img.freepik.com/free-photo/hawaiian-pizza_74190-5124.jpg?t=st=1743805453~exp=1743809053~hmac=bbab5d77b57bc1ffa0434a3066d645816b6c68ed3f73ac71189baeaea0b8468a&w=996",
            tags: ["Chay", "Địa Trung Hải"],
        },
        {
            name: "Hải Sản Cay",
            description: "Tôm tươi, mực, vẹm và nghêu với sốt cà chua cay và thảo mộc tươi.",
            image: "https://img.freepik.com/free-photo/hawaiian-pizza_74190-2500.jpg?t=st=1743805440~exp=1743809040~hmac=0426bc026738c905d254dd8cad0912cff132e0b53698ea89da2625463359fe1c&w=996",
            tags: ["Hải sản", "Cay"],
        },
        {
            name: "Rừng Mùa Thu Hoạch",
            description: "Hỗn hợp nấm rừng, dầu truffle, hành tây caramel hóa và phô mai fontina.",
            image: "https://img.freepik.com/premium-photo/italian-pepperoni-pizza_123827-14636.jpg?w=996",
            tags: ["Chay", "Cao cấp"],
        },
    ]

    // Workshop benefits content for horizontal scrolling panels
    const benefitsPanels = [
        {
            title: "Học Từ Các Bậc Thầy",
            description:
                "Các lớp học của chúng tôi được dẫn dắt bởi các đầu bếp chuyên nghiệp với hàng thập kỷ kinh nghiệm trong ẩm thực Ý chính hiệu. Học các kỹ thuật và bí quyết được truyền qua nhiều thế hệ.",
            icon: <ChefHat className="w-16 h-16 text-primary mb-6" />,
            benefits: [
                {
                    icon: <Award className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Làm chủ các kỹ thuật được sử dụng trong các tiệm pizza đoạt giải thưởng trên toàn thế giới",
                },
                {
                    icon: <Utensils className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Trải nghiệm thực tế với thiết bị và nguyên liệu chuyên nghiệp",
                },
                {
                    icon: <Star className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Mang về nhà công thức và kỹ thuật độc quyền từ các lớp học của chúng tôi",
                },
            ],
            background:
                "https://img.freepik.com/free-photo/high-angle-woman-kid-cooking-together_23-2150446114.jpg?ga=GA1.1.248564778.1736943439&semt=ais_hybrid&w=740",
            overlayColor: "rgba(0, 0, 0, 0.7)",
        },
        {
            title: "Nhóm Nhỏ, Trải Nghiệm Lớn",
            description:
                "Chúng tôi giữ quy mô lớp học nhỏ để đảm bảo mọi người đều nhận được sự hướng dẫn cá nhân và thời gian thực hành thực tế.",
            icon: <Users className="w-16 h-16 text-primary mb-6" />,
            benefits: [
                {
                    icon: <Users className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Tối đa 8-12 người tham gia mỗi lớp học để đảm bảo sự hướng dẫn cá nhân",
                },
                {
                    icon: <Clock className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Thời gian đầy đủ để thực hành và hoàn thiện kỹ thuật của bạn",
                },
                {
                    icon: <Award className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Tạo kết nối với những người yêu thích pizza khác trong môi trường thân mật",
                },
            ],
            background:
                "https://img.freepik.com/free-photo/high-angle-people-cooking-pizza-together_23-2150283011.jpg?t=st=1743803795~exp=1743807395~hmac=42566bb404ec052621ea19462140e3321f9ab9d2c55cac72b7715c7f17ed74e1&w=996",
            overlayColor: "rgba(87, 72, 60, 0.8)", // Brown overlay for a warm, rustic feel
        },
        {
            title: "Lịch Học Linh Hoạt",
            description:
                "Chúng tôi cung cấp các lớp học vào nhiều thời điểm khác nhau để phù hợp với lịch trình bận rộn của bạn, bao gồm cả buổi tối và cuối tuần.",
            icon: <Calendar className="w-16 h-16 text-primary mb-6" />,
            benefits: [
                {
                    icon: <Calendar className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Có sẵn các lớp học vào buổi tối trong tuần và cuối tuần",
                },
                {
                    icon: <Clock className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Đặt lớp học riêng cho các sự kiện đặc biệt và xây dựng đội nhóm",
                },
                {
                    icon: <Users className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />,
                    text: "Các lựa chọn thân thiện với gia đình với hoạt động cho mọi lứa tuổi",
                },
            ],
            background:
                "https://img.freepik.com/free-photo/side-view-chef-baking-delicious-pizza_23-2150134248.jpg?t=st=1743804003~exp=1743807603~hmac=d4698486241acf58c2dd20c8fd463fd977e473825eac442aab68bb4330e74075&w=996",
            overlayColor: "rgba(62, 83, 62, 0.7)", // Green overlay for a fresh, vibrant feel
        },
    ]

    return (
        <section id="workshop" className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Workshop Introduction */}
                <div className="text-center mb-8 md:mb-16" data-aos="fade-up">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Lớp Học Làm Pizza</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-4 md:mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Tham gia cùng các đầu bếp chuyên nghiệp của chúng tôi và học các bí quyết làm pizza hoàn hảo. Từ chuẩn bị
                        bột đến các loại nhân sáng tạo, các lớp học của chúng tôi mang đến trải nghiệm thực tế cho tất cả những
                        người yêu thích pizza.
                    </p>
                </div>

                {/* Workshop Types */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-20">
                    {workshops.map((workshop, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative h-40 md:h-48">
                                <img
                                    src={workshop.image || "/placeholder.svg"}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{workshop.title}</h3>
                                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{workshop.description}</p>
                                <div className="space-y-2 mb-4 md:mb-6">
                                    <div className="flex items-center text-gray-700 text-sm md:text-base">
                                        <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                                        <span>{workshop.duration}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 text-sm md:text-base">
                                        <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                                        <span>Tối đa {workshop.capacity}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 text-sm md:text-base">
                                        <span className="font-bold text-primary text-base md:text-lg">{workshop.price}</span>
                                        <span className="ml-1">mỗi người</span>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-primary hover:bg-primary/90 text-sm md:text-base py-2 md:py-2.5">
                                            Đặt Ngay
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
                                        <DialogHeader>
                                            <DialogTitle>Đặt Lớp Học: {workshop.title}</DialogTitle>
                                            <DialogDescription>
                                                Điền vào mẫu dưới đây để đặt chỗ trong lớp học làm pizza của chúng tôi.
                                            </DialogDescription>
                                        </DialogHeader>
                                        {!formSubmitted ? (
                                            <form onSubmit={handleSubmit}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Họ tên
                                                        </Label>
                                                        <Input id="name" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input id="email" type="email" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="phone" className="text-right">
                                                            Điện thoại
                                                        </Label>
                                                        <Input id="phone" type="tel" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="date" className="text-right">
                                                            Ngày
                                                        </Label>
                                                        <Input id="date" type="date" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="participants" className="text-right">
                                                            Số người
                                                        </Label>
                                                        <Input id="participants" type="number" min="1" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-start gap-4">
                                                        <Label htmlFor="message" className="text-right pt-2">
                                                            Tin nhắn
                                                        </Label>
                                                        <Textarea id="message" className="col-span-3" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                                                        Gửi Đặt Chỗ
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        ) : (
                                            <div className="py-6 text-center">
                                                <ChefHat className="w-16 h-16 mx-auto text-primary mb-4" />
                                                <h3 className="text-xl font-semibold mb-2">Đã Nhận Đặt Chỗ!</h3>
                                                <p className="text-gray-600 mb-4">
                                                    Cảm ơn bạn đã đặt lớp học của chúng tôi. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận đặt chỗ
                                                    của bạn.
                                                </p>
                                                <Button onClick={() => setFormSubmitted(false)} variant="outline" className="mt-2">
                                                    Đặt Lớp Học Khác
                                                </Button>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Unique Pizzas Section */}
                <div className="mb-10 md:mb-16">
                    <div className="text-center mb-6 md:mb-12" data-aos="fade-up">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Những Loại Pizza Độc Đáo Bạn Sẽ Học Làm</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                            Khám phá các món sáng tạo đặc trưng của chúng tôi vượt ra ngoài truyền thống. Trong các lớp học của chúng
                            tôi, bạn sẽ học cách làm những loại pizza độc đáo này và nhiều hơn nữa.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {uniquePizzas.map((pizza, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
                            >
                                <div className="relative h-32 sm:h-40 md:h-48">
                                    <img
                                        src={pizza.image || "/placeholder.svg"}
                                        alt={pizza.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3 md:p-4">
                                    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{pizza.name}</h3>
                                    <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">{pizza.description}</p>
                                    <div className="flex flex-wrap gap-1 md:gap-2">
                                        {pizza.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Horizontal Scrolling Workshop Benefits Section */}
            {/* This is now outside the container to avoid layout issues */}
            <div
                ref={horizontalRef}
                className="relative h-screen overflow-hidden"
                style={{
                    marginBottom: "100px", // Add extra space after the section
                    zIndex: 1,
                }}
            >
                <div ref={sectionsRef} className="flex absolute top-0 left-0 h-full">
                    {benefitsPanels.map((panel, index) => (
                        <div
                            key={index}
                            ref={(el) => { panelsRef.current[index] = el }}
                            className="w-screen h-full flex flex-col items-center justify-center p-8"
                            style={{
                                backgroundImage: `url(${panel.background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative",
                            }}
                        >
                            {/* Overlay to ensure text readability */}
                            <div className="absolute inset-0" style={{ backgroundColor: panel.overlayColor }}></div>

                            <div className="max-w-3xl mx-auto text-center relative z-10 text-white">
                                {panel.icon}
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">{panel.title}</h2>
                                <p className="text-gray-200 text-lg mb-10">{panel.description}</p>

                                <div className="space-y-6 text-left">
                                    {panel.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start">
                                            {benefit.icon}
                                            <p className="text-gray-200">{benefit.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/workshop">
                                    <Button className="mt-10 bg-primary hover:bg-primary/90 text-base md:text-lg py-3 px-8">
                                        Tham Gia Lớp Học <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add a spacer div to ensure proper spacing after the horizontal section */}
            <div className="h-20"></div>
        </section>
    )
}

