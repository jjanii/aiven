import React from "react";
import { Form } from "react-bootstrap";

const Select = (props: {
  title?: string;
  options: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  selected: string;
}) => {
  const { title, options, onSelect, selected } = props;
  return (
    <Form.Group>
      {title && <Form.Label>{title}</Form.Label>}
      <Form.Control
        as="select"
        value={selected}
        onChange={e => onSelect(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default Select;
