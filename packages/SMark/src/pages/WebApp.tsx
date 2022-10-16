import { Layout } from "@arco-design/web-react";
import Sider from "@arco-design/web-react/es/Layout/sider";
import { Header, Content, Category } from "../components";

export function WebApp() {
  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <Category />
      </Sider>
      <Layout>
        <Header />
        <Content />
      </Layout>
    </Layout>
  );
}
