import CircularProgress from '@mui/material/CircularProgress';

interface IGradientSpinner
{
	width?: string;
}

function GradientCircularProgress({ width = "50" }: IGradientSpinner)
{
	return (
		<div style={{ margin: "0 auto" }}>
			<svg width={0} height={0}>
				<defs>
					<linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#e01cd5" />
						<stop offset="100%" stopColor="#1CB5E0" />
					</linearGradient>
				</defs>
			</svg>
			<CircularProgress
				style={{ width: width + 'px',height: width + 'px' }}
				sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
			/>
		</div>
	);
}

export default GradientCircularProgress;
