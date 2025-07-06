import React from "react";

const colorStyles = {
  teal: {
    bg: "bg-teal-100",
    border: "border-teal-400",
    text: "text-teal-600",
    gradientLeft: "bg-gradient-to-l from-teal-400/50 to-transparent",
    gradientRight: "bg-gradient-to-r from-teal-400/50 to-transparent",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-400",
    text: "text-purple-600",
    gradientLeft: "bg-gradient-to-l from-purple-400/50 to-transparent",
    gradientRight: "bg-gradient-to-r from-purple-400/50 to-transparent",
  },
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-400",
    text: "text-blue-600",
    gradientLeft: "bg-gradient-to-l from-blue-400/50 to-transparent",
    gradientRight: "bg-gradient-to-r from-blue-400/50 to-transparent",
  },
  // Add more colors if needed
};

const colorList = Object.keys(colorStyles) as (keyof typeof colorStyles)[];

interface Props {
  eventName: string;
  colorIndex?: number;
}

const EventDivider: React.FC<Props> = ({ eventName, colorIndex = 0 }) => {
  const colorKey = colorList[colorIndex % colorList.length];
  const style = colorStyles[colorKey];

  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className={`flex-1 h-0.5 ${style.gradientLeft}`} />
      <div className={`px-3 py-1 border ${style.border} ${style.text} font-bold rounded-md ${style.bg}`}>
        {eventName}
      </div>
      <div className={`flex-1 h-0.5 ${style.gradientRight}`} />
    </div>
  );
};

export default EventDivider;
