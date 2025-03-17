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
                y: "30%",
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
            title: "Handcrafted Dough",
            description:
                "Our pizza begins with handcrafted dough made fresh daily. We use a special blend of flours and allow it to ferment for 24 hours to develop the perfect flavor and texture.",
            image: "https://placehold.co/400x400",
        },
        {
            number: "02",
            title: "Premium Sauce",
            description:
                "Our signature sauce is made from San Marzano tomatoes, imported from Italy and known for their sweet flavor and low acidity. We add a blend of herbs and spices for the perfect taste.",
            image: "https://placehold.co/400x400",
        },
        {
            number: "03",
            title: "Quality Toppings",
            description:
                "We source only the finest ingredients for our toppings, from fresh vegetables to premium meats and cheeses. Each topping is carefully selected to ensure the best flavor combination.",
            image: "https://placehold.co/400x400",
        },
        {
            number: "04",
            title: "Wood-Fired Oven",
            description:
                "Our pizzas are cooked in a traditional wood-fired oven at temperatures reaching 900°F. This creates the perfect crust - crispy on the outside and soft on the inside.",
            image: "https://placehold.co/400x400",
        },
    ]

    return (
        <section id="process" ref={sectionRef} className="relative overflow-hidden bg-gray-100 py-20">
            {/* Background elements */}
            <div className="absolute inset-0 parallax-bg opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64">
                    <img
                        src="https://placehold.co/200x200"
                        alt="Pizza element"
                        width={200}
                        height={200}
                        className="rotate-element"
                    />
                </div>
                <div className="absolute bottom-20 right-10 w-48 h-48">
                    <img
                        src="https://placehold.co/150x150"
                        alt="Pizza element"
                        width={150}
                        height={150}
                        className="rotate-element"
                    />
                </div>
                <div className="absolute top-40 right-1/4 w-32 h-32">
                    <img
                        src="https://placehold.co/100x100"
                        alt="Pizza element"
                        width={100}
                        height={100}
                        className="rotate-element"
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Pizza Making Process</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover the art and science behind our delicious pizzas. From dough to delivery, we ensure quality at
                            every step.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            {processSteps.map((step, index) => (
                                <div key={index} className="flex gap-6" data-aos="fade-right" data-aos-delay={100 + index * 100}>
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
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

                    <div className="mt-20 text-center" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-2xl font-semibold mb-6">Experience the Difference</h3>
                        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                            Our commitment to quality and tradition is what sets our pizzas apart. We invite you to taste the
                            difference that passion and premium ingredients make.
                        </p>
                        <button
                            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            Order Your Pizza Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

