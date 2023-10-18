import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  divider: {
    height: 3,
    margin: '0px 10px',
    backgroundImage: token.dividerBg,
  },
}));

function MyDivider() {

  const { styles } = useStyles();

  return (
    <div className={styles.divider}></div>
  );
}

export default MyDivider;
