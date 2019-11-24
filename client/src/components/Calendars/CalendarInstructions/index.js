import React, { Component } from "react";
import "./style.css";

class index extends Component {
	render() {
		return (
			<div className="col-md-12 calendarInstructions-container">
				<h2
					style={{
						textAlign: "center",
						textShadow: "-1px 0 white, 0 2px white, 2px 0 white, 0 -1px white"
					}}
				>
					Calendar Instructions
				</h2>
				<p className="calendarInstructions-paragraph">
					To add appointments to each Calendar, select the desired day/time slot
					and a new window will open. In this window, select the type of event
					that's being added to the calendar, the description of the event, and
					then, hit the submit Event button. You will now see the two types of
					events on the calendars distinguished by two different colors.
				</p>
			</div>
		);
	}
}
export default index;
