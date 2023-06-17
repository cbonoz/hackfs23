import { Polybase } from "@polybase/client";
import { POLYBASE_NAMESPACE } from "./constants";
import { v4 as uuidv4 } from 'uuid';


console.log('init polybase', POLYBASE_NAMESPACE)

const db = new Polybase({
  defaultNamespace: POLYBASE_NAMESPACE
});

// https://explorer.testnet.polybase.xyz/studio/pk%2F0xbb44be3b8e07ed240e9144acfa4760f872ea5282b86647e678b505ffc2192b8cb5462e4624f2b1f363b6ad91b23ad7c3b99bf97450354725273cd486c1898606%2Ffeaturechain
const boardCollection = db.collection("Board");
const ticketCollection = db.collection("Ticket");


// https://polybase.xyz/docs/read
export async function createBoard(
  owner, boardName, boardDescription, companyName, cid
) {
  // .create(args) args array is defined by the constructor fn
  const record = await boardCollection.create([
    uuidv4(), boardName, boardDescription, companyName, cid, owner, new Date().getTime()
  ]);
  const { data } = record

  console.log('created board', data)
  return data;
}

export async function createTicket(
  boardId, ticketName, ticketDescription, author
) {
  // .create(args) args array is defined by the constructor fn
  const record = await ticketCollection.create([
    uuidv4(), boardId, ticketName, ticketDescription, author, new Date().getTime()
  ]);
  const {data} = record
  return data;
}

export async function getTicketsForBoard(boardId) {
  const records = await ticketCollection.where("boardId", "==", boardId).get();
  const { data, cursor } = records;
  // TODO: paginate
  return data;
}

export async function getBoard(boardId) {
  const records = await boardCollection.where("id", "==", boardId).get()
  const { data, cursor } = records;
  return data;
}