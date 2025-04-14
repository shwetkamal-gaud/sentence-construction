import React from "react";

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {

    return (
        <div className="w-full flex flex-wrap gap-2  px-4">
            {new Array(total).fill(0).map((_, id)=>(
                <div key={id} className={`rounded-lg w-15  h-1 ${current <= id ? 'bg-[#DFE3E3]' :'bg-[#F2A531]'}`}>

                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
