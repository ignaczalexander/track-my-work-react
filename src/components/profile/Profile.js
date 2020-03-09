// import React, { Component } from "react";
// import TextFieldGroup from "../common/TextFieldGroup";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { setName, changePassword } from "../../actions/authActions";

// class Profile extends Component {
//   constructor() {
//     super();
//     this.state = {
//       newName: "",
//       password: "",
//       newPassword: "",
//       newPassword2: "",
//       errors: {},
//       success: {}
//     };
//   }
//   componentDidMount() {
//     this.setState({ newName: this.props.auth.user.name });
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }
//   onChangePassword = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//     if (e.target.name === "newPassword") {
//       if (e.target.value.length < 6 || e.target.value.length > 30) {
//         this.setState({
//           errors: {
//             newPassword: "Password must be between 6 and 30 characters!"
//           }
//         });
//       } else if (e.target.value !== this.state.newPassword2) {
//         this.setState({
//           errors: { newPassword2: "Passwords must match" }
//         });
//       } else {
//         this.setState({ errors: {} });
//       }
//     }
//     if (e.target.name === "newPassword2") {
//       if (e.target.value !== this.state.newPassword) {
//         this.setState({
//           errors: { newPassword2: "Passwords must match" }
//         });
//       } else {
//         this.setState({ errors: {} });
//       }
//     }
//   };
//   onChangeName = e => {
//     this.setState({
//       newName: e.target.value
//     });
//     if (e.target.value.length < 3 || e.target.value.length > 30) {
//       this.setState({
//         errors: { name: "Name must be between 3 and 30 characters!" }
//       });
//     } else {
//       this.setState({ errors: {} });
//     }
//   };
//   onChangeNameSubmit = e => {
//     e.preventDefault();
//     const newName = this.state.newName;
//     this.props
//       .dispatch(setName({ name: newName }))
//       .then(() => this.onSuccess("name"))
//       .catch(() => console.log("err"));
//   };

//   onChangePasswordSubmit = e => {
//     e.preventDefault();
//     const passData = {
//       password: this.state.password,
//       newPassword: this.state.newPassword,
//       newPassword2: this.state.newPassword
//     };
//     this.props.dispatch(changePassword(passData)).then(() => {
//       this.onSuccess("password");
//       this.setState({ password: "", newPassword: "", newPassword2: "" });
//     });
//   };
//   onSuccess = name => {
//     const success = {};
//     success[name] = true;
//     this.setState({ success }, () => {
//       window.setTimeout(() => {
//         this.setState({ success: {} });
//       }, 2000);
//     });
//   };
//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="profile container py-3">
//         <h3 className="light mb-3">Your profile</h3>

//         <div className="row justify-content-center mb-5" id="change-name">
//           <div className="col-lg-5 col-md-7">
//             <h5>Change your name</h5>
//             {this.state.success.name && (
//               <div className="alert alert-success" role="alert">
//                 Name updated successfully!
//               </div>
//             )}

//             <form onSubmit={this.onChangeNameSubmit}>
//               <TextFieldGroup
//                 clsName={"custom-input"}
//                 placeholder="Set a new name"
//                 name="newName"
//                 type="text"
//                 value={this.state.newName}
//                 onChange={this.onChangeName}
//                 error={errors.name}
//               />
//               <input
//                 type="submit"
//                 value="Save"
//                 className="btn btn-primary float-right px-3"
//                 disabled={this.state.errors.name ? true : false}
//               />
//             </form>
//           </div>
//         </div>
//         <div className="row justify-content-center" id="change-password">
//           <div className="col-lg-5 col-md-7">
//             <h5>Change password</h5>
//             {this.state.success.password && (
//               <div className="alert alert-success" role="alert">
//                 Password updated successfully!
//               </div>
//             )}
//             <form onSubmit={this.onChangePasswordSubmit}>
//               <TextFieldGroup
//                 clsName={"custom-input"}
//                 placeholder="Password"
//                 name="password"
//                 type="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 error={errors.password}
//               />
//               <TextFieldGroup
//                 clsName={"custom-input"}
//                 placeholder="New password"
//                 name="newPassword"
//                 type="password"
//                 value={this.state.newPassword}
//                 onChange={this.onChangePassword}
//                 error={errors.newPassword}
//               />
//               <TextFieldGroup
//                 clsName={"custom-input"}
//                 placeholder="Confirm new password"
//                 name="newPassword2"
//                 type="password"
//                 value={this.state.newPassword2}
//                 onChange={this.onChangePassword}
//                 error={errors.newPassword2}
//               />
//               <input
//                 type="submit"
//                 value="Save"
//                 className="btn btn-primary float-right px-3"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// Profile.propTypes = {
//   setName: PropTypes.func.isRequired,
//   changePassword: PropTypes.func.isRequired,

//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { setName, changePassword }
// )(Profile);
