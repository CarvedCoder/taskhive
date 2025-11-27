import React from 'react'

export function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-xl font-bold text-foreground">TaskHive</span>
        </div>
    )
}