import { Component } from "react";

class App extends Component {
  state = {
    username: "",
    userage: 0,
    usermail: "",
    usercity: "Select here",
    cities: ["bangalore", "chennai", "pune", "delhi"],
    errors: { nameError: "", ageError: "", mailError: "", cityError: "" },
  };

  inputChangeHandler = (evt) => {
    this.setState({
      [evt.target.getAttribute("name")]: evt.target.value,
    });
  };

  formSubmitHandler = (evt) => {
    console.log("Form sub called");
    evt.preventDefault();
    let isValid = true;
    let newErrors = { ...this.state.errors };

    if (this.state.userage < 18) {
      newErrors.ageError = "you are too young";
      isValid = false;
    } else if (this.state.userage > 90) {
      newErrors.ageError = "you are too old";
      isValid = false;
    } else {
      newErrors.ageError = "";
    }

    if (this.state.username === "") {
      newErrors.nameError = "Username can not be blank";
      isValid = false;
    } else {
      newErrors.nameError = "";
    }

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.usermail)) {
      newErrors.mailError = "";
    } else {
      newErrors.mailError = "Check email for typos";
      isValid = false;
    }

    if (this.state.cities.includes(this.state.usercity)) {
      newErrors.cityError = "";
    } else {
      newErrors.cityError = "Please select city from dropdown";
      isValid = false;
    }

    this.setState({
      errors: newErrors,
    });

    if (isValid) {
      evt.target.submit();
    }
  };
  render() {
    return (
      <div className="container">
        <h1>User Registeration Form</h1>
        <form onSubmit={this.formSubmitHandler} method="get">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Your Name
            </label>
            <input
              value={this.state.username}
              onChange={this.inputChangeHandler}
              name="username"
              type="text"
              className="form-control"
              id="username"
            />
            <p className="text-danger">{this.state.errors.nameError}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="userage" className="form-label">
              Your Age
            </label>
            <input
              value={this.state.userage}
              onChange={this.inputChangeHandler}
              name="userage"
              type="number"
              className="form-control"
              id="userage"
            />
            {this.state.errors.ageError !== "" && (
              <div className="text-danger">{this.state.errors.ageError}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="usermail" className="form-label">
              Your email
            </label>
            <input
              value={this.state.usermail}
              onChange={this.inputChangeHandler}
              name="usermail"
              type="mail"
              className="form-control"
              id="usermail"
            />
            {this.state.errors.mailError !== "" && (
              <div className="text-danger">{this.state.errors.mailError}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="usercity" className="form-label">
              Your City
            </label>
            <select
              value={this.state.usercity}
              onChange={this.inputChangeHandler}
              name="usercity"
              className="form-select"
            >
              <option value="Select here">Select here</option>
              {this.state.cities.map((val, idx) => (
                <option value={val} key={idx}>
                  {" "}
                  {val.charAt(0).toUpperCase() + val.slice(1)}{" "}
                </option>
              ))}
            </select>
            {this.state.errors.cityError !== "" && (
              <div className="text-danger">{this.state.errors.cityError}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <hr />
        <ul>
          <li>User Name : {this.state.username}</li>
          <li>User Age : {this.state.userage}</li>
          <li>User eMail : {this.state.usermail}</li>
          <li>User City : {this.state.usercity}</li>
        </ul>
      </div>
    );
  }
}

export default App;
