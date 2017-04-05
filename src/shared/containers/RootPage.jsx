/**
 * Created by M. Yegorov on 2017-04-05.
 */
import React, {Component} from "react";
import {Link} from "react-router";
import {Layout, Menu, Icon} from "antd";
//local
import css from "./RootPage.css";

const {Header, Footer, Sider, Content} = Layout

function TopMenuItem({children, link, icon}) {
    return <Link to={link}>
        <Icon type={icon}/>{children}
    </Link>
}

class RootPage extends Component {
    render() {
        const {location, children} = this.props

        return <Layout className={css.main}>
            <Header className={css.header}>
                <h1>Ingralyzer</h1>
                <h2>Improve your IG experience!</h2>

                <div className="content-width">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname, location.pathname.replace(/\/$/, '')]}
                    >
                        <Menu.Item key="/"><TopMenuItem link="/" icon="contacts">Follows</TopMenuItem></Menu.Item>
                        <Menu.Item key="/categories"><TopMenuItem link="/categories" icon="tag">Categories</TopMenuItem></Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content className="content-width">
                {children}
            </Content>
        </Layout>
    }
}

export default RootPage