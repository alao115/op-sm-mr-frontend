import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

export default function useFetchResource({
  resourceService,
  errorHeader,
  params,
  action,
}) {
  const [resourceData, setResourceData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts();

  useEffect(() => {
    $api[resourceService][action](params ? params : null)
      .then(({ data }) => {
        data && setResourceData(data);
      })
      .catch((err) => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: errorHeader, message }), {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        setLoadingState(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$api, $message, action, addToast, errorHeader, resourceService]);

  return { resourceData, loadingState };
}
