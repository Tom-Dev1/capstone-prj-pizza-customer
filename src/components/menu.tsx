"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function Menu() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sectionRef.current) {
            const pizzas = sectionRef.current.querySelectorAll(".pizza-item")

            gsap.fromTo(
                pizzas,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            )
        }
    }, [])

    const pizzas = [
        {
            name: "Margherita",
            description: "Classic tomato sauce, mozzarella, and fresh basil",
            price: "$12.99",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Pepperoni",
            description: "Tomato sauce, mozzarella, and spicy pepperoni",
            price: "$14.99",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Vegetarian",
            description: "Tomato sauce, mozzarella, bell peppers, mushrooms, and olives",
            price: "$13.99",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Hawaiian",
            description: "Tomato sauce, mozzarella, ham, and pineapple",
            price: "$15.99",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Quattro Formaggi",
            description: "Tomato sauce, mozzarella, gorgonzola, parmesan, and ricotta",
            price: "$16.99",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Diavola",
            description: "Tomato sauce, mozzarella, spicy salami, and chili peppers",
            price: "$15.99",
            image: "/placeholder.svg?height=300&width=300",
        },
    ]

    return (
        <section id="menu" ref={sectionRef} className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Our Pizza Menu
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-20 h-1 bg-primary mx-auto mb-6"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Explore our selection of handcrafted pizzas made with love and the finest ingredients.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pizzas.map((pizza, index) => (
                        <div
                            key={index}
                            className="pizza-item bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-48">
                                <img src={pizza.image || "/placeholder.svg"} alt={pizza.name} className="object-cover" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold">{pizza.name}</h3>
                                    <span className="text-primary font-bold">{pizza.price}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{pizza.description}</p>
                                <button className="w-full bg-primary text-white py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors">
                        View Full Menu
                    </button>
                </div>
            </div>
        </section>
    )
}

