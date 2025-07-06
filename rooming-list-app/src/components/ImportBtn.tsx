import { useState, useCallback, memo } from "react";
import { importData } from "../lib/api";
type ImportBtnProps = {
  onImportDone: (success: boolean) => void;
};

const ImportBtn: React.FC<ImportBtnProps> = memo(({ onImportDone }) => {
  const [loading, setLoading] = useState(false);
  const onClickBtn = useCallback(async () => {
    setLoading(true);
    const response = await importData();
    onImportDone(response.success); // ✅ Notify parent
    setLoading(false);
  }, [onImportDone]);

  return (
    <button
      className="
        px-6 py-3
        border
        bg-white
        border-gray-200
        hover:bg-gray-50
        text-gray-500        
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75
        transition-colors duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      onClick={onClickBtn}
      disabled={loading}
    >
      {loading ? "Importing..." : "Insert Bookings and Rooming Lists"}
    </button>
  );
});

export default ImportBtn;
