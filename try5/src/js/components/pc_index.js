import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCBody from './pc_body';

export default class PCIndex extends React.Component {
	render() {
		return (
			<div>
				<PCHeader></PCHeader>
				<PCBody></PCBody>
				<PCFooter></PCFooter>
			</div>
		);
	};
}
