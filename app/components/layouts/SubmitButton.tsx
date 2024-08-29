import React from 'react';

interface SubmitButtonProps {
  title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className="group relative w-60 h-12 overflow-hidden overflow-x-hidden rounded-md bg-nano px-8 py-2 text-neutral-50 font-bold"
      >
        <span className="relative z-10">{title}</span>
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute text-white left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-ble transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
        </span>
      </button>
    </div>
  );
};

export default SubmitButton;
