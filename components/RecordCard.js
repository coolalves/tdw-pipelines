import Link from "next/link";
export default function RecordCard({ record }) {
  const { title, artist, slug, thumbnail } = record.fields;

  return (
    <div className="card">
      <div className="featured"> {/*thumbnail*/} </div>{" "}
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
