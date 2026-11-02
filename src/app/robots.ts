import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wekraft.tech";
  const isBeta = baseUrl.includes("beta.wekraft.tech");

  if (isBeta) {
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"],
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/llms.txt", "/llms-full.txt"],
      disallow: ["/api/", "/dashboard/", "/onboard/", "/admin/", "/extension/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
