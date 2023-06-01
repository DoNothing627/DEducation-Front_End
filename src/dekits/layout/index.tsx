import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { IconBackground } from "./iconbackground";

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
      {pathname == "/auth" || <IconBackground />}
      <main>{props.children}</main>
      {pathname == "/auth" || <Footer />}
    </>
  );
}
