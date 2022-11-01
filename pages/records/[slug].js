import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "record",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "record",
    "fields.slug": params.slug,
  });

  return {
    props: { record: items[0] },
  };
};

export default function Record({ record }) {
  const { featuredImage, artist, thumbnail, title, duration, tracks, about } =
    record.fields;

  return (
    <div>
      <div className="banner">
        <h2> {title} </h2>
        <h2> {artist} </h2>
        <Image
          src={"https:" + featuredImage.fields.file.url}
          atl="img"
          width={featuredImage.fields.file.details.image.width / 3}
          height={featuredImage.fields.file.details.image.height / 3}
        />
      </div>

      <div className="info">
        <p> {duration} min </p>
        {tracks.map((trk) => (
          <span key={trk}>{trk}</span>
        ))}
      </div>

      <div className="about">
        <h3>About</h3>
        <div>{documentToReactComponents(about)}</div>
      </div>
    </div>
  );
}
