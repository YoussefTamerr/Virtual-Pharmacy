import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button type="button" onClick={handleClick}>
      &larr; Back
    </button>
  );
}

export default BackButton;
