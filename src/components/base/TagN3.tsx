import { Tag } from 'antd';
import React from 'react';

type Props = {
  level: string;
};

export default function TagN3({ level }: Props) {
  return (
    <Tag className="ms-3" color="gold">
      <span className="text-xl flex justify-center items-center px-2">
        {level}
      </span>
    </Tag>
  );
}
