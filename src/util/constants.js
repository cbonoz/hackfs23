export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key

export const APP_NAME = "FeatureChain";
export const APP_DESC = "Decentralized, Web3 Powered Feature request boards";
export const APP_ICON_URL = 'https://i.ibb.co/0hPMQKb/favicon.png'


// https://polybase.xyz/docs/read
export const POLYBASE_NAMESPACE = process.env.REACT_APP_POLYBASE_NAMESPACE || "pk/0xbb44be3b8e07ed240e9144acfa4760f872ea5282b86647e678b505ffc2192b8cb5462e4624f2b1f363b6ad91b23ad7c3b99bf97450354725273cd486c1898606/featurechain"


// Push protocol
export const PUSH_NOTIFICATIONS_ENV = 'staging'
export const PUSH_PK = process.env.REACT_APP_PUSH_PK;


// https://ethglobal.com/events/scaling2023/prizes#polygon
// Include trailing slashes
export const CHAIN_OPTIONS = {

  // 137: {
  //   name: "Matic Mainnet",
  //   url: "https://polygonscan.com/",
  //   id: 137,
  // },
  80001: {
    name: "Mumbai Testnet",
    url: "https://mumbai.polygonscan.com/",
    id: 80001,
  },
};

export const DEFAULT_CHAIN_ID = 80001;
export const DEFAULT_CHAIN = CHAIN_OPTIONS[DEFAULT_CHAIN_ID]

export const EXAMPLE_FORM = {
  boardName: "Uniswap community feature requests",
  boardDescription: "We are considering building a new community feature site. The most submitted ideas will be exported and prioritized.",
  companyName: "Uniswap",
  files: [],
};

export const IPFS_BASE_URL = "https://w3s.link/ipfs"

export const CREATE_STEPS = [
  {
    title: "Fill in fields",
    description: "Enter required data to register the board."
  },
  {
    title: "Create your FeatureChain request board",
    description: "Requires authorizing a FeatureChain board creation request."
  },
  {
    title: "Wait for board to be created",
    description: "Your hosted board and custom url will be ready for others to use and submit requests."
  }
]

console.log("config", COVALENT_KEY, DEFAULT_CHAIN);
