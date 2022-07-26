use anchor_lang::prelude::*;

declare_id!("7cp6bK3S7VoM5rmhE1Qcqk2KZCQxTmD4GU8QoauZYVTp");

#[program]
pub mod solana_job_board {
    use super::*;

    pub fn add_job_post(
        ctx: Context<CreateJobPost>,
        company: String,
        position: String,
        location: String,
    ) -> Result<()> {
        msg!("Creating job post...");
        msg!("Company: {}", company);
        msg!("Position: {}", position);
        msg!("Location: {}", location);
        let account = &mut ctx.accounts.account;
        account.company = company;
        account.position = position;
        account.location = location;
        msg!("Job post created!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateJobPost<'info> {
    #[account(init, payer=payer, space=4+4+4+4*25+4*20+4*20)]
    pub account: Account<'info, JobPost>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct JobPost {
    pub company: String,
    pub position: String,
    pub location: String,
}
