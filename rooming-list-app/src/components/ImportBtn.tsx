import { importData } from "../lib/api";
type ImportBtnProps = {
  onImportDone: (success: boolean) => void;
};

const ImportBtn = ({ onImportDone }: ImportBtnProps) => {
  const onClickBtn = async () => {
    const response = await importData();
    onImportDone(response.success); // ✅ Notify parent
  };

  return (
    <button
      className="
        px-6 py-3
        text-base font-semibold
        border
        bg-white
        border-gray-200
        hover:bg-purple-50
        text-gray-500        
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75
        transition-colors duration-200 ease-in-out
      "
      onClick={onClickBtn}
    >
      Insert Bookings and Rooming Lists
    </button>
  );
};

export default ImportBtn;
