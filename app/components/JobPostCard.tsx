import { FC } from "react";
import { JobPost } from "../models/JobPost";

export interface JobPostCardProps {
	jobPost: JobPost;
}

export const JobPostCard: FC<JobPostCardProps> = (props) => {
	return (
		<div className="px-4 py-4 mx-16 my-2 text-left card card-bordered bg-base-100">
			<p className="text-2xl font-bold">{props.jobPost.company}</p>
			<p>
				{props.jobPost.position}
			</p>
			<p>{props.jobPost.location}</p>
		</div>
	);
};
