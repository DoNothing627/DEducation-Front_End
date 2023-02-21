import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

interface LayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);

  useEffect(() => {
    setPathname(router.pathname);
    console.log(pathname, "pathname");
  }, [router.pathname]);

  return (
    <>
      {pathname == "/auth" || <Header />}
      <main>{props.children}</main>
      {pathname == "/auth" || <Footer />}
    </>
  );
}
