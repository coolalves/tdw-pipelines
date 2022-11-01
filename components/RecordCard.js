import Link from "next/link";
import Image from "next/image";

export default function RecordCard({ record }) {
  const { title, artist, slug, thumbnail } = record.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={300 /*thumbnail.fields.file.details.image.width*/}
          height={300 /*thumbnail.fields.file.details.image.height*/}
          alt="albumcover"
        />
      </div>
      <div className="content">
        <div className="info">
          <h4> {title} </h4> <p> {artist} </p>
        </div>
        <div className="actions">
          <Link href={"/records/" + slug} legacyBehavior>
            <a>About</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          width: 300px;
        }
        .content {
          background: #bec2f7;
          margin: 0;
          position: relative;
          width: 300px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 18px;
        }
        .info p {
          margin: 0;
          font-size: 16px;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: black;
          padding: 16px 24px;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
