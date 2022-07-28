import React from "react";
import { Button, Spinner } from "reactstrap";

export default function exportToExcel({ exportToExcelFn, loading, disabled }) {
  return (
    <Button className="btn" color="primary" onClick={exportToExcelFn} disabled={disabled}>
      Exporter en Excel
      {loading && <Spinner size="sm" color="light" className="ml-2" />}
    </Button>
  );
}
