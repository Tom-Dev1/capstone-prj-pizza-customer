"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, Users, ChefHat, Award, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

export default function WorkshopSection() {
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
        // In a real application, you would send the form data to a server here
    }

    const workshops = [
        {
            title: "Neapolitan Masterclass",
            description: "Learn the art of authentic Neapolitan pizza making from our master pizzaiolos.",
            image: "https://placehold.co/600x400",
            duration: "3 hours",
            price: "$89",
            capacity: "8 people",
        },
        {
            title: "Gourmet Pizza Creation",
            description: "Explore creative toppings and combinations to create your own signature gourmet pizza.",
            image: "https://placehold.co/600x400",
            duration: "2.5 hours",
            price: "$75",
            capacity: "10 people",
        },
        {
            title: "Family Pizza Fun",
            description: "A fun-filled workshop for the whole family. Kids love making their own mini pizzas!",
            image: "https://placehold.co/600x400",
            duration: "2 hours",
            price: "$59",
            capacity: "12 people",
        },
    ]

    const uniquePizzas = [
        {
            name: "Truffle Delight",
            description: "Black truffle cream, wild mushrooms, mozzarella, and arugula drizzled with truffle oil.",
            image: "https://placehold.co/300x300",
            tags: ["Gourmet", "Vegetarian"],
        },
        {
            name: "Mediterranean Dream",
            description: "Roasted red peppers, artichokes, olives, feta cheese, and fresh herbs on a thin crust.",
            image: "https://placehold.co/300x300",
            tags: ["Vegetarian", "Mediterranean"],
        },
        {
            name: "Spicy Seafood",
            description: "Fresh shrimp, calamari, mussels, and clams with a spicy tomato sauce and fresh herbs.",
            image: "https://placehold.co/300x300",
            tags: ["Seafood", "Spicy"],
        },
        {
            name: "Forest Harvest",
            description: "A blend of wild mushrooms, truffle oil, caramelized onions, and fontina cheese.",
            image: "https://placehold.co/300x300",
            tags: ["Vegetarian", "Gourmet"],
        },
    ]

    return (
        <section id="workshop" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Workshop Introduction */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Pizza Making Workshops</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our expert chefs and learn the secrets of making perfect pizza. From dough preparation to creative
                        toppings, our workshops offer a hands-on experience for all pizza enthusiasts.
                    </p>
                </div>

                {/* Workshop Types */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {workshops.map((workshop, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative h-48">
                                <img
                                    src={workshop.image || "/placeholder.svg"}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3">{workshop.title}</h3>
                                <p className="text-gray-600 mb-4">{workshop.description}</p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-gray-700">
                                        <Clock className="w-5 h-5 mr-2 text-primary" />
                                        <span>{workshop.duration}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Users className="w-5 h-5 mr-2 text-primary" />
                                        <span>Max {workshop.capacity}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <span className="font-bold text-primary text-lg">{workshop.price}</span>
                                        <span className="ml-1">per person</span>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-primary hover:bg-primary/90">Book Now</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Book Workshop: {workshop.title}</DialogTitle>
                                            <DialogDescription>
                                                Fill out the form below to reserve your spot in our pizza making workshop.
                                            </DialogDescription>
                                        </DialogHeader>
                                        {!formSubmitted ? (
                                            <form onSubmit={handleSubmit}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
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
                                                            Phone
                                                        </Label>
                                                        <Input id="phone" type="tel" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="date" className="text-right">
                                                            Date
                                                        </Label>
                                                        <Input id="date" type="date" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="participants" className="text-right">
                                                            Participants
                                                        </Label>
                                                        <Input id="participants" type="number" min="1" className="col-span-3" required />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-start gap-4">
                                                        <Label htmlFor="message" className="text-right pt-2">
                                                            Message
                                                        </Label>
                                                        <Textarea id="message" className="col-span-3" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                                                        Submit Booking
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        ) : (
                                            <div className="py-6 text-center">
                                                <ChefHat className="w-16 h-16 mx-auto text-primary mb-4" />
                                                <h3 className="text-xl font-semibold mb-2">Booking Received!</h3>
                                                <p className="text-gray-600 mb-4">
                                                    Thank you for booking our workshop. We'll contact you shortly to confirm your reservation.
                                                </p>
                                                <Button onClick={() => setFormSubmitted(false)} variant="outline" className="mt-2">
                                                    Book Another Workshop
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
                <div className="mb-16">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-3xl font-bold mb-4">Unique Pizzas You'll Learn to Make</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover our signature creations that go beyond the traditional. In our workshops, you'll learn to make
                            these unique pizzas and more.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {uniquePizzas.map((pizza, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
                            >
                                <div className="relative h-48">
                                    <img
                                        src={pizza.image || "/placeholder.svg"}
                                        alt={pizza.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{pizza.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{pizza.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {pizza.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
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

                {/* Workshop Benefits */}
                <div className="bg-white rounded-xl p-8 shadow-md" data-aos="fade-up">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Why Join Our Workshops?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <ChefHat className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <p>Learn from professional chefs with years of experience in authentic Italian cuisine</p>
                                </li>
                                <li className="flex items-start">
                                    <Award className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <p>Master techniques used in award-winning pizzerias around the world</p>
                                </li>
                                <li className="flex items-start">
                                    <Users className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <p>Small group sizes ensure personalized attention and hands-on experience</p>
                                </li>
                                <li className="flex items-start">
                                    <Calendar className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <p>Flexible scheduling with weekday evening and weekend workshop options</p>
                                </li>
                            </ul>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="mt-6 bg-primary hover:bg-primary/90">
                                        Register for Workshop <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Choose a Workshop</DialogTitle>
                                        <DialogDescription>
                                            Select the workshop you're interested in and fill out your details.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {!formSubmitted ? (
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label>Select Workshop</Label>
                                                    <RadioGroup defaultValue="neapolitan">
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="neapolitan" id="neapolitan" />
                                                            <Label htmlFor="neapolitan">Neapolitan Masterclass</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="gourmet" id="gourmet" />
                                                            <Label htmlFor="gourmet">Gourmet Pizza Creation</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="family" id="family" />
                                                            <Label htmlFor="family">Family Pizza Fun</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="reg-name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input id="reg-name" className="col-span-3" required />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="reg-email" className="text-right">
                                                        Email
                                                    </Label>
                                                    <Input id="reg-email" type="email" className="col-span-3" required />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="reg-phone" className="text-right">
                                                        Phone
                                                    </Label>
                                                    <Input id="reg-phone" type="tel" className="col-span-3" required />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="reg-date" className="text-right">
                                                        Preferred Date
                                                    </Label>
                                                    <Input id="reg-date" type="date" className="col-span-3" required />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="bg-primary hover:bg-primary/90">
                                                    Register Now
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <ChefHat className="w-16 h-16 mx-auto text-primary mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">Registration Successful!</h3>
                                            <p className="text-gray-600 mb-4">
                                                Thank you for registering. We'll contact you shortly with more details about your workshop.
                                            </p>
                                            <Button onClick={() => setFormSubmitted(false)} variant="outline" className="mt-2">
                                                Register for Another Workshop
                                            </Button>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden" data-aos="zoom-in">
                            <img src="https://placehold.co/800x600" alt="Pizza Workshop" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

