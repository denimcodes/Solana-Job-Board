import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { JobPostCard } from "../components/JobPostCard";
import useAnchor from "../effects/useAnchor";
import { JobPost } from "../models/JobPost";

const Home: NextPage = () => {
	const[jobPosts, setJobPosts] = useState<Array<JobPost>>();
	const { publicKey } = useWallet();
	const program = useAnchor();

	useEffect(() => {
		async function fetchJobPosts() {
			const jobPosts = await program.account.jobPost.all();
			setJobPosts(jobPosts.map((jobPost) => 
				new JobPost(
				jobPost.account.company as string,
			jobPost.account.position as string,
			 jobPost.account.location as string)));
		}
		if(publicKey) {
		fetchJobPosts();
		}
	}, [program, publicKey])
	
	return (
		<div>
			<Head>
				<title>Solana Job Board</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header>
				<div className="container px-8 mx-auto">
					<div className="mt-2 navbar">
						<h1 className="flex-1 text-2xl font-bold text-purple-700">
							Solana Job Board
						</h1>
						<div className="flex-none">
							<Link className="btn btn-ghost" href={"/jobpost/add"}>
								<a>Post a job</a>
							</Link>
							<WalletMultiButton className="ml-6 btn btn-primary" />
						</div>
					</div>
				</div>
			</header>

			<main>
				<div className="container px-8 mx-auto">
					<h2 className="mt-12 text-4xl font-bold text-center">
						Find and post job on Solana blockchain
					</h2>
					<section className="mt-12 text-center">
						<form action="">
							<input
								className="w-full max-w-xl input input-bordered"
								type="search"
								name="search"
								id="search"
								placeholder="Search job titles"
							/>
						</form>
						<div className="mt-4">
							{jobPosts?.map((jobPost, i) => (
								<JobPostCard key={i} jobPost={jobPost} />
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default Home;
