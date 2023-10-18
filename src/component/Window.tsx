import { Layout } from "antd";
import { createStyles } from "antd-style";
import MyDivider from "./MyDivider";
import MyDBorder from "./MyBorder";

type WindowProps = {
  header: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
  headerStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  footerStyle?: React.CSSProperties
}

const useStyles = createStyles(({ token }) => ({
  layout: {
    background: token.windowBg,
    borderRadius: 10,
  },
  header: {
    height: '40px',
    color: token.titleTextColor,
    fontSize: 16,
    padding: '0px 10px',
    paddingInline: 10,
    lineHeight: '40px',
    textShadow: token.textShadow,
    backgroundImage: token.windowTitleBg,
    borderWidth: 0,
    borderRadius: '10px 10px 0px 0px',
  },
  content: {
    color: token.titleTextColor,
    textAlign: 'center',
    padding: '10px 20px 0px 10px',
    paddingInline: 10,
    backgroundColor: token.windowBg,
  },
  footer: {
    color: token.titleTextColor,
    textAlign: 'center',
    padding: 10,
    paddingInline: 10,
    backgroundColor: token.windowBg,
    borderWidth: 0,
    borderRadius: '0px 0px 10px 10px',
  },
}));

function Window(props: WindowProps) {

  const { styles } = useStyles();
  const { Header, Footer, Content } = Layout;

  return (
    <MyDBorder>
      <Layout className={styles.layout}>
        <Header
          className={styles.header}
          style={props.headerStyle ? props.headerStyle : undefined}>
          {props.header}
        </Header>
        <MyDivider />
        <Content
          className={styles.content}
          style={props.contentStyle ? props.contentStyle : undefined}>
          {props.content}
        </Content>
        {props.footer ? <MyDivider /> : <></>}
        <Footer
          className={styles.footer}
          style={props.footerStyle ? props.footerStyle : undefined}>
          {props.footer}
        </Footer>
      </Layout>
    </MyDBorder>
  );
}

export default Window;
