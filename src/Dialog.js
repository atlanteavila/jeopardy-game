import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { teams } from './config';

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function DraggableDialog(props) {
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
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{
                    background: 'blue'
                }}
            >
                <DialogContent style={{
                    background: 'blue'
                }}>
                    <DialogContentText style={{
                        color: 'yellow'
                    }}>
                        <span style={{fontSize: 50}}>{question.q}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{
                    background: 'blue'
                }}>
                    {
                        teams.map((team, i) => <Button key={i} autoFocus onClick={() => {
                            setScores(pointsValue, i)
                            handleClose()
                        }} color="primary" style={{
                            background: 'blue', color: 'yellow'
                        }}> {team.title} </Button>)
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}