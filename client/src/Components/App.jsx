import React, { Component } from "react";
import { MDBBtn, MDBIcon, MDBTooltip } from "mdbreact";
import Loader from "react-loader-spinner";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import AddNote from "./AddNote/AddNote";
import ListNote from "./ListNote/ListNote";
import { init, updateNote, deleteNote, signOut } from "../utils/APICalls";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: "",
      notes: [],
      isSignUp: false,
    };
  }

  async componentDidMount() {
    try {
      const user = await init();
      this.handleSignIn(user);
    } catch (e) {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  handleSignIn = (user) => {
    this.setState({
      user,
      isSignUp: false,
      isLoggedIn: false,
    });
  };

  handleSignOut = async () => {
    try {
      await signOut();
      this.setState({
        user: "",
        notes: [],
        isSignUp: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  toggleSignIn = () => {
    this.setState({
      isSignUp: false,
    });
  };

  toggleSignUp = () => {
    this.setState((ps) => ({ isSignUp: !ps.isSignUp }));
  };

  handleAddNote = (note) => {
    this.setState((ps) => ({
      notes: [...ps.notes, note],
    }));
  };

  initiateNote = (notes) => {
    this.setState({ notes });
  };

  handleImportant = async (index, id) => {
    const { notes } = this.state;
    try {
      await updateNote(id, !notes[index].important);
      this.setState((ps) => {
        const newState = ps;
        newState.notes[index].important = !newState.notes[index].important;
        return newState;
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleDone = async (index, id) => {
    const { notes } = this.state;
    try {
      await updateNote(id, null, !notes[index].done);
      this.setState((ps) => {
        const newState = ps;
        newState.notes[index].done = !newState.notes[index].done;
        return newState;
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteNote = async (index, id) => {
    try {
      await deleteNote(id);
      this.setState((ps) => ({
        notes: [
          ...ps.notes.splice(0, index),
          ...ps.notes.splice(1, ps.notes.length),
        ],
      }));
    } catch (e) {
      console.log(e);
    }
  };

  fillRows = () => {
    const { notes } = this.state;
    return notes.map((rec, index) => {
      return {
        id: index + 1,
        title: rec.title,
        description: rec.description,
        important: (
          <div className="noteRow">
            <MDBTooltip placement="top">
              <MDBBtn
                tag="a"
                floating
                className="round-btn"
                onClick={() => this.handleImportant(index, rec._id)}
              >
                <MDBIcon
                  icon="star"
                  className={rec.important ? "filled-yellow" : ""}
                />
              </MDBBtn>
              <div>Mark Important</div>
            </MDBTooltip>
          </div>
        ),
        done: (
          <div className="noteRow">
            <MDBTooltip placement="top">
              <MDBBtn
                tag="a"
                floating
                className="round-btn"
                onClick={() => this.handleDone(index, rec._id)}
              >
                <MDBIcon
                  icon="check"
                  className={rec.done ? "filled-yellow" : ""}
                />
              </MDBBtn>
              <div>Done</div>
            </MDBTooltip>
          </div>
        ),
        delete: (
          <div className="noteRow">
            <MDBTooltip placement="top">
              <MDBBtn
                tag="a"
                floating
                className="round-btn"
                onClick={() => this.handleDeleteNote(index, rec._id)}
              >
                <MDBIcon icon="trash-alt" />
              </MDBBtn>
              <div>Delete</div>
            </MDBTooltip>
          </div>
        ),
      };
    });
  };

  render() {
    const { isLoggedIn, user, isSignUp } = this.state;

    const username = user ? user.user.name : "";

    return (
      <>
        <Header username={username} handleSignOut={this.handleSignOut} />
        <div className="app-main">
          {isLoggedIn ? (
            <Loader
              type="Watch"
              height={100}
              width={100}
              className="pageLoader-main"
            />
          ) : isSignUp ? (
            <SignUp
              toggleSignIn={this.toggleSignIn}
              toggleSignUp={this.toggleSignUp}
            />
          ) : !user ? (
            <SignIn
              handleSignIn={this.handleSignIn}
              toggleSignUp={this.toggleSignUp}
            />
          ) : (
            <>
              <AddNote handleAddNote={this.handleAddNote} />
              <ListNote
                initiateNote={this.initiateNote}
                fillRows={this.fillRows}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
