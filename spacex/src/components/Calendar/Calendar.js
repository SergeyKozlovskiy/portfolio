import React, { Fragment, useEffect, useState } from "react";
import {Link, NavLink} from "react-router-dom";
import ReactDOM from 'react-dom';
import Main from "../Main/Main";
import './calendar.css';
import FetchData from "../../service/FetchData";


const Calendar = () => {

	const fetchData = new FetchData();
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData.getLaunches()
		.then((data) => setData(data))
	}, []);

	return(
	<Fragment>
		<Main />
		<section class="calendar">
		<div class="container">
			<ul class="calendar-list">
				{
					data.map(item => (
						<li class="calendar-item" key={item.id}>
							<article class="launches">
								<div class="launches-image">
									<img src={item.links.patch.small} alt=""/>
								</div>
								<div class="launches-content">
								<h2 class="launches-title">{item.name}</h2>
									<Link to="/details" class="button launches-details">Подробнее</Link>
								</div>
							</article>
						</li>
					))
				}



			</ul>
		</div>
	</section>
	</Fragment>
	)
}
export default Calendar