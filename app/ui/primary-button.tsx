import { PlusIcon } from "@heroicons/react/16/solid";

export default function PrimaryButton({
  text,
  showPlusIcon = false
}: {
  text: string;
  showPlusIcon?: boolean;
}) {
  return (
    <button 
      className={`
        w-full 
        bg-emerald-500 
        rounded-xl 
        py-3 
        text-white 
        font-bold 
        text-sm 
        cursor-pointer 
        shadow-sm 
        hover:bg-emerald-600 
        transition-all ease
        flex
        justify-center
      `}
    >
      {showPlusIcon && <PlusIcon height={20} width={20} />}
      <span className="pr-4 ml-2">{text}</span>
    </button>
  );
}