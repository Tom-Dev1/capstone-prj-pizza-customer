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
                    y: "20%",
                },
                {
                    y: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom", // Start animation when the top of the section hits the bottom of the viewport
                        end: "top center", // End animation when the top of the section hits the center of the viewport
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
                            y: 50,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            delay: 0.1 * index,
                            scrollTrigger: {
                                trigger: ref,
                                start: "top bottom-=100",
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
            title: "Authentic Recipes",
            description: "Our pizzas are made using traditional Italian recipes passed down through generations.",
        },
        {
            icon: <Award className="w-10 h-10 text-primary" />,
            title: "Premium Quality",
            description: "We use only the finest ingredients sourced from trusted local and Italian suppliers.",
        },
        {
            icon: <Clock className="w-10 h-10 text-primary" />,
            title: "Fast Delivery",
            description: "Hot and fresh pizza delivered to your doorstep within 30 minutes or it's free.",
        },
        {
            icon: <Leaf className="w-10 h-10 text-primary" />,
            title: "Fresh Ingredients",
            description: "All our toppings are fresh, never frozen, to ensure the best flavor and quality.",
        },
    ]

    return (
        <section id="features" ref={sectionRef} className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Why Choose Our Pizza
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
                        We take pride in our commitment to quality, tradition, and customer satisfaction. Here's what sets us apart.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-item bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

