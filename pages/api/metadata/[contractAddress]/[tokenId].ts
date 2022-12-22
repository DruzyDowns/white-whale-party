import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress, tokenId } = req.query;

  return res.json({
    name: `White Whale Round Token ${tokenId}`,
    description:
      "This token represents your participation and turn order for the First Annual Stapleverse White Whale Gift Exchange.",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qma4QJsVp1756pR5jhES8aCawza38rt3SsKXCF3ZZMP7Nq",
    animation_url:
      "https://cloudflare-ipfs.com/ipfs/QmX8FXQmD4j4PsDKW3cKTXuN1A2HnbKXqz9KuAwc9wB5ZS",
    external_link: `https://www.whitewhale.party/${contractAddress}/`,
  });
}
