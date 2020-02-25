import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './drow-down.module.scss';
import { ChevronIcon } from '../Icons';
import Button from '../Button';

const DropDownMenu = props => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  const handleClickOutside = e => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setDropDownOpen(false);
    }
  };
  return (
    <div
      ref={dropDownRef}
      onClick={() => setDropDownOpen(!dropDownOpen)}
      className={styles.container}
    >
      <ChevronIcon className={styles.icon_chevron} size="16px" />
      {dropDownOpen && <div className={styles.dropDown}>{props.children}</div>}
    </div>
  );
};

DropDownMenu.propTypes = {};

export default DropDownMenu;
