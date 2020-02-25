import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './button.module.scss';

export default function Button({ className, variation, ...props }) {
  return (
    <button
      className={classnames(styles.button, className, styles[variation])}
      {...props}
    >
      {props.children}
    </button>
  );
}
Button.propTypes = {
  variation: PropTypes.string
};
Button.defaultProps = {
  variation: ''
};
