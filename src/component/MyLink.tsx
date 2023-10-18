import { createStyles } from "antd-style";

type LinkProps = {
  tip: string;
  content: string;
  url: string;
};

const useStyles = createStyles(({ token }) => ({
  text: {
    lineHeight: 2,
    color: token.infoTextColor,
  },
  link: {
    color: token.infoTextColor,
    textDecoration: 'underline',
    ':hover': {
      color: token.infoTextColor,
      textDecoration: 'underline',
    },
    ':visited': {
      color: token.infoTextColor,
      textDecoration: 'underline',
    },
    ':focus': {
      color: token.infoTextColor,
      textDecoration: 'underline',
    }
  },
}));

function MyLink(props: LinkProps) {

  const { styles } = useStyles();

  return (
    <div className={styles.text}>
      {props.tip}
      <a className={styles.link} href={props.url} target="_blank" rel="noopener noreferrer">
        {props.content}
      </a>
    </div>
  );
}

export default MyLink;
