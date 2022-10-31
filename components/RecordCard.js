import Link from "next/link";
import Image from "next/image";

export default function RecordCard({ record }) {
  const { title, artist, slug, thumbnail } = record.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>{" "}
      <div className="content">
        <div className="info">
          <h4> {title} </h4> <p> {artist} </p>{" "}
        </div>{" "}
        <div className="actions">
          <Link href={"/records/" + slug}>
            <a> About the record </a>
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
