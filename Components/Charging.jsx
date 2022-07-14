import React from "react";

function Charging({ perc }) {
	return (
		<div className="g-container ">
			<div className="g-number">{perc}%</div>
			<div className="g-contrast">
				<div className="g-circle"></div>
				<ul className="g-bubbles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
}

export default Charging;
