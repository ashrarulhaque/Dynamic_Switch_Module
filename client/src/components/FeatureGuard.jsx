import { Navigate } from "react-router-dom";

export default function FeatureGuard({ enabled, children }) {
  if (!enabled) {
    return <Navigate to="/unavailable" replace />;
  }
  return children;
}
