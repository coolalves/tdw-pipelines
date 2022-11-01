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
    <div className="main">
      <div className="container">
        <div className="header">
          <h1> My 2022 favorite records (so far)</h1>
        </div>

        <div className="record-list">
          {records.map((record) => (
            <RecordCard key={record.sys.id} record={record} />
          ))}
        </div>

        <style jsx>{`
          .main {
            background-color: red;
          }
          .container {
            position: relative;
            margin-top: auto;
            margin-bottom: auto;
            text-align: center;
            height: auto;
            margin: 0 auto;
            adding: 10px;
          }
          .header {
            background-color: black;
            height: 100px;
            line-height: 100px;
          }
          h1 {
            font-size: 30px;
            font-weight: bold;
            color: white;
          }
          .record-list {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 25%);
            grid-gap: 20px 60px;
          }
        `}</style>
      </div>
    </div>
  );
}
