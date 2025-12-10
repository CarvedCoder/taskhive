import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Mail, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

import { supabase } from "@/supabaseClient";
import { Logo } from '@/components/logo'

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

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        receiveUpdates: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
        });

        if (error) {
            alert(error.message);
            return;
        }

        console.log("Signup success:", data.user);

        // redirect user after signup
        // If email confirmation is required → show message instead
        window.location.href = "/login";

    } catch (err) {
        console.error(err);
        alert("Something went wrong. Try again.");
        }
    };


    const handleOAuthSignup = async (provider) => {
         try {
            // Use redirect flow. redirectTo should match the Redirect URL you added in Supabase
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider,
              options: {
                redirectTo: window.location.origin + "/auth/callback" // e.g. https://taskhive.shop/auth/callback
              }
            });
        
            if (error) {
              console.error("OAuth signIn error:", error);
              alert(error.message || "OAuth sign-in failed");
              return;
            }
        
            // signInWithOAuth typically triggers a redirect — data contains url for the provider
            // If this returns data.url you can optionally window.location = data.url but supabase handles redirect by itself.
            console.log("OAuth sign-in started:", data);
          } catch (err) {
            console.error(err);
            alert("Something went wrong starting OAuth flow.");
                }
            };

    const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_70%)]"></div>
            
            {/* Back to Home Button */}
            <div className="absolute top-6 left-6 z-20">
                <Link 
                    to="/" 
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-3">
                            <img
                                src="/Taskhive_logo-removebg.png"
                                alt="TaskHive logo"
                                className="w-12 h-12 object-contain"
                            />
                            <span className="text-2xl font-bold text-white">TaskHive</span>
                        </div>
                    </div>
                    
                    <AnimatedGroup variants={transitionVariants}>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                <TextEffect
                                    per="word"
                                    as="span"
                                    preset="fade"
                                    className="inline-block">
                                    Join TaskHive
                                </TextEffect>
                            </h1>
                            <p className="text-white/70">Create your account to get started</p>
                        </div>

                        {/* Signup Form */}
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
                            {/* OAuth Buttons */}
                            <div className="space-y-3 mb-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-12 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                    onClick={() => handleOAuthSignup('google')}
                                >
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Continue with Google
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-transparent px-3 text-white/60">Or create an account</span>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                                formData.confirmPassword && passwordsMatch 
                                                    ? 'border-green-400/50 focus:ring-green-400/50' 
                                                    : formData.confirmPassword && !passwordsMatch
                                                    ? 'border-red-400/50 focus:ring-red-400/50'
                                                    : 'border-white/20 focus:ring-blue-400/50'
                                            }`}
                                            placeholder="Confirm your password"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            {formData.confirmPassword && passwordsMatch && (
                                                <Check className="w-5 h-5 text-green-400" />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="text-white/60 hover:text-white/80 transition-colors duration-200"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    {formData.confirmPassword && !passwordsMatch && (
                                        <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
                                    )}
                                </div>

                                {/* Updates */}
                                <div className="space-y-3">
                                    <label className="flex items-start gap-3 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="receiveUpdates"
                                            checked={formData.receiveUpdates}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 mt-0.5 bg-white/5 border border-white/20 rounded text-blue-400 focus:ring-blue-400/50 focus:ring-2 flex-shrink-0"
                                        />
                                        <span className="text-white/70">
                                            I'd like to receive updates and special offers via email
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={!passwordsMatch}
                                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    Create Account
                                </Button>
                            </form>

                            {/* Login Link */}
                            <div className="mt-6 text-center">
                                <p className="text-white/70">
                                    Already have an account?{' '}
                                    <Link 
                                        to="/login" 
                                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>
        </div>
    )
}