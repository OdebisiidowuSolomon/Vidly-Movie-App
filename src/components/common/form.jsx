import Joi from "joi-browser";
import { Component } from "react";
import Input from "./input";
import Select from "./select";

export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return !error ? null : error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      errors,
    });
  };

  renderButton(label, func) {
    return (
      <button
        type="submit"
        className={`btn btn-primary`}
        disabled={this.validate()}
      >
        {label}
        <i className="fa fa-sign-in"></i>
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { errors, data } = this.state;
    return (
      <>
        <Input
          name={name}
          onChange={this.handleChange}
          label={label}
          type={type}
          value={data[name]}
          error={errors[name]}
        />
        <br />
      </>
    );
  }

  renderSelect(name, label, options) {
    const { errors, data } = this.state;
    return (
      <>
        <Select
          name={name}
          value={data[name]}
          label={label}
          options={options}
          onChange={this.handleChange}
          error={errors[name]}
        />
        <br />
      </>
    );
  }
}
