import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaJobBoard } from "../target/types/solana_job_board";

describe("solana-job-board", () => {
	const kp = anchor.web3.Keypair.fromSecretKey(
		Uint8Array.from([
			132, 179, 130, 25, 95, 202, 250, 115, 115, 116, 182, 91, 66, 25, 119, 236,
			100, 105, 213, 248, 219, 228, 33, 100, 232, 187, 120, 112, 252, 143, 251,
			71, 225, 154, 173, 117, 227, 107, 28, 200, 137, 85, 242, 145, 99, 110,
			245, 199, 242, 177, 31, 92, 132, 43, 87, 31, 81, 60, 156, 147, 84, 193,
			53, 125,
		])
	);
	// Configure the client to use the local cluster.
	anchor.setProvider(anchor.AnchorProvider.env());

	const program = anchor.workspace.SolanaJobBoard as Program<SolanaJobBoard>;

	it("add job post", async () => {
		// Add your test here.
		const tx = await program.methods
			.addJobPost("Google", "Software Engineer", "Mountain View, CA")
			.accounts({
				account: kp.publicKey,
			})
			.signers([kp])
			.rpc();
		console.log("Your transaction signature", tx);
	});
});
