import { useLocation } from "react-router";
import { CenterContainer } from "./CenterContainer";

export function NotFound() {
  const location = useLocation();
  return location.pathname.includes("/question") ? (
    <CenterContainer>question not found</CenterContainer>
  ) : (
    <CenterContainer>Page Not Found</CenterContainer>
  );
}
