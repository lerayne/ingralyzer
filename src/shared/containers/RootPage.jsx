/**
 * Created by M. Yegorov on 2017-04-05.
 */
import React, {Component} from "react";
import {Link} from "react-router";
import {Layout, Menu, Icon} from "antd";
import {connect} from 'react-redux'
//local
import css from "./RootPage.css";
import {getFollows} from '../actions/followsActions'
import {getMyProps} from '../actions/userActions'

const {Header, Footer, Sider, Content} = Layout

function TopMenuItem({children, link, icon}) {
    return <Link to={link}>
        <Icon type={icon}/>{children}
    </Link>
}

class RootPage extends Component {

    componentDidMount(){
        this.props.dispatch(getFollows())
        this.props.dispatch(getMyProps())
    }

    render() {
        const {location, children, user} = this.props

        const AUTHED = user.accessToken !== ''

        return <Layout className={css.main}>
            <Header className={css.header}>
                <h1>Ingralyzer</h1>
                <h2>Improve your IG experience!</h2>

                {AUTHED && <div className="content-width">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname, location.pathname.replace(/\/$/, '')]}
                    >
                        <Menu.Item key="/">
                            <TopMenuItem link="/" icon="contacts">Follows</TopMenuItem>
                        </Menu.Item>

                        <Menu.Item key="/categories">
                            <TopMenuItem link="/categories" icon="tag">Categories</TopMenuItem>
                        </Menu.Item>
                    </Menu>
                </div>}
            </Header>
            <Content className="content-width">
                {children}
            </Content>
        </Layout>
    }
}

export default RootPage = connect(state => ({
    user: state.user,
}))(RootPage)