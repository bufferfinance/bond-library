import { Provider } from "@ethersproject/providers";
import { CHAIN_ID } from "./constants";

export interface Token {
  name: string; // The token name
  symbol: string; // The token symbol
  logoUrl?: string; // A URL to the token logo, preferably .png
  priceSources: Map<number, SupportedPriceSource | CustomPriceSource>; // A map of price sources for the token. The `number` key represents the price source's priority, lower numbers being higher priority
  purchaseLinks: Map<CHAIN_ID, string>; // Map of links to a place where the token can be purchased
}

export interface LpToken extends Token {
  lpType?: SUPPORTED_LP_TYPES;
  token0Address: string;
  token1Address: string;
}

export interface Links {
  governanceVote: string; // REQUIRED: Link to a governance vote allowing your protocol to run a BondProtocol market\
  twitter?: string; // OPTIONAL links to social media, protocol websites etc
  discord?: string;
  github?: string;
  medium?: string;
  telegram?: string;
  homepage?: string;
  staking?: string;
}

export interface Protocol {
  id: string; // Protocol ID, should be set as PROTOCOL_NAMES.YOUR_PROTOCOL
  name: string; // Display name of the protocol, this will be shown in the dapp UI
  /* URL to your protocol's logo, preferably .png */
  logoUrl?: string;
  description: string; // A description of your protocol
  links: Links;
}

export interface PriceSource {
  source: "coingecko" | "custom";
}

export interface SupportedPriceSource extends PriceSource {
  source: "coingecko";
  apiId: string; // The token's Coingecko API ID
}

export interface CustomPriceSource extends PriceSource {
  source: "custom";
  customPriceFunction: CustomPriceFunction;
  providerChainId?: CHAIN_ID;
}

export type CustomPriceFunction = (provider?: Provider) => Promise<number>;

export interface ProtocolDefinition extends Omit<Protocol, "id"> {
  tokens: Array<TokenDefinition>; // List of protocol specific tokens like its governance or LP tokens
  issuerAddresses: { [key: string]: string | string[] }; // address of that'll be issuing the market, usually a wallet or contract like a multi-sig or a treasury
}

export interface TokenDefinition extends Omit<Token, "priceSources" | "purchaseLinks"> {
  priceSources: Array<SupportedPriceSource | CustomPriceSource>; //List of prices sources
  purchaseLinks: { [key: string]: string }; // Links to where the token can be acquired
  addresses: { [key: string]: string }; // Token contract address links
}
