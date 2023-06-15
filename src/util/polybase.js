import { Polybase } from "@polybase/client";
import { POLYBASE_NAMESPACE } from "./constants";

const db = new Polybase({
  defaultNamespace: POLYBASE_NAMESPACE
});

// https://explorer.testnet.polybase.xyz/studio/pk%2F0xbb44be3b8e07ed240e9144acfa4760f872ea5282b86647e678b505ffc2192b8cb5462e4624f2b1f363b6ad91b23ad7c3b99bf97450354725273cd486c1898606%2Ffeaturechain
const boardCollection = db.collection("boards");
const ticketCollection = db.collection("tickets");


// https://polybase.xyz/docs/read
export async function createBoard(
  { id, title, redirectUrl, reward, owner, address, chainId }
) {
  // .create(args) args array is defined by the constructor fn
  const recordData = await boardCollection.create([
    id, title, redirectUrl, reward, owner, new Date().getTime(), chainId
  ]);

  console.log('created board', recordData)
  return recordData;
}

export async function getTicketsForBoard(boardId) {
  return await ticketCollection.where("board", "==", boardId).get();
}