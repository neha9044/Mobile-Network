import fs from "fs";
import path from "path";
import { gql } from "graphql-tag";

const authSchema = fs.readFileSync(
  path.join(process.cwd(), "src/schemas/auth.graphql"),
  "utf8"
);

export default gql`
  ${authSchema}
`;