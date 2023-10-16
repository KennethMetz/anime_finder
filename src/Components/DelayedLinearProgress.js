import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const DelayedLinearProgress = ({ isRefetching }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 800);

    return () => clearTimeout(timer);
  });

  if (!isRefetching || !showSpinner) return;

  return <LinearProgress sx={{ mt: -1.5, mb: 1 }} />;
};

export default DelayedLinearProgress;
