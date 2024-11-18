import { useState } from 'react';

import styles from './styles.module.scss';
import { FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
  options: IOption[];
  onChange: (option: IOption) => void;
  defaultValueId?: string;
  elementOnPreview?: {
    side: 'left' | 'right';
    element: JSX.Element;
  };
  optionsSide?: 'left' | 'right';
}

export interface IOption {
  id: string;
  value: string;
}

export default function Dropdown({
  options,
  onChange,
  defaultValueId,
  elementOnPreview,
  optionsSide='left'
}: DropdownProps) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValueId ?getOption(defaultValueId) :options[0]);

  function getOption(id: string) {
    return options.filter(option => option.id)[0];
  }

  function toggleDropdownState() {
    setIsDropdownOpen(state => !state);
  }

  function changeDropdownSelectedValue(option: IOption) {
    toggleDropdownState();
    if(option.id===selectedValue.id) return;

    setSelectedValue(option);
    onChange(option);
  }

  return (
    <div id={styles.Container}>
      <div className={styles.Selector} onClick={toggleDropdownState}>
        <div
          className={styles.Value}
          style={{
            ...(elementOnPreview ?{ flexDirection: elementOnPreview.side==='left' ?'row' :'row-reverse' } :{})
          }}
        >
          {elementOnPreview ?elementOnPreview.element :null}
          {selectedValue.value}
        </div>
        <FiChevronDown size={20} color='#FFFFFF' />
      </div>

      {isDropdownOpen ? (
        <div className={styles.Options}>
          {/* {options.map(option => (

          ))} */}
        </div>
      ) :null}
    </div>
  );
}