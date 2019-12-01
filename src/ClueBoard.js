import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Timer from './Timer';
import { teams } from './config';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    background: 'blue'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  answerBox: {
    fontSize: 50,
    width: '100vw',
    height: 'calc(100vh - 64px)',
    textAlign: 'center',
    background: 'blue',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClueBoard(props) {
  const classes = useStyles();
  const { state, handleClose, q, pointsValue, setScores } = props;
  const [open, setOpen] = React.useState(state);
  const [question, setQuestion] = React.useState(q);
  useEffect(() => {
    setOpen(state);
  }, [state])
  useEffect(() => {
    setQuestion(q);
  }, [q])

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            {
              teams.map((team, i) => <Button disableFocusRipple key={i} autoFocus onClick={() => {
                setScores(pointsValue, i)
                handleClose()
              }} color="primary" style={{
                background: 'blue', color: 'yellow', marginRight: 10
              }}> {team.title} </Button>)
            }
          </Toolbar>
          <Timer />
        </AppBar>
        <span className={classes.answerBox} >{question.q}</span>

      </Dialog>
    </div>
  );
}