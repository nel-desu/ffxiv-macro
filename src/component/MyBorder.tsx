import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  border: {
    margin: 5,
    padding: 2,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: '#00000000',
    backgroundImage: token.windowBorder,
  },
}));

function MyDBorder({ children }: { children: React.ReactNode }) {

  const { styles } = useStyles();

  return (
    <div className={styles.border}>
      <div>
        {children}
      </div>
    </div>
  );
}

export default MyDBorder;
