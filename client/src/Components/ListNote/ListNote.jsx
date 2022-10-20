import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBDataTable } from "mdbreact";
import { listNote } from "../../utils/APICalls";
import "./ListNote.css";

class ListNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {
        columns: [
          {
            label: "No",
            field: "id",
            sort: "asc",
          },
          {
            label: "Title",
            field: "title",
            sort: "asc",
          },
          {
            label: "Notes",
            field: "Notes",
            sort: "asc",
          },
          {
            label: "",
            field: "important",
            sort: "disabled",
          },
          {
            label: "",
            field: "done",
            sort: "disabled",
          },
          {
            label: "",
            field: "delete",
            sort: "disabled",
          },
        ],
        rows: [],
        errMessage: "",
      },
    };
  }

  async componentDidMount() {
    const { initiateNote, fillRows } = this.props;

    try {
      const notes = await listNote();
      initiateNote(notes);
      this.setState((ps) => ({
        notes: {
          ...ps.notes,
          rows: fillRows(),
        },
      }));
    } catch (e) {
      console.log(e);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const rows = props.fillRows();

    return {
      notes: {
        ...state.notes,
        rows,
        errMessage: "",
      },
    };
  }

  render() {
    const { titleError, notes } = this.state;
    return (
      <MDBContainer className="note-table-main">
        {titleError && (
          <span className="error-text">Note title can&apos;t be blank.</span>
        )}
        <MDBRow>
          <MDBCol>
            <MDBDataTable striped bordered small btn data={notes} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default ListNote;
