"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Star } from "lucide-react"

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sectionRef.current) {
            const testimonials = sectionRef.current.querySelectorAll(".testimonial-item")

            gsap.fromTo(
                testimonials,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.3,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            )
        }
    }, [])

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Food Blogger",
            image: "/placeholder.svg?height=100&width=100",
            quote:
                "The best pizza I've had outside of Italy. The crust is perfectly crispy and the toppings are always fresh!",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Regular Customer",
            image: "/placeholder.svg?height=100&width=100",
            quote:
                "I order from PizzaDelight at least once a week. Their delivery is always on time and the pizza is still hot!",
            rating: 5,
        },
        {
            name: "Emily Rodriguez",
            role: "Food Critic",
            image: "/placeholder.svg?height=100&width=100",
            quote:
                "The attention to detail and quality of ingredients sets PizzaDelight apart from other pizzerias in the city.",
            rating: 4,
        },
    ]

    return (
        <section id="testimonials" ref={sectionRef} className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        What Our Customers Say
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
                        Don't just take our word for it. Here's what our satisfied customers have to say about our pizzas.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-item bg-white p-8 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        className="object-cover fill"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

