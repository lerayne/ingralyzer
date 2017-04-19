/**
 * Created by M. Yegorov on 2017-04-05.
 */
import React, {Component} from "react";
import {connect} from 'react-redux'

class FollowsPage extends Component {

    static loginRequired = true

    render(){
        return <div>Follows</div>
    }
}

export default connect(state => ({
    user: state.user,
    follows: state.follows.list,
    followsLoaded: state.follows.loaded
}))(FollowsPage)