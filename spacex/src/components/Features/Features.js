import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import './features.css';
import Main from "../Main/Main";
import RelaxWrapper from 'react-rellax-wrapper';

const rocketImages = {
	'Falcon 1' : 'falcon-1',
	'Falcon 9' : 'falcon-9',
	'Falcon Heavy' : 'falcon-heavy',
	'Starship' : 'starship'
}

const Features = (props) => {
	return(

		
	<Fragment>
		
		<section className="features">
		<h2 className="features-title">
			{props.name}<br/>Overview
		</h2>
		<div className="overview">
			<table className="table">
				<caption className="table-title">
					Size
				</caption>
				<thead>
					<tr>
						<td className="table-column">HEIGHT</td>
						<td className="table-column">{props.height.meters} m / {props.height.feet} ft</td>
					</tr>
					<tr>
						<td className="table-column">DIAMETER</td>
						<td className="table-column">{props.diameter.meters} m / {props.diameter.feet} ft</td>
					</tr>
					<tr>
						<td className="table-column">MASS</td>
						<td className="table-column">{props.mass.kg} kg / {props.mass.lb} lb</td>
					</tr>
					{props.payload_weights.map((item) => (
						<tr key={item.id}>
							<td className="table-column">PAYLOAD TO {item.id.toUpperCase()}</td>
							<td className="table-column">{item.kg} kg / {item.lb} lb</td>
						</tr>
					))}

				</thead>
			</table>
			<RelaxWrapper speed={14}>
			<img
					src={`../../img/${rocketImages[props.name]}.png`}
					alt="rocket"
					className="rocket"
					data-rellax-speed="14"
			/>
			</RelaxWrapper>

			<article>
				<h3 className="features-subtitle">DESCRIPTION</h3>
				<p className="features-text">
					{props.description}
				</p>
			</article>
		</div>
	</section>
	</Fragment>
	)
}

export default Features