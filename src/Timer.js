import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import countdown from './countdown.mp3';
var Sound = require('react-sound').default;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const playStatus = ["PLAYING","STOPPED","PAUSED"];
const goal = 20;

export default function LinearDeterminate() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [playSoundStatus, setPlaySoundStatus] = React.useState(playStatus[1])
  const handleSongFinishedPlaying = () => {
    setPlaySoundStatus(playStatus[1]);
  }
  React.useEffect(() => {

    const timer = setInterval(function () {
      if (completed === goal) {
        setPlaySoundStatus(false);
        return clearInterval(timer)
      }
      if (goal - completed === 7) {
        setPlaySoundStatus(playStatus[0]);
      }
      const inc = completed + 1;
      setCompleted(inc)
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [completed]);

  return (
    <div className={classes.root}>
      <Sound
        url={countdown}
        playStatus={playSoundStatus}
        onFinishedPlaying={handleSongFinishedPlaying}
      />
      <LinearProgress variant="determinate" value={(completed / goal) * 100} />
    </div>
  );
}