import React from 'react';
import { useField } from 'formik';

import {
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export const CustomTextInput = ({ label, className, innerInputClassName, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<div className={className}>
    	{ label && <Label>{label}</Label> }
      <Input type="text" {...props} {...field} className={ meta.touched && meta.error ? "border-red-400 ring-[.2rem] ring-red-200 placeholder:text-red-300 " + innerInputClassName: " " + innerInputClassName }/>
      { meta.touched && meta.error ? <span className="text-danger">{meta.error}</span> : null }
    </div>
	)
}

export const CustomCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
		<FormGroup check>
    	<Label check>
      	<Input {...field} {...props} className={ meta.touched && meta.error ? "border-red-400 ring-[.2rem] ring-red-200 placeholder:text-red-300": "" } />
        {children}
      </Label>
			{ meta.touched && meta.error ? <span className="text-danger">{meta.error}</span> : null }
    </FormGroup>
	);
 };

export const CustomRadio = ({ title, children, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			{ title && <span>{title}</span> }
			{ children.map((child, index) => 
				<FormGroup check className="flex" key={index}>
					<Label check for={index + child.label}>
						{child.label}
					</Label>
					<Input type="radio" {...field} id={index + child.label} name={props.name} value={child.value} className={ meta.touched && meta.error ? "border-red-400 ring-[.2rem] ring-red-200 placeholder:text-red-300": "" } />
				</FormGroup>) 
			}
			{ meta.touched && meta.error ? <span className="text-danger">{meta.error}</span> : null }
		</>
	)
}
 
export const CustomSelect = ({ label, children, changeHandler, ...props }) => {
	const [field, meta] = useField(props);
	const localHandleChange = (event) => {
		if (changeHandler) changeHandler(event)
		field.onChange(event)
	}
	return (
		<FormGroup>
 		 	<Label>{label}</Label>
 	   	<Input {...field} {...props} onChange={localHandleChange} className={ meta.touched && meta.error ? "border-red-400 ring-[.2rem] ring-red-200 placeholder:text-red-300": "" } >{ children }</Input>
    	{ meta.touched && meta.error ? <span className="text-danger">{meta.error}</span> : null}
  	</FormGroup>
	);
 };