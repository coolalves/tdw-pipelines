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
  const { thumbnail, artist, title, duration, tracks, about } =
    record.fields;

  return (
    <div className="container">
      <div className="banner">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          atl="img"
          width= {520}
          height={520}
          className="img"
        />
      </div>
      <div className="credits">
        <h3> {artist} </h3>
        <i> {title} </i>
      </div>
        
      <div className="about">
        <div>{documentToReactComponents(about)}</div>
      </div>

    <style jsx>{`
    .container{
      max-width:100%;
      position: relative;
      margin-top: 100px;
      margin-bottom: auto;
      text-align: center;
      justify-content:center;
    }
    .credits{
      margin:35px;
    }
    i{
      text-transform:italic;
      font-size: 40px; 
      color: black;
    } 
    h3{
      text-transform:uppercase;
      font-weight: 600;
      color: black;
      font-size: 20px;
      letter-spacing: 4px;
      color: grey;
    }
    .banner{
      display:inline-block;  
    }
    .banner h2{
      background-color: black;
      height: 50px;
      line-height: 50px; 
    }
    .about{
      margin-right:20%;
      margin-left:20%;
      text-align: justify;
    }

    `}</style>
    </div>
  );
}
