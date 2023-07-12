function Select({ ...props}) {
  const options = props.optionsData.map((option: any) => (
    <option key={option.name}>{option.name}</option>
  ));

  return (
     <select className={props.classname}>
      {options}
  </select>
  );
}

export default Select;
