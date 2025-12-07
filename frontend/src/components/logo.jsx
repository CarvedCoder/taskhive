import React from 'react'

export function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <img
                src="/Taskhive_logo-removebg.png"
                alt="TaskHive logo"
                className="w-8 h-8 object-contain"
                loading="lazy"
            />
            <span className="text-xl font-bold text-foreground">TaskHive</span>
        </div>
    )
}