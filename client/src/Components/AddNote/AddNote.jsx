import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { addNote } from "../../utils/APICalls";
import "./AddNote.css";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      titleError: false,
    };
  }

  handleValidateInput = () => {
    const { title } = this.state;
    return !title ? false : true;
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
      titleError: false,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleResetInput = () => {
    this.setState({
      title: "",
      description: "",
    });
  };

  onAddNote = () => {
    const { title, description } = this.state;
    const { handleAddNote } = this.props;

    if (this.handleValidateInput()) {
      addNote(title, description).then((note) => {
        handleAddNote({
          title,
          description,
          important: false,
          done: false,
          _id: note.note._id,
        });
        this.handleResetInput();
      });
    } else {
      this.setState({
        titleError: true,
      });
    }
  };

  render() {
    const { title, description, titleError } = this.state;
    return (
      <MDBContainer className="add-note-main">
        <MDBRow>
          <MDBCol>
            <MDBInput
              value={title}
              onChange={this.handleTitleChange}
              label="Title"
              background
              size={titleError ? "lg inputErrorDiv" : "lg"}
              className={titleError ? "inputError" : ""}
              maxLength={100}
            />
            {titleError && (
              <span className="error-text">Title can&apos;t be blank.</span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              value={description}
              onChange={this.handleDescriptionChange}
              type="textarea"
              label="Tell your story..."
              background
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="align-right">
            <button
              type="button"
              onClick={this.handleResetInput}
              className="btn btn-outline-info-modified waves-effect"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={this.onAddNote}
              className="btn btn-outline-info-modified waves-effect"
            >
              Add New Note
            </button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default AddNote;
