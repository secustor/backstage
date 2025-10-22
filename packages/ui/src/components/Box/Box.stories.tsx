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

import { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './Box';
import { Flex } from '../Flex';

const meta = {
  title: 'Backstage UI/Box',
  component: Box,
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'span', 'article', 'section'],
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

const diagonalStripePattern = (() => {
  const svg = `
    <svg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
      <g fill="#2563eb" fill-opacity="0.6" fill-rule="evenodd">
        <path d="M5 0h1L0 6V5zM6 5v1H5z"/>
      </g>
    </svg>
  `.trim();
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
})();

export const Default: Story = {
  args: {
    width: '64px',
    height: '64px',
    style: {
      background: '#eaf2fd',
      borderRadius: '4px',
      border: '1px solid #2563eb',
      backgroundImage: `url("${diagonalStripePattern}")`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#2563eb',
    },
  },
};

export const Margin: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} ml="6" children="ML" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mr="6" children="MR" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mx="6" children="MX" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mt="6" children="MT" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mb="6" children="MB" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} my="6" children="MY" />
      </Box>
    </Flex>
  ),
};

export const ResponsiveMargin: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} ml={{ initial: '2', sm: '6' }} children="ML" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mr={{ initial: '2', sm: '6' }} children="MR" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mx={{ initial: '2', sm: '6' }} children="MX" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mt={{ initial: '2', sm: '6' }} children="MT" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mb={{ initial: '2', sm: '6' }} children="MB" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} my={{ initial: '2', sm: '6' }} children="MY" />
      </Box>
    </Flex>
  ),
};

export const CustomMargin: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} ml="42px" children="ML" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mr="42px" children="MR" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mx="42px" children="MX" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mt="42px" children="MT" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mb="42px" children="MB" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} my="42px" children="MY" />
      </Box>
    </Flex>
  ),
};

export const CustomResponsiveMargin: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} ml={{ initial: '9px', sm: '42px' }} children="ML" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mr={{ initial: '9px', sm: '42px' }} children="MR" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mx={{ initial: '9px', sm: '42px' }} children="MX" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mt={{ initial: '9px', sm: '42px' }} children="MT" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} mb={{ initial: '9px', sm: '42px' }} children="MB" />
      </Box>
      <Box style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} my={{ initial: '9px', sm: '42px' }} children="MY" />
      </Box>
    </Flex>
  ),
};

export const Padding: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box pl="6" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PL" />
      </Box>
      <Box pr="6" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PR" />
      </Box>
      <Box px="6" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PX" />
      </Box>
      <Box pt="6" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PT" />
      </Box>
      <Box pb="6" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PB" />
      </Box>
      <Box py="6" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PY" />
      </Box>
    </Flex>
  ),
};

export const ResponsivePadding: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box
        pl={{ initial: '2', sm: '6' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PL" />
      </Box>
      <Box
        pr={{ initial: '2', sm: '6' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PR" />
      </Box>
      <Box
        px={{ initial: '2', sm: '6' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PX" />
      </Box>
      <Box
        pt={{ initial: '2', sm: '6' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PT" />
      </Box>
      <Box
        pb={{ initial: '2', sm: '6' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PB" />
      </Box>
      <Box
        py={{ initial: '2', sm: '6' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PY" />
      </Box>
    </Flex>
  ),
};

export const CustomPadding: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box pl="42px" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PL" />
      </Box>
      <Box pr="42px" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PR" />
      </Box>
      <Box px="42px" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PX" />
      </Box>
      <Box pt="42px" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PT" />
      </Box>
      <Box pb="42px" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PB" />
      </Box>
      <Box py="42px" style={{ border: '1px solid red', borderRadius: '5px' }}>
        <Box {...args} children="PY" />
      </Box>
    </Flex>
  ),
};

export const CustomResponsivePadding: Story = {
  args: { ...Default.args },
  render: args => (
    <Flex align="center">
      <Box
        pl={{ initial: '9px', sm: '42px' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PL" />
      </Box>
      <Box
        pr={{ initial: '9px', sm: '42px' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PR" />
      </Box>
      <Box
        px={{ initial: '9px', sm: '42px' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PX" />
      </Box>
      <Box
        pt={{ initial: '9px', sm: '42px' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PT" />
      </Box>
      <Box
        pb={{ initial: '9px', sm: '42px' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PB" />
      </Box>
      <Box
        py={{ initial: '9px', sm: '42px' }}
        style={{ border: '1px solid red', borderRadius: '5px' }}
      >
        <Box {...args} children="PY" />
      </Box>
    </Flex>
  ),
};

const CardDisplay = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      style={{
        padding: '8px',
        background: '#eaf2fd',
        borderRadius: '4px',
        border: '1px solid #2563eb',
        color: '#2563eb',
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%232563eb%22%20fill-opacity%3D%220.3%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22/%3E%3C/g%3E%3C/svg%3E")',
      }}
    >
      {children}
    </div>
  );
};

export const Display: Story = {
  render: args => (
    <Flex direction="column" align="center">
      <Flex>
        <Box display="block" {...args}>
          <CardDisplay>Block</CardDisplay>
        </Box>
        <Box display="inline" {...args}>
          <CardDisplay>Inline</CardDisplay>
        </Box>
        <Box display="none" {...args}>
          <CardDisplay>None</CardDisplay>
        </Box>
      </Flex>
      <Box display={{ initial: 'block', md: 'inline' }} {...args}>
        <CardDisplay>Responsive</CardDisplay>
      </Box>
    </Flex>
  ),
};
