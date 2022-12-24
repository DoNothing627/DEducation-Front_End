// import { addToast } from "../toast";

export function handleError() {
  return (err: any) => {
    if (err?.msg) {
      // addToast({ type: "danger", desc: err.msg });
      return;
    }

    if (err?.message) {
      // addToast({ type: "danger", desc: err.message });
      return;
    }

    // addToast({ type: "danger", desc: "unexpected error" });
  };
}
