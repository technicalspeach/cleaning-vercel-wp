import type { Metadata } from "next";
import { setSeoData } from "@/utils/seoData";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode, Page } from "@/gql/graphql";
import { SeoQuery } from "@/queries/general/SeoQuery";

const notFoundPageWordpressId = 501;

export async function generateMetadata(): Promise<Metadata> {
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    SeoQuery,
    { slug: notFoundPageWordpressId, idType: "DATABASE_ID" },
  );

  const metadata = setSeoData({ seo: contentNode?.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  } as Metadata;
}

export default async function NotFound() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Cleaning Xpert</h1>
      <p>Your local cleaning service system is ready and connected!</p>
    </div>
  );
}
