import { useState, useRef } from "react"
import { Calendar, Clock, Users, ChefHat, Award, ArrowRight, Utensils, Star } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

// Optimized version with @gsap/react
export default function WorkshopSection() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [selectedWorkshop, setSelectedWorkshop] = useState<{
        title: string;
        description: string;
        image: string;
        duration: string;
        price: string;
        capacity: string;
    } | null>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)
    const panelsRef = useRef<(HTMLDivElement | null)[]>([])
    const [activePanel, setActivePanel] = useState(0)

    // Sử dụng useGSAP hook để tạo animation
    useGSAP(
        () => {
            if (horizontalRef.current && sectionsRef.current) {
                // Tạo hiệu ứng scroll ngang
                gsap.registerPlugin(ScrollTrigger)

                ScrollTrigger.create({
                    trigger: horizontalRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    onUpdate: (self) => {
                        if (sectionsRef.current) {
                            const progress = self.progress
                            const maxScroll = sectionsRef.current.scrollWidth - window.innerWidth
                            sectionsRef.current.style.transform = `translateX(-${progress * maxScroll}px)`

                            // Update active panel for animations
                            const panelCount = panelsRef.current.filter(Boolean).length
                            const newActivePanel = Math.min(Math.floor(progress * panelCount), panelCount - 1)

                            if (newActivePanel !== activePanel) {
                                setActivePanel(newActivePanel)
                            }
                        }
                    },
                    scrub: true,
                })
            }
        },
        { scope: horizontalRef, dependencies: [activePanel] },
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    const workshops = [
        {
            title: "Lớp Học Neapolitan",
            description: "Học nghệ thuật làm pizza Neapolitan chính hiệu từ các đầu bếp pizza bậc thầy của chúng tôi.",
            image: "/placeholder.svg?height=600&width=400",
            duration: "3 giờ",
            price: "2.190.000đ",
            capacity: "8 người",
        },
        {
            title: "Sáng Tạo Pizza Cao Cấp",
            description: "Khám phá các loại nhân sáng tạo và kết hợp để tạo ra pizza cao cấp đặc trưng của riêng bạn.",
            image: "/placeholder.svg?height=600&width=400",
            duration: "2.5 giờ",
            price: "1.890.000đ",
            capacity: "10 người",
        },
        {
            title: "Pizza Vui Vẻ Cho Gia Đình",
            description:
                "Một lớp học đầy niềm vui cho cả gia đình. Trẻ em sẽ thích thú làm những chiếc mini pizza của riêng mình!",
            image: "/placeholder.svg?height=600&width=400",
            duration: "2 giờ",
            price: "1.490.000đ",
            capacity: "12 người",
        },
    ]

    const uniquePizzas = [
        {
            name: "Truffle Delight",
            description: "Kem nấm truffle đen, nấm rừng, phô mai mozzarella và rau arugula rưới dầu truffle.",
            image: "/placeholder.svg?height=300&width=300",
            tags: ["Cao cấp", "Chay"],
        },
        {
            name: "Giấc Mơ Địa Trung Hải",
            description: "Ớt chuông nướng, atiso, ô liu, phô mai feta và thảo mộc tươi trên đế bánh mỏng.",
            image: "/placeholder.svg?height=300&width=300",
            tags: ["Chay", "Địa Trung Hải"],
        },
        {
            name: "Hải Sản Cay",
            description: "Tôm tươi, mực, vẹm và nghêu với sốt cà chua cay và thảo mộc tươi.",
            image: "/placeholder.svg?height=300&width=300",
            tags: ["Hải sản", "Cay"],
        },
        {
            name: "Rừng Mùa Thu Hoạch",
            description: "Hỗn hợp nấm rừng, dầu truffle, hành tây caramel hóa và phô mai fontina.",
            image: "/placeholder.svg?height=300&width=300",
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
        },
    ]

    // Custom dialog component for React
    const Dialog = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
        if (!isOpen) return null

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <span className="sr-only">Đóng</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        )
    }

    return (
        <section id="workshop" className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Workshop Introduction */}
                <div className="text-center mb-8 md:mb-16">
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
                            className="bg-white rounded-lg overflow-hidden shadow-lg opacity-0 animate-fade-in"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="relative h-40 md:h-48">
                                <img
                                    src={workshop.image || "/placeholder.svg"}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
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
                                <button
                                    className="w-full bg-primary text-white hover:bg-primary/90 text-sm md:text-base py-2 md:py-2.5 rounded-md"
                                    onClick={() => {
                                        setSelectedWorkshop(workshop)
                                        setShowDialog(true)
                                    }}
                                >
                                    Đặt Ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Dialog for Workshop Booking */}
                <Dialog
                    isOpen={showDialog}
                    onClose={() => {
                        setShowDialog(false)
                        if (formSubmitted) setFormSubmitted(false)
                    }}
                    title={selectedWorkshop ? `Đặt Lớp Học: ${selectedWorkshop.title}` : "Đặt Lớp Học"}
                >
                    {!formSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ tên
                                    </label>
                                    <input
                                        id="name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Điện thoại
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                                        Số người
                                    </label>
                                    <input
                                        id="participants"
                                        type="number"
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tin nhắn
                                    </label>
                                    <textarea
                                        id="message"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows={4}
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md">
                                        Gửi Đặt Chỗ
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="py-6 text-center">
                            <ChefHat className="w-16 h-16 mx-auto text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Đã Nhận Đặt Chỗ!</h3>
                            <p className="text-gray-600 mb-4">
                                Cảm ơn bạn đã đặt lớp học của chúng tôi. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận đặt chỗ của bạn.
                            </p>
                            <button
                                onClick={() => setFormSubmitted(false)}
                                className="mt-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                            >
                                Đặt Lớp Học Khác
                            </button>
                        </div>
                    )}
                </Dialog>

                {/* Unique Pizzas Section */}
                <div className="mb-10 md:mb-16">
                    <div className="text-center mb-6 md:mb-12">
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
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow opacity-0 animate-fade-in"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-32 sm:h-40 md:h-48">
                                    <img
                                        src={pizza.image || "/placeholder.svg"}
                                        alt={pizza.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
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

            {/* Simplified Horizontal Scrolling Workshop Benefits Section */}
            <div
                ref={horizontalRef}
                className="relative h-screen overflow-hidden"
                style={{
                    marginBottom: "100px",
                    zIndex: 1,
                }}
            >
                <div ref={sectionsRef} className="flex absolute top-0 left-0 h-full transition-transform duration-300">
                    {benefitsPanels.map((panel, index) => (
                        <div
                            key={index}
                            ref={(el) => { panelsRef.current[index] = el }}
                            className={`w-screen h-full flex flex-col items-center justify-center p-8 bg-white transition-opacity duration-500 ${index === activePanel ? "opacity-100" : "opacity-50"
                                }`}
                        >
                            <div className="max-w-3xl mx-auto text-center">
                                {panel.icon}
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">{panel.title}</h2>
                                <p className="text-gray-600 text-lg mb-10">{panel.description}</p>

                                <div className="space-y-6 text-left">
                                    {panel.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start">
                                            {benefit.icon}
                                            <p className="text-gray-700">{benefit.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <a href="/workshop">
                                    <button className="mt-10 bg-primary hover:bg-primary/90 text-white text-base md:text-lg py-3 px-8 rounded-md">
                                        Tham Gia Lớp Học <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                                    </button>
                                </a>
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

