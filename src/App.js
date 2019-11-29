import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { cats, teams } from './config';
import DraggableDialog from './Dialog';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    background: 'blue',
    borderRadius: 0,
    border: '1px solid yellow',
    color: 'white',
    fontWeight: 'bold',
    minHeight: 46,
    fontSize: 20,
  },
  paperAnswer: {
    padding: theme.spacing(3),
    textAlign: 'center',
    background: 'blue',
    borderRadius: 0,
    border: '1px solid yellow',
    color: 'yellow',
    fontWeight: 'bold',
    minHeight: 55,
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const values = [200, 400, 600, 800, 1000]

function App() {
  const [state, setState] = useState({
    open: false,
    question: '',
    cats: cats,
    pointsValue: 0,
    teamScores: teams.map((team) => team.points)
  })
  const handleCloseDialog = (i) => {
    setState({...state, open: false})
  }
  const handleSelectQuestion = (i, j, pointsValue, q) => {
    const newCats = Object.assign({}, cats);
    const obj = Object.assign({...state}, {cats}, {open: true, question: q});
    newCats[i].questions[j].valid = false;
    const newState = {
      ...state,
      cats: newCats,
      pointsValue: pointsValue,
    }

    const final = Object.assign({}, newState, newCats, obj, {pointsValue})
    setState(final)
  }

  const setScores = (score, i) => {
    const newScores = state.teamScores;
    newScores[i] = newScores[i] + score;
    setState({
      ...state,
      teamScores: newScores,
    })
  }

  const classes = useStyles();
  return (
    <div style={{ height: '100vh', background: 'black' }} className="App">
      <div style={{
        width: '15vw',
        height: '100vh',
        float: 'left',
        background: 'gray',
        color: 'white',
        padding: '1vw',
        marginRight: '2vw',
        textAlign: 'center',
      }}>
        <h2>Teams:</h2>
        {teams.map((team, i) => {
          return (<div style={{backgroundColor: team.title.split(' ')[0], padding: '10px 10px 50px 10px', marginBottom: 10 }} key={team.title.split(' ').join('')}>
            <h4>{team.title}</h4>
            score: <input readOnly value={state.teamScores ? state.teamScores[i] : 'loading'}></input>
            </div>)
        })}
      </div>

      <div style={{
        float: 'left',
        width: '80vw',
        height: '100vh',
        background: 'black',
        paddingTop: 50
      }} className={classes.root}>
        <Grid container spacing={1}>
          {
            state.cats.map((cat, i) => {
              return (
                <Grid
                  key={i} item xs={2}>
                  <Paper
                    header="header"
                    className={classes.paper}>
                    {cat.meta.title}
                  </Paper>
                  {cat.questions.map((q, j) => {
                    return <Paper onClick={() => {
                      if (q.valid) {
                        handleSelectQuestion(i, j, values[j], q);
                      }
                    }} className={classes.paperAnswer} question="question" key={j}>{q.valid ? values[j] : 'played'}</Paper>
                  })}
                </Grid>
              )
            })
          }
          <DraggableDialog state={state.open} handleClose={handleCloseDialog} q={state.question} pointsValue={state.pointsValue} setScores={setScores}/>
        </Grid>
      </div>
    </div>
  );
}

export default App;
