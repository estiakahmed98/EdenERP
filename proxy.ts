import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Expose the pathname to server components (used for canonical/hreflang).
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);

  return intlMiddleware(
    new NextRequest(request.url, { headers, method: request.method }),
  );
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|auth|admin|.*\..*).*)"],
};
