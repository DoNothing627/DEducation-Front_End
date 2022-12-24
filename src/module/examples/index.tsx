import { examples } from "@app/api/examples";
import { handleError } from "@app/services/http/http.service";
import { useEffect } from "react";

export function Examples() {
  // useEffect(() => {
  // call api examples
  examples({}).subscribe({
    next: () => {},
    error: (error) => handleError(error),
  });
  // }, []);
  return (
    <>
      <div className="text-3xl font-bold">Hello world!</div>
      <h1>Hello world!</h1>
    </>
  );
}
