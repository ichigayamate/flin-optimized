import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: Readonly<FeatureCardProps>) {
  return (
    <div className="bg-white px-4 py-8 rounded-md shadow-md w-full lg:w-1/5">
      <div className="flex justify-center items-center mb-2">
        <div className="p-2 bg-primary rounded-full text-white">
          {icon}
        </div>
      </div>
      <h2 className="font-bold my-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
};