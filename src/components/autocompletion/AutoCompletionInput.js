import React from "react";
import { Col, FormGroup, Label } from "reactstrap";
import Select, { components } from "react-select";

const AutoCompletion = ({ placeholder, disabled, suggestions, md, label, name, onChange, error, value, className }) => {
  return (
    <Col md={md ? md : "12"} className={className}>
      <FormGroup>
        <Label>{label}</Label>
        <Select
          placeholder={placeholder ? placeholder : '...'}
          isClearable
          components={{ Control: (props) => <components.Control {...props} isDisabled={disabled} />}}
          isSearchable
          name={name}
          onChange={onChange}
          options={suggestions}
          value={value}
        />
        { error && <span className="text-danger">{error}</span> }
      </FormGroup>
    </Col>
  );
};
export default AutoCompletion;
