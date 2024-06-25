import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
@Injectable()
export class MailService
{
	transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
	constructor() 
	{
		this.transporter = nodemailer.createTransport(
			{

				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT) || 0,
				secure: false,
				auth:
				{
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD
				}
			}
		);
	}

	async sendActivationMail(email: string,link: string)
	{
		await this.transporter.sendMail(
			{
				from: process.env.SMTP_USER,
				to: email,
				subject: ' Activation account on the ' + process.env.API_URL,
				text: '',
				html:
					`
				<div>
				<h1>Hello! For activate go to web site</h1>
				<a href="${link}">${link}</a>
				</div>
				`
			}
		);
	}
}
