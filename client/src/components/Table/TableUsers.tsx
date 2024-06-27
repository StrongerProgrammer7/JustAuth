import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IUser } from '../../utils/interfaces/IUser';

interface ITableUser
{
	users: IUser[];
}
export default function TableUser({ users }: ITableUser)
{
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell>email</TableCell>
						<TableCell>is active</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						users.length > 0
							?
							users.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell >{row.login}</TableCell>
									<TableCell >{row.isActivationLink ? "Active" : "Not active"}</TableCell>
								</TableRow>
							))
							:
							<TableRow
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									---
								</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
