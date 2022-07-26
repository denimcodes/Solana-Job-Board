import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import idl from "../solana_job_board.json";

const useAnchor = () => {
  const connection = new Connection("http://127.0.0.1:8899");
  const wallet = useWallet();
  const provider = new anchor.AnchorProvider(connection, wallet as any, {
    "commitment": "confirmed"
  })
  anchor.setProvider(provider);
  const program = new anchor.Program(idl, idl.metadata.address, provider);

  return program;
}

export default useAnchor;