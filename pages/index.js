import { createClient } from "contentful";
import RecordCard from "../components/RecordCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "record" });

  return {
    props: {
      records: res.items,
      fallback: false,
    },
  };
}

export default function Records({ records }) {
  console.log(records);

  return (
    <div className="record-list">
      {" "}
      {records.map((record) => (
        <RecordCard key={record.sys.id} record={record} />
      ))}{" "}
    </div>
  );
}
