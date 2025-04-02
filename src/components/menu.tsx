import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Menu() {
    const sectionRef = useRef<HTMLDivElement>(null)

    // Use Intersection Observer for more efficient animations
    useEffect(() => {
        if (!sectionRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const pizzaItems = sectionRef.current?.querySelectorAll(".pizza-item")
                    pizzaItems?.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add("animate-fade-in")
                        }, index * 150) // Stagger the animations
                    })
                    observer.disconnect() // Only run once
                }
            },
            { threshold: 0.1 },
        )

        observer.observe(sectionRef.current)

        return () => observer.disconnect()
    }, [])

    const pizzas = [
        {
            name: "Margherita",
            description: "Sốt cà chua cổ điển, phô mai mozzarella và húng quế tươi",
            price: "299.000đ",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Pepperoni",
            description: "Sốt cà chua, phô mai mozzarella và xúc xích pepperoni cay",
            price: "349.000đ",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Rau Củ",
            description: "Sốt cà chua, phô mai mozzarella, ớt chuông, nấm và ô liu",
            price: "329.000đ",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Hawaiian",
            description: "Sốt cà chua, phô mai mozzarella, thịt giăm bông và dứa",
            price: "359.000đ",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Bốn Loại Phô Mai",
            description: "Sốt cà chua, phô mai mozzarella, gorgonzola, parmesan và ricotta",
            price: "389.000đ",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Diavola",
            description: "Sốt cà chua, phô mai mozzarella, xúc xích salami cay và ớt",
            price: "359.000đ",
            image: "/placeholder.svg?height=300&width=300",
        },
    ]

    return (
        <section id="menu" ref={sectionRef} className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                    >
                        Thực Đơn Pizza
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
                        Khám phá các loại pizza thủ công của chúng tôi được làm với tình yêu và những nguyên liệu tốt nhất.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {pizzas.map((pizza, index) => (
                        <div
                            key={index}
                            className="pizza-item card group opacity-0"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                <img
                                    src={pizza.image || "/placeholder.svg"}
                                    alt={pizza.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy" // Add native lazy loading
                                />
                            </div>
                            <div className="card-body p-4 md:p-6">
                                <div className="flex justify-between items-center mb-2 md:mb-3">
                                    <h3 className="font-semibold text-base md:text-lg">{pizza.name}</h3>
                                    <span className="text-primary font-bold text-base md:text-lg">{pizza.price}</span>
                                </div>
                                <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">{pizza.description}</p>
                                <button className="btn-primary w-full py-2 text-sm md:text-base">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 md:mt-10 lg:mt-12">
                    <button className="btn-outline py-2 md:py-3 px-6 md:px-8 text-sm md:text-base">Xem Toàn Bộ Thực Đơn</button>
                </div>
            </div>
        </section>
    )
}

