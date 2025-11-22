import React, { ReactNode, useState } from "react";

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = "top",
    className = ""
}) => {
    const [visible, setVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            tabIndex={0}
        >
            {children}

            {visible && (
                <div
                    className={`
                    absolute z-50 whitespace-normal break-words inline-block
                    px-2 py-1 rounded text-sm
                    text-white bg-gray-900 shadow-lg
                    max-w-md min-w-[200px]
                    ${positionClasses[position]}
                `}
                >
                    {content}
                </div>
            )}
        </div>
    );
};
