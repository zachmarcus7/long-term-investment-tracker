import { PlusIcon } from "@heroicons/react/16/solid";

export default function PrimaryButton({
  text,
  showPlusIcon = false,
  onClick,
  disabled = false
}: {
  text: string;
  showPlusIcon?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const handleClick = () => {
    if (!disabled) onClick();
  }

  return (
    <button
      onClick={handleClick}
      className={`
        w-full 
        bg-emerald-500 
        rounded-xl 
        py-3 
        text-white 
        font-bold 
        text-sm 
        shadow-sm 
        hover:bg-emerald-600 
        transition-all ease
        flex
        justify-center
        ${disabled ? 'cursor-not-allowed bg-emerald-600' : 'cursor-pointer'}
      `}
    >
      {showPlusIcon && <PlusIcon height={20} width={20} />}
      <span className="pr-4 ml-2">{text}</span>
    </button>
  );
}