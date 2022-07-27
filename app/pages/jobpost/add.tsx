import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Keypair } from "@solana/web3.js";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import useAnchor from "../../effects/useAnchor";

const AddJobPost: NextPage = () => {
	const [company, setCompany] = useState("");
	const [position, setPosition] = useState("");
	const [location, setLocation] = useState("");

	const [showConnectWallet, setShowConnectWallet] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const program = useAnchor();
	const { publicKey } = useWallet();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		addJobPost();
	};

	const addJobPost = async () => {
		if(!publicKey) {
			setShowConnectWallet(true);
			setTimeout(() => {setShowConnectWallet(false)}, 3000);
			return;
		}

		const jobPost = Keypair.generate();

		try {
			const txid = await program.methods.addJobPost(company, position, location).accounts({
				account: jobPost.publicKey,
			}).signers([jobPost]).rpc();
			setShowSuccess(true);
			console.log(txid);
			setTimeout(() => {setShowSuccess(false)}, 3000);	
		} catch(error) {
			setShowError(true);
			setTimeout(() => {setShowError(false)}, 3000);
			console.error(`Failed to add job post: ${error}`);
		}
	}

	return (
		<div>
			<header>
				<div className="container px-8 mx-auto">
					<div className="mt-2 navbar">
						<div className="flex-1">
							<Link href="/">
								<a>
									<h1 className="text-2xl font-bold text-purple-700">
										Solana Job Board
									</h1>
								</a>
							</Link>
						</div>
						<div className="flex-none">
							<WalletMultiButton className="ml-6 btn btn-primary" />
						</div>
					</div>
				</div>
			</header>
			<div className="grid place-content-center">
				<h2 className="mt-4 text-4xl font-bold text-center">Add job post</h2>
				<form className="mt-8 form-control w-96" onSubmit={handleSubmit}>
					<label className="label" htmlFor="company">
						<span className="label-text">Company</span>
					</label>
					<input
						className="w-full max-w-sm input input-bordered input-accent"
						type="text"
						name="company"
						id="company"
						onChange={(e) => setCompany(e.target.value)}
						autoComplete="off"
						required
					/>
					<label className="label" htmlFor="position">
						<span className="label-text">Position</span>
					</label>
					<input
						className="w-full max-w-sm input input-bordered input-accent"
						type="text"
						name="position"
						id="position"
						onChange={(e) => setPosition(e.target.value)}
						autoComplete="off"
						required
					/>
					<label className="label" htmlFor="location">
						<span className="label-text">Location</span>
					</label>
					<input
						className="w-full max-w-sm input input-bordered input-accent"
						type="text"
						name="location"
						id="location"
						onChange={(e) => setLocation(e.target.value)}
						autoComplete="off"
						required
					/>
					<input
						type="submit"
						className="mt-4 btn btn-primary"
						value="Add job post"
					/>
				</form>
			</div>
			{showConnectWallet && (
				<div className="toast">
					<div className="alert alert-warning">Please connect your wallet</div>
				</div>
			)}
			{showError && (
				<div className="toast">
					<div className="alert alert-error">
						Failed to add job post. Please try again.
					</div>
				</div>
			)}
			{showSuccess && (
				<div className="toast">
					<div className="alert alert-success">Job post has been added</div>
				</div>
			)}
		</div>
	);
};

export default AddJobPost;
