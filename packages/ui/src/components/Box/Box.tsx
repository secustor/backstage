/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createElement, forwardRef } from 'react';
import { BoxProps } from './types';
import clsx from 'clsx';
import { useStyles } from '../../hooks/useStyles';
import styles from './Box.module.css';

/** @public */
export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { classNames, utilityClasses, style, cleanedProps } = useStyles(
    'Box',
    props,
  );

  const { as = 'div', children, className, ...rest } = cleanedProps;

  return createElement(
    as,
    {
      ref,
      className: clsx(
        classNames.root,
        styles[classNames.root],
        utilityClasses,
        className,
      ),
      style,
      ...rest,
    },
    children,
  );
});

Box.displayName = 'Box';
