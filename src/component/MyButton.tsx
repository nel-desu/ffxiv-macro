import { createStyles } from "antd-style";
import { playConfirm } from "../util/Sound";

type ButtonProps = {
  text: string;
  width?: number;
  onClick?: () => void;
}

const useStyles = createStyles(({ token }) => ({
  button: {
    height: '30px',
    margin: '0px 10px 0px 0px',
    color: token.normalTextColor,
    fontSize: 16,
    padding: '0px 10px',
    paddingInline: 10,
    textShadow: token.textShadow,
    border: '0px',
    borderRadius: '15px',
    boxShadow: token.buttonShadow,
    cursor: 'pointer',
    backgroundImage: token.buttonBg,
    ':hover': {
      backgroundImage: token.buttonHoverBg,
    },
  },
  buttonText: {
    margin: '0px 5px',
  },
}));

function MyButton(props: ButtonProps) {

  const { styles } = useStyles();

  const handleOnClick = () => {
    playConfirm();
    props.onClick ? props.onClick() : undefined;
  }

  return (
    <button type='button'
      className={styles.button}
      style={{ width: props.width ? props.width : undefined, }}
      onClick={handleOnClick}
    >
      <span className={styles.buttonText}>
        {props.text}
      </span>
    </button>
  );
}

export default MyButton;
