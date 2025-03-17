"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const pizzaRef = useRef<HTMLDivElement>(null)

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
        <section id="home" ref={sectionRef} className="min-h-screen pt-20 flex items-center relative overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://placehold.co/1920x1080')",
                    filter: "brightness(0.4)",
                }}
            />

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Authentic Italian Pizza
                            <span className="text-primary block mt-2">Made With Love</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-gray-200">
                            Experience the taste of Naples with our handcrafted pizzas made from the freshest ingredients and
                            traditional recipes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                                Order Now
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                                View Menu
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={pizzaRef}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <img src="https://placehold.co/600x600" alt="Delicious Pizza" className="rounded-full w-full h-auto" />
                        <div className="absolute top-0 right-0 bg-primary text-white rounded-full p-6 shadow-lg">
                            <div className="text-center">
                                <span className="block text-2xl font-bold">20%</span>
                                <span className="text-sm">OFF</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

