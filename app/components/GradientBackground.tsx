import React from 'react'

export const GradientBackground: React.FC = () => {
    return (
        <div
            className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
            aria-hidden="true"
        />
    )
}
