import React, { Component } from "react";
var nodemailer = require('nodemailer');

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneregex = RegExp(
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm
)


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      phone: null,
      email: null,
      message: null,
      formErrors: {
        fullName: '',
        phone: '',
        email: '',
        message: '',
      }
    }
  }

  sendEmail = () => {
    var transporter = nodemailer.createTransport({
      service: 'smtp.gmail.com',
      auth: {
        user: 'py-aftabhussain@mobiloitte.com',
        pass: 'rehan786'
      }
    });
    console.log(transporter)
    var mailOptions = {
      from: 'py-aftabhussain@mobiloitte.com',
      to: 'py-rishutiwari@mobiloitte.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
  handleSubmit = e => {
    e.preventDefault();
    this.sendEmail()
    let formErrors = { ...this.state.formErrors };
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Full Name: ${this.state.fullName}
        Email: ${this.state.email}
        Phone: ${this.state.phone}
        Message: ${this.state.message}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE",);
      if (this.state.fullName === null) {
        formErrors.fullName = "This field is required."
      }
      if (this.state.email === null) {
        formErrors.email = "This field is required."
      }
      if (this.state.phone === null) {
        formErrors.phone = "This field is required."
      }
      if (this.state.message === null) {
        formErrors.message = "This field is required."
      }
      this.setState({ formErrors });
    }
  }


  handelChangeEvent = e => {
    e.preventDefault();
    const { name, value } = e.target
    console.log(name, value)
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'fullName':
        console.log("Case fullName")
        formErrors.fullName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case 'phone':
        formErrors.phone = phoneregex.test(value)
          ? ""
          : "invalid Phone no";
        break;
      case 'message':
        formErrors.message =
          value.length < 10 ? 'Minumum 10 characaters required' : "";
        break
      default:
        break
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

  }
  render() {
    const { formErrors } = this.state;

    return (
      <>
        <div className="my-5">
          <h1 className="text-center"> Contact US </h1>
        </div>
        <div className="container contact_div">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    FullName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="fullName"
                    onChange={this.handelChangeEvent}
                    placeholder="Enter your name"
                  />
                  {formErrors.fullName.length > 0 ? <span className="errorMessage">{formErrors.fullName}</span> : ''}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="phone"
                    onChange={this.handelChangeEvent}
                    placeholder="mobile number"
                  />
                  {formErrors.phone.length > 0 ? <span className="errorMessage">{formErrors.phone}</span> : ''}

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="email"
                    onChange={this.handelChangeEvent}
                    placeholder="name@example.com"
                  />
                  {formErrors.email.length > 0 ? <span className="errorMessage">{formErrors.email}</span> : ''}

                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="message"
                    onChange={this.handelChangeEvent}
                  ></textarea>
                  {formErrors.message.length > 0 ? <span className="errorMessage">{formErrors.message}</span> : ''}
                </div>
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Contact;
