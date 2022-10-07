import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, []);

  return <>{"올바르지 않은 경로입니다"}</>;
}

export default NotFoundPage;
