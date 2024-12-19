import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    response.headers.set(
      "Access-Control-Allow-Origin",
      process.env.ALLOWED_URL || "*"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204 });
    }

    return response;
  }

  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("auth/signin", request.url));
  }
}

// export const config = {
//   matcher: [
//     "/",
//     "/user",
//     "/category/:path*",
//     "/product/:path*",
//     "/order/:path*",
//     "/api/:path*",
//   ],
// };

export const config = {
  matcher: [
    "/",
    "/blog",
    "/user",
    "/product",
    "/categoryblog",
    "/api/:path*",
    // "/",
    // "/user",
    // "/category/:path",
    // "/product/:path",
    // "/order/:path",
    // "/csr",
  ],
};
