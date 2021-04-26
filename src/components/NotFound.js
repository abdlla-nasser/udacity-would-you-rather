import { useLocation } from "react-router";
import { CenterContainer } from "./CenterContainer";

export function NotFound() {
  const location = useLocation();
  return location.pathname.includes("/question") ? (
    <CenterContainer>
      <p>question not found</p>
    </CenterContainer>
  ) : (
    <CenterContainer>
      <p>Page Not Found</p>
    </CenterContainer>
  );
}
