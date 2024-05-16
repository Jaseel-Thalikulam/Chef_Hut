import { useNavigate } from "react-router-dom";

export function useCustomNavigate() {
  const navigate = useNavigate();
  return (path:string) => navigate(path);
}
