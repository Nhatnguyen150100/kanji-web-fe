import { Tag } from 'antd';
import React from 'react';

type Props = {
  level: string;
};

export default function TagN2({ level }: Props) {
  return (
    <Tag className="ms-3" color="cyan">
      <span className="text-xl flex justify-center items-center px-2">
        {level}
      </span>
    </Tag>
  );
}
