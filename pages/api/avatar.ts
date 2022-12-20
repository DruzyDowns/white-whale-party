import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

const generateAvatar = (sessionSeed: any) => {
  const output = { avatar: `10` };
  return output;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const renderedAvatar = generateAvatar(req.body);
  try {
    return res.send(JSON.stringify(renderedAvatar));
  } catch (err) {
    console.log(err);

    res.statusCode = 500;
    return res.send(JSON.stringify({ aw: "snap" }));
  }
}
