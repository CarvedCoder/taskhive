import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

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

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle password reset request
        console.log('Password reset requested for:', email)
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_70%)]"></div>
            
            {/* Back to Login Button */}
            <div className="absolute top-6 left-6 z-20">
                <Link 
                    to="/login" 
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-medium">Back to Login</span>
                </Link>
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <AnimatedGroup variants={transitionVariants}>
                        {!isSubmitted ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        <TextEffect
                                            per="word"
                                            as="span"
                                            preset="fade"
                                            className="inline-block">
                                            Reset Password
                                        </TextEffect>
                                    </h1>
                                    <p className="text-white/70">Enter your email to receive a password reset link</p>
                                </div>

                                {/* Reset Form */}
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your email address"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                        >
                                            <Mail className="w-5 h-5 mr-2" />
                                            Send Reset Link
                                        </Button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Success State */}
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        <TextEffect
                                            per="word"
                                            as="span"
                                            preset="fade"
                                            className="inline-block">
                                            Check Your Email
                                        </TextEffect>
                                    </h1>
                                    <p className="text-white/70">We've sent a password reset link to {email}</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
                                    <div className="text-center space-y-4">
                                        <p className="text-white/80 text-sm">
                                            Didn't receive the email? Check your spam folder or try again.
                                        </p>
                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                            variant="outline"
                                            className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                        >
                                            Try Again
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Back to Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-white/70">
                                Remember your password?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>
        </div>
    )
}