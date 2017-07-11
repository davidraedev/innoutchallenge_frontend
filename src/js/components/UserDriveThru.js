import React from "react"
import { connect } from "react-redux"

import { fetchUserDriveThru } from "../actions/userActions"

import Error from "./Error"
import TopNav from "./TopNav"
import SubNav from "./SubNav"

require( "../less/User.less" )

@connect( ( store ) => {
	console.log( store )
	return {
		user: store.userDriveThru.user,
		user_fetched: store.userDriveThru.fetched,
	}
})

export default class UserReceipts extends React.Component {

	componentWillMount() {
		this.props.dispatch( fetchUserDriveThru( this.props.dispatch, this.props.match.params.user ) )
	}

	render() {

		console.log( "this.props.user >> ", this.props.user )

		const { user, error } = this.props;

		let mappedDriveThru = []
		let errorMessages = []

		if ( error ) {
			errorMessages = error
		}
		else {
			const receipt_keys = Object.keys( user.drivethru ).sort( ( a, b ) => { return a - b });
			receipt_keys.forEach( ( number ) => {
				let receipt = user.drivethru[ number ];
				let classes = [ "number", "receipt" ];
				if ( receipt.amount > 0 )
					classes.push( "has" );
				if ( receipt.amount > 1 )
					classes.push( "multiple" );
				mappedDriveThru.push( ( <li className={ classes.join( " " ) } key={ number }>{ number }</li> ) )
			} )
		}

		return	(
			<div>
				<TopNav title={ "@" + user.name } />
				<SubNav url={ this.props.match.url } />
				<div class="container" id="main_content">
					<div class="section totals">
						<div class="item circle left small">
							<div class="title">
								total
							</div>
							<div class="number">
								{ user.totals.drivethru.total }
							</div>
						</div>
						<div class="item circle middle">
							<div class="title">
								unique
							</div>
							<div class="number">
								{ user.totals.drivethru.unique }
							</div>
						</div>
						<div class="item circle right small">
							<div class="title">
								left
							</div>
							<div class="number">
								{ user.totals.drivethru.remaining }
							</div>
						</div>
					</div>
					<div class="section individuals">
						<ul>
							{ mappedDriveThru }
						</ul>
					</div>
				</div>
			</div>
		)
	}
}