import { promises as fs } from "fs";
import { MdDownload } from "react-icons/md";

type Record = {
  filename: string;
  version: string;
  device: string;
  python: string[];
  os: string;
  arch: string;
  url: string;
};

function Row(record: Record) {
  return (
    <tr key={record.filename}>
      <td>{record.version}</td>
      <td>{record.python.join(", ")}</td>
      <td>{record.os}</td>
      <td>{record.arch}</td>
      <td>{record.device}</td>
      <td>
        <a href={record.url}>
          <MdDownload />
        </a>
      </td>
    </tr>
  );
}

// read the data from the file, return a list of record
export default async function Table() {
  const data = await fs.readFile(
    process.cwd() + "/public/records.json",
    "utf-8",
  );
  const records = JSON.parse(data);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>PyTorch Build</th>
            <th>Python Version</th>
            <th>Your OS</th>
            <th>Arch</th>
            <th>Compute Platform</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{records.map((record: Record) => Row(record))}</tbody>
      </table>
    </div>
  );
}
