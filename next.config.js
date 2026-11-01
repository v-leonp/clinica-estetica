/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      {
        // HSTS: only sent over HTTPS; browsers ignore it on http://localhost.
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        // Minimal CSP focused on frame-ancestors (prevents clickjacking) and
        // basic XSS hygiene. Does not restrict scripts because the Next.js
        // runtime relies on inline scripts.
        key: "Content-Security-Policy",
        value:
          "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none';",
      },
    ];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default config;
