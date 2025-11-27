import React from 'react'
import { Link } from 'react-router-dom'
// import Link from 'next/link' // Remove this line
// import Image from 'next/image' // Remove this line
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'
import TodoApp from './todo-app'
import EventsSection from './events-section'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden relative">
                <section className="relative min-h-screen">
                    {/* Dark Overlay (Scrim) - Full Screen */}
                    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-1"></div>
                    
                    <div className="relative pt-24 md:pt-36 z-10 min-h-screen">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <a
                                        href="#link"
                                        className="hover:bg-white/20 bg-white/10 backdrop-blur-sm group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/20 p-1 pl-4 shadow-lg transition-colors duration-300">
                                        <span className="text-white font-medium text-sm">Introducing AI-Powered Study Planning</span>
                                        <span
                                            className="block h-4 w-0.5 border-l border-white/30 bg-white/30"></span>

                                        <div
                                            className="bg-white/20 group-hover:bg-white/30 size-6 overflow-hidden rounded-full duration-500">
                                            <div
                                                className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-white" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-white" />
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </AnimatedGroup>

                                <AnimatedGroup variants={transitionVariants} className="mt-12">
                                    <h1 className="text-balance text-center text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                        <TextEffect
                                            per="word"
                                            as="span"
                                            preset="fade"
                                            className="inline-block text-white">
                                            The All-in-One App for
                                        </TextEffect>
                                        <br />
                                        <TextEffect
                                            per="word"
                                            as="span"
                                            preset="fade"
                                            delay={0.5}
                                            className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            Student Success
                                        </TextEffect>
                                    </h1>
                                </AnimatedGroup>

                                <AnimatedGroup variants={transitionVariants} className="mt-6">
                                    <p className="mx-auto max-w-2xl text-balance text-center text-lg text-white/90 font-medium">
                                        An AI-powered study planner and student-driven marketplace that helps you manage academics, earn from your skills, and grow together through learning and collaboration.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-white/20 backdrop-blur-sm rounded-[calc(var(--radius-xl)+0.125rem)] border border-white/30 p-0.5">
                                        <Button asChild size="lg" className="rounded-xl px-5 text-base bg-white text-black hover:bg-white/90">
                                            <Link to="/signup">
                                                <span className="text-nowrap font-semibold">Get Started Free</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-white hover:bg-white/20 border border-white/30">
                                        <a href="#features">
                                            <span className="text-nowrap font-medium">Explore Features</span>
                                        </a>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        
                    </div>
                </section>
                <section className="pb-4 pt-6 md:pb-8 relative z-10">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div
                            className="absolute inset-0 z-20 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <a href="/" className="block text-sm duration-150 hover:opacity-75 text-white/80 hover:text-white">
                                <span> Meet Our Customers</span>

                                <ChevronRight className="ml-1 inline-block size-3" />
                            </a>
                        </div>
                        {/* ...existing customer logos section... */}
                    </div>
                </section>
                
                {/* Interactive Todo Application */}
                <TodoApp />
                
                {/* Events Section */}
                <EventsSection />
                <footer/>
            </main>
        </>
    );
}
