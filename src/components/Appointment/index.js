import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => {
    transition(CREATE);
  };

  const save = function (name, interviewer) {
    if (!name || !interviewer) {
      return Promise.reject("Please enter a name for the appointment");
    }
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  const deleteAppointment = function () {
    transition(CONFIRM);
  };

  const confirmDeleteAppointment = function () {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && interview && (
        <Show {...interview} onDelete={deleteAppointment} />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={back}
          onConfirm={confirmDeleteAppointment}
        />
      )}
    </article>
  );
}
