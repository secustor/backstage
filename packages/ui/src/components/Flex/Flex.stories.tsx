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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';
import { Text } from '../Text';
import { Box } from '../Box';

const meta = {
  title: 'Backstage UI/Flex',
  component: Flex,
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
    },
    justify: {
      control: 'inline-radio',
      options: ['start', 'center', 'end', 'between'],
    },
    direction: {
      control: 'inline-radio',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const DecorativeBox = ({
  width = '48px',
  height = '48px',
}: {
  width?: string;
  height?: string;
}) => {
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

  return (
    <Box
      width={width}
      height={height}
      style={{
        background: '#eaf2fd',
        borderRadius: '4px',
        border: '1px solid #2563eb',
        backgroundImage: `url("${diagonalStripePattern}")`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#2563eb',
      }}
    />
  );
};

export const Default: Story = {
  args: {
    children: (
      <>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </>
    ),
  },
};

export const ColumnDirection: Story = {
  args: {
    ...Default.args,
    direction: 'column',
  },
};

export const RowDirection: Story = {
  args: {
    ...Default.args,
    direction: 'row',
  },
};

export const AlignStartInColumn: Story = {
  args: {
    align: 'start',
    direction: 'column',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const AlignStartInRow: Story = {
  args: {
    align: 'start',
    direction: 'row',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const AlignCenterInColumn: Story = {
  args: {
    align: 'center',
    direction: 'column',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const AlignCenterInRow: Story = {
  args: {
    align: 'center',
    direction: 'row',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const AlignEndInColumn: Story = {
  args: {
    align: 'end',
    direction: 'column',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const AlignEndInRow: Story = {
  args: {
    align: 'end',
    direction: 'row',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const ResponsiveAlign: Story = {
  args: {
    align: { xs: 'start', md: 'center', lg: 'end' },
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox height="32px" />
      <DecorativeBox height="24px" />
      <DecorativeBox height="48px" />
    </Flex>
  ),
};

export const ResponsiveGap: Story = {
  args: {
    gap: { xs: '4', md: '8', lg: '12' },
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Flex>
  ),
};

export const LargeGap: Story = {
  args: {
    gap: '8',
  },
  render: args => (
    <Flex {...args}>
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Flex>
  ),
};

export const WithTextTruncate: Story = {
  render: () => (
    <Flex direction="row" gap="8">
      <Flex>
        <Text truncate>
          A man looks at a painting in a museum and says, “Brothers and sisters
          I have none, but that man&apos;s father is my father&apos;s son.” Who
          is in the painting?
        </Text>
      </Flex>
      <Flex>
        <Text truncate>
          A man looks at a painting in a museum and says, “Brothers and sisters
          I have none, but that man&apos;s father is my father&apos;s son.” Who
          is in the painting?
        </Text>
      </Flex>
    </Flex>
  ),
};
