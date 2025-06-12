// src/components/GoBackButton.jsx
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 text-indigo-600 hover:underline hover:text-indigo-800 text-sm"
    >
      ← Go Back
    </button>
  );
};

export default GoBackButton;
