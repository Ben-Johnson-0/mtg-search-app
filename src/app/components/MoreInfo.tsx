import React, { ReactNode } from "react";
import { Tooltip } from "./ToolTip";

interface MoreInfoProps {
    content: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export const MoreInfo: React.FC<MoreInfoProps> = ({
    content,
    position = "top",
    className = ""
}) => {

    return (
        <Tooltip 
            content={content}
            position={position}
            className={className}
        >
            <sup
                className="inline-flex items-center justify-center 
                            w-5 h-5 text-xs font-normal 
                            text-white 
                            cursor-help select-none"
            >
                &#x1F6C8;
            </sup>
        </Tooltip>
    );
};
