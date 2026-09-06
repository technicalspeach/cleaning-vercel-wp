import type { Metadata } from "next";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode } from "@/gql/graphql";
import { setSeoData } from "@/utils/seoData";
import { SeoQuery } from "@/queries/general/SeoQuery";
import PageTemplate from "@/components/Templates/Page/PageTemplate";

interface Props {
  params: {
    slug?: string[];
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Agar slug khali hai toh direct main uri "/" request karein
  const slugPath = params?.slug && params.slug.length > 0 ? `/${params.slug.join("/")}/` : "/";

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    SeoQuery,
    {
      slug: slugPath,
      idType: "URI",
    }
  );

  const metadata = setSeoData({ seo: contentNode?.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${slugPath}`,
    },
  } as Metadata;
}

export default async function Page({ params }: Props) {
  // Agar slug khali hai toh direct main uri "/" request karein
  const slugPath = params?.slug && params.slug.length > 0 ? `/${params.slug.join("/")}/` : "/";

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    SeoQuery,
    {
      slug: slugPath,
      idType: "URI",
    }
  );

  // Agar phir bhi data null aaye, toh default welcome section dikhaein crash karne ke bajaye
  if (!contentNode) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2b6cb0' }}>Cleaning Xpert Local Server Active!</h1>
        <p style={{ fontSize: '18px', color: '#4a5568' }}>Aapka Next.js frontend aur WordPress backend kamyabi se chal raha hai.</p>
        <p style={{ color: '#718096' }}>Website ka content dekhne ke liye direct is URL par check karein: <a href="http://localhost:3000/home">localhost:3000/home</a></p>
      </div>
    );
  }

  return <PageTemplate node={contentNode} />;
}
